<template>
  <section>
    <r-meta title="rFileInput Component | Renusify"
            description="Document with example for Renusify rFileInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rFileInput Component
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
      "template": "<rFileInput \n :uploadLink=\"uploadLink\"\n :accept=\"accept\"\n :size=\"size\"\n :wPH=\"wPH\"\n :maxFileSize=\"maxFileSize\"\n v-model=\"modelValue\"\n :meta=\"meta\"\n :metaRequired=\"metaRequired\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@add=\"log('add',$event)\">\n</rFileInput>",
      "script": "import {ref} from 'vue';\n\nconst uploadLink=ref(null)\nconst accept=ref('*')\nconst size=ref(3)\nconst wPH=ref(null)\nconst maxFileSize=ref(null)\nconst modelValue=ref(() => [])\nconst meta=ref(null)\nconst metaRequired=ref(true)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "uploadLink",
      "description": "API endpoint URL for file upload @type {String} @required",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "accept",
      "description": "Accepted file types (MIME types or extensions) @type {String} @default '*'",
      "type": "String",
      "default": "*"
    },
    {
      "name": "size",
      "description": "Number of files allowed to upload simultaneously @type {Number} @default 3",
      "type": "Number",
      "default": "3"
    },
    {
      "name": "wPH",
      "description": "Width/Height requirements for images @type {Number|String|Array}",
      "type": "[Number, String, Array]",
      "default": "undefined"
    },
    {
      "name": "maxFileSize",
      "description": "Maximum file size in bytes @type {Number}",
      "type": "Number",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The model value for uploaded files (v-model) @type {Array} @default () => []",
      "type": "Array",
      "default": "() => []"
    },
    {
      "name": "meta",
      "description": "Additional metadata fields for files @type {Array}",
      "type": "Array",
      "default": "undefined"
    },
    {
      "name": "metaRequired",
      "description": "Whether metadata is required for each file @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the uploaded files array changes",
      "params": "@param {Array} files - Array of uploaded file links/objects"
    },
    {
      "name": "add",
      "description": "Emitted when a new file is added",
      "params": "@param {Object} file - The added file object"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>