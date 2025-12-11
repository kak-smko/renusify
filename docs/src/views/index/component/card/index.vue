<template>
  <section>
    <r-meta title="rCard Component | Renusify"
            description="Document with example for Renusify rCard component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rCard Component
      </h1>
    </div>
    <table-props :items="info.props"></table-props>
    <table-events :items="info.emits"></table-events>
    <table-provide :items="info.provide"></table-provide>
    <table-expose :items="info.expose"></table-expose>
    <table-slots :items="info.slots"></table-slots>
  </section>
  <br/>
  <section v-for="(item,i) in info.example" :key="i">
    <div class="title-1">{{ i }}</div>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        scriptSetup
        :script='item.script'
        :template='item.template'
        :css='item.style'
    >
    </r-code-editor>
  </section>
</template>
<script setup>
const info = {
  "example": {
    "basic usage": {
      "template": "<rCard \n :flat=\"flat\"\n :outlined=\"outlined\"\n :isRipple=\"isRipple\"\n :activeClass=\"activeClass\"\n :disabled=\"disabled\"\n :exactActiveClass=\"exactActiveClass\"\n :link=\"link\"\n :href=\"href\"\n :to=\"to\"\n :tag=\"tag\"\n :target=\"target\">\n<template #default>\n<div class=pa-5>\n<div class=\"title-1 color-one\">title</div>\n<div class=\"mt-5\">body description</div>\n</div>\n</template>\n</rCard>",
      "script": "import {ref} from 'vue';\n\nconst flat=ref(null)\nconst outlined=ref(null)\nconst isRipple=ref(true)\nconst activeClass=ref(null)\nconst disabled=ref(null)\nconst exactActiveClass=ref(null)\nconst link=ref(null)\nconst href=ref(null)\nconst to=ref(null)\nconst tag=ref(null)\nconst target=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "flat",
      "description": "Removes elevation and background color @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "outlined",
      "description": "Applies outlined border style @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "isRipple",
      "description": "Enables ripple effect on click @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "activeClass",
      "description": "Custom class for active state @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "disabled",
      "description": "Disables the card @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "exactActiveClass",
      "description": "Custom class for exact active state @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "link",
      "description": "Applies link styling @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "href",
      "description": "URL for link card @type {String|Object}",
      "type": "[String, Object]",
      "default": "undefined"
    },
    {
      "name": "to",
      "description": "Route location for vue-router @type {String|Object}",
      "type": "[String, Object]",
      "default": "undefined"
    },
    {
      "name": "tag",
      "description": "HTML tag to use for card element @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "target",
      "description": "Target attribute for links @type {String}",
      "type": "String",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for card content",
      "example": "<div class=pa-5>\n<div class=\"title-1 color-one\">title</div>\n<div class=\"mt-5\">body description</div>\n</div>"
    }
  ],
  "expose": [],
  "provide": []
}
</script>