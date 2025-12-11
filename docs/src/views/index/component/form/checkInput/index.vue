<template>
  <section>
    <r-meta title="rCheckInput Component | Renusify"
            description="Document with example for Renusify rCheckInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rCheckInput Component
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
      "template": "<rCheckInput \n :type=\"type\"\n :name=\"name\"\n :link=\"link\"\n v-model=\"modelValue\"\n :headers=\"headers\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@data=\"log('data',$event)\">\n</rCheckInput>",
      "script": "import {ref} from 'vue';\n\nconst type=ref('text')\nconst name=ref('text')\nconst link=ref(null)\nconst modelValue=ref(null)\nconst headers=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "type",
      "description": "Input type attribute @type {String} @default 'text'",
      "type": "String",
      "default": "text"
    },
    {
      "name": "name",
      "description": "Input name attribute @type {String} @default 'text'",
      "type": "String",
      "default": "text"
    },
    {
      "name": "link",
      "description": "API endpoint URL for validation/checking @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The model value for the input (v-model) @type {String|Number}",
      "type": "[String, Number]",
      "default": "undefined"
    },
    {
      "name": "headers",
      "description": "Additional headers for the API request @type {Object}",
      "type": "Object",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the model value changes",
      "params": "@param {String|Number} value - The new value"
    },
    {
      "name": "data",
      "description": "Emitted when API validation/check completes",
      "params": "@param {Object} data - Response data from the API"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>