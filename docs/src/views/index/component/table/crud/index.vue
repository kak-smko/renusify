<template>
  <section>
    <r-meta title="rTableCrud Component | Renusify"
            description="Document with example for Renusify rTableCrud component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rTableCrud Component
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
      "template": "<rTableCrud \n :link=\"link\"\n :actions=\"actions\">\n</rTableCrud>",
      "script": "import {ref} from 'vue';\n\nconst link=ref(null)\nconst actions=ref(() => [])\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "link",
      "description": "API endpoint URL for data operations @type {String} @required",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "actions",
      "description": "Array of custom action buttons configuration @type {Array} @default () => []",
      "type": "Array",
      "default": "() => []"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "form",
      "description": "@slot Slot for custom form rendering\n@binding {Boolean} autoSend - Whether to auto-send form\n@binding {String} method - HTTP method (post/put)\n@binding {Object} modelValue - Edited item data\n@binding {Function} ok - Function to call on successful form submission\n@binding {Object} options - Form field options from table headers\n@binding {String} title - Form title\n@binding {String} url - Form submission URL",
      "props": "autoSend: autoSend, method: method, modelValue: editedItem, ok: ok, options: table.option, title: title, url: url"
    }
  ],
  "expose": [],
  "provide": []
}
</script>