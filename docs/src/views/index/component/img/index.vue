<template>
  <section>
    <r-meta title="rImg Component | Renusify" description="Document with example for Renusify rImg component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rImg Component
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
      "template": "<rImg \n :src=\"src\"\n :preview=\"preview\"\n :alt=\"alt\"\n :lazy=\"lazy\"\n :width=\"width\"\n :height=\"height\"\n :query=\"query\"\n :autoSrcset=\"autoSrcset\"\n :autoSize=\"autoSize\"\n :hoverZoom=\"hoverZoom\"\n :hoverDark=\"hoverDark\"\n :isSvg=\"isSvg\"\n :svgCache=\"svgCache\"\n :wPH=\"wPH\">\n</rImg>",
      "script": "import {ref} from 'vue';\n\nconst src=ref(null)\nconst preview=ref(null)\nconst alt=ref(null)\nconst lazy=ref('create')\nconst width=ref(null)\nconst height=ref(null)\nconst query=ref(null)\nconst autoSrcset=ref(true)\nconst autoSize=ref(null)\nconst hoverZoom=ref(null)\nconst hoverDark=ref(null)\nconst isSvg=ref(null)\nconst svgCache=ref(86400)\nconst wPH=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "src",
      "description": "Source URL of the image Required: true Example: 'https://codenus.com/pwa/logo'",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "preview",
      "description": "Preview image URL for high resolution image Example: 'https://codenus.com/pwa/logo'",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "alt",
      "description": "Alternative text for the image (accessibility) Required: true Example: 'A beautiful sunset over the mountains'",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "lazy",
      "description": "Lazy loading behavior Allowed values: 'no', 'create' - 'no': No lazy loading - 'create': Create lazy loading instance",
      "type": "String",
      "default": "create"
    },
    {
      "name": "width",
      "description": "Width of the image Example: '100%', 300, '200px'",
      "type": "String | Number",
      "default": "undefined"
    },
    {
      "name": "height",
      "description": "Height of the image Example: 'auto', 200, '150px'",
      "type": "String | Number",
      "default": "undefined"
    },
    {
      "name": "query",
      "description": "Query parameters to append to the image URL Example: '?quality=80&format=webp'",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "autoSrcset",
      "description": "Whether to automatically generate srcset for responsive images",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "autoSize",
      "description": "Whether to automatically calculate image dimensions",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "hoverZoom",
      "description": "Whether to enable zoom on hover effect",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "hoverDark",
      "description": "Whether to apply dark overlay on hover",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "isSvg",
      "description": "Whether the image is an SVG file",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "svgCache",
      "description": "Cache duration for SVG files in seconds Default: 86400 (24 hours)",
      "type": "Number",
      "default": "86400"
    },
    {
      "name": "wPH",
      "description": "Width-per-height ratio (aspect ratio) Example: 1.777 (for 16:9 aspect ratio)",
      "type": "Number",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>