<template>
  <section>
    <r-meta title="rMapSelect Component | Renusify"
            description="Document with example for Renusify rMapSelect component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rMapSelect Component
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
      "template": "<rMapSelect \n v-model=\"modelValue\"\n :height=\"height\"\n :zoom=\"zoom\"\n :mapImageMarker=\"mapImageMarker\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rMapSelect>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst height=ref('500px')\nconst zoom=ref(13)\nconst mapImageMarker=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "Selected location coordinates @type {Array<Number>} @model @description Two-way binding for the selected [latitude, longitude] coordinates. Updates when user clicks or drags the marker on the map. @example [35.6997, 51.3380] // Tehran coordinates @example [40.7128, -74.0060] // New York coordinates",
      "type": "Array",
      "default": "undefined"
    },
    {
      "name": "height",
      "description": "Map container height @type {String} @default '500px' @description CSS height for the map container. Accepts any valid CSS height value. @example '300px' @example '70vh' @example '100%'",
      "type": "String",
      "default": "500px"
    },
    {
      "name": "zoom",
      "description": "Initial zoom level @type {Number} @default 13 @description Initial zoom level of the map (0-20 typical range). Higher values = more zoomed in. @example 10 // City overview @example 15 // Neighborhood view @example 18 // Street view",
      "type": "Number",
      "default": "13"
    },
    {
      "name": "mapImageMarker",
      "description": "Custom marker icon image URL @type {String} @description URL to a custom marker icon image. Overrides the default marker icon. Recommended size: 30x30 pixels with anchor at bottom center. @example '/assets/custom-marker.png' @example 'https://example.com/pin-icon.png'",
      "type": "String",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Updated [latitude, longitude] coordinates",
      "params": ""
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>