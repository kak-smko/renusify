<template>
  <section>
    <r-meta title="rUnitInput Component | Renusify"
            description="Document with example for Renusify rUnitInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rUnitInput Component
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
      "template": "<rUnitInput \n :type=\"type\"\n :units=\"units\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rUnitInput>",
      "script": "import {ref} from 'vue';\n\nconst type=ref('text')\nconst units=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "type",
      "description": "Input type (text, number, etc.) @type {String} @default 'text'",
      "type": "String",
      "default": "text"
    },
    {
      "name": "units",
      "description": "Array of available unit options @type {Array} @required",
      "type": "Array",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the value or unit changes",
      "params": "@param {Object} value - The updated object with value and unit properties"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>