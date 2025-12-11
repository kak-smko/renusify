<template>
  <section>
    <r-meta title="rMapRoute Component | Renusify"
            description="Document with example for Renusify rMapRoute component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rMapRoute Component
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
      "template": "<rMapRoute \n v-model=\"modelValue\"\n :by=\"by\"\n :height=\"height\"\n :marginTime=\"marginTime\"\n :color=\"color\"\n :maxPoints=\"maxPoints\"\n :darkMode=\"darkMode\"\n :editable=\"editable\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rMapRoute>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst by=ref('car')\nconst height=ref('500px')\nconst marginTime=ref(1)\nconst color=ref(() => [])\nconst maxPoints=ref(3)\nconst darkMode=ref(null)\nconst editable=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "Route data model value @type {Object} @model @description Contains route data including points, summary, and waypoints @property {Object} points - Waypoint coordinates keyed by unique IDs @property {Object} summary - Route summary with name, time, and distance @property {Array} waypoints - Detailed waypoint information @example { points: { 'abc123': [35.6997, 51.3380], 'def456': [35.7000, 51.3400] }, summary: { name: 'Tehran Route', time: 3600, distance: 5000 }, waypoints: [{ name: 'Start Point' }, { name: 'End Point' }] }",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "by",
      "description": "Transportation mode for route calculation @type {String} @default 'car' @validator ['car', 'foot', 'bike'] @description Determines which OSRM profile to use for routing - 'car': Optimized for car travel (fastest route) - 'foot': Optimized for walking (pedestrian paths) - 'bike': Optimized for cycling (bike lanes, lower gradients)",
      "type": "String",
      "default": "car"
    },
    {
      "name": "height",
      "description": "Map container height @type {String} @default '500px' @description CSS height for the map and sidebar container @example '400px' @example '80vh' @example '100%'",
      "type": "String",
      "default": "500px"
    },
    {
      "name": "marginTime",
      "description": "Time margin multiplier for route duration @type {Number} @default 1 @description Multiplier applied to calculated route time for buffer/planning @example 1.2 // Adds 20% buffer to estimated time @example 1.5 // Adds 50% buffer to estimated time",
      "type": "Number",
      "default": "1"
    },
    {
      "name": "color",
      "description": "Route line colors @type {Array<String>} @default [] @description Array of CSS color values for route segments between waypoints If array length < segments, colors cycle through available values @example ['#FF0000', '#00FF00'] // Red first segment, green second segment @example ['blue'] // All segments blue",
      "type": "Array",
      "default": "() => []"
    },
    {
      "name": "maxPoints",
      "description": "Maximum number of waypoints allowed @type {Number} @default 3 @description Limits the number of waypoints that can be added to the route @example 5 // Allows up to 5 waypoints @example 10 // Allows up to 10 waypoints",
      "type": "Number",
      "default": "3"
    },
    {
      "name": "darkMode",
      "description": "Enable dark mode for the map @type {Boolean} @default false @description Applies dark theme to the map display",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "editable",
      "description": "Enable waypoint editing features @type {Boolean} @default false @description When true, allows adding, deleting, dragging, and reordering waypoints",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Updated route data object",
      "params": ""
    }
  ],
  "slots": [
    {
      "name": "header",
      "description": "@slot Header slot for custom route summary display\n@binding {String} distance - Formatted distance string (e.g., \"15.25 km\")\n@binding {String} time - Human-readable time duration (e.g., \"2 hours 15 minutes\")",
      "props": "distance: distance, time: time"
    },
    {
      "name": "points",
      "description": "@slot Points slot for custom waypoints list display\n@binding {Function} add - Function to add a new waypoint\n@binding {Function} del - Function to delete a waypoint\n@binding {Function} open - Function to open a waypoint on the map\n@binding {Object} points - Object containing all waypoints\n@binding {Function} to - Function to reorder waypoints",
      "props": "add: add, del: del, open: open, points: points, to: to"
    },
    {
      "name": "footer",
      "description": "@slot Footer slot for additional content below the points list"
    }
  ],
  "expose": [],
  "provide": []
}
</script>