<template>
  <section>
    <r-meta title="rMap Component | Renusify" description="Document with example for Renusify rMap component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rMap Component
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
      "template": "<rMap \n v-model=\"modelValue\"\n :height=\"height\"\n :zoom=\"zoom\"\n :center=\"center\"\n :markers=\"markers\"\n :searchBox=\"searchBox\"\n :zoomControl=\"zoomControl\"\n :layerControl=\"layerControl\"\n :meLocation=\"meLocation\"\n :disableMove=\"disableMove\"\n :darkMode=\"darkMode\"\n :mapImageMarker=\"mapImageMarker\"\n :mapImageLayers=\"mapImageLayers\"\n@update:modelValue=\"log('update:modelValue',$event)\"\n@leaflet=\"log('leaflet',$event)\"\n@map=\"log('map',$event)\">\n</rMap>",
      "script": "import {ref} from 'vue';\n\nconst modelValue=ref(null)\nconst height=ref('500px')\nconst zoom=ref(13)\nconst center=ref(() => [35.69973857757377, 51.33806092139637])\nconst markers=ref(() => [])\nconst searchBox=ref(null)\nconst zoomControl=ref(true)\nconst layerControl=ref(true)\nconst meLocation=ref(true)\nconst disableMove=ref(false)\nconst darkMode=ref(null)\nconst mapImageMarker=ref(null)\nconst mapImageLayers=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "modelValue",
      "description": "Two-way binding for selected locations/markers @type {Array} @model @description Array of selected marker coordinates or location data. Updates when markers are added/removed via user interaction. @example [[35.6997, 51.3380], [35.7000, 51.3400]]",
      "type": "Array",
      "default": "undefined"
    },
    {
      "name": "height",
      "description": "Map container height @type {String} @default '500px' @description CSS height for the map container. Accepts any valid CSS height value. @example '400px' @example '80vh' @example '100%'",
      "type": "String",
      "default": "500px"
    },
    {
      "name": "zoom",
      "description": "Initial zoom level @type {Number} @default 13 @description Initial zoom level of the map (0-20 typical range). Higher values = more zoomed in. @example 10 // World view @example 15 // City view @example 18 // Street view",
      "type": "Number",
      "default": "13"
    },
    {
      "name": "center",
      "description": "Initial map center coordinates @type {Array<Number>} @default [35.69973857757377, 51.33806092139637] // Tehran coordinates @description [latitude, longitude] pair for initial map center. @example [40.7128, -74.0060] // New York @example [51.5074, -0.1278] // London @example [35.6895, 139.6917] // Tokyo",
      "type": "Array",
      "default": "() => [35.69973857757377, 51.33806092139637]"
    },
    {
      "name": "markers",
      "description": "Array of markers to display @type {Array<Object|Array>} @default () => [] @description Markers to display on the map. Can be: - Simple coordinate arrays: [[lat, lng], [lat, lng]] - Marker objects with properties: {lat, lng, title, popup, icon} @example [[35.6997, 51.3380]] @example [{lat: 35.6997, lng: 51.3380, title: 'Tehran'}]",
      "type": "Array",
      "default": "() => []"
    },
    {
      "name": "searchBox",
      "description": "Enable search/geocoding box @type {Boolean} @default false @description Shows a search input for finding locations. Uses geocoding service to convert addresses to coordinates.",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "zoomControl",
      "description": "Show zoom controls @type {Boolean} @default true @description Display +/- zoom buttons on the map.",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "layerControl",
      "description": "Show layer controls @type {Boolean} @default true @description Display layer switcher (base maps, overlays).",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "meLocation",
      "description": "Enable \"My Location\" feature @type {Boolean} @default true @description Shows a button to center map on user's current location. Requires browser geolocation permissions.",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "disableMove",
      "description": "Disable map panning/dragging @type {Boolean} @default false @description Prevents users from moving/panning the map. Useful for static map views.",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "darkMode",
      "description": "Enable dark mode theme @type {Boolean} @default false @description Applies dark theme to map tiles and controls. Uses dark base maps when available.",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "mapImageMarker",
      "description": "Custom marker icon image URL @type {String} @description URL to custom marker icon image. Overrides default marker icon for all markers. @example '/assets/marker.png' @example 'https://example.com/pin.png'",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "mapImageLayers",
      "description": "Custom layer tile URL template @type {String} @description URL template for custom map tile layers. Uses Leaflet tile layer syntax with {x}, {y}, {z} placeholders. @example 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' @example '/tiles/{z}/{x}/{y}.png'",
      "type": "String",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue",
      "description": "Emitted when map data changes @event update:modelValue",
      "params": "@param {Array} value - Updated array of selected locations/markers"
    },
    {
      "name": "leaflet",
      "description": "Emitted for Leaflet.js events @description Forwarded Leaflet.js map events for custom handling.",
      "params": ""
    },
    {
      "name": "map",
      "description": "Emitted when map instance is ready @description Provides direct access to Leaflet map object for advanced usage.",
      "params": ""
    }
  ],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>