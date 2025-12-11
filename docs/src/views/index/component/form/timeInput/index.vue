<template>
  <section>
    <r-meta title="rTimeInput Component | Renusify"
            description="Document with example for Renusify rTimeInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rTimeInput Component
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
      "template": "<rTimeInput \n :disableTime=\"disableTime\"\n :withSec=\"withSec\"\n :is24Hour=\"is24Hour\"\n :noOverlay=\"noOverlay\"\n v-model=\"modelValue\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rTimeInput>",
      "script": "import {ref} from 'vue';\n\nconst disableTime=ref(() => false)\nconst withSec=ref(null)\nconst is24Hour=ref(true)\nconst noOverlay=ref(null)\nconst modelValue=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "disableTime",
      "description": "Function to disable specific times @type {Function} @default () => false",
      "type": "Function",
      "default": "() => false"
    },
    {
      "name": "withSec",
      "description": "Show seconds picker in addition to hours and minutes @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "is24Hour",
      "description": "Use 24-hour format instead of 12-hour AM/PM format @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "noOverlay",
      "description": "Disable the overlay background when picker is open @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The model value in time string format (HH:MM or HH:MM:SS) @type {String}",
      "type": "String",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the time value changes",
      "params": "@param {String} value - The updated time value"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>