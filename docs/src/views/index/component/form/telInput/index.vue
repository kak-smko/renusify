<template>
  <section>
    <r-meta title="rTelInput Component | Renusify"
            description="Document with example for Renusify rTelInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rTelInput Component
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
      "template": "<rTelInput \n :type=\"type\"\n v-model=\"modelValue\"\n :defaultCountry=\"defaultCountry\"\n :required=\"required\"\n :select=\"select\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rTelInput>",
      "script": "import {ref} from 'vue';\n\nconst type=ref('text')\nconst modelValue=ref(null)\nconst defaultCountry=ref('US')\nconst required=ref(null)\nconst select=ref(false)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "type",
      "description": "Input type attribute @type {String} @default 'text'",
      "type": "String",
      "default": "text"
    },
    {
      "name": "modelValue",
      "description": "The telephone input's model value (format: \"country_code phone_number\") @type {String|Number} Example: \"1 5551234567\" for US number",
      "type": "[String, Number]",
      "default": "undefined"
    },
    {
      "name": "defaultCountry",
      "description": "Default country ISO code to pre-select @type {String} @default 'US'",
      "type": "String",
      "default": "US"
    },
    {
      "name": "required",
      "description": "Whether the input is required @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "select",
      "description": "Whether to show country code as a selectable dropdown @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the telephone value changes",
      "params": "@param {String} value - The updated telephone value in format \"country_code phone_number\""
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>