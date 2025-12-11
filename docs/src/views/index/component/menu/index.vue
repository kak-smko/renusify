<template>
  <section>
    <r-meta title="rMenu Component | Renusify"
            description="Document with example for Renusify rMenu component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rMenu Component
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
    "Menu usage": {
      "template": "<r-menu\nv-model=\"modelValue\"\n:label=\"modelValue?modelValue.name:label\"\n:icon=\"icon\"\n:value=\"value\"\n:just-Value=\"justValue\"\n:reverse=\"reverse\"\n:overlay=\"overlay\"\n:items=\"items\"\n@update:model-Value=\"log(`update:modelValue`,$event)\" ></r-menu>",
      "script": "import { ref } from 'vue'\nconst modelValue=ref(null)\nconst icon=ref(null)\nconst label=ref(\"label\")\nconst value=ref(\"value\")\nconst justValue=ref(false)\nconst reverse=ref(false)\nconst overlay=ref(false)\nconst items=ref([\n{ name: `home`,value:1 },\n{ name: `blog`,value:2 },\n{ name: `contact`,value:3 },\n{ name: `about`,value:4 },\n])\nconst log=(name,e)=>{\nconsole.log(name,e)\n}",
      "style": ""
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "Currently selected value (v-model) @model @type {String|Number|Object}",
      "type": "String | Number | Object",
      "default": "undefined"
    },
    {
      "name": "label",
      "description": "Menu label text @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "icon",
      "description": "Custom icon for the open button @type {String} @default Chevron down icon from Renusify icons",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "value",
      "description": "Property name to use as value key in item objects @type {String} @default 'value'",
      "type": "String",
      "default": "value"
    },
    {
      "name": "justValue",
      "description": "If true, emits only the value property instead of the whole item object @type {Boolean} @default false",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "reverse",
      "description": "If true, reverses the menu positioning @type {Boolean} @default false",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "overlay",
      "description": "If true, menu overlays the trigger instead of pushing content down @type {Boolean} @default false",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "items",
      "description": "Array of menu items Can be array of objects or primitives (strings/numbers) @type {Array} @example // Array of objects [{ value: 1, name: 'Option 1' }, { value: 2, name: 'Option 2' }] // Array of primitives ['Option 1', 'Option 2']",
      "type": "Array",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when selected value changes @event update:modelValue",
      "params": "@param {String|Number|Object} value - Selected value"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Header Navigation Menu Icons",
      "props": "item: item"
    }
  ],
  "expose": [],
  "provide": []
}
</script>