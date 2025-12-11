<template>
  <section>
    <r-meta title="rRadioInput Component | Renusify"
            description="Document with example for Renusify rRadioInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rRadioInput Component
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
      "template": "<rRadioInput \n :items=\"items\"\n :text=\"text\"\n :rounded=\"rounded\"\n :justValue=\"justValue\"\n :translate=\"translate\"\n v-model=\"modelValue\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rRadioInput>",
      "script": "import {ref} from 'vue';\n\nconst items=ref(() => [])\nconst text=ref('title')\nconst rounded=ref(null)\nconst justValue=ref(null)\nconst translate=ref(null)\nconst modelValue=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "items",
      "description": "Array of radio items (objects or primitives) @type {Array} @default () => [] If objects, each should have at least a 'value' property and optionally a text property If primitives, they will be converted to objects with value and text properties",
      "type": "Array",
      "default": "() => []"
    },
    {
      "name": "text",
      "description": "Property name to use for display text in items @type {String} @default 'title'",
      "type": "String",
      "default": "title"
    },
    {
      "name": "rounded",
      "description": "Use circular radio buttons instead of square @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "justValue",
      "description": "Emit only the value instead of the entire item object @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "translate",
      "description": "Enable translation for item texts @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The selected radio item's model value @type {String|Number|Object}",
      "type": "[String, Number, Object]",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when a radio item is selected",
      "params": "@param {Object|String|Number} value - Selected item or value"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Custom slot for radio item rendering with emit function, index, and item data",
      "props": "emit: emitValue, index: i, item: item"
    }
  ],
  "expose": [],
  "provide": []
}
</script>