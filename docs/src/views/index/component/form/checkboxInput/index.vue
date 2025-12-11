<template>
  <section>
    <r-meta title="rCheckboxInput Component | Renusify"
            description="Document with example for Renusify rCheckboxInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rCheckboxInput Component
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
      "template": "<rCheckboxInput \n :label=\"label\"\n :readonly=\"readonly\"\n :rounded=\"rounded\"\n v-model=\"modelValue\"\n :size=\"size\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rCheckboxInput>",
      "script": "import {ref} from 'vue';\n\nconst label=ref(null)\nconst readonly=ref(null)\nconst rounded=ref(null)\nconst modelValue=ref(null)\nconst size=ref('md')\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "label",
      "description": "Label text for the component @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "readonly",
      "description": "Makes the component read-only @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "rounded",
      "description": "Applies rounded corners to the component @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The model value for the component (v-model) @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "size",
      "description": "Size of the component @type {String} @default 'default' @values xs, sm, md, lg, xl, xxl",
      "type": "String",
      "default": "md"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the model value changes",
      "params": "@param {Boolean} value - The new value"
    }
  ],
  "slots": [
    {
      "name": "label",
      "description": "Slot for custom label."
    }
  ],
  "expose": [],
  "provide": []
}
</script>