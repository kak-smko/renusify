<template>
  <section>
    <r-meta title="rInput Component | Renusify"
            description="Document with example for Renusify rInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rInput Component
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
      "template": "<rInput \n :id=\"id\"\n :icon=\"icon\"\n :preIcon=\"preIcon\"\n :msg=\"msg\"\n :label=\"label\"\n :placeholder=\"placeholder\"\n v-model=\"modelValue\"\n :active=\"active\"\n :labelActive=\"labelActive\"\n :hide=\"hide\"\n :disabled=\"disabled\"\n :readonly=\"readonly\"\n :error=\"error\"\n :autofocus=\"autofocus\"\n :ltr=\"ltr\"\n :rules=\"rules\"\n :validateOnBlur=\"validateOnBlur\"\n@pre-icon=\"log('pre-icon',$event)\"\n@icon=\"log('icon',$event)\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rInput>",
      "script": "import {ref} from 'vue';\n\nconst id=ref(null)\nconst icon=ref(null)\nconst preIcon=ref(null)\nconst msg=ref(null)\nconst label=ref(null)\nconst placeholder=ref(null)\nconst modelValue=ref(null)\nconst active=ref(null)\nconst labelActive=ref(null)\nconst hide=ref(null)\nconst disabled=ref(null)\nconst readonly=ref(null)\nconst error=ref(null)\nconst autofocus=ref(null)\nconst ltr=ref(null)\nconst rules=ref(() => [])\nconst validateOnBlur=ref(true)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "id",
      "description": "Input ID attribute @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "icon",
      "description": "Icon to display after input @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "preIcon",
      "description": "Icon to display before input @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "msg",
      "description": "Custom error message @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "label",
      "description": "Input label text @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "placeholder",
      "description": "Input placeholder text @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "The model value for the input (v-model) @type {String|Boolean|Number|Array|Object}",
      "type": "[String, Boolean, Number, Array, Object]",
      "default": "undefined"
    },
    {
      "name": "active",
      "description": "Whether input is in focused state @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "labelActive",
      "description": "Whether label should always be active @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "hide",
      "description": "Hides validation details @type {Boolean} @default undefined",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "disabled",
      "description": "Disables the input @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "readonly",
      "description": "Makes input read-only @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "error",
      "description": "Manually sets error state @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "autofocus",
      "description": "Auto-focuses input on mount @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "ltr",
      "description": "Sets left-to-right text direction @type {Boolean} @default undefined",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "rules",
      "description": "Validation rules @type {Array|Function} @default () => []",
      "type": "Array | Function",
      "default": "() => []"
    },
    {
      "name": "validateOnBlur",
      "description": "Validate input on blur event @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    }
  ],
  "emits": [
    {
      "name": "pre-icon",
      "description": "Emitted when pre-icon is clicked",
      "params": "@param {Boolean} true - Indicates pre-icon was clicked"
    },
    {
      "name": "icon",
      "description": "Emitted when icon is clicked",
      "params": "@param {Boolean} true - Indicates icon was clicked"
    },
    {
      "name": "update:modelValue",
      "description": "Emitted when model value changes",
      "params": "@param {any} value - New model value"
    }
  ],
  "slots": [
    {
      "name": "label",
      "description": "Slot for custom label content. Provide isRequired prop.",
      "props": "isRequired: isRequired"
    },
    {
      "name": "preIcon",
      "description": "Slot for pre-icon content"
    },
    {
      "name": "default",
      "description": "Default slot for input content. Provide isRequired, uid props.",
      "props": "isRequired: isRequired, uid: uid"
    },
    {
      "name": "icon",
      "description": "Slot for icon content"
    },
    {
      "name": "message",
      "description": "Slot for custom message display",
      "props": "messages: genMessages"
    }
  ],
  "expose": [],
  "provide": []
}
</script>