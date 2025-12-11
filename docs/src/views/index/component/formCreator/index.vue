<template>
  <section>
    <r-meta title="rFormCreator Component | Renusify"
            description="Document with example for Renusify rFormCreator component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rFormCreator Component
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
    "Advanced usage with mixed fields": {
      "template": "<r-form-creator :url=\"url\"\n:title=\"title\"\n:auto-Send=\"autoSend\"\n:redirect=\"redirect\"\n:method=\"method\"\n:options=\"options\"\nv-model=\"modelValue\"\n:headers=\"headers\"\n@update:model-Value=\"log(`update:modelValue`,$event)\"\n@ok=\"log(`ok`,$event)\" ></r-form-creator>",
      "script": "import { ref } from 'vue'\nconst modelValue=ref(modelValue)\nconst url=ref(null)\nconst title=ref(\"Add form\")\nconst autoSend=ref(false)\nconst method=ref(\"post\")\nconst headers=ref(null)\nconst options=ref({\nname:{\"type\": \"r-text-input\",\"props\":{\"rules\": [\"required\"]}},\nfamily:{\"type\": \"r-text-input\",\"props\":{\"rules\": [\"required\"]}},\nage:{\"type\": \"r-number-input\",$if:[[\"$name\",\"!=\",\"$family\"]],\"props\":{\"rules\": [\"required\",\"min:7\",\"max:70\"]}},\nphone:{\"type\": \"r-mask-input\",$if:[[\"$age\",\">\",7],[\"$age\",\"<=\",60]],\"props\":{\"rules\": [\"required\"],\"mask\": \"0NNN NNN NNNN\"}},\nmix:{\"type\": \"r-text-input\",\"$bind\":[[\"label\",\"name\"]]},\n})\nconst log=(name,e)=>{\nconsole.log(name,e)\n}",
      "style": ""
    }
  },
  "props": [
    {
      "name": "url",
      "description": "API endpoint URL for form submission @type {String} @required",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "title",
      "description": "Form title displayed in the UI @type {String} @default 'Add form'",
      "type": "String",
      "default": "Add form"
    },
    {
      "name": "autoSend",
      "description": "Whether to automatically submit the form on mount @type {Boolean} @default false",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "redirect",
      "description": "URL to redirect after successful submission @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "method",
      "description": "HTTP method for form submission @type {String} @default 'post' @values 'post', 'put', 'patch', 'delete'",
      "type": "String",
      "default": "post"
    },
    {
      "name": "options",
      "description": "Form field configuration options @type {Object|Array} @description Defines form fields, validation rules, and conditional logic @example options:  { name:{\"type\": \"r-text-input\",\"props\":{\"rules\": [\"required\"]}}, family:{\"type\": \"r-text-input\",\"props\":{\"rules\": [\"required\"]}}, age:{\"type\": \"r-number-input\",$if:[[\"$name\",\"!=\",\"$family\"]],\"props\":{\"rules\": [\"required\",\"min:7\",\"max:70\"]}}, phone:{\"type\": \"r-mask-input\",$if:[[\"$age\",\">\",7],[\"$age\",\"<=\",60]],\"props\":{\"rules\": [\"required\"],\"mask\": \"0NNN NNN NNNN\"}}, mix:{\"type\": \"r-text-input\",\"$bind\":[[\"label\",\"name\"]]}, }",
      "type": "Object | Array",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when form data changes @event update:modelValue",
      "params": "@param {Object} data - Updated form data"
    },
    {
      "name": "ok",
      "description": "Emitted when form submission is successful @event ok",
      "params": "@param {Boolean} success - Always true"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>