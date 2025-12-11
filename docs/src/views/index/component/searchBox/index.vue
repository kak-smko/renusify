<template>
  <section>
    <r-meta title="rSearchBox Component | Renusify"
            description="Document with example for Renusify rSearchBox component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rSearchBox Component
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
      "template": "<rSearchBox \n :closable=\"closable\"\n :notFoundMsg=\"notFoundMsg\"\n :label=\"label\"\n :url=\"url\"\n :btnAttr=\"btnAttr\"\n :query=\"query\"\n v-model=\"modelValue\"\n :noOverlay=\"noOverlay\"\n :openToTop=\"openToTop\"\n :categories=\"categories\"\n :headers=\"headers\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@select=\"log('select',$event)\">\n</rSearchBox>",
      "script": "import {ref} from 'vue';\n\nconst closable=ref(null)\nconst notFoundMsg=ref('Can't Find Anything :(')\nconst label=ref(null)\nconst url=ref(null)\nconst btnAttr=ref(null)\nconst query=ref('search')\nconst modelValue=ref(null)\nconst noOverlay=ref(null)\nconst openToTop=ref(null)\nconst categories=ref(null)\nconst headers=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "closable",
      "description": "Enables closable mode with toggle button @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "notFoundMsg",
      "description": "Message shown when no search results are found @type {String} @default \"Can't Find Anything :(\"",
      "type": "String",
      "default": "Can't Find Anything :("
    },
    {
      "name": "label",
      "description": "Placeholder text for the search input @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "url",
      "description": "API endpoint URL for search requests @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "btnAttr",
      "description": "Attributes passed to the toggle button in closable mode @type {Object}",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "query",
      "description": "Query parameter name for the search term @type {String} @default \"search\"",
      "type": "String",
      "default": "search"
    },
    {
      "name": "modelValue",
      "description": "Current search value (v-model) @type {String|Number}",
      "type": "[String, Number]",
      "default": "undefined"
    },
    {
      "name": "noOverlay",
      "description": "Disables the overlay/backdrop @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "openToTop",
      "description": "Opens search results dropdown above the input instead of below @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "categories",
      "description": "Array of category items for search filtering @type {Array}",
      "type": "Array",
      "default": "undefined"
    },
    {
      "name": "headers",
      "description": "Additional HTTP headers for search requests @type {Object}",
      "type": "Object",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when search value changes (v-model)",
      "params": "@param {String|Number} value - New search value"
    },
    {
      "name": "select",
      "description": "Emitted when a search result item is selected",
      "params": "@param {*} item - Selected search result"
    }
  ],
  "slots": [
    {
      "name": "icon",
      "description": "Slot for custom toggle button icon"
    },
    {
      "name": "default",
      "description": "Slot for custom search result item rendering. Provide item prop - The search result item",
      "props": "item: item"
    }
  ],
  "expose": [],
  "provide": []
}
</script>