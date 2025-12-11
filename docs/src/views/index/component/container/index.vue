<template>
  <section>
    <r-meta title="rContainer Component | Renusify"
            description="Document with example for Renusify rContainer component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rContainer Component
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
      "template": "<rContainer \n :fullWidth=\"fullWidth\"\n :fill=\"fill\">\n<template #default>\n<r-row>\n<r-col class=\"col-4\"> col-1</r-col>\n<r-col class=\"col-4\"> col-2</r-col>\n<r-col class=\"col-4\"> col-3</r-col>\n</r-row>\n</template>\n</rContainer>",
      "script": "import {ref} from 'vue';\n\nconst fullWidth=ref(null)\nconst fill=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "fullWidth",
      "description": "Makes container full width (fluid) @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "fill",
      "description": "Makes container fill available height @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for container content",
      "example": "<r-row>\n<r-col class=\"col-4\"> col-1</r-col>\n<r-col class=\"col-4\"> col-2</r-col>\n<r-col class=\"col-4\"> col-3</r-col>\n</r-row>"
    }
  ],
  "expose": [],
  "provide": []
}
</script>