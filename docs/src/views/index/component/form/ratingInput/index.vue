<template>
  <section>
    <r-meta title="rRatingInput Component | Renusify"
            description="Document with example for Renusify rRatingInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rRatingInput Component
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
      "template": "<rRatingInput \n :count=\"count\"\n :size=\"size\"\n v-model=\"modelValue\"\n :readonly=\"readonly\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rRatingInput>",
      "script": "import {ref} from 'vue';\n\nconst count=ref(5)\nconst size=ref('md')\nconst modelValue=ref(null)\nconst readonly=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "count",
      "description": "Total number of rating stars to display @type {Number} @default 5",
      "type": "Number",
      "default": "5"
    },
    {
      "name": "size",
      "description": "Size of the rating stars @type {String} @default 'md' @validator ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']",
      "type": "String",
      "default": "md"
    },
    {
      "name": "modelValue",
      "description": "Current rating value (0 to count) @type {Number}",
      "type": "Number",
      "default": "undefined"
    },
    {
      "name": "readonly",
      "description": "Disable rating interaction @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when a rating is selected",
      "params": "@param {Number} rating - The selected rating value (1 to count)"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>