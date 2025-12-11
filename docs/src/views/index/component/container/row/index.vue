<template>
  <section>
    <r-meta title="rRow Component | Renusify" description="Document with example for Renusify rRow component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rRow Component
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
      "template": "<rRow \n :dense=\"dense\"\n :grid=\"grid\"\n :noGutters=\"noGutters\">\n<template #default>\n<r-col class=\"col-4\"> col-1</r-col>\n<r-col class=\"col-4\"> col-2</r-col>\n<r-col class=\"col-4\"> col-3</r-col>\n</template>\n</rRow>",
      "script": "import {ref} from 'vue';\n\nconst dense=ref(null)\nconst grid=ref(null)\nconst noGutters=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "dense",
      "description": "Reduces spacing between grid items @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "grid",
      "description": "Enables grid layout mode @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "noGutters",
      "description": "Removes gutters (padding) between grid items @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for row content",
      "example": "<r-col class=\"col-4\"> col-1</r-col>\n<r-col class=\"col-4\"> col-2</r-col>\n<r-col class=\"col-4\"> col-3</r-col>"
    }
  ],
  "expose": [],
  "provide": []
}
</script>