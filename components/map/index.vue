<template>
  <div ref="map"
       :class="{[`${$r.prefix}map`]:true,'map-dark': dark, 'attribution-show': attribution }"
  >
    <div class="map-search" v-if="searchBox">
      <r-search-box
          :label="$t('search','renusify')"
          @select="go"
          url="https://nominatim.openstreetmap.org/search.php?polygon_geojson=0&accept-language=fa&countrycodes=IR&format=jsonv2"
          query="q"
          no-overlay
          inputControlClass="sheet"
          :notFoundMsg="$t('map_not_found','renusify')"
      >
        <template v-slot="{ item }">
          {{ item["display_name"] }}
        </template>
      </r-search-box>
    </div>
    <div class="map-box" :id="map_id" :style="`height: ${height}`"></div>

    <r-btn
        v-if="meLocation"
        class="map-location color-white color-primary-text"
        icon
        @click.prevent="showConfirm"
        :loading="loading"
    >
      <r-icon v-html="$r.icons.crosshairs_gps"></r-icon>
    </r-btn>
    <r-btn
        class="map-attribution color-white color-primary-text"
        @click.prevent="attribution = !attribution"
        size="x-small"
        icon
    >
      <r-icon v-html="$r.icons.copyright" exact></r-icon>
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
        return [35.69940749291485, 51.33705139160157];
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
    darkMode: Boolean
  },
  data() {
    return {
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
  emits:['update:modelValue','leaflet','map'],
  created() {
    if (!this.$r.icons.crosshairs_gps) {
      this.$r.icons.crosshairs_gps = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 8a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m-8.95 5H1v-2h2.05C3.5 6.83 6.83 3.5 11 3.05V1h2v2.05c4.17.45 7.5 3.78 7.95 7.95H23v2h-2.05c-.45 4.17-3.78 7.5-7.95 7.95V23h-2v-2.05C6.83 20.5 3.5 17.17 3.05 13M12 5a7 7 0 0 0-7 7a7 7 0 0 0 7 7a7 7 0 0 0 7-7a7 7 0 0 0-7-7Z"/></svg>'
    }
    if (!this.$r.icons.copyright) {
      this.$r.icons.copyright = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M10.08 10.86c.05-.33.16-.62.3-.86c.3-.56.81-.85 1.5-.86c.45 0 .86.2 1.15.49c.28.31.47.74.47 1.17h1.8c-.02-.47-.11-.9-.3-1.3c-.15-.38-.38-.72-.68-1c-1.45-1.34-4.14-1.15-5.37.37c-1.29 1.67-1.32 4.59-.01 6.26c1.21 1.49 3.86 1.7 5.3.37c.31-.25.56-.56.76-.92c.16-.36.27-.74.28-1.15H13.5c0 .21-.07.4-.16.57c-.09.19-.21.34-.34.47c-.33.26-.72.4-1.14.4c-.36-.01-.66-.08-.89-.23a1.41 1.41 0 0 1-.59-.64c-.5-.9-.42-2.15-.3-3.14M12 2C6.5 2 2 6.5 2 12c.53 13.27 19.5 13.26 20 0c0-5.5-4.5-10-10-10m0 18c-4.41 0-8-3.59-8-8c.44-10.61 15.56-10.61 16 0c0 4.41-3.59 8-8 8Z"/></svg>'
    }
  },
  async beforeMount() {
    await this.add();
  },
  watch: {
    modelValue: function () {
      this.map.flyTo(this.modelValue);
    },
    markers: function () {
      this.printMarkers()
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
        this.map.flyTo([e.lat, e.lon]);
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
      this.map.on("move", function () {
        that.$emit("update:modelValue", Object.values(that.map.getCenter()));
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
