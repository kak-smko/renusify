<template>
  <section>
    <r-meta title="rAddressInput Component | Renusify"
            description="Document with example for Renusify rAddressInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rAddressInput Component
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
      "template": "<rAddressInput \n :required=\"required\"\n :stepShow=\"stepShow\"\n :allowCountries=\"allowCountries\"\n :hideCountry=\"hideCountry\"\n :hideState=\"hideState\"\n :hideCity=\"hideCity\"\n :hideZipCode=\"hideZipCode\"\n :hideStreet=\"hideStreet\"\n :readonly=\"readonly\"\n :baseUrl=\"baseUrl\"\n :defaultCountry=\"defaultCountry\"\n v-model=\"modelValue\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rAddressInput>",
      "script": "import {ref} from 'vue';\n\nconst required=ref(null)\nconst stepShow=ref(null)\nconst allowCountries=ref(null)\nconst hideCountry=ref(null)\nconst hideState=ref(null)\nconst hideCity=ref(null)\nconst hideZipCode=ref(null)\nconst hideStreet=ref(null)\nconst readonly=ref(null)\nconst baseUrl=ref('https://codenus.com/api/apps/address')\nconst defaultCountry=ref(null)\nconst modelValue=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "required",
      "description": "Whether the address fields are required @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "stepShow",
      "description": "Show fields step by step based on previous selections @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "allowCountries",
      "description": "Array of allowed countries to show in country selector @type {Array}",
      "type": "Array",
      "default": "undefined"
    },
    {
      "name": "hideCountry",
      "description": "Hide the country field @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "hideState",
      "description": "Hide the state/province field @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "hideCity",
      "description": "Hide the city field @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "hideZipCode",
      "description": "Hide the zip/postal code field @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "hideStreet",
      "description": "Hide the street address field @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "readonly",
      "description": "Make all fields read-only @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "baseUrl",
      "description": "Base URL for API calls to fetch address data @type {String} @default \"https://codenus.com/api/apps/address\"",
      "type": "String",
      "default": "https://codenus.com/api/apps/address"
    },
    {
      "name": "defaultCountry",
      "description": "Default country to pre-select @type {Object}",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The address model value @type {Object}",
      "type": "Object",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when address data changes .country - Selected country .state - Selected state/province .city - Selected city .street - Street address .zip_code - Zip/postal code",
      "params": "@param {Object} address - The updated address object\n@param {Object|null} address.country - Selected country\n@param {Object|null} address.state - Selected state/province\n@param {Object|null} address.city - Selected city\n@param {String|null} address.street - Street address\n@param {String|null} address.zip_code - Zip/postal code"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>