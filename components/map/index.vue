<template>
  <div ref="mapRef"
       :style="{
          '--map-image-layers':`url(${iconLayers})`
  }"
       :class="{[`${$r.prefix}map`]:true,'map-dark': dark, 'attribution-show': attribution }"
  >
    <div class="map-search" v-if="searchBox">
      <r-search-box
          :label="$t('search','renusify')"
          :notFoundMsg="$t('map_not_found','renusify')"
          no-overlay
          query="q"
          url="https://nominatim.openstreetmap.org/search.php?polygon_geojson=0&accept-language=fa&countrycodes=IR&format=jsonv2"
          @select="go"
      >
        <template v-slot="{ item }">
          {{ item["display_name"] }}
        </template>
      </r-search-box>
    </div>
    <div class="map-box" :id="map_id" :style="`height: ${height}`"></div>

    <r-btn
        v-if="meLocation"
        :loading="loading"
        class="map-location color-white color-black-text"
        icon
        @click.prevent="showConfirm"
    >
      <r-icon v-html="$r.icons.gps"></r-icon>
    </r-btn>
    <r-btn
        class="map-attribution color-white color-black-text"
        icon
        size="xs"
        @click.prevent="attribution = !attribution"
    >
      C
    </r-btn>

    <r-confirm v-model="confirm"
               @accept="getLocation"
               @cancel="confirm = false" :text="$t('map_location_confirm','renusify')"></r-confirm>
  </div>

</template>

<script setup>
import {ref, computed, onMounted, onUnmounted, watch, inject, nextTick} from 'vue'
import './leaflet.css'

const props = defineProps({
  /**
   * Two-way binding for selected locations/markers
   * @type {Array}
   * @model
   * @description Array of selected marker coordinates or location data.
   * Updates when markers are added/removed via user interaction.
   * @example [[35.6997, 51.3380], [35.7000, 51.3400]]
   */
  modelValue: Array,

  /**
   * Map container height
   * @type {String}
   * @default '500px'
   * @description CSS height for the map container.
   * Accepts any valid CSS height value.
   * @example '400px'
   * @example '80vh'
   * @example '100%'
   */
  height: {type: String, default: "500px"},

  /**
   * Initial zoom level
   * @type {Number}
   * @default 13
   * @description Initial zoom level of the map (0-20 typical range).
   * Higher values = more zoomed in.
   * @example 10 // World view
   * @example 15 // City view
   * @example 18 // Street view
   */
  zoom: {type: Number, default: 13},

  /**
   * Initial map center coordinates
   * @type {Array<Number>}
   * @default [35.69973857757377, 51.33806092139637] // Tehran coordinates
   * @description [latitude, longitude] pair for initial map center.
   * @example [40.7128, -74.0060] // New York
   * @example [51.5074, -0.1278] // London
   * @example [35.6895, 139.6917] // Tokyo
   */
  center: {
    type: Array,
    default: () => [35.69973857757377, 51.33806092139637]
  },

  /**
   * Array of markers to display
   * @type {Array<Object|Array>}
   * @default () => []
   * @description Markers to display on the map. Can be:
   * - Simple coordinate arrays: [[lat, lng], [lat, lng]]
   * - Marker objects with properties: {lat, lng, title, popup, icon}
   * @example [[35.6997, 51.3380]]
   * @example [{lat: 35.6997, lng: 51.3380, title: 'Tehran'}]
   */
  markers: {
    type: Array,
    default: () => []
  },

  /**
   * Enable search/geocoding box
   * @type {Boolean}
   * @default false
   * @description Shows a search input for finding locations.
   * Uses geocoding service to convert addresses to coordinates.
   */
  searchBox: Boolean,

  /**
   * Show zoom controls
   * @type {Boolean}
   * @default true
   * @description Display +/- zoom buttons on the map.
   */
  zoomControl: {type: Boolean, default: true},

  /**
   * Show layer controls
   * @type {Boolean}
   * @default true
   * @description Display layer switcher (base maps, overlays).
   */
  layerControl: {type: Boolean, default: true},

  /**
   * Enable "My Location" feature
   * @type {Boolean}
   * @default true
   * @description Shows a button to center map on user's current location.
   * Requires browser geolocation permissions.
   */
  meLocation: {type: Boolean, default: true},

  /**
   * Disable map panning/dragging
   * @type {Boolean}
   * @default false
   * @description Prevents users from moving/panning the map.
   * Useful for static map views.
   */
  disableMove: {type: Boolean, default: false},

  /**
   * Enable dark mode theme
   * @type {Boolean}
   * @default false
   * @description Applies dark theme to map tiles and controls.
   * Uses dark base maps when available.
   */
  darkMode: Boolean,

  /**
   * Custom marker icon image URL
   * @type {String}
   * @description URL to custom marker icon image.
   * Overrides default marker icon for all markers.
   * @example '/assets/marker.png'
   * @example 'https://example.com/pin.png'
   */
  mapImageMarker: String,

  /**
   * Custom layer tile URL template
   * @type {String}
   * @description URL template for custom map tile layers.
   * Uses Leaflet tile layer syntax with {x}, {y}, {z} placeholders.
   * @example 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
   * @example '/tiles/{z}/{x}/{y}.png'
   */
  mapImageLayers: String
})

const emit = defineEmits([
  /**
   * Emitted when map data changes
   * @event update:modelValue
   * @param {Array} value - Updated array of selected locations/markers
   */
  'update:modelValue',

  /**
   * Emitted for Leaflet.js events
   * @description Forwarded Leaflet.js map events for custom handling.
   */
  'leaflet',

  /**
   * Emitted when map instance is ready
   * @description Provides direct access to Leaflet map object for advanced usage.
   */
  'map'
])

const {$r, $helper, $t, $toast, $storage} = inject('renusify')

const timeout_id = ref(null)
const dark = ref(props.darkMode)
const attribution = ref(false)
const confirm = ref(false)
const loading = ref(false)
const L = ref(null)
const map = ref(null)
const layerGroup = ref(null)
const layers = ref({})
const mapRef = ref(null)

const map_id = computed(() => `map_${$helper?.uniqueId(12) || Date.now()}`)
const license = '&copy; | <a href="https://leafletjs.com" target="_blank">Leaflet</a> | <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | Renusify'

const iconLayers = computed(() => {
  if (props.mapImageLayers) {
    return props.mapImageLayers
  }
  return require('./images/layers.png')
})

const iconMarker = computed(() => {
  if (props.mapImageMarker) {
    return props.mapImageMarker
  }
  return require('./images/marker-icon.png')
})


const showConfirm = () => {
  if ($storage?.has('map_location_access')) {
    getLocation()
  } else {
    confirm.value = true
  }
}

const go = (e) => {
  if (e.lat) {
    emit("update:modelValue", [parseFloat(e.lat), parseFloat(e.lon)])
  }
}

const initMap = () => {
  const opt = {
    maxZoom: 19,
    zoomControl: false,
    minZoom: 3,
    noWrap: true
  }

  layers.value[$t('map_hot', 'renusify')] = L.value.tileLayer(
      "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      opt
  )

  opt.dark = true
  layers.value[$t('map_hot_dark', 'renusify')] = L.value.tileLayer(
      "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      opt
  )

  opt.dark = false
  layers.value[$t('map_standard', 'renusify')] = L.value.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      opt
  )

  opt.dark = true
  layers.value[$t('map_standard_dark', 'renusify')] = L.value.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      opt
  )

  opt.dark = false
  opt.subdomains = ["mt0", "mt1", "mt2", "mt3"]
  layers.value[$t('map_google', 'renusify')] = L.value.tileLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      opt
  )

  opt.dark = true
  layers.value[$t('map_google_dark', 'renusify')] = L.value.tileLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      opt
  )

  opt.dark = false
  layers.value[$t('map_satelite', 'renusify')] = L.value.tileLayer(
      "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      opt
  )

  layers.value[$t('map_hot', 'renusify')].addTo(map.value)

  if (props.zoomControl) {
    L.value.control
        .zoom({
          zoomInTitle: $t?.("map_zoom_in", 'renusify') || "Zoom in",
          zoomOutTitle: $t?.("map_zoom_out", 'renusify') || "Zoom out"
        })
        .addTo(map.value)
  } else {
    map.value.touchZoom.disable()
    map.value.doubleClickZoom.disable()
    map.value.scrollWheelZoom.disable()
    map.value.boxZoom.disable()
    map.value.keyboard.disable()
  }

  if (props.layerControl) {
    L.value.control.layers(layers.value).addTo(map.value)
  }

  map.value.on("baselayerchange", (e) => {
    if ($helper?.ifHas(e, false, "layer", "options", "dark")) {
      dark.value = true
    } else {
      dark.value = props.darkMode
    }
  })

  map.value.on("move", (e) => {
    if (e.originalEvent) {
      clearTimeout(timeout_id.value)
      timeout_id.value = setTimeout(() => {
        const center = Object.values(map.value.getCenter())
        emit("update:modelValue", center)
      }, 100)
    }
  })
}

const run = () => {
  map.value = L.value.map(map_id.value, {
    center: props.center,
    zoom: props.zoom,
    zoomControl: false,
    dragging: !props.disableMove,
    tap: !props.disableMove
  })

  initMap()
  layerGroup.value = new L.value.layerGroup().addTo(map.value)
  printMarkers()
  emit("update:modelValue", props.center)
  emit("leaflet", L.value)
  emit("map", map.value)
  printCopy()
}

const printCopy = () => {
  nextTick(() => {
    const attr = mapRef.value?.querySelector('.leaflet-control-attribution')
    if (attr) {
      attr.innerHTML = license
    }
  })
}

const printMarkers = () => {
  if (!layerGroup.value) return

  layerGroup.value.clearLayers()
  props.markers.forEach((item) => {
    const options = {riseOnHover: true, item: item}

    if (item.icon) {
      options.icon = new L.value.icon(item.icon)
    } else {
      options.icon = new L.value.icon({
        iconUrl: iconMarker.value,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      })
    }

    const marker = new L.value.Marker(item.loc, options)
    marker.addTo(layerGroup.value)

    if (item.popup) {
      marker.bindPopup(item.popup)
    }
    if (item.open_popup) {
      marker.openPopup()
    }
    if (item.tooltip) {
      marker.bindTooltip(item.tooltip)
    }
    if (item.open_tooltip) {
      marker.openTooltip()
    }
    if (item.click) {
      marker.on('click', item.click)
    }
  })
}

const getLocation = () => {
  if ($storage) {
    $storage.set('map_location_access', true)
  }
  confirm.value = false
  loading.value = true

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError)
  } else {
    loading.value = false
    if ($toast) {
      $toast($t?.("map_not_support_location", 'renusify') || "Geolocation not supported", {type: "error"})
    }
  }
}

const showPosition = (position) => {
  map.value.flyTo([position.coords.latitude, position.coords.longitude])
  map.value.zoom = 18
  loading.value = false
}

const showError = (error) => {
  loading.value = false

  if (!$toast) return

  switch (error.code) {
    case error.PERMISSION_DENIED:
      $toast($t?.("map_access_denied", 'renusify') || "Location access denied", {type: "error"})
      break
    default:
      $toast($t?.("map_unavailable", 'renusify') || "Location unavailable", {type: "error"})
      break
  }
}

const add = () => {
  import('./leaflet.js').then(() => {
    L.value = global.L
    run()
  })
}

watch(() => props.modelValue, (newValue) => {
  if (map.value && newValue) {
    map.value.flyTo(newValue)
  }
})

watch(() => props.markers, () => {
  printMarkers()
})

onMounted(() => {
  add()
})

onUnmounted(() => {
  if (timeout_id.value) {
    clearTimeout(timeout_id.value)
  }
  if (map.value) {
    map.value.remove()
  }
})
</script>

<style lang="scss">
@use "../../style" as *;

.#{$prefix}map {
  position: relative;

  .leaflet-popup {
    max-width: 250px;
  }

  .leaflet-popup-content {
    text-align: center;
  }

  .map-box {
    z-index: 1;
  }

  .map-search {
    width: 400px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;
    z-index: 2;
    max-width: calc(100vw - 130px);
  }

  .map-location {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 2;
  }

  &.map-dark .leaflet-tile {
    -webkit-filter: hue-rotate(180deg) invert(100%);
  }

  .map-attribution {
    position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 2;
  }

  .leaflet-control-attribution {
    transition: all 0.3s ease-in-out;
    position: absolute;
    bottom: -30px;
    right: 0;
    width: 100vw;
    direction: ltr;
  }

  &.attribution-show {
    .map-attribution {
      bottom: 20px;
    }

    .leaflet-control-attribution {
      bottom: 0;
    }
  }
}
</style>
