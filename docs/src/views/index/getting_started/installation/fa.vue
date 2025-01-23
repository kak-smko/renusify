<template>
  <section id="install" class="body-1">
    <h1 class="display-4 mb-5">نصب</h1>
    <p>
      شروع کار با رنوسیفای
      <br/>
      به سهولت و سرعت پروژه هایتان را ایجاد کنید. هرآنچه در ذهنت هست با رنوسیفای
      خلق بکن.
    </p>
  </section>
  <section id="vue_cli" class="mt-10 body-1">
    <h2 class="display-4 mb-5">نصب با vue cli</h2>
    <p class="color-error br-sm pa-3">
      این ورژن از رنوسیفای با vue3 کار می کند و بر اساس آن نوشته شده است. برای
      ورژن های قبلی vuejs از فریمورک های قدیمی تر پیشنهاد می شود استفاده کنید.
    </p>
    <p class="color-warning br-sm pa-3">
      برای آموزش نحوه کار با vue cli به
      <a class="color-info-text" href="https://cli.vuejs.org/" target="_blank">
        راهنما
        <r-icon class="mdi-arrow-top-right-thin-circle-outline body-2"></r-icon>
      </a>
      مراجعه کنید.
    </p>
    <p class="mt-5 mb-2">
      در ابتدا یک پروژه با Vue cli ایجاد کنید در صورتی که پروژه ای ندارید.
    </p>
    <pre>
vue create my-app
# navigate to new project directory
cd my-app
</pre
>
    <p class="mt-5 mb-2">
      اکنون که یک پروژه جدید ایجاد کردید با استفاده از دستور زیر رنوسیفای را به
      پروژه اضافه کنید.
    </p>
    <pre>
npm install renusify
</pre
>

    <p class="mt-5 mb-2">به فایل جاوااسکریپت کد زیر را اضافه کنید</p>
    <r-code-editor
        :script="`import { createApp } from &quot;vue&quot;;
import App from &quot;./Index.vue&quot;;
import renusify from &quot;renusify&quot;;
import * as components from &quot;renusify/components&quot;;
import {scroll, title, intersect} from &quot;renusify/directive&quot;;
window.app = createApp(App)
  .use(renusify, {
    rtl: false,
    inputs: {tile: false},
    lang: 'en',
    langs:{
        'en': {
             first_day: 0,
             time_zone_offset: -480,/*Standard timezone offset minutes -07:00*/
             daylight_saving_time: true,
             localizeName: 'en-US',
             timeZone: 'America/Los_Angeles',
             rtl: false
         },
         'fa': {
             first_day: 6,
             time_zone_offset: 210,//Standard timezone offset minutes +03:30
             daylight_saving_time: false,
             localizeName: 'fa-IR',
             timeZone: 'Asia/Tehran',
             calendar: 'persian',
             rtl: true
         },
    },
    autoAddTranslate: true,
    useNotify: false,
    package: 'index',
    components:components,
    directives: {title, scroll, intersect},
  })
  .mount(&quot;#app&quot;);`"
        :script-show="false"
        :style-show="false"
        :template-show="false"
    ></r-code-editor>

    <p>rtl: به منظور راست به چپ کردن پروژه به کار می رود.</p>
    <p>lang: می توان زبان پیشفرض برنامه را مشخص کرد.</p>
    <p>
      در قسمت components می توانید لیست کمپوننت هایی که قصد استفاده دارید را
      وارد کنید.
    </p>
    <p>
      در قسمت directives می توانید لیست دایرکتیوهایی که قصد استفاده دارید را
      وارد کنید.
    </p>
  </section>
</template>

<script>
export default {
  name: "installation",
  data() {
    return {};
  },
};
</script>

