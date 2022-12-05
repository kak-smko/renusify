<template>
    <div :class="`${$r.prefix}map-select`">
      <r-map @update:model-value="emit"
             :center="center"
             search-box @map="handleMapEvent" @leaflet="handleLEvent"
             :zoom="zoom"
             :height="height"
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
      },
      data() {
        return {
          map: null,
          L: null,
          marker: null,
          center: this.modelValue || [35.69940749291485, 51.33705139160157]
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
                this.marker = new this.L.Marker(this.center);
                this.map.addLayer(this.marker);
                this.marker.bindPopup(this.$t("map_move_to_location",'renusify')).openPopup();

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