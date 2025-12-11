<template>
  <section>
    <r-meta title="rPasswordInput Component | Renusify"
            description="Document with example for Renusify rPasswordInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rPasswordInput Component
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
      "template": "<rPasswordInput \n v-model=\"modelValue\"\n :hideRequirements=\"hideRequirements\"\n :lowerCase=\"lowerCase\"\n :upperCase=\"upperCase\"\n :specialChar=\"specialChar\"\n :number=\"number\"\n :minLength=\"minLength\"\n :autocomplete=\"autocomplete\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@strength-change=\"log('strength-change',$event)\">\n</rPasswordInput>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst hideRequirements=ref(null)\nconst lowerCase=ref(null)\nconst upperCase=ref(null)\nconst specialChar=ref(null)\nconst number=ref(null)\nconst minLength=ref(8)\nconst autocomplete=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "The password input's model value @type {String|Number}",
      "type": "[String, Number]",
      "default": "undefined"
    },
    {
      "name": "hideRequirements",
      "description": "Hide password strength requirements display @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "lowerCase",
      "description": "Require at least one lowercase letter @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "upperCase",
      "description": "Require at least one uppercase letter @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "specialChar",
      "description": "Require at least one special character (!@#$%^&*) @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "number",
      "description": "Require at least one number @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "minLength",
      "description": "Minimum password length requirement @type {Number} @default 8",
      "type": "Number",
      "default": "8"
    },
    {
      "name": "autocomplete",
      "description": "HTML autocomplete attribute value @type {String}",
      "type": "String",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the password value changes",
      "params": "@param {String} value - The updated password value"
    },
    {
      "name": "strength-change",
      "description": "Emitted when password strength changes .strength - Password strength score (0-100) .level - Password strength level (0-4)",
      "params": "@param {Object} strengthData - Password strength information\n@param {Number} strengthData.strength - Password strength score (0-100)\n@param {Number} strengthData.level - Password strength level (0-4)"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>