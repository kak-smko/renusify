<template>
  <section>
    <r-meta title="rCodeEditor Component | Renusify"
            description="Document with example for Renusify rCodeEditor component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rCodeEditor Component
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
      "template": "<rCodeEditor \n :runnable=\"runnable\"\n :templateShow=\"templateShow\"\n :scriptShow=\"scriptShow\"\n :cssShow=\"cssShow\"\n :template=\"template\"\n :script=\"script\"\n :css=\"css\"\n :scriptSetup=\"scriptSetup\"\n@update:template=\"log('update:template',$event)\"\n@update:script=\"log('update:script',$event)\"\n@update:css=\"log('update:css',$event)\">\n</rCodeEditor>",
      "script": "import {ref} from 'vue';\n\nconst runnable=ref(null)\nconst templateShow=ref(true)\nconst scriptShow=ref(true)\nconst cssShow=ref(true)\nconst template=ref(null)\nconst script=ref(null)\nconst css=ref(null)\nconst scriptSetup=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "runnable",
      "description": "Enables run functionality for the code editor @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "templateShow",
      "description": "Shows/hides the template section @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "scriptShow",
      "description": "Shows/hides the script section @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "cssShow",
      "description": "Shows/hides the CSS section @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "template",
      "description": "Template code content @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "script",
      "description": "Script code content @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "css",
      "description": "CSS code content @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "scriptSetup",
      "description": "Script code content is setup.",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:template",
      "description": "Emitted when template content changes",
      "params": "@param {String} template - Updated template code"
    },
    {
      "name": "update:script",
      "description": "Emitted when script content changes",
      "params": "@param {String} script - Updated script code"
    },
    {
      "name": "update:css",
      "description": "Emitted when CSS content changes",
      "params": "@param {String} css - Updated CSS code"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>