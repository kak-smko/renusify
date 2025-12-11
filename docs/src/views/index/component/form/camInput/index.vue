<template>
  <section>
    <r-meta title="rCamInput Component | Renusify"
            description="Document with example for Renusify rCamInput component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rCamInput Component
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
      "template": "<rCamInput \n :uploadLink=\"uploadLink\"\n :width=\"width\"\n :height=\"height\"\n :audio=\"audio\"\n :video=\"video\"\n v-model=\"modelValue\"\n :size=\"size\"\n :headers=\"headers\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@error=\"log('error',$event)\">\n</rCamInput>",
      "script": "import {ref} from 'vue';\n\nconst uploadLink=ref(null)\nconst width=ref('300')\nconst height=ref('300')\nconst audio=ref(true)\nconst video=ref(true)\nconst modelValue=ref(null)\nconst size=ref(3)\nconst headers=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "uploadLink",
      "description": "API endpoint URL for uploading recorded videos @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "width",
      "description": "Width of the camera view/video element @type {String|Number} @default \"300\"",
      "type": "String | Number",
      "default": "300"
    },
    {
      "name": "height",
      "description": "Height of the camera view/video element @type {String|Number} @default \"300\"",
      "type": "String | Number",
      "default": "300"
    },
    {
      "name": "audio",
      "description": "Enable audio recording @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "video",
      "description": "Enable video recording @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "modelValue",
      "description": "Array of uploaded video URLs @type {Array}",
      "type": "Array",
      "default": "undefined"
    },
    {
      "name": "size",
      "description": "Maximum number of videos allowed to record @type {Number} @default 3",
      "type": "Number",
      "default": "3"
    },
    {
      "name": "headers",
      "description": "Additional headers for upload/delete requests @type {Object}",
      "type": "Object",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when the list of uploaded videos changes",
      "params": "@param {Array} videos - Array of video URLs"
    },
    {
      "name": "error",
      "description": "Emitted when an error occurs during recording, upload, or delete",
      "params": "@param {String|Object} error - Error message or error object"
    }
  ],
  "slots": [
    {
      "name": "holder",
      "description": "Slot for custom video holder display. Provides items scoped prop",
      "props": "items: modelValue"
    },
    {
      "name": "control",
      "description": "Slot for custom control buttons. Provides uploadPercentage, cancelFile, start, stop, started scoped props",
      "props": "uploadPercentage: uploadPercentage, cancelFile: cancelFile, start: start, stop: stop, started: started"
    }
  ],
  "expose": [],
  "provide": []
}
</script>