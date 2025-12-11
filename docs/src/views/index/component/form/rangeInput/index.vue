<template>
  <section>
    <r-meta title="rRangeInput Component | Renusify"
            description="Document with example for Renusify rRangeInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rRangeInput Component
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
      "template": "<rRangeInput \n v-model=\"modelValue\"\n :min=\"min\"\n :max=\"max\"\n :color=\"color\"\n :step=\"step\"\n :tooltipAlways=\"tooltipAlways\"\n :disabled=\"disabled\"\n :isRange=\"isRange\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rRangeInput>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst min=ref(0)\nconst max=ref(100)\nconst color=ref('color-one')\nconst step=ref(1)\nconst tooltipAlways=ref(null)\nconst disabled=ref(null)\nconst isRange=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "The slider's model value @type {Number|Array} For single slider: Number For range slider: Array of two numbers [minValue, maxValue]",
      "type": "Number | Array",
      "default": "undefined"
    },
    {
      "name": "min",
      "description": "Minimum allowed value @type {Number} @default 0",
      "type": "Number",
      "default": "0"
    },
    {
      "name": "max",
      "description": "Maximum allowed value @type {Number} @default 100",
      "type": "Number",
      "default": "100"
    },
    {
      "name": "color",
      "description": "Color class for the slider track @type {String} @default 'color-one'",
      "type": "String",
      "default": "color-one"
    },
    {
      "name": "step",
      "description": "Step value for slider increments @type {Number} @default 1",
      "type": "Number",
      "default": "1"
    },
    {
      "name": "tooltipAlways",
      "description": "Always show tooltip on slider handle @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "disabled",
      "description": "Disable slider interaction @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "isRange",
      "description": "Enable range slider with two handles @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when slider value changes",
      "params": "@param {Number|Array} value - Updated slider value"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>