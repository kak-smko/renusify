<template>
  <section>
    <r-meta title="rTable Component | Renusify"
            description="Document with example for Renusify rTable component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rTable Component
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
    "Table usage": {
      "template": "<r-table\n:transition=\"transition\"\n:key-Item=\"keyItem\"\n:thin=\"thin\"\n:responsive=\"responsive\"\n:translate=\"translate\"\n:editable=\"editable\"\n:stripped=\"stripped\"\n:bordered=\"bordered\"\n:sortable=\"sortable\"\n:fixed-Header=\"fixedHeader\"\n:fixed-First-Column=\"fixedFirstColumn\"\n:headers=\"headers\"\n:items=\"items\"\n></r-table>",
      "script": "import { ref } from 'vue'\nconst transition = ref('table-row')\nconst keyItem = ref(null)\nconst thin = ref(false)\nconst responsive = ref(false)\nconst translate = ref(false)\nconst editable = ref(true)\nconst stripped = ref(true)\nconst borderd = ref(false)\nconst sortable = ref({\nid: true,\nname: true,\nage: false,\nskill: 'vuejs'\n})\nconst fixedHeader = ref(false)\nconst fixedFirstColumn = ref(false)\nconst headers = ref([\n{ text: 'id', value: 'id' },\n{ text: 'name', value: 'name' },\n{ text: 'lastname', value: 'lastname' },\n{ text: 'age', value: 'age' },\n{ text: 'skill', value: 'skill' }\n])\nconst items = ref([\n{ id: 1, name: 'Smko', lastname: 'Bzd', age: 29, skill: { vuejs: 20, python: 25 } },\n{ id: 2, name: 'Noah', lastname: 'Ava', age: 23, skill: { vuejs: 18, python: 32 } },\n{ id: 3, name: 'James', lastname: 'Barr', age: 18, skill: { vuejs: 45, python: 25 } },\n{ id: 4, name: 'William', lastname: 'Emma', age: 30, skill: { vuejs: 30, python: 50 } },\n{ id: 5, name: 'Liam', lastname: 'Emma', age: 53, skill: { vuejs: 15, python: 20 } }\n])",
      "style": ""
    }
  },
  "props": [
    {
      "name": "transition",
      "description": "CSS transition name for table rows @type {String} @default 'table-row'",
      "type": "String",
      "default": "table-row"
    },
    {
      "name": "keyItem",
      "description": "Key property or function to generate unique row keys @type {String|Function}",
      "type": "[String, Function]",
      "default": "undefined"
    },
    {
      "name": "thin",
      "description": "Applies thin row styling @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "responsive",
      "description": "Enables responsive column hiding on small screens @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "translate",
      "description": "Enables text translation for header texts @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "editable",
      "description": "Enables column configuration editing @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "stripped",
      "description": "Applies stripped row styling @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "bordered",
      "description": "Applies bordered styling @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "sortable",
      "description": "Sorting configuration object mapping column values to sortable keys @type {Object}",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "fixedHeader",
      "description": "Enables fixed header @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "fixedFirstColumn",
      "description": "Enables fixed first column @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "headers",
      "description": "Array of header configuration objects @type {Array}",
      "type": "Array",
      "default": "undefined"
    },
    {
      "name": "items",
      "description": "Array of data items for table rows @type {Array}",
      "type": "Array",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "sort",
      "description": "Emitted when table sorting changes .key - Column key being sorted .asc - Whether sorting is ascending",
      "params": "@param {Object} sort - Sorting information\n@param {String} sort.key - Column key being sorted\n@param {Boolean} sort.asc - Whether sorting is ascending"
    }
  ],
  "slots": [
    {
      "name": "header",
      "description": "@slot Slot for custom header rendering\n@binding {Array} header - Table header configuration",
      "props": "header: th"
    },
    {
      "name": "row",
      "description": "Slot for custom row rendering\n@binding {*} item - Row data item\n@binding {Function} open - Function to toggle row expansion\n@binding {Number|null} opened - Currently opened row index\n@binding {Function} show - Function to check if expand button should be shown\n@binding {Array} th - Table header configuration",
      "props": "key: key, item: item, open: open, opened: opened, show: show, th: th"
    },
    {
      "name": "default",
      "description": "Dynamic slot for individual cell content, named 'td-[value.value]'\n@binding {*} item - Row data item\n@binding {Object} value - Column configuration",
      "props": "item: item, value: value"
    }
  ],
  "expose": [],
  "provide": []
}
</script>