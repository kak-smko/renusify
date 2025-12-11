<template>
  <section>
    <r-meta title="rAvatar Component | Renusify"
            description="Document with example for Renusify rAvatar component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rAvatar Component
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
      "template": "<rAvatar \n :size=\"size\"\n :elevation=\"elevation\"\n :editable=\"editable\"\n :flat=\"flat\"\n :tile=\"tile\"\n :headers=\"headers\">\n<template #default>\n<r-img src=\"/storage/img/avatar.jpg\" width=\"80\" height=\"80\"></r-img>\n</template>\n</rAvatar>",
      "script": "import {ref} from 'vue';\n\nconst size=ref(48)\nconst elevation=ref('sm')\nconst editable=ref(null)\nconst flat=ref(null)\nconst tile=ref(null)\nconst headers=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "size",
      "description": "Size of the avatar in pixels @type {Number|String} @default 48",
      "type": "Number | String",
      "default": "48"
    },
    {
      "name": "elevation",
      "description": "Elevation level for the avatar shadow @type {String} @default 'sm'",
      "type": "String",
      "default": "sm"
    },
    {
      "name": "editable",
      "description": "API endpoint URL for uploading avatar images when editable @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "flat",
      "description": "Removes elevation/shadow from avatar @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "tile",
      "description": "Removes border radius making corners square @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "headers",
      "description": "Additional headers for the image upload request @type {Object}",
      "type": "Object",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for avatar content.",
      "example": "<r-img src=\"/storage/img/avatar.jpg\" width=\"80\" height=\"80\"></r-img>"
    }
  ],
  "expose": [],
  "provide": []
}
</script>