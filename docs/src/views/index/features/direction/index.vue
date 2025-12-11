<template>
  <section>
    <h1 class="display-4">Bidirectional (rtl/ltr)</h1>
    <p class="mt-5 title">
      Renusify is designed for both right-to-left and left-to-right directions. You can set it by default or change the
      direction while the application is running.
    </p>
    <r-code-editor
        :script="`import { createApp } from &quot;vue&quot;;
import App from &quot;./Index.vue&quot;;
import renusify from &quot;renusify&quot;;

window.app = createApp(App)
  .use(renusify, {
    rtl: true //or false
  })
  .mount(&quot;#app&quot;);`"
        :script-show="false"
        :css-show="false"
        :template-show="false"
    >
    </r-code-editor>
    <p class="mt-5">
      To change the direction from within the application, you can set the global variable $r.rtl to true or false.
    </p>
    <p class="caption">Click the run button to execute.</p>
    <r-code-editor
        :script="`methods: {
    change() {
       this.$r.rtl = ! this.$r.rtl
    }
}`"
        :template="`<div class=&quot;mt-5&quot;>
   <r-switch-input v-model=&quot;$r.rtl&quot; label=&quot;rtl&quot;></r-switch-input>
   <br>
   <r-btn @click=&quot;change&quot; class=&quot;color-success&quot;>change</r-btn>
</div>`"
        runnable
    >
    </r-code-editor>
  </section>
</template>

<script>
export default {
  name: "direction",
  data() {
    return {};
  },
};
</script>