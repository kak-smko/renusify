<template>
  <section>
    <r-meta title="rCropper Component | Renusify"
            description="Document with example for Renusify rCropper component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rCropper Component
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
      "template": "<rCropper \n :wPH=\"wPH\"\n :imgSrc=\"imgSrc\"\n :maxWidth=\"maxWidth\"\n :showCropped=\"showCropped\"\n :getBlob=\"getBlob\"\n :selectImg=\"selectImg\"\n@cropped=\"log('cropped',$event)\"\n@original=\"log('original',$event)\">\n</rCropper>",
      "script": "import {ref} from 'vue';\n\nconst wPH=ref(1)\nconst imgSrc=ref(null)\nconst maxWidth=ref(null)\nconst showCropped=ref(null)\nconst getBlob=ref(null)\nconst selectImg=ref(true)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "wPH",
      "description": "Width-to-height ratio(s) for cropping @type {Number|String|Array} @default 1",
      "type": "Number | String | Array",
      "default": "1"
    },
    {
      "name": "imgSrc",
      "description": "Image source to crop @type {String|Blob}",
      "type": "[String, Blob]",
      "default": "undefined"
    },
    {
      "name": "maxWidth",
      "description": "Maximum width of the cropped image @type {Number}",
      "type": "Number",
      "default": "undefined"
    },
    {
      "name": "showCropped",
      "description": "Whether to show the cropped result @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "getBlob",
      "description": "Whether to emit Blob instead of DataURL @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "selectImg",
      "description": "Enables image selection @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    }
  ],
  "emits": [
    {
      "name": "cropped",
      "description": "Emitted when image is cropped",
      "params": "@param {String|Blob} result - Cropped image as DataURL or Blob"
    },
    {
      "name": "original",
      "description": "Emitted when original image is selected",
      "params": "@param {File} file - Original image file"
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>