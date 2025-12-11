<template>
  <section>
    <r-meta title="rBtnConfirm Component | Renusify"
            description="Document with example for Renusify rBtnConfirm component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rBtnConfirm Component
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
      "template": "<rBtnConfirm \n :hard=\"hard\"\n :title=\"title\"\n :body=\"body\"\n :cancelText=\"cancelText\"\n :confirmText=\"confirmText\"\n@click=\"log('click',$event)\">\n<template #default>\nClick Me\n</template>\n</rBtnConfirm>",
      "script": "import {ref} from 'vue';\n\nconst hard=ref(null)\nconst title=ref(null)\nconst body=ref(null)\nconst cancelText=ref(null)\nconst confirmText=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "hard",
      "description": "Makes the dialog persistent (cannot be closed by clicking outside) @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "title",
      "description": "Title text displayed in the dialog header @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "body",
      "description": "Body text displayed in the dialog content area @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "cancelText",
      "description": "Text for the cancel button @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "confirmText",
      "description": "Text for the confirm/accept button @type {String}",
      "type": "String",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "click",
      "description": "Emitted when the confirm button is clicked",
      "params": "@param {Boolean} confirmed - Always true indicating confirmation"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for button content",
      "example": "Click Me"
    }
  ],
  "expose": [],
  "provide": []
}
</script>