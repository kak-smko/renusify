<template>
  <div :class="`${$r.prefix}map-select`">
    <r-map :center="center"
           :height="height"
           :zoom="zoom" search-box @leaflet="handleLEvent"
           @map="handleMapEvent"
           @update:model-value="emit"
    ></r-map>
  </div>
</template>
<script>
export default {
  name: 'r-map-select',
  props: {
    modelValue: Array,
    height: {type: String, default: "500px"},
    zoom: {type: Number, default: 13},
    mapImageMarker: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      map: null,
      L: null,
      marker: null,
      center: this.modelValue || [35.69973857757377, 51.33806092139637]
    }
  },
  computed: {
    iconMarker() {
      if (this.mapImageMarker) {
        return this.mapImageMarker
      }
      return require('./images/marker-icon.png')
    }
  },
  methods: {
    handleLEvent(e) {
      this.L = e
    },
    handleMapEvent(e) {
      this.map = e
      this.selection()
    },
    selection() {
      this.$emit("update:modelValue", this.center);
      this.marker = new this.L.Marker(this.center, {
        icon: new this.L.icon({
          iconUrl: this.iconMarker,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30]
        }),
      });
      this.map.addLayer(this.marker);
      this.marker.bindPopup(this.$t("map_move_to_location", 'renusify')).openPopup();

    },
    emit(e) {
      this.center = e
      this.$emit("update:modelValue", this.center);
      if (this.marker) {
        this.marker.setLatLng(this.center);
        this.map.closePopup();
      }

    }
  }
}
</script>
