<template>
  <section>
    <r-meta title="rDivider Component | Renusify"
            description="Document with example for Renusify rDivider component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rDivider Component
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
      "template": "<rDivider \n :inset=\"inset\"\n :vertical=\"vertical\">\n</rDivider>",
      "script": "import {ref} from 'vue';\n\nconst inset=ref(null)\nconst vertical=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "inset",
      "description": "Adds inset padding to the divider @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "vertical",
      "description": "Makes the divider vertical instead of horizontal @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>