<template>
  <section>
    <r-meta title="rJsonInput Component | Renusify"
            description="Document with example for Renusify rJsonInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rJsonInput Component
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
      "template": "<rJsonInput \n :keyLabel=\"keyLabel\"\n :valueLabel=\"valueLabel\"\n v-model=\"modelValue\"\n :valueType=\"valueType\"\n :template=\"template\"\n :baseArray=\"baseArray\"\n :disableAdd=\"disableAdd\"\n :disableEditKey=\"disableEditKey\"\n :disableDel=\"disableDel\"\n :translate=\"translate\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rJsonInput>",
      "script": "import {ref} from 'vue';\n\nconst keyLabel=ref('key')\nconst valueLabel=ref('value')\nconst modelValue=ref(null)\nconst valueType=ref(null)\nconst template=ref(null)\nconst baseArray=ref(null)\nconst disableAdd=ref(null)\nconst disableEditKey=ref(null)\nconst disableDel=ref(null)\nconst translate=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "keyLabel",
      "description": "Label text for the key input field @type {String} @default 'key'",
      "type": "String",
      "default": "key"
    },
    {
      "name": "valueLabel",
      "description": "Label text for the value input field @type {String} @default 'value'",
      "type": "String",
      "default": "value"
    },
    {
      "name": "modelValue",
      "description": "The JSON data model value (object or array) @type {Object|Array}",
      "type": "[Object, Array]",
      "default": "undefined"
    },
    {
      "name": "valueType",
      "description": "Fixed value type for all items when specified @type {String} @validator ['text', 'number', 'boolean']",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "template",
      "description": "Template object for new items when adding @type {Object}",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "baseArray",
      "description": "Treat the model value as an array base @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "disableAdd",
      "description": "Disable the ability to add new items @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "disableEditKey",
      "description": "Disable the edit key toggle button @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "disableDel",
      "description": "Disable the ability to delete items @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "translate",
      "description": "Enable translation for UI texts @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the JSON data changes",
      "params": "@param {Object|Array} value - The updated JSON data"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Custom slot for add form with add function and info object",
      "props": "add: add, info: info"
    }
  ],
  "expose": [],
  "provide": []
}
</script>