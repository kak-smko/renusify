<template>
  <section>
    <r-meta title="rSwitchInput Component | Renusify"
            description="Document with example for Renusify rSwitchInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rSwitchInput Component
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
      "template": "<rSwitchInput \n :label=\"label\"\n :label2=\"label2\"\n v-model=\"modelValue\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@change=\"log('change',$event)\">\n</rSwitchInput>",
      "script": "import {ref} from 'vue';\n\nconst label=ref(null)\nconst label2=ref(null)\nconst modelValue=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "label",
      "description": "Primary label for the switch @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "label2",
      "description": "Secondary label for the switch (optional) @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The switch's model value @type {Boolean|String}",
      "type": "Boolean | String",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the switch value changes",
      "params": "@param {Boolean|String} value - The updated switch value"
    },
    {
      "name": "change",
      "description": "Emitted when the switch is toggled",
      "params": "@param {Boolean|String} value - The new switch state"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>