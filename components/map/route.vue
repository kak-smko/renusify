<template>
  <r-container :class="`${$r.prefix}map-route pa-0`">
    <r-row class="no-gutters">
      <r-col class="col-12 sm-9">
        <r-map :dark-mode="darkMode" :height="height" :model-value="center" :zoom="15" search-box
               @leaflet="handleLEvent" @map="handleMapEvent"></r-map>
      </r-col>
      <r-col :style="'height: '+height" class="overflow-y-auto col-12 sm-3">
        <div class="pa-2">
          <slot :distance="distance" :time="time" name="header">
            <div class="bodey-1">{{ $helper.ifHas(modelValue, '------', 'summary', 'name') }}</div>
            <r-divider class="my-3"></r-divider>
            <div>{{ time || '---' }}</div>
            <div>{{ distance || '0 km' }}</div>
          </slot>
          <slot :add="add" :del="del" :open="open" :points="points" :to="to" name="points">
            <transition-group name="slide-up">
              <div v-for="(point,i) in points"
                   :key="i" class="route-point px-2 py-1 my-2 br-lg text-end">
                <div class="d-flex">
                  <span class="mt-1 bodey-3">{{ pos(points_keys.indexOf(i)) }}</span>
                  <r-spacer></r-spacer>
                  <r-btn v-if="editable && i!==points_keys[0]" icon text
                         @click.prevent="to(points_keys.indexOf(i),points_keys.indexOf(i)-1)">
                    <r-icon v-html="$r.icons.arrow_up"></r-icon>
                  </r-btn>
                  <r-btn v-if="editable && i!==points_keys[points_keys.length-1]" icon text
                         @click.prevent="to(points_keys.indexOf(i),points_keys.indexOf(i)+1)">
                    <r-icon v-html="$r.icons.arrow_down"></r-icon>
                  </r-btn>
                  <r-btn v-if="editable" class="color-error-text" icon text @click.prevent="del(i)">
                    <r-icon v-html="$r.icons.delete"></r-icon>
                  </r-btn>
                </div>
                <div class="py-2 route-name text-start" @click.prevent="open(points_keys.indexOf(i))">
                  <r-icon v-html="$r.icons.map_marker"></r-icon>
                  {{ $helper.ifHas(modelValue, '', 'waypoints', points_keys.indexOf(i), 'name') }}
                </div>
              </div>
            </transition-group>
            <r-btn v-if="editable && points_keys.length<maxPoints" :loading="loading" block class="color-success-text"
                   outlined rounded
                   @click.prevent="add">
              <r-icon v-html="$r.icons.plus"></r-icon>
              <span>{{ $t('map_new_point', 'renusify') }}</span>
            </r-btn>
          </slot>
          <slot name="footer"></slot>
        </div>
      </r-col>
    </r-row>
  </r-container>
</template>
<script>
export default {
  name: 'r-map-route',
  props: {
    modelValue: Object,
    by: {
      type: String, default: 'car', validator: function (value) {
        return ['car', 'foot', 'bike'].indexOf(value) !== -1
      }
    },
    height: {type: String, default: "500px"},
    marginTime: {type: Number, default: 1},
    color: {
      type: Array, default: () => {
        return []
      }
    },
    maxPoints: {type: Number, default: 3},
    darkMode: Boolean,
    editable: Boolean
  },
  emits: ['update:modelValue'],
  data() {
    return {
      loading: false,
      timeout_id: null,
      req_id: null,
      map: null,
      L: null,
      center: [],
      markers: null,
      lines: null,
      routing: {},
      points: this.$helper.ifHas(this.modelValue, {}, 'points')
    }
  },
  created() {
    this.get()
    if (!this.$r.icons.map_marker) {
      this.$r.icons.map_marker = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24\" viewBox="0 0 24 24"><path fill="currentColor" d="M12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7m0 2a5 5 0 0 0-5 5c0 1 0 3 5 9.71C17 12 17 10 17 9a5 5 0 0 0-5-5Z"/></svg>'
    }
  },
  computed: {
    points_keys() {
      return Object.keys(this.points)
    },
    points_vals() {
      return Object.values(this.points)
    },
    time() {
      return this.timeHumanity(this.$helper.ifHas(this.modelValue, 0, 'summary', 'time'))
    },
    distance() {
      if (!this.$helper.ifHas(this.modelValue, false, 'summary', 'distance')) {
        return ''
      }

      return ((this.modelValue.summary.distance / 1000).toFixed(2)) + ' km'
    },
    iconOrigin() {
      return require('./images/origin.png')
    },
    iconPoint() {
      return require('./images/point.png')
    },
    iconDestination() {
      return require('./images/destination.png')
    }
  },
  methods: {
    pos(i) {
      let n = i + 1
      if (i === 0) {
        n = this.$t('map_origin', 'renusify')
      } else if (i === this.points_vals.length - 1) {
        n = this.$t('map_destination', 'renusify')
      }
      return this.$t(['map_point', [n]], 'renusify')
    },
    name(i) {
      return this.pos(i) + ': ' + this.$helper.ifHas(this.modelValue, '', 'waypoints', i, 'name')
    },
    open(i) {
      this.center = Object.values(Object.values(this.markers._layers)[i]._latlng)
      Object.values(this.markers._layers)[i].openPopup()
    },
    del(i) {
      delete this.points[i]
      this.get()
    },
    array_move(arr, old, new_pos) {
      if (new_pos >= arr.length) {
        var k = new_pos - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_pos, 0, arr.splice(old, 1)[0]);
      return arr
    },
    to(i, pos) {
      const val = this.array_move(this.points_vals, i, pos)
      const key = this.array_move(this.points_keys, i, pos)
      const way = this.array_move(this.modelValue.waypoints, i, pos)
      let res = {}
      key.forEach((item, i) => {
        res[item] = val[i]
      })
      this.points = res
      this.$emit('update:modelValue', {
        'points': this.points,
        'summary': this.modelValue.summary,
        'waypoints': way
      })
      setTimeout(() => {
        this.get()
      }, 800)
    },
    openLastPopup(n = 0) {
      clearTimeout(this.timeout_id)
      if (Object.values(this.markers._layers)[this.points_vals.length - 1] === undefined) {
        this.timeout_id = setTimeout(() => {
          if (n < 10) {
            this.openLastPopup(n + 1)
          }
        }, 1000)
        return
      }
      Object.values(this.markers._layers)[this.points_vals.length - 1].openPopup()
    },
    add() {
      this.loading = true
      this.points[this.$helper.uniqueId(12)] = Object.values(this.map.getCenter())
      this.get()
      this.openLastPopup()
      this.loading = false
    },
    timeHumanity(seconds) {
      const numyears = Math.floor(seconds / 31536000);
      const numdays = Math.floor((seconds % 31536000) / 86400);
      const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
      const numminutes = Math.ceil((((seconds % 31536000) % 86400) % 3600) / 60);
      let res = ''
      if (numyears > 0) {
        res += numyears + ' ' + this.$t("years", 'renusify')
      }
      if (numdays > 0) {
        res += ' ' + numdays + ' ' + this.$t("days", 'renusify')
      }
      if (numhours > 0) {
        res += ' ' + numhours + ' ' + this.$t("hours", 'renusify')
      }
      if (numminutes > 0) {
        res += ' ' + numminutes + ' ' + this.$t("minutes", 'renusify')
      }
      return res
    },
    handleLEvent(e) {
      this.L = e
    },
    handleMapEvent(e) {
      this.map = e
      if (this.points_vals.length > 0) {
        this.center = this.points_vals[0]
      }
    },
    drawMarkers() {
      if (!this.L) {
        return
      }
      if (this.markers) {
        this.map.removeLayer(this.markers)
      }
      const all = []
      const that = this

      this.points_vals.forEach((point, i) => {
        let icon = this.iconPoint
        if (i === 0) {
          icon = this.iconOrigin
        } else if (i === this.points_vals.length - 1) {
          icon = this.iconDestination
        }
        let m = new this.L.Marker(point, {
          draggable: this.editable,
          index: this.points_keys[i],
          icon: new this.L.icon({
            iconUrl: icon,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -40]
          })
        })
        m.bindPopup(this.$t('map_move_marker', 'renusify') + '<hr>' + this.name(i))
        m.on('drag', function (e) {
          that.points[e.target.options.index] = Object.values(e.latlng)
        });
        m.on('dragend', function (e) {
          that.get()
        });
        all.push(m)
      })
      this.markers = this.L.layerGroup(all);
      this.map.addLayer(this.markers);
    },
    draw() {
      if (this.routing.code !== 'Ok' || !this.L || !this.routing.routes) {
        return
      }

      let alts = {'points': this.points, 'routes': [], 'summary': {'name': '', 'time': 0, 'distance': 0}}
      const lng = Object.values(this.routing.routes).length
      for (let i = 0; i < lng; i++) {
        let route = this._convertRoute(this.routing.routes[i]);
        alts.routes.push(route);
        alts.summary.name = route['name']
        alts.summary.time += parseFloat(route.summary.total_time) * this.marginTime
        alts.summary.distance += parseFloat(route.summary.total_distance)
      }
      alts.waypoints = this.routing.waypoints
      alts.waypoints.forEach((item) => {
        delete item.hint
        delete item.location
      })

      this.$emit('update:modelValue', {
        'points': alts.points,
        'summary': alts.summary,
        'waypoints': alts.waypoints
      })
      let l = []
      alts.routes[0].waypointIndices.forEach((item, i) => {
        if (i < alts.routes[0].waypointIndices.length - 1) {
          const p = alts.routes[0].coordinates.slice(item, alts.routes[0].waypointIndices[i + 1])
          let color = 'red'
          if (this.color[i]) {
            color = this.color[i]
          } else if (this.color.length > 0) {
            color = i % 2 === 0 ? this.color[0] : (this.color[1] || this.color[0])
          }

          l.push(new L.polyline(p, {color: color, weight: 5}))
        }
      })
      this.lines = L.layerGroup(l);
      setTimeout(() => {
        this.map.addLayer(this.lines);
        this.drawMarkers()
      }, 1)
    },
    get() {
      this.$emit('update:modelValue', {
        'points': this.points,
        'summary': {},
        'waypoints': []
      })
      this.drawMarkers()
      if (this.lines) {
        this.map.removeLayer(this.lines);
      }
      if (this.points_vals.length < 2) {
        return
      }
      const that = this
      let url = 'https://routing.openstreetmap.de/routed-' + this.by + '/route/v1/driving/'
      this.points_vals.forEach(point => {
        url += point[1] + ',' + point[0] + ';'
      })
      url = url.substr(0, url.length - 1) + '?overview=false&steps=true'

      this.corslite(url, function (err, resp) {
        if (!err) {
          try {
            that.routing = JSON.parse(resp.responseText);
            that.draw()
          } catch (e) {
            console.error('Error parsing OSRM response: ' + e.toString())
          }
        } else {
          console.error('HTTP request failed: ' + err.type +
              (err.target && err.target.status ? ' HTTP ' + err.target.status + ': ' + err.target.statusText : ''))
        }
      })
    },
    corslite(url, callback) {
      if (typeof window.XMLHttpRequest === 'undefined') {
        return callback(Error('Browser not supported'));
      }
      if (this.req_id) {
        this.req_id.abort()
      }
      let x = new window.XMLHttpRequest();

      function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
      }

      function loaded() {
        if (
            // XDomainRequest
            x.status === undefined ||
            // modern browsers
            isSuccessful(x.status)) callback.call(x, null, x);
        else callback.call(x, x, null);
      }

      if ('onload' in x) {
        x.onload = loaded;
      } else {
        x.onreadystatechange = function readystate() {
          if (x.readyState === 4) {
            loaded();
          }
        };
      }
      x.timeout = 7000;
      x.onerror = function error(e) {
        callback.call(this, e || true, null);
        callback = function () {
        };
      };

      x.onprogress = function () {
      };

      x.ontimeout = function (e) {
        callback.call(this, e, null);
        callback = function () {
        };
      };

      x.onabort = function (e) {
        callback.call(this, e, null);
        callback = function () {
        };
      };

      x.open('GET', url, true);

      x.send(null);
      this.req_id = x
      return x;
    },
    _convertRoute: function (responseRoute) {
      var result = {
            name: '',
            coordinates: [],
            instructions: [],
            summary: {
              total_distance: responseRoute.distance,
              total_time: responseRoute.duration
            }
          },
          legNames = [],
          waypointIndices = [],
          index = 0,
          legCount = responseRoute.legs.length,
          hasSteps = responseRoute.legs[0].steps.length > 0,
          i,
          j,
          leg,
          step,
          geometry,
          type,
          modifier,
          text


      for (i = 0; i < legCount; i++) {
        leg = responseRoute.legs[i];
        legNames.push(leg.summary && leg.summary.charAt(0).toUpperCase() + leg.summary.substring(1));
        const lng = leg.steps.length
        for (j = 0; j < lng; j++) {
          step = leg.steps[j];
          geometry = this._decodePolyline(step.geometry);
          result.coordinates.push.apply(result.coordinates, geometry);
          type = this._maneuverToInstructionType(step.maneuver, i === legCount - 1);
          modifier = this._maneuverToModifier(step.maneuver);
          text = [step, {legCount: legCount, legIndex: i}];

          if (type) {
            if ((i == 0 && step.maneuver.type == 'depart') || step.maneuver.type == 'arrive') {
              waypointIndices.push(index);
            }

            result.instructions.push({
              type: type,
              distance: step.distance,
              time: step.duration,
              road: step.name,
              direction: this._bearingToDirection(step.maneuver.bearing_after),
              exit: step.maneuver.exit,
              index: index,
              mode: step.mode,
              modifier: modifier,
              text: text
            });
          }

          index += geometry.length;
        }
      }

      result.name = legNames.join(', ');
      if (!hasSteps) {
        result.coordinates = this._decodePolyline(responseRoute.geometry);
      } else {
        result.waypointIndices = waypointIndices;
      }

      return result;
    },
    _bearingToDirection: function (bearing) {
      var oct = Math.round(bearing / 45) % 8;
      return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][oct];
    },
    _maneuverToInstructionType: function (maneuver, lastLeg) {
      switch (maneuver.type) {
        case 'new name':
          return 'continue';
        case 'depart':
          return 'head';
        case 'arrive':
          return lastLeg ? 'destinationReached' : 'waypointReached';
        case 'roundabout':
        case 'rotary':
          return 'roundabout';
        case 'merge':
        case 'fork':
        case 'on ramp':
        case 'off ramp':
        case 'end of road':
          return this.$helper.replacer(maneuver.type, ' ', '_');
        default:
          return this.$helper.replacer(maneuver.modifier, ' ', '_');
      }
    },
    _maneuverToModifier: function (maneuver) {
      var modifier = maneuver.modifier;

      switch (maneuver.type) {
        case 'merge':
        case 'fork':
        case 'on ramp':
        case 'off ramp':
        case 'end of road':
          modifier = this._leftOrRight(modifier);
      }

      return modifier && this.$helper.replacer(modifier, ' ', '_');
    },
    _leftOrRight(d) {
      return d.indexOf('left') >= 0 ? 'left' : 'right';
    },
    polyline_decode(str, precision) {
      var index = 0,
          lat = 0,
          lng = 0,
          coordinates = [],
          shift = 0,
          result = 0,
          byte = null,
          latitude_change,
          longitude_change,
          factor = Math.pow(10, precision || 5);

      while (index < str.length) {

        // Reset shift, result, and byte
        byte = null;
        shift = 0;
        result = 0;

        do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
          byte = str.charCodeAt(index++) - 63;
          result |= (byte & 0x1f) << shift;
          shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
      }

      return coordinates;
    },
    _decodePolyline: function (routeGeometry) {
      let cs = this.polyline_decode(routeGeometry, 5),
          result = [],
          i;
      const lng = cs.length;
      for (i = lng - 1; i >= 0; i--) {
        result[i] = L.latLng(cs[i]);
      }

      return result;
    }
  }
}
</script>
<style lang="scss">
@import "~renusify/style/include";

.#{$prefix}map-route {
  display: flex;
  background-color: var(--color-sheet-container);
  color: var(--color-on-sheet);

  .route-point {
    border: 1px solid #cdcaca;
  }

  .route-name {
    cursor: pointer;

    &:hover {
      color: var(--color-one);
    }
  }
}
</style>
