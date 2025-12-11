<template>
  <section>
    <r-meta title="rModal Component | Renusify"
            description="Document with example for Renusify rModal component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rModal Component
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
      "template": "<rModal \n v-model=\"modelValue\"\n :position=\"position\"\n :noOverlay=\"noOverlay\"\n :fullWidth=\"fullWidth\"\n :fullHeight=\"fullHeight\"\n :maxWidth=\"maxWidth\"\n :maxHeight=\"maxHeight\"\n :minWidth=\"minWidth\"\n :noClosable=\"noClosable\"\n :noCloseBtn=\"noCloseBtn\"\n :routeHistory=\"routeHistory\"\n :animation=\"animation\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n<template #default>\n<div class=\"display-3 pa-12\">Title</div>\n</template>\n</rModal>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst position=ref('center')\nconst noOverlay=ref(null)\nconst fullWidth=ref(null)\nconst fullHeight=ref(null)\nconst maxWidth=ref('null')\nconst maxHeight=ref('null')\nconst minWidth=ref(true)\nconst noClosable=ref(null)\nconst noCloseBtn=ref(null)\nconst routeHistory=ref(null)\nconst animation=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "Controls the visibility of the modal @type {Boolean} @required",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "position",
      "description": "Position of the modal on the screen @type {String} @default 'center' @values 'center', 'bottom', 'start', 'end', 'top'",
      "type": "String",
      "default": "center"
    },
    {
      "name": "noOverlay",
      "description": "Hides the overlay/backdrop behind the modal @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "fullWidth",
      "description": "Makes the modal take full width of the screen @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "fullHeight",
      "description": "Makes the modal take full height of the screen @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "maxWidth",
      "description": "Maximum width of the modal container @type {String} @default null",
      "type": "String",
      "default": "null"
    },
    {
      "name": "maxHeight",
      "description": "Maximum height of the modal container @type {String} @default null",
      "type": "String",
      "default": "null"
    },
    {
      "name": "minWidth",
      "description": "Applies minimum width styling to the modal @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "noClosable",
      "description": "Prevents closing the modal by clicking overlay or pressing escape @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "noCloseBtn",
      "description": "Hides the close button in the modal header @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "routeHistory",
      "description": "Route hash value for URL-based modal state management @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "animation",
      "description": "Custom CSS animation name for modal transitions @type {String}",
      "type": "String",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when modal visibility changes",
      "params": "@param {Boolean} isOpen - Whether the modal is open"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for modal content",
      "example": "<div class=\"display-3 pa-12\">Title</div>"
    }
  ],
  "expose": [],
  "provide": []
}
</script>