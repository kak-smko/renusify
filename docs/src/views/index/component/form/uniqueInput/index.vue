<template>
  <section>
    <r-meta title="rUniqueInput Component | Renusify"
            description="Document with example for Renusify rUniqueInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rUniqueInput Component
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
      "template": "<rUniqueInput \n :link=\"link\"\n v-model=\"modelValue\"\n :headers=\"headers\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rUniqueInput>",
      "script": "import {ref} from 'vue';\n\nconst link=ref(null)\nconst modelValue=ref('null')\nconst headers=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "link",
      "description": "API endpoint URL for uniqueness validation @type {String} @required",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The model value to validate for uniqueness @type {String} @default null",
      "type": "String",
      "default": "null"
    },
    {
      "name": "headers",
      "description": "Additional headers for the validation request @type {Object}",
      "type": "Object",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the value changes",
      "params": "@param {String} value - The updated value"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>