<template>
  <section>
    <r-meta title="rApp Component | Renusify" description="Document with example for Renusify rApp component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rApp Component
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
      "template": "<rApp \n :id=\"id\"\n :rtl=\"rtl\">\n<template #default>\n<div class=\"color-one pa-12\">\n<r-btn>test</r-btn>\n</div>\n</template>\n</rApp>",
      "script": "import {ref} from 'vue';\n\nconst id=ref('renusify')\nconst rtl=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "id",
      "description": "The ID attribute for the root element",
      "type": "String | Number",
      "default": "renusify"
    },
    {
      "name": "rtl",
      "description": "Controls the text direction (Right-to-Left). If undefined, uses the global RTL setting from Renusify.",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "default",
      "description": "Main content slot for the application wrapper.",
      "example": "<div class=\"color-one pa-12\">\n<r-btn>test</r-btn>\n</div>"
    }
  ],
  "expose": [],
  "provide": []
}
</script>