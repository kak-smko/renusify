<template>
  <div :class="`${$r.prefix}highlight highlight-lang-${lang}`" v-html='txt'></div>
</template>
<script>
import './style.scss'
import mixin from "./mixin";

export default {
  name: 'highlight',
  mixins: [mixin],
  props: {
    src: String,
    hideLineNumbers: Boolean,
    lang: {
      type: String,
      validator: function (value) {
        return ['asm', 'bash', 'bf', 'c', 'css', 'csv', 'diff', 'docker', 'git', 'go', 'html', 'http', 'ini', 'java', 'js', 'jsdoc', 'json', 'log', 'lua', 'make', 'pl', 'plain', 'py', 'regex', 'rs', 'sql', 'todo', 'toml', 'ts', 'uri', 'xml', 'yaml'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      txt: '',
    }
  },
  async created() {
    this.txt = await this.highlight(this.src, this.lang, this.hideLineNumbers);
  }
}
</script>

