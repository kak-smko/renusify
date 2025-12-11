<template>
  <section>
    <r-meta title="rGroupInput Component | Renusify"
            description="Document with example for Renusify rGroupInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rGroupInput Component
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
      "template": "<rGroupInput \n :itemKey=\"itemKey\"\n v-model=\"modelValue\"\n :size=\"size\"\n :disableAdd=\"disableAdd\"\n :translate=\"translate\"\n :template=\"template\"\n :addBtnClass=\"addBtnClass\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@add=\"log('add',$event)\"\n@delete=\"log('delete',$event)\">\n</rGroupInput>",
      "script": "import {ref} from 'vue';\n\nconst itemKey=ref(null)\nconst modelValue=ref(() => [])\nconst size=ref(null)\nconst disableAdd=ref(null)\nconst translate=ref(null)\nconst template=ref(null)\nconst addBtnClass=ref('text-center')\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "itemKey",
      "description": "Key to identify items that should not be deletable @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The model value for the group items (v-model) @type {Array} @default () => []",
      "type": "Array",
      "default": "() => []"
    },
    {
      "name": "size",
      "description": "Maximum number of items allowed @type {Number}",
      "type": "Number",
      "default": "undefined"
    },
    {
      "name": "disableAdd",
      "description": "Disables the add button @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "translate",
      "description": "Enables translation for item keys @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "template",
      "description": "Template configuration for dynamic form generation @type {Object}",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "addBtnClass",
      "description": "CSS class for the add button container @type {String} @default 'text-center'",
      "type": "String",
      "default": "text-center"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the model value changes",
      "params": "@param {Array} items - Updated array of items"
    },
    {
      "name": "add",
      "description": "Emitted when a new item is added",
      "params": "@param {Boolean} true - Indicates an item was added"
    },
    {
      "name": "delete",
      "description": "Emitted when an item is deleted",
      "params": "@param {Number} index - Index of the deleted item"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for custom group item content. Provide disableDel, index, item props.",
      "props": "disableDel: disDel, index: i, item: item"
    }
  ],
  "expose": [],
  "provide": []
}
</script>