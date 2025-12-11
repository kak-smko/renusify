<template>
  <section id="install" class="body-1">
    <h1 class="display-4 mb-5">Installation</h1>
    <p>
      Getting started with Renusify
      <br/>
      Create your projects easily and quickly. Create whatever is in your mind with Renusify.
    </p>
  </section>
  <section id="vue_cli" class="mt-10 body-1">
    <h2 class="display-4 mb-5">Installation with Vue CLI</h2>
    <p class="color-error br-sm pa-3">
      This version of Renusify works with Vue 3 and is built based on it. For previous versions of Vue.js, it is
      recommended to use older frameworks.
    </p>
    <p class="color-warning br-sm pa-3">
      To learn how to work with Vue CLI, refer to the
      <a class="color-info-text" href="https://cli.vuejs.org/" target="_blank">
        guide
        <r-icon class="mdi-arrow-top-right-thin-circle-outline body-2"></r-icon>
      </a>
      .
    </p>
    <p class="mt-5 mb-2">
      First, create a project with Vue CLI if you don't already have one.
    </p>
    <pre>
vue create my-app
# navigate to new project directory
cd my-app
</pre
>
    <p class="mt-5 mb-2">
      Now that you've created a new project, add Renusify to the project using the following command.
    </p>
    <pre>
npm install renusify
</pre
>

    <p class="mt-5 mb-2">Add the following code to your JavaScript file</p>
    <r-code-editor
        :script="`import { createApp } from &quot;vue&quot;;
import App from &quot;./Index.vue&quot;;
import renusify from &quot;renusify&quot;;
import * as components from &quot;renusify/components&quot;;
import {scroll, title, intersect} from &quot;renusify/directive&quot;;
window.app = createApp(App)
  .use(renusify, {
    rtl: false,
    lang: 'en',
    langs:{
        'en': {
             first_day: 0,
             time_zone_offset: -480,/*Standard timezone offset minutes -07:00*/
             localizeName: 'en-US',
             timeZone: 'America/Los_Angeles',
             rtl: false
         },
         'fa': {
             first_day: 6,
             time_zone_offset: 210,//Standard timezone offset minutes +03:30
             localizeName: 'fa-IR',
             timeZone: 'Asia/Tehran',
             calendar: 'persian',
             rtl: true
         },
    },
    useNotify: false,
    components:components,
    directives: {title, scroll, intersect},
  })
  .mount(&quot;#app&quot;);`"
        :script-show="false"
        :css-show="false"
        :template-show="false"
    ></r-code-editor>

    <p>rtl: Used to make the project Right-to-Left (RTL).</p>
    <p>lang: You can specify the default language of the application.</p>
    <p>
      In the components section, you can enter the list of components you intend to use.
    </p>
    <p>
      In the directives section, you can enter the list of directives you intend to use.
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