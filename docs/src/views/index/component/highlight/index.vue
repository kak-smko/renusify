<template>
  <section>
    <r-meta title="rHighlight Component | Renusify"
            description="Document with example for Renusify rHighlight component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rHighlight Component
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
      "template": "<rHighlight \n :name=\"name\"\n :src=\"src\"\n :hideLineNumbers=\"hideLineNumbers\"\n :lang=\"lang\">\n</rHighlight>",
      "script": "import {ref} from 'vue';\n\nconst name=ref(null)\nconst src=ref(null)\nconst hideLineNumbers=ref(null)\nconst lang=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "name",
      "description": "Name or identifier for the code block Optional name for the code snippet, can be used for labeling or referencing",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "src",
      "description": "inline code content",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "hideLineNumbers",
      "description": "Whether to hide line numbers",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "lang",
      "description": "Programming language for syntax highlighting",
      "type": "String",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>