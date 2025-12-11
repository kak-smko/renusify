<template>
  <component :is="page"></component>
</template>
<script setup>
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  onUpdated,
  provide,
  reactive,
  ref,
  toRef,
  toRefs,
  watch,
  watchEffect
} from 'vue'

import {defineAsyncComponent, defineComponent} from 'vue/dist/vue.esm-bundler.js'

const props = defineProps({
  template: String,
  script: String,
  css: String,
  id: String,
  scriptSetup: Boolean,
})
const addStyleToHead = () => {
  if (props.css && props.id) {
    const existingStyles = document.querySelectorAll(`[f='${props.id}']`)
    existingStyles.forEach(style => style.remove())

    const style = document.createElement("style")
    style.textContent = props.css
    style.setAttribute("f", props.id)
    style.setAttribute("type", "text/css")
    document.head.appendChild(style)
  }
}

const removeStyleFromHead = () => {
  if (props.id) {
    const existingStyles = document.querySelectorAll(`[f='${props.id}']`)
    existingStyles.forEach(style => style.remove())
  }
}

const page = computed(() => {
  addStyleToHead()

  const temp = props.template || ""
  const scr = props.script || ''

  return defineAsyncComponent(() =>
      new Promise((resolve) => {
        try {
          if (props.scriptSetup) {
            // Create the component with script setup
            const componentObj = defineComponent({
              template: temp,
              setup() {
                // Create a context object with all Vue APIs
                const vueContext = {
                  // Reactivity
                  ref,
                  reactive,
                  computed,
                  watch,
                  watchEffect,

                  // Lifecycle
                  onMounted,
                  onUnmounted,
                  onUpdated,

                  // Dependency Injection
                  inject,
                  provide,

                  // Refs
                  toRefs,
                  toRef
                }

                try {
                  // Process the script to remove imports and handle setup
                  const processedScript = processScriptForSetup(scr)

                  // Create the setup function with all Vue APIs available
                  const setupCode = `
                  // Make Vue APIs available
                  ${Object.entries(vueContext).map(([key, value]) =>
                      `const ${key} = arguments[0]['${key}'];`
                  ).join('\n')}

                  // User's script
                  ${processedScript}

                  // Collect and return declared variables
                  const result = {};
                  const declaredVars = ${JSON.stringify(extractDeclaredVariables(processedScript))};
                  declaredVars.forEach(varName => {
                    try {
                      if (typeof eval(varName) !== 'undefined') {
                        result[varName] = eval(varName);
                      }
                    } catch(e) {}
                  });
                  return result;
                `

                  const setupFunction = new Function(setupCode)
                  return setupFunction(vueContext)

                } catch (error) {
                  console.error('Error executing user script:', error)
                  return {
                    __error: ref(`Script execution error: ${error.message}`)
                  }
                }
              }
            })

            resolve(componentObj)

          } else {
            // For Options API
            const scriptObj = eval(`(function() {
            return { ${scr} }
          })()`)

            const componentObj = defineComponent({
              template: temp,
              ...scriptObj
            })

            resolve(componentObj)
          }
        } catch (error) {
          console.error('Error creating component:', error)
          resolve(createErrorComponent(error))
        }
      })
  )
})

// Process script to remove imports and prepare for setup
function processScriptForSetup(script) {
  let processed = script

  // Remove Vue imports since we provide them
  processed = processed.replace(/import\s*{[^}]*}\s*from\s*['"]vue['"][\s;]*/g, '')

  // Remove other imports (for now, could handle them differently)
  processed = processed.replace(/import\s+.*?\s+from\s+['"][^'"]+['"][\s;]*/g, '// [import removed]')

  // Handle defineProps and defineEmits
  processed = processed.replace(/defineProps\s*\(/g, 'const props = defineProps(')
  processed = processed.replace(/defineEmits\s*\(/g, 'const emit = defineEmits(')

  return processed.trim()
}

// Extract variable names that should be returned
function extractDeclaredVariables(script) {
  const variables = []

  // Match variable declarations
  const varPatterns = [
    /(?:const|let|var)\s+(\w+)\s*=/g,
    /function\s+(\w+)\s*\(/g,
    /(\w+)\s*:\s*\(\)\s*=>/g // Arrow functions
  ]

  varPatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(script)) !== null) {
      if (match[1] && !match[1].startsWith('_')) {
        variables.push(match[1])
      }
    }
  })

  // Also look for ref, reactive, computed declarations
  const reactivePatterns = [
    /(\w+)\s*=\s*ref\(/,
    /(\w+)\s*=\s*reactive\(/,
    /(\w+)\s*=\s*computed\(/
  ]

  script.split('\n').forEach(line => {
    reactivePatterns.forEach(pattern => {
      const match = line.match(pattern)
      if (match && match[1]) {
        variables.push(match[1])
      }
    })
  })

  return [...new Set(variables)] // Remove duplicates
}

function createErrorComponent(error) {
  return defineComponent({
    name: 'ErrorComponent',
    setup() {
      const errorMsg = ref(error.message)
      return {errorMsg}
    },
    template: `
      <div style="color: #f44336; padding: 20px; background: #ffebee; border-radius: 4px; font-family: 'Courier New', monospace;">
        <div style="font-weight: bold; margin-bottom: 8px;">Script Error:</div>
        <div>{{ errorMsg }}</div>
      </div>
    `
  })
}

onMounted(() => {
  addStyleToHead()
})

onUnmounted(() => {
  removeStyleFromHead()
})

watch(() => props.css, () => {
  addStyleToHead()
})
</script>

