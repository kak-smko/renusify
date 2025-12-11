<template>
  <section>
    <r-meta title="rContent Component | Renusify"
            description="Document with example for Renusify rContent component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rContent Component
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
      "template": "<rContent \n :belowHeader=\"belowHeader\"\n :flipped=\"flipped\"\n :moved=\"moved\">\n<template #default>\n<r-container>\n<r-row>\n<r-col class=\"col-4\"> col-1</r-col>\n<r-col class=\"col-4\"> col-2</r-col>\n<r-col class=\"col-4\"> col-3</r-col>\n</r-row>\n</r-container>\n</template>\n</rContent>",
      "script": "import {ref} from 'vue';\n\nconst belowHeader=ref(null)\nconst flipped=ref(null)\nconst moved=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "belowHeader",
      "description": "Adds content below the header @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "flipped",
      "description": "Flips the component orientation @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "moved",
      "description": "Moves the component position @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for main content",
      "example": "<r-container>\n<r-row>\n<r-col class=\"col-4\"> col-1</r-col>\n<r-col class=\"col-4\"> col-2</r-col>\n<r-col class=\"col-4\"> col-3</r-col>\n</r-row>\n</r-container>"
    }
  ],
  "expose": [],
  "provide": []
}
</script>