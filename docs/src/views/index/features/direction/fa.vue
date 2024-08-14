<template>
  <section>
    <h1 class="display-4">دوجهته (rtl/ltr)</h1>
    <p class="mt-5 title">
      رنوسیفای برای هر دو جهت راست به چپ و چپ به راست طراحی شده است. شما می
      توانید به صورت پیش فرض آن را مشخص کنید یا در حین اجرای برنامه جهت را عوض
      کنید.
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
        :style-show="false"
        :template-show="false"
    >
    </r-code-editor>
    <p class="mt-5">
      برای تغییر جهت از داخل برنامه می توانید متغیر عمومی r.rtl$ را برابر true
      یا false قرار دهید.
    </p>
    <p class="caption">دکمه run را جهت اجرا بزنید.</p>
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

<style lang="scss">
@import "~renusify/style/include";
</style>
