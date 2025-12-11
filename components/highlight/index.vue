<template>
  <div :class="`${$r.prefix}highlight`">
    <div :class="{'highlight-name':name}" class="title-3 font-weight-bold mb-3">
      <div class="d-flex v-top">{{ name }}
        <r-spacer></r-spacer>
        <r-btn
            icon
            text
            @click.prevent="$helper.copy(src)"
        >
          <r-icon v-html="$r.icons.copy"></r-icon>
        </r-btn>
      </div>
    </div>
    <div :class="`highlight-code highlight-lang-${lang}`" v-html='txt'></div>
  </div>
</template>

<script setup>
import {ref, onMounted, inject} from 'vue'
import {useHighlight} from './useHighlight.js'
import './style.scss'

const props = defineProps({
  /**
   * Name or identifier for the code block
   * Optional name for the code snippet, can be used for labeling or referencing
   */
  name: String,

  /**
   * inline code content
   */
  src: String,

  /**
   * Whether to hide line numbers
   */
  hideLineNumbers: Boolean,

  /**
   * Programming language for syntax highlighting
   */
  lang: {
    type: String,
    validator: function (value) {
      return ['asm', 'bash', 'bf', 'c', 'css', 'csv', 'diff', 'docker', 'git', 'go', 'html', 'http', 'ini', 'java', 'js', 'jsdoc', 'json', 'log', 'lua', 'make', 'pl', 'plain', 'py', 'regex', 'rs', 'sql', 'todo', 'toml', 'ts', 'uri', 'xml', 'yaml'].includes(value)
    }
  }
})

const $r = inject('$r')
const $helper = inject('$helper')

const {highlight} = useHighlight()

const txt = ref('')

onMounted(async () => {
  txt.value = await highlight(props.src, props.lang, props.hideLineNumbers)
})
</script>
