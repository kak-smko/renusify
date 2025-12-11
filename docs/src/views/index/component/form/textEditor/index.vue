<template>
  <section>
    <r-meta title="rTextEditor Component | Renusify"
            description="Document with example for Renusify rTextEditor component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rTextEditor Component
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
      "template": "<rTextEditor \n :uploadLink=\"uploadLink\"\n v-model=\"modelValue\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rTextEditor>",
      "script": "import {ref} from 'vue';\n\nconst uploadLink=ref(null)\nconst modelValue=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "uploadLink",
      "description": "API endpoint URL for uploading media files (images/videos) @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The editor's model value (object with text and files or plain string) @type {Object|String} @default { text: '', files: [] }",
      "type": "",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when editor content changes .text - HTML content .files - Array of uploaded file URLs",
      "params": "@param {Object} value - Updated editor value with text and files\n@param {String} value.text - HTML content\n@param {Array} value.files - Array of uploaded file URLs"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>