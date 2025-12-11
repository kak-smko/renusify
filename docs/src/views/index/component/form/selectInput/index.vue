<template>
  <section>
    <r-meta title="rSelectInput Component | Renusify"
            description="Document with example for Renusify rSelectInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rSelectInput Component
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
      "template": "<rSelectInput \n :searchLink=\"searchLink\"\n :type=\"type\"\n :text=\"text\"\n :value=\"value\"\n :disableSearch=\"disableSearch\"\n :items=\"items\"\n v-model=\"modelValue\"\n :tags=\"tags\"\n :multiple=\"multiple\"\n :justValue=\"justValue\"\n :openToTop=\"openToTop\"\n :translate=\"translate\"\n :firstSelect=\"firstSelect\"\n :noFloat=\"noFloat\"\n :modal=\"modal\"\n :auto=\"auto\"\n :headers=\"headers\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@del=\"log('del',$event)\">\n</rSelectInput>",
      "script": "import {ref} from 'vue';\n\nconst searchLink=ref(null)\nconst type=ref('text')\nconst text=ref('name')\nconst value=ref('value')\nconst disableSearch=ref(null)\nconst items=ref(null)\nconst modelValue=ref(null)\nconst tags=ref(null)\nconst multiple=ref(null)\nconst justValue=ref(null)\nconst openToTop=ref(null)\nconst translate=ref(null)\nconst firstSelect=ref(null)\nconst noFloat=ref(null)\nconst modal=ref(null)\nconst auto=ref('modal')\nconst headers=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "searchLink",
      "description": "API endpoint URL for fetching search results @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "type",
      "description": "Input type for the select component @type {String} @default 'text'",
      "type": "String",
      "default": "text"
    },
    {
      "name": "text",
      "description": "Property name for display text in items @type {String} @default 'name'",
      "type": "String",
      "default": "name"
    },
    {
      "name": "value",
      "description": "Property name for value in items @type {String} @default 'value'",
      "type": "String",
      "default": "value"
    },
    {
      "name": "disableSearch",
      "description": "Disable search functionality @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "items",
      "description": "Static array of select items @type {Array}",
      "type": "Array",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The selected value(s) @type {String|Number|Array|Object}",
      "type": "[String, Number, Array, Object]",
      "default": "undefined"
    },
    {
      "name": "tags",
      "description": "Enable tag mode (allow custom values not in items) @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "multiple",
      "description": "Enable multiple selection @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "justValue",
      "description": "Emit only values instead of full objects @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "openToTop",
      "description": "Open dropdown above the input @type {Boolean}",
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
      "name": "firstSelect",
      "description": "Automatically select first item when empty @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "noFloat",
      "description": "Disable floating label @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "modal",
      "description": "Force modal display on all screen sizes @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "auto",
      "description": "Auto display mode based on screen size @type {String} @default 'modal' @validator ['modal', 'float', 'none']",
      "type": "String",
      "default": "modal"
    },
    {
      "name": "headers",
      "description": "Additional headers for API requests @type {Object}",
      "type": "Object",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when selected value(s) change",
      "params": "@param {String|Number|Array|Object} value - Updated selected value(s)"
    },
    {
      "name": "del",
      "description": "Emitted when a chip/tag is deleted",
      "params": "@param {Array} deletedItem - Array containing [index, deletedItem]"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for list item. Provide item prop.",
      "props": "item: item"
    },
    {
      "name": "default",
      "description": "Default slot for list item. Provide item prop.",
      "props": "item: item"
    }
  ],
  "expose": [],
  "provide": []
}
</script>