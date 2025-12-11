<template>
  <section>
    <r-meta title="rConfirm Component | Renusify"
            description="Document with example for Renusify rConfirm component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rConfirm Component
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
      "template": "<rConfirm \n :title=\"title\"\n :text=\"text\"\n :cancelText=\"cancelText\"\n :confirmText=\"confirmText\"\n v-model=\"modelValue\"\n :hard=\"hard\"\n@accept=\"log('accept',$event)\"\n@cancel=\"log('cancel',$event)\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rConfirm>",
      "script": "import {ref} from 'vue';\n\nconst title=ref(null)\nconst text=ref(null)\nconst cancelText=ref(null)\nconst confirmText=ref(null)\nconst modelValue=ref(null)\nconst hard=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "title",
      "description": "Dialog title text @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "text",
      "description": "Dialog message text @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "cancelText",
      "description": "Cancel button text @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "confirmText",
      "description": "Confirm button text @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "Controls dialog visibility @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "hard",
      "description": "Enables hard confirmation requiring user to type a verification code @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "accept",
      "description": "Emitted when user confirms the dialog",
      "params": ""
    },
    {
      "name": "cancel",
      "description": "Emitted when user cancels the dialog",
      "params": ""
    },
    {
      "name": "update:modelValue",
      "description": "Emitted when dialog visibility should be updated",
      "params": "@param {Boolean} value - New visibility state"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>