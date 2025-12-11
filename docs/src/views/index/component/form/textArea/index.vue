<template>
  <section>
    <r-meta title="rTextArea Component | Renusify"
            description="Document with example for Renusify rTextArea component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rTextArea Component
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
      "template": "<rTextArea \n :noResize=\"noResize\"\n v-model=\"modelValue\"\n :rows=\"rows\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rTextArea>",
      "script": "import {ref} from 'vue';\n\nconst noResize=ref(null)\nconst modelValue=ref(null)\nconst rows=ref('7')\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "noResize",
      "description": "Disables textarea resizing @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The model value of the textarea @type {String|Number}",
      "type": "[String, Number]",
      "default": "undefined"
    },
    {
      "name": "rows",
      "description": "Number of visible text rows @type {String|Number} @default '7'",
      "type": "String | Number",
      "default": "7"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the textarea value changes",
      "params": "@param {String|Number} value - The updated value"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>