<template>
  <section>
    <r-meta title="rFloat Component | Renusify"
            description="Document with example for Renusify rFloat component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rFloat Component
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
      "template": "<rFloat \n :bordered=\"bordered\"\n :disableZoom=\"disableZoom\"\n :disableMove=\"disableMove\"\n :trnsfrmOrigin=\"trnsfrmOrigin\"\n :zoom=\"zoom\"\n :maxZoom=\"maxZoom\"\n :minZoom=\"minZoom\"\n@move=\"log('move',$event)\"\n@zoom=\"log('zoom',$event)\">\n<template #default>\n<div class=\"color-one\" style=\"height: 300px;width: 400px\">content</div>\n</template>\n</rFloat>",
      "script": "import {ref} from 'vue';\n\nconst bordered=ref(null)\nconst disableZoom=ref(null)\nconst disableMove=ref(null)\nconst trnsfrmOrigin=ref(null)\nconst zoom=ref(1)\nconst maxZoom=ref(10)\nconst minZoom=ref(.1)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "bordered",
      "description": "Adds border to the float container @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "disableZoom",
      "description": "Disables zoom functionality @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "disableMove",
      "description": "Disables move/drag functionality @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "trnsfrmOrigin",
      "description": "Custom transform origin point (0-1 values) @type {Object} @property {Number} x - X coordinate (0-1) @property {Number} y - Y coordinate (0-1)",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "zoom",
      "description": "Initial zoom level @type {Number} @default 1",
      "type": "Number",
      "default": "1"
    },
    {
      "name": "maxZoom",
      "description": "Maximum zoom level @type {Number} @default 10",
      "type": "Number",
      "default": "10"
    },
    {
      "name": "minZoom",
      "description": "Minimum zoom level @type {Number} @default 0.1",
      "type": "Number",
      "default": ".1"
    }
  ],
  "emits": [
    {
      "name": "move",
      "description": "Emitted when content is moved",
      "params": "@param {Array} movement - [dx, dy] movement delta"
    },
    {
      "name": "zoom",
      "description": "Emitted when zoom level changes",
      "params": "@param {Array} zoomData - [clientX, clientY, ratio] zoom parameters"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Main slot for content with transformation controls. Provides scoped methods and state",
      "props": "ease: ease, move: moveTo, pause: pause, resume: resume, transform: transform, zoom: zoomAbs",
      "example": "<div class=\"color-one\" style=\"height: 300px;width: 400px\">content</div>"
    }
  ],
  "expose": [
    {
      "name": "resume",
      "description": "Pauses all interaction events"
    },
    {
      "name": "moveTo",
      "description": "Moves the content by specified delta @param {Number} dx - X-axis movement delta @param {Number} dy - Y-axis movement delta"
    },
    {
      "name": "zoomByRatio",
      "description": "Zooms by ratio from specific point @param {Number} clientX - X coordinate to zoom from @param {Number} clientY - Y coordinate to zoom from @param {Number} ratio - Zoom ratio @param {Boolean} easeFlag - Whether to trigger ease animation"
    }
  ],
  "provide": []
}
</script>