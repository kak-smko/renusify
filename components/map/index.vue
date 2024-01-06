<template>
  <div ref="map"
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
      <r-icon v-html="$r.icons.crosshairs_gps"></r-icon>
    </r-btn>
    <r-btn
        class="map-attribution color-white color-black-text"
        icon
        size="x-small"
        @click.prevent="attribution = !attribution"
    >
      C
    </r-btn>

    <r-confirm v-model="confirm"
               @accept="getLocation"
               @cancel="confirm = false" :text="$t('map_location_confirm','renusify')"></r-confirm>
  </div>

</template>

<script>
export default {
  name: "rMap",
  props: {
    modelValue: Array,
    height: {type: String, default: "500px"},
    zoom: {type: Number, default: 13},
    center: {
      type: Array,
      default: () => {
        return [
          35.69973857757377,
          51.33806092139637
        ];
      }
    },
    markers: {
      type: Array,
      default: () => {
        return [];
      }
    },
    searchBox: Boolean,
    zoomControl: {type: Boolean, default: true},
    layerControl: {type: Boolean, default: true},
    meLocation: {type: Boolean, default: true},
    disableMove: {type: Boolean, default: false},
    darkMode: Boolean,
    mapImageMarker: String,
    mapImageLayers: String
  },
  data() {
    return {
      timeout_id: null,
      dark: this.darkMode,
      attribution: false,
      confirm: false,
      loading: false,
      L: null,
      map: null,
      layerGroup: null,
      map_id: "map_" + this.$helper.uniqueId(12),
      layers: {},
      license: '&copy; | <a href="https://leafletjs.com" target="_blank">Leaflet</a> | <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | Renusify'
    };
  },
  emits: ['update:modelValue', 'leaflet', 'map'],
  created() {
    if (!this.$r.icons.crosshairs_gps) {
      this.$r.icons.crosshairs_gps = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m-8.95 5H1v-2h2.05C3.5 6.83 6.83 3.5 11 3.05V1h2v2.05c4.17.45 7.5 3.78 7.95 7.95H23v2h-2.05c-.45 4.17-3.78 7.5-7.95 7.95V23h-2v-2.05C6.83 20.5 3.5 17.17 3.05 13M12 5a7 7 0 0 0-7 7a7 7 0 0 0 7 7a7 7 0 0 0 7-7a7 7 0 0 0-7-7Z"/></svg>'
    }
  },
  async beforeMount() {
    await this.add();
  },
  watch: {
    modelValue: function (n, o) {
      this.map.flyTo(this.modelValue);
    },
    markers: function () {
      this.printMarkers()
    }
  },
  computed: {
    iconLayers() {
      if (this.mapImageLayers) {
        return this.mapImageLayers
      }
      return require('./images/layers.png')
    },
    iconMarker() {
      if (this.mapImageMarker) {
        return this.mapImageMarker
      }
      return require('./images/marker-icon.png')
    }
  },
  methods: {
    showConfirm() {
      if (this.$storage.has('map_location_access')) {
        this.getLocation()
      } else {
        this.confirm = true
      }
    },
    go(e) {
      if (e.lat) {
        this.$emit("update:modelValue", [parseFloat(e.lat), parseFloat(e.lon)]);
      }
    },
    initMap() {
      let opt = {
        maxZoom: 19,
        zoomControl: false,
        minZoom: 3,
        noWrap: true
      };
      this.layers[this.$t('map_hot', 'renusify')] = this.L.tileLayer(
          "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
          opt
      );
      opt.dark = true;
      this.layers[this.$t('map_hot_dark', 'renusify')] = this.L.tileLayer(
          "https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png",
          opt
      );
      opt.dark = false;
      this.layers[this.$t('map_standard', 'renusify')] = this.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          opt
      );
      opt.dark = true;
      this.layers[this.$t('map_standard_dark', 'renusify')] = this.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          opt
      );
      opt.dark = false;
      opt.subdomains = ["mt0", "mt1", "mt2", "mt3"];
      this.layers[this.$t('map_google', 'renusify')] = this.L.tileLayer(
          "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
          opt
      );
      opt.dark = true;
      this.layers[this.$t('map_google_dark', 'renusify')] = this.L.tileLayer(
          "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
          opt
      );
      opt.dark = false;
      this.layers[this.$t('map_satelite', 'renusify')] = this.L.tileLayer(
          "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
          opt
      );

      this.layers[this.$t('map_hot', 'renusify')].addTo(this.map);
      if (this.zoomControl) {
        this.L.control
            .zoom({
              zoomInTitle: this.$t("map_zoom_in", 'renusify'),
              zoomOutTitle: this.$t("map_zoom_out", 'renusify')
            })
            .addTo(this.map);
      } else {
        this.map.touchZoom.disable();
        this.map.doubleClickZoom.disable();
        this.map.scrollWheelZoom.disable();
        this.map.boxZoom.disable();
        this.map.keyboard.disable();
      }
      if (this.layerControl) {
        this.L.control.layers(this.layers).addTo(this.map);
      }
      const that = this;
      this.map.on("baselayerchange", function (e) {
        if (that.$helper.ifHas(e, false, "layer", "options", "dark")) {
          that.dark = true;
        } else {
          that.dark = that.darkMode;
        }
      });
      this.map.on("move", function (e) {
        if (e.originalEvent) {
          clearTimeout(that.timeout_id)
          that.timeout_id = setTimeout(() => {
            that.$emit("update:modelValue", Object.values(that.map.getCenter()));
          }, 100)
        }
      });
    },
    run() {
      this.map = this.L.map(this.map_id, {
        center: this.center,
        zoom: this.zoom,
        zoomControl: false,
        dragging: !this.disableMove,
        tap: !this.disableMove
      });
      this.initMap();
      this.layerGroup = new this.L.layerGroup().addTo(this.map);
      this.printMarkers()
      this.$emit("update:modelValue", this.center);
      this.$emit("leaflet", this.L);
      this.$emit("map", this.map);
      this.printCopy()
    },
    printCopy() {
      const attr = this.$refs.map.querySelector('.leaflet-control-attribution')
      attr.innerHTML = '&copy; | <a href="https://leafletjs.com" target="_blank">Leaflet</a> | <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | Renusify'
    },
    printMarkers() {
      if (!this.layerGroup) {
        return
      }
      this.layerGroup.clearLayers();
      this.markers.forEach((item) => {
        let options = {riseOnHover: true, item: item}
        if (item.icon) {
          options.icon = new this.L.icon(item.icon);
        } else {
          options.icon = new this.L.icon({
            iconUrl: this.iconMarker,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
          });
        }
        let marker = new this.L.Marker(item.loc, options);
        marker.addTo(this.layerGroup)
        if (item.popup) {
          marker.bindPopup(item.popup);
        }
        if (item.open_popup) {
          marker.openPopup();
        }
        if (item.tooltip) {
          marker.bindTooltip(item.tooltip);
        }
        if (item.open_tooltip) {
          marker.openTooltip();
        }
        if (item.click) {
          marker.on('click', item.click)
        }
      })
    },
    getLocation() {
      this.$storage.set('map_location_access', true)
      this.confirm = false
      this.loading = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            this.showPosition,
            this.showError
        );
      } else {
        this.loading = false;
        this.$toast(this.$t("map_not_support_location", 'renusify'), {type: "error"});
      }
    },
    showPosition(position) {
      this.map.flyTo([position.coords.latitude, position.coords.longitude]);
      this.map.zoom = 18;
      this.loading = false;
    },
    showError(error) {
      this.loading = false;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.$toast(this.$t("map_access_denied", 'renusify'), {type: "error"});
          break;
        default:
          this.$toast(this.$t("map_unavailable", 'renusify'), {type: "error"});
          break;
      }
    },
    async add() {
      import('./leaflet.css')
      await import('./leaflet')
      this.L = global.L
      this.run();
    },
  }
};
</script>

<style lang="scss">
@import "~renusify/style/include";

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
