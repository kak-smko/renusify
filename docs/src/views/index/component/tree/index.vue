<template>
  <section>
    <r-meta title="rTree Component | Renusify"
            description="Document with example for Renusify rTree component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rTree Component
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
    "Tree usage": {
      "template": "<r-tree style=\"height:600px\" v-model=\"treeData\" :link=\"link\" :searchLink=\"searchLink\" :gen=\"gen\" :selected=\"selected\" :rotate=\"rotate\" :childsName=\"childsName\" :openAll=\"openAll\" :headers=\"headers\" @update:model-Value=\"log(`update:modelValue`,$event)\" @select-node=\"log(`select-node`,$event)\">\n<template v-slot=\"{nodeKey,item}\">\n<r-card class=\"pa-5 title-1 mx-1\">{{nodeKey}}:{{item.name}}</r-card>\n</template>\n</r-tree>",
      "script": "import { ref } from 'vue'\nconst treeData = ref({\n\"0\": {\n\"name\": \"Root\",\n\"childs\": {\n\"1\": {\n\"name\": \"Child 1\",\n\"childs\": {\n\"3\": {\n\"name\": \"Grandchild 1\",\n\"childs\": {\n\"4\": {\n\"name\": \"Great Grandchild 1\",\n\"childs\": {\n\"6\": {\n\"name\": \"Level 5 Node 1\",\n\"childs\": {\n\"7\": {\n\"name\": \"Level 6 Node 1\",\n\"childs\": {},\n},\n\"8\": {\n\"name\": \"Level 6 Node 2\",\n\"childs\": {},\n}\n},\n}\n},\n},\n\"5\": {\n\"name\": \"Great Grandchild 2\",\n\"childs\": {},\n}\n},\n}\n},\n},\n\"2\": {\n\"name\": \"Child 2\",\n\"childs\": {},\n}\n},\n}\n})\nconst link = ref(null)\nconst searchLink = ref(null)\nconst gen = ref(\"0\") // Root node ID\nconst selected = ref(null)\nconst rotate = ref(false)\nconst childsName = ref(\"childs\") // Property name for children\nconst openAll = ref(false)\nconst headers = ref({})\nconst log = (name, event) => {\nconsole.log(name, event)\n}",
      "style": ""
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "Tree data model @type {Object}",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "link",
      "description": "API endpoint URL for fetching tree data @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "searchLink",
      "description": "API endpoint URL for search functionality @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "sortBy",
      "description": "Property name to sort tree nodes by @type {String} @default 'gen'",
      "type": "String",
      "default": "gen"
    },
    {
      "name": "gen",
      "description": "Initial node identifier to load @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "selected",
      "description": "Currently selected node identifier @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "rotate",
      "description": "Rotates the tree layout @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "expand",
      "description": "Expands all tree nodes by default @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "childsName",
      "description": "Property name for child nodes in tree data @type {String} @default 'childs'",
      "type": "String",
      "default": "childs"
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
      "description": "Emitted when tree data changes",
      "params": "@param {Object} data - Updated tree data"
    },
    {
      "name": "select-node",
      "description": "Emitted when a tree node is selected",
      "params": "@param {Object} node - Selected node data"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for custom tree node content\n@binding {Object} item - The tree node item\n@binding {String} nodeKey - The key identifier for the node",
      "props": "item: item, nodeKey: nodeKey"
    }
  ],
  "expose": [],
  "provide": []
}
</script>