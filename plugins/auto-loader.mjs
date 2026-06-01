import fs from 'fs'
import path from 'path'

export default function renusifyAutoPlugin(options = {}) {
  const { prefix = 'r', debug = false } = options

  const state = {
    usedComponents: new Set(),
    usedDirectives: new Set(),
    componentsMap: new Map(),
    directivesMap: new Map(),
    rootDir: '',
  }


  function parseExports(filePath, exclude = []) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      const clean = content
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')

      const regex = /export\s+\*\s+as\s+([a-zA-Z_]\w*)\s+from\s+['"]([^'"]+)['"]/g
      const map = new Map()
      let m
      while ((m = regex.exec(clean)) !== null) {
        const [, name, relPath] = m
        if (exclude.includes(name)) continue
        let p = relPath.replace(/^\.\//, '')
        if (!p.match(/\.(js|vue|ts|mjs)$/)) p = `${p}/index.js`
        map.set(name, p)
      }
      return map
    } catch (err) {
      console.warn(`[renusify-auto] Could not parse ${filePath}:`, err.message)
      return new Map()
    }
  }


  function kebab2camel(s) {
    return s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
  }


  function scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      const tmplMatch = content.match(/<template(?:\s[^>]*)?>([\s\S]*?)<\/template>/)
      if (!tmplMatch) return

      const tmpl = tmplMatch[1]

      const tagRe = /<\s*\/?([a-zA-Z][a-zA-Z0-9-]*)/g
      let m
      while ((m = tagRe.exec(tmpl)) !== null) {
        const tag = m[1]
        if (!tag.startsWith(prefix)) continue
        const camel = kebab2camel(tag)
        if (state.componentsMap.has(camel)) state.usedComponents.add(camel)
        else if (state.componentsMap.has(tag)) state.usedComponents.add(tag)
      }

      const dirRe = /\bv-([a-zA-Z][a-zA-Z0-9-]*)/g
      const builtins = new Set([
        'model', 'if', 'else', 'else-if', 'for', 'show', 'bind', 'on',
        'slot', 'text', 'html', 'cloak', 'once', 'memo', 'pre'
      ])

      while ((m = dirRe.exec(tmpl)) !== null) {
        const d = m[1]
        if (builtins.has(d)) continue
        const camel = kebab2camel(d)
        const candidates = [d, camel, `v${camel.charAt(0).toUpperCase()}${camel.slice(1)}`]
        for (const c of candidates) {
          if (state.directivesMap.has(c)) {
            state.usedDirectives.add(c)
            break
          }
        }
      }
    } catch {
      // ignore
    }
  }


  function scanDirSync(dir) {
    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (['node_modules', 'dist', '.git', '.nuxt', '.output'].includes(entry.name)) continue
        scanDirSync(full)
      } else if (entry.name.endsWith('.vue')) {
        scanFile(full)
      }
    }
  }


   function generateImportStatements() {
     const comps = [...state.usedComponents].sort()
     const dirs = [...state.usedDirectives].sort()
 
     if (comps.length === 0 && dirs.length === 0) return ''
 
     let code = '\n'
     if (comps.length > 0) {
       code += `import {\n  ${comps.join(',\n  ')}\n} from 'renusify/components/index.js'\n`
     }
     if (dirs.length > 0) {
       const dirNames = dirs.map(name => {
         if (name.startsWith('v') || name.startsWith('V')) {
           return name.charAt(1).toLowerCase() + name.slice(2)
         }
         return name
       })
       code += `import { ${dirNames.join(', ')} } from 'renusify/directive/index.js'\n`
     }
 
     return code
   }


  function generateComponentsObject() {
    const comps = [...state.usedComponents].sort()
    if (comps.length === 0) return null
    return `components: {\n      ${comps.join(',\n      ')}\n    }`
  }


  function generateDirectivesObject() {
    const dirs = [...state.usedDirectives].sort()
    if (dirs.length === 0) return null
    const dirNames = dirs.map(name => {
      if (name.startsWith('v') || name.startsWith('V')) {
        return name.charAt(1).toLowerCase() + name.slice(2)
      }
      return name
    })
    return `directives: { ${dirNames.join(', ')} }`
  }

  return {
    name: 'vite-plugin-renusify-auto',
    enforce: 'pre',

    configResolved(config) {
      state.rootDir = config.root
      const renusifyPath = path.join(config.root, 'node_modules/renusify')

      state.componentsMap = parseExports(
        path.join(renusifyPath, 'components/index.js'),
        ['_register']
      )
      state.directivesMap = parseExports(
        path.join(renusifyPath, 'directive/index.js'),
        ['_registers']
      )

      if (config.command === 'serve') {
        state.usedComponents = new Set(state.componentsMap.keys())
        state.usedDirectives = new Set(state.directivesMap.keys())
        if (debug) {
          console.log(`[renusify-auto] Dev mode: ALL ${state.componentsMap.size} components, ${state.directivesMap.size} directives`)
        }
      } else {
        scanDirSync(path.join(config.root, 'src'))
        if (debug) {
          console.log(`[renusify-auto] Build mode: ${state.usedComponents.size} components, ${state.usedDirectives.size} directives`)
          console.log('   Components:', [...state.usedComponents].join(', '))
          console.log('   Directives:', [...state.usedDirectives].join(', '))
        }
      }
    },

    transform(code, id) {
      if (!/main\.(js|ts)$/.test(id)) return null
      if (id.includes('node_modules')) return null

      let newCode = code
      let modified = false

      const importStmts = generateImportStatements()
      if (importStmts) {
        const importRegex = /^import\s+[^;]+;?\s*$/gm
        const allImports = code.match(importRegex)
        
        if (allImports && allImports.length > 0) {
          const lastImport = allImports[allImports.length - 1]
          const lastImportIndex = code.lastIndexOf(lastImport)
          const insertPos = lastImportIndex + lastImport.length
          newCode = newCode.slice(0, insertPos) + importStmts + newCode.slice(insertPos)
        } else {
          newCode = importStmts + '\n' + newCode
        }
        modified = true
      }

      const renusifyRegex = /\.use\s*\(\s*renusify\s*,\s*\{/
      const useMatch = newCode.match(renusifyRegex)

      if (useMatch) {
        const matchIndex = useMatch.index
        const startOfOptions = matchIndex + useMatch[0].length

        let braceCount = 1
        let i = startOfOptions
        while (i < newCode.length && braceCount > 0) {
          if (newCode[i] === '{') braceCount++
          else if (newCode[i] === '}') braceCount--
          if (braceCount > 0) i++
        }

        if (braceCount === 0) {
          const endOfOptions = i
          const optionsContent = newCode.slice(startOfOptions, endOfOptions)
          let cleanedOptions = optionsContent

          cleanedOptions = removeProperty(cleanedOptions, 'components')
          cleanedOptions = removeProperty(cleanedOptions, 'directives')

          cleanedOptions = cleanedOptions.replace(/,(\s*)}/g, '$1}')
          cleanedOptions = cleanedOptions.trim()

          const componentsObj = generateComponentsObject()
          const directivesObj = generateDirectivesObject()

          let newOptionsContent = cleanedOptions

          if (componentsObj || directivesObj) {
            const needsComma = newOptionsContent.trim().length > 0 && !newOptionsContent.trim().endsWith(',')
            const comma = needsComma ? ',' : ''
            
            let additions = ''
            if (componentsObj) additions += '\n    ' + componentsObj
            if (directivesObj) additions += (additions ? ',' : '') + '\n    ' + directivesObj

            if (newOptionsContent.trim().length === 0) {
              newOptionsContent = additions + '\n  '
            } else {
              newOptionsContent = newOptionsContent + comma + additions + '\n  '
            }
          }

          newCode = newCode.slice(0, startOfOptions) + newOptionsContent + newCode.slice(endOfOptions)
          modified = true
        }
      }

      if (modified) {
        if (debug) {
          console.log(`[renusify-auto] Transformed ${path.basename(id)}`)
        }
        return { code: newCode, map: null }
      }

      return null
    },
  }
}

function removeProperty(optionsStr, propName) {
  const propRegex = new RegExp(`,?\\s*${propName}\\s*:\\s*`)
  const match = propRegex.exec(optionsStr)
  
  if (!match) return optionsStr

  const startIndex = match.index
  const valueStart = startIndex + match[0].length

  
  let endIndex = valueStart
  const firstChar = optionsStr[valueStart]

  if (firstChar === '{') {
    
    let braceCount = 1
    let i = valueStart + 1
    while (i < optionsStr.length && braceCount > 0) {
      if (optionsStr[i] === '{') braceCount++
      else if (optionsStr[i] === '}') braceCount--
      i++
    }
    endIndex = i
  } else if (firstChar === '[') {
    let bracketCount = 1
    let i = valueStart + 1
    while (i < optionsStr.length && bracketCount > 0) {
      if (optionsStr[i] === '[') bracketCount++
      else if (optionsStr[i] === ']') bracketCount--
      i++
    }
    endIndex = i
  } else {
    let i = valueStart
    while (i < optionsStr.length && optionsStr[i] !== ',' && optionsStr[i] !== '}') {
      i++
    }
    endIndex = i
  }

  if (endIndex < optionsStr.length && optionsStr[endIndex] === ',') {
    endIndex++
  }

  return optionsStr.slice(0, startIndex) + optionsStr.slice(endIndex)
}