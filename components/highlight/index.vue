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
<script>
import './style.scss'
import mixin from "./mixin";

export default {
  name: 'highlight',
  mixins: [mixin],
  props: {
    name: String,
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

