<template>
  <div :class="`${$r.prefix}map-select`">
    <r-map :center="center"
           :height="height"
           :zoom="zoom" search-box @leaflet="handleLEvent"
           @map="handleMapEvent"
           @update:model-value="emitValue"
    ></r-map>
  </div>
</template>
<script setup>
import {ref, inject, computed} from 'vue'

const props = defineProps({
  /**
   * Selected location coordinates
   * @type {Array<Number>}
   * @model
   * @description Two-way binding for the selected [latitude, longitude] coordinates.
   * Updates when user clicks or drags the marker on the map.
   * @example [35.6997, 51.3380] // Tehran coordinates
   * @example [40.7128, -74.0060] // New York coordinates
   */
  modelValue: Array,

  /**
   * Map container height
   * @type {String}
   * @default '500px'
   * @description CSS height for the map container.
   * Accepts any valid CSS height value.
   * @example '300px'
   * @example '70vh'
   * @example '100%'
   */
  height: {type: String, default: "500px"},

  /**
   * Initial zoom level
   * @type {Number}
   * @default 13
   * @description Initial zoom level of the map (0-20 typical range).
   * Higher values = more zoomed in.
   * @example 10 // City overview
   * @example 15 // Neighborhood view
   * @example 18 // Street view
   */
  zoom: {type: Number, default: 13},

  /**
   * Custom marker icon image URL
   * @type {String}
   * @description URL to a custom marker icon image.
   * Overrides the default marker icon.
   * Recommended size: 30x30 pixels with anchor at bottom center.
   * @example '/assets/custom-marker.png'
   * @example 'https://example.com/pin-icon.png'
   */
  mapImageMarker: String
})

const emit = defineEmits([
  /**
   * Updated [latitude, longitude] coordinates
   */
  'update:modelValue'
])

const {$t, $r} = inject('renusify')

const map = ref(null)
const L = ref(null)
const marker = ref(null)
const center = ref(props.modelValue || [35.69973857757377, 51.33806092139637])

const iconMarker = computed(() => {
  if (props.mapImageMarker) {
    return props.mapImageMarker
  }
  return require('./images/marker-icon.png')
})

const handleLEvent = (e) => {
  L.value = e
}

const handleMapEvent = (e) => {
  map.value = e
  selection()
}

const selection = () => {
  emit("update:modelValue", center.value);

  marker.value = new L.value.Marker(center.value, {
    icon: new L.value.icon({
      iconUrl: iconMarker.value,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    }),
    draggable: true
  });

  map.value.addLayer(marker.value);

  marker.value.bindPopup($t("map_move_to_location", 'renusify')).openPopup();

  marker.value.on('dragend', function (event) {
    const marker = event.target;
    const position = marker.getLatLng();
    emitValue([position.lat, position.lng]);
  });

  map.value.on('click', function (event) {
    emitValue([event.latlng.lat, event.latlng.lng]);
  });
}

const emitValue = (e) => {
  center.value = e
  emit("update:modelValue", center.value);

  if (marker.value) {
    marker.value.setLatLng(center.value);
    map.value.closePopup();
  }
}
</script>

