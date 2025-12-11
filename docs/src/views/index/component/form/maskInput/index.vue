<template>
  <section>
    <r-meta title="rMaskInput Component | Renusify"
            description="Document with example for Renusify rMaskInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rMaskInput Component
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
      "template": "<rMaskInput \n v-model=\"modelValue\"\n :mask=\"mask\"\n :required=\"required\"\n :maskedVal=\"maskedVal\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@complete=\"log('complete',$event)\">\n</rMaskInput>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst mask=ref('')\nconst required=ref(false)\nconst maskedVal=ref(false)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "The input's model value @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "mask",
      "description": "Mask pattern for input formatting @type {String} @default '' Mask characters: - 'N': Numbers only (0-9) - 'A': Letters only (a-z, A-Z) - 'B': Alphanumeric (a-z, A-Z, 0-9) - 'X': Any character - Other characters: Static mask characters Example: \"NN-NN-AAAA\" formats as \"12-34-ABCD\"",
      "type": "String",
      "default": ""
    },
    {
      "name": "required",
      "description": "Whether the input is required @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "maskedVal",
      "description": "Whether to emit masked value instead of unmasked @type {Boolean} @default false When true, emits value with mask characters (e.g., \"12-34-ABCD\") When false, emits only the unmasked characters (e.g., \"1234ABCD\")",
      "type": "Boolean",
      "default": "false"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the input value changes",
      "params": "@param {String} value - The updated value (masked or unmasked based on maskedVal prop)"
    },
    {
      "name": "complete",
      "description": "Emitted when the mask is completely filled",
      "params": "@param {Boolean} isComplete - Whether the mask is fully filled"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>