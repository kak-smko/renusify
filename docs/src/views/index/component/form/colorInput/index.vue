<template>
  <section>
    <r-meta title="rColorInput Component | Renusify"
            description="Document with example for Renusify rColorInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rColorInput Component
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
      "template": "<rColorInput \n v-model=\"modelValue\"\n :format=\"format\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@close=\"log('close',$event)\">\n</rColorInput>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst format=ref('rgba')\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "The model value for the color picker (v-model) @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "format",
      "description": "Color format to output @type {String} @default 'rgba' @values rgba, hex",
      "type": "String",
      "default": "rgba"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the color value changes",
      "params": "@param {String} color - The new color value"
    },
    {
      "name": "close",
      "description": "Emitted when the color picker is closed",
      "params": "@param {Boolean} true - Indicates the picker is closed"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>