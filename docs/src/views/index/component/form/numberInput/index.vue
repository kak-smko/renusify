<template>
  <section>
    <r-meta title="rNumberInput Component | Renusify"
            description="Document with example for Renusify rNumberInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rNumberInput Component
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
      "template": "<rNumberInput \n v-model=\"modelValue\"\n :step=\"step\"\n :split=\"split\"\n :min=\"min\"\n :max=\"max\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rNumberInput>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst step=ref(1)\nconst split=ref(0)\nconst min=ref(null)\nconst max=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "The input's model value (number or string) @type {Number|String}",
      "type": "[Number, String]",
      "default": "undefined"
    },
    {
      "name": "step",
      "description": "Step value for increment/decrement buttons @type {Number} @default 1",
      "type": "Number",
      "default": "1"
    },
    {
      "name": "split",
      "description": "Number of digits to group with commas for display @type {Number} @default 0 When greater than 0, formats numbers with commas (e.g., 1000 becomes 1,000) Set to 0 to disable number formatting",
      "type": "Number",
      "default": "0"
    },
    {
      "name": "min",
      "description": "Minimum allowed value @type {Number}",
      "type": "Number",
      "default": "undefined"
    },
    {
      "name": "max",
      "description": "Maximum allowed value @type {Number}",
      "type": "Number",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the number value changes",
      "params": "@param {Number|undefined} value - The updated number value, undefined if invalid or empty"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>