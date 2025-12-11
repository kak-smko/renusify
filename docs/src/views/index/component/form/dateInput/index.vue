<template>
  <section>
    <r-meta title="rDateInput Component | Renusify"
            description="Document with example for Renusify rDateInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rDateInput Component
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
      "template": "<rDateInput \n v-model=\"modelValue\"\n :lang=\"lang\"\n :withTime=\"withTime\"\n :rangeMode=\"rangeMode\"\n :isDateDisabled=\"isDateDisabled\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rDateInput>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst lang=ref(null)\nconst withTime=ref(null)\nconst rangeMode=ref(false)\nconst isDateDisabled=ref(() => false)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "The model value for the date picker (v-model) @type {String|Array}",
      "type": "String | Array",
      "default": "undefined"
    },
    {
      "name": "lang",
      "description": "Language/locale for date formatting @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "withTime",
      "description": "Enables time selection alongside date selection @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "rangeMode",
      "description": "Enables date range selection mode @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "isDateDisabled",
      "description": "Function to determine if a date should be disabled @type {Function} @default () => false @param {Date} date - The date to check @returns {Boolean} True if the date should be disabled",
      "type": "Function",
      "default": "() => false"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the date value changes",
      "params": "@param {String|Array} value - The new date value(s)"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>