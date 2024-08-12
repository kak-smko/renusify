<template>
  <component :is="page"></component>
</template>
<script>
import {defineAsyncComponent} from "vue/dist/vue.esm-bundler.js";

export default {
  name: "r-code-editor-run",
  props: {
    template: String,
    script: String,
    css: String,
    id: String,
  },
  computed: {
    page() {
      if (this.css) {
        let children = document.querySelectorAll(`[f='${this.id}']`);
        if (children) {
          let childArray = Array.prototype.slice.call(children);

          childArray.forEach(function (child) {
            child.parentNode.removeChild(child);
          });
        }
        let s = document.createElement("style");
        s.innerText = this.css;
        s.setAttribute("f", this.id);
        s.setAttribute("type", "text/css");
        window.document.head.append(s);
      }
      let temp = this.template || "";
      let scr = this.script || 'name:"test"';
      return defineAsyncComponent(
          () =>
              new Promise((resolve) => {
                resolve({
                  template: temp,
                  ...eval("Object({" + scr + "})"),
                });
              })
      );
    },
  },
};
</script>
