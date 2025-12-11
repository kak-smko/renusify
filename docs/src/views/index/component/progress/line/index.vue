<template>
  <section>
    <r-meta title="rProgressLine Component | Renusify"
            description="Document with example for Renusify rProgressLine component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rProgressLine Component
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
      "template": "<rProgressLine \n v-model=\"modelValue\"\n :color=\"color\"\n :progressStyle=\"progressStyle\"\n :showPercent=\"showPercent\"\n :outlined=\"outlined\"\n :rounded=\"rounded\"\n :showBackground=\"showBackground\"\n :size=\"size\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rProgressLine>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst color=ref(null)\nconst progressStyle=ref(null)\nconst showPercent=ref(null)\nconst outlined=ref(null)\nconst rounded=ref(null)\nconst showBackground=ref(null)\nconst size=ref('sm')\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "Current progress value (0-100). If undefined or outside 0-100 range, shows indeterminate state. @type {Number|String}",
      "type": "[Number, String]",
      "default": "undefined"
    },
    {
      "name": "color",
      "description": "CSS class for progress bar color styling @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "progressStyle",
      "description": "Additional inline styles for the progress bar. Can be a string, object, or array. @type {String|Object|Array}",
      "type": "[String, Object, Array]",
      "default": "undefined"
    },
    {
      "name": "showPercent",
      "description": "Shows percentage text alongside the progress bar @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "outlined",
      "description": "Applies outlined styling to the progress bar @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "rounded",
      "description": "Applies rounded corners to the progress bar @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "showBackground",
      "description": "Shows background track behind the progress bar @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "size",
      "description": "Size variant of the progress bar @type {String} @default 'sm' @values 'sm', 'md', 'lg', 'xl'",
      "type": "String",
      "default": "sm"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when progress value changes",
      "params": "@param {Number|String} value - New progress value"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>