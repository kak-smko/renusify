<template>
  <component :is="page"></component>
</template>
<script>
import {defineAsyncComponent} from "vue/dist/vue.esm-bundler.js";

export default {
  name: "r-code-editor-run",
  props: {
    template: String,
    script: String
  },
  computed: {
    page() {
      let temp = this.template || ''
      let scr = this.script || 'name:"test"'
      scr = this.$helper.replacer(scr, '&lt;', '<')
      scr = this.$helper.replacer(scr, '&gt;', '>')
      return defineAsyncComponent(() =>
          new Promise((resolve, reject) => {
            resolve({
              template: temp,
              ...eval('Object({' + scr + '})')
            })
          }))
    }
  }
};
</script>
