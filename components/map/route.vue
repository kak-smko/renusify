<template>
  <r-container :class="`${$r.prefix}map-route pa-0`">
    <r-row class="no-gutters">
      <r-col class="col-12 sm-9">
        <r-map :dark-mode="darkMode" :height="height" :model-value="center" :zoom="15" search-box
               @leaflet="handleLEvent" @map="handleMapEvent"></r-map>
      </r-col>
      <r-col :style="'height: '+height" class="overflow-y-auto col-12 sm-3">
        <div class="pa-2">
          <!--
           @slot Header slot for custom route summary display
           @binding {String} distance - Formatted distance string (e.g., "15.25 km")
           @binding {String} time - Human-readable time duration (e.g., "2 hours 15 minutes")
         -->
          <slot :distance="distance" :time="time" name="header">
            <div class="bodey-1">{{ $helper.ifHas(modelValue, '------', 'summary', 'name') }}</div>
            <r-divider class="my-3"></r-divider>
            <div>{{ time || '---' }}</div>
            <div>{{ distance || '0 km' }}</div>
          </slot>

          <!--
            @slot Points slot for custom waypoints list display
            @binding {Function} add - Function to add a new waypoint
            @binding {Function} del - Function to delete a waypoint
            @binding {Function} open - Function to open a waypoint on the map
            @binding {Object} points - Object containing all waypoints
            @binding {Function} to - Function to reorder waypoints
          -->
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

          <!--
           @slot Footer slot for additional content below the points list
         -->
          <slot name="footer"></slot>
        </div>
      </r-col>
    </r-row>
  </r-container>
</template>

<script setup>
import {ref, computed, onMounted, inject} from 'vue'

const props = defineProps({
  /**
   * Route data model value
   * @type {Object}
   * @model
   * @description Contains route data including points, summary, and waypoints
   * @property {Object} points - Waypoint coordinates keyed by unique IDs
   * @property {Object} summary - Route summary with name, time, and distance
   * @property {Array} waypoints - Detailed waypoint information
   * @example
   * {
   *   points: { 'abc123': [35.6997, 51.3380], 'def456': [35.7000, 51.3400] },
   *   summary: { name: 'Tehran Route', time: 3600, distance: 5000 },
   *   waypoints: [{ name: 'Start Point' }, { name: 'End Point' }]
   * }
   */
  modelValue: Object,

  /**
   * Transportation mode for route calculation
   * @type {String}
   * @default 'car'
   * @validator ['car', 'foot', 'bike']
   * @description Determines which OSRM profile to use for routing
   * - 'car': Optimized for car travel (fastest route)
   * - 'foot': Optimized for walking (pedestrian paths)
   * - 'bike': Optimized for cycling (bike lanes, lower gradients)
   */
  by: {
    type: String,
    default: 'car',
    validator: (value) => ['car', 'foot', 'bike'].includes(value)
  },

  /**
   * Map container height
   * @type {String}
   * @default '500px'
   * @description CSS height for the map and sidebar container
   * @example '400px'
   * @example '80vh'
   * @example '100%'
   */
  height: {type: String, default: "500px"},

  /**
   * Time margin multiplier for route duration
   * @type {Number}
   * @default 1
   * @description Multiplier applied to calculated route time for buffer/planning
   * @example 1.2 // Adds 20% buffer to estimated time
   * @example 1.5 // Adds 50% buffer to estimated time
   */
  marginTime: {type: Number, default: 1},

  /**
   * Route line colors
   * @type {Array<String>}
   * @default []
   * @description Array of CSS color values for route segments between waypoints
   * If array length < segments, colors cycle through available values
   * @example ['#FF0000', '#00FF00'] // Red first segment, green second segment
   * @example ['blue'] // All segments blue
   */
  color: {
    type: Array,
    default: () => []
  },

  /**
   * Maximum number of waypoints allowed
   * @type {Number}
   * @default 3
   * @description Limits the number of waypoints that can be added to the route
   * @example 5 // Allows up to 5 waypoints
   * @example 10 // Allows up to 10 waypoints
   */
  maxPoints: {type: Number, default: 3},

  /**
   * Enable dark mode for the map
   * @type {Boolean}
   * @default false
   * @description Applies dark theme to the map display
   */
  darkMode: Boolean,

  /**
   * Enable waypoint editing features
   * @type {Boolean}
   * @default false
   * @description When true, allows adding, deleting, dragging, and reordering waypoints
   */
  editable: Boolean
})

const emit = defineEmits([
  /**
   * Updated route data object
   */
  'update:modelValue'
])

// Inject renusify dependencies
const {$r, $helper, $t} = inject('renusify')

// Reactive state
const loading = ref(false)
const timeout_id = ref(null)
const req_id = ref(null)
const map = ref(null)
const L = ref(null)
const center = ref([])
const markers = ref(null)
const lines = ref(null)
const routing = ref({})
const points = ref($helper.ifHas(props.modelValue, {}, 'points'))

/**
 * Computed array of waypoint IDs
 * @type {ComputedRef<Array<String>>}
 */
const points_keys = computed(() => Object.keys(points.value))

/**
 * Computed array of waypoint coordinates
 * @type {ComputedRef<Array<Array<Number>>>}
 */
const points_vals = computed(() => Object.values(points.value))

/**
 * Computed human-readable route duration
 * @type {ComputedRef<String>}
 */
const time = computed(() => {
  return timeHumanity($helper.ifHas(props.modelValue, 0, 'summary', 'time'))
})

/**
 * Computed formatted route distance
 * @type {ComputedRef<String>}
 */
const distance = computed(() => {
  if (!$helper.ifHas(props.modelValue, false, 'summary', 'distance')) {
    return ''
  }
  return ((props.modelValue.summary.distance / 1000).toFixed(2)) + ' km'
})

/**
 * Computed origin marker icon
 * @type {ComputedRef<String>}
 */
const iconOrigin = computed(() => require('./images/origin.png'))

/**
 * Computed intermediate point marker icon
 * @type {ComputedRef<String>}
 */
const iconPoint = computed(() => require('./images/point.png'))

/**
 * Computed destination marker icon
 * @type {ComputedRef<String>}
 */
const iconDestination = computed(() => require('./images/destination.png'))

// Initialize component
onMounted(() => {
  get()
})

// Methods

/**
 * Get display position label for a waypoint
 * @method pos
 * @param {Number} i - Waypoint index
 * @returns {String} Position label (e.g., "Origin", "Point 2", "Destination")
 */
const pos = (i) => {
  let n = i + 1
  if (i === 0) {
    n = $t('map_origin', 'renusify')
  } else if (i === points_vals.value.length - 1) {
    n = $t('map_destination', 'renusify')
  }
  return $t(['map_point', [n]], 'renusify')
}

/**
 * Get full name/label for a waypoint
 * @method name
 * @param {Number} i - Waypoint index
 * @returns {String} Complete waypoint name with position
 */
const name = (i) => {
  return pos(i) + ': ' + $helper.ifHas(props.modelValue, '', 'waypoints', i, 'name')
}

/**
 * Open a waypoint's marker popup and center map on it
 * @method open
 * @param {Number} i - Waypoint index to open
 */
const open = (i) => {
  if (markers.value && markers.value._layers) {
    const markerLayers = Object.values(markers.value._layers)
    if (markerLayers[i]) {
      center.value = Object.values(markerLayers[i]._latlng)
      markerLayers[i].openPopup()
    }
  }
}

/**
 * Delete a waypoint from the route
 * @method del
 * @param {String} i - Waypoint ID to delete
 */
const del = (i) => {
  delete points.value[i]
  get()
}

/**
 * Move an item in an array from one position to another
 * @method array_move
 * @param {Array} arr - Source array
 * @param {Number} old - Original index
 * @param {Number} new_pos - New index
 * @returns {Array} Modified array
 * @private
 */
const array_move = (arr, old, new_pos) => {
  const result = [...arr]
  if (new_pos >= result.length) {
    let k = new_pos - result.length + 1
    while (k--) {
      result.push(undefined)
    }
  }
  result.splice(new_pos, 0, result.splice(old, 1)[0])
  return result
}

/**
 * Reorder waypoints in the route
 * @method to
 * @param {Number} i - Current waypoint index
 * @param {Number} pos - New position index
 */
const to = (i, pos) => {
  const val = array_move(points_vals.value, i, pos)
  const key = array_move(points_keys.value, i, pos)
  const way = array_move(props.modelValue.waypoints || [], i, pos)

  const res = {}
  key.forEach((item, idx) => {
    res[item] = val[idx]
  })

  points.value = res
  emit('update:modelValue', {
    'points': points.value,
    'summary': props.modelValue?.summary || {},
    'waypoints': way
  })

  setTimeout(() => {
    get()
  }, 800)
}

/**
 * Open the last waypoint's popup after adding a new point
 * @method openLastPopup
 * @param {Number} n - Retry counter (internal use)
 * @private
 */
const openLastPopup = (n = 0) => {
  clearTimeout(timeout_id.value)

  if (!markers.value || !markers.value._layers ||
      Object.values(markers.value._layers)[points_vals.value.length - 1] === undefined) {
    timeout_id.value = setTimeout(() => {
      if (n < 10) {
        openLastPopup(n + 1)
      }
    }, 1000)
    return
  }

  Object.values(markers.value._layers)[points_vals.value.length - 1].openPopup()
}

/**
 * Add a new waypoint at the current map center
 * @method add
 */
const add = () => {
  loading.value = true
  points.value[$helper.uniqueId(12)] = Object.values(map.value.getCenter())
  get()
  openLastPopup()
  loading.value = false
}

/**
 * Convert seconds to human-readable time string
 * @method timeHumanity
 * @param {Number} seconds - Time in seconds
 * @returns {String} Formatted time string
 * @example 3661 → "1 hour 1 minute"
 */
const timeHumanity = (seconds) => {
  if (!seconds) return ''

  const numyears = Math.floor(seconds / 31536000)
  const numdays = Math.floor((seconds % 31536000) / 86400)
  const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
  const numminutes = Math.ceil((((seconds % 31536000) % 86400) % 3600) / 60)

  let res = ''
  if (numyears > 0) {
    res += numyears + ' ' + $t("years", 'renusify')
  }
  if (numdays > 0) {
    res += ' ' + numdays + ' ' + $t("days", 'renusify')
  }
  if (numhours > 0) {
    res += ' ' + numhours + ' ' + $t("hours", 'renusify')
  }
  if (numminutes > 0) {
    res += ' ' + numminutes + ' ' + $t("minutes", 'renusify')
  }
  return res.trim()
}

/**
 * Handle Leaflet.js library instance
 * @method handleLEvent
 * @param {Object} e - Leaflet library instance
 */
const handleLEvent = (e) => {
  L.value = e
}

/**
 * Handle map instance ready event
 * @method handleMapEvent
 * @param {Object} e - Leaflet map instance
 */
const handleMapEvent = (e) => {
  map.value = e
  if (points_vals.value.length > 0) {
    center.value = points_vals.value[0]
  }
}

/**
 * Draw markers for all waypoints on the map
 * @method drawMarkers
 * @private
 */
const drawMarkers = () => {
  if (!L.value || !map.value) return

  if (markers.value) {
    map.value.removeLayer(markers.value)
  }

  const all = []

  points_vals.value.forEach((point, i) => {
    let icon = iconPoint.value
    if (i === 0) {
      icon = iconOrigin.value
    } else if (i === points_vals.value.length - 1) {
      icon = iconDestination.value
    }

    const m = new L.value.Marker(point, {
      draggable: props.editable,
      index: points_keys.value[i],
      icon: new L.value.icon({
        iconUrl: icon,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -40]
      })
    })

    m.bindPopup($t('map_move_marker', 'renusify') + '<hr>' + name(i))

    m.on('drag', function (e) {
      points.value[e.target.options.index] = Object.values(e.latlng)
    })

    m.on('dragend', function () {
      get()
    })

    all.push(m)
  })

  markers.value = L.value.layerGroup(all)
  map.value.addLayer(markers.value)
}

/**
 * Draw route lines on the map based on calculated route
 * @method draw
 * @private
 */
const draw = () => {
  if (routing.value.code !== 'Ok' || !L.value || !routing.value.routes) {
    return
  }

  const alts = {
    'points': points.value,
    'routes': [],
    'summary': {'name': '', 'time': 0, 'distance': 0}
  }

  const routesLength = Object.values(routing.value.routes).length
  for (let i = 0; i < routesLength; i++) {
    const route = convertRoute(routing.value.routes[i])
    alts.routes.push(route)
    alts.summary.name = route.name
    alts.summary.time += parseFloat(route.summary.total_time) * props.marginTime
    alts.summary.distance += parseFloat(route.summary.total_distance)
  }

  alts.waypoints = routing.value.waypoints || []
  alts.waypoints.forEach((item) => {
    delete item.hint
    delete item.location
  })

  emit('update:modelValue', {
    'points': alts.points,
    'summary': alts.summary,
    'waypoints': alts.waypoints
  })

  const l = []
  if (alts.routes[0]?.waypointIndices) {
    alts.routes[0].waypointIndices.forEach((item, i) => {
      if (i < alts.routes[0].waypointIndices.length - 1) {
        const p = alts.routes[0].coordinates.slice(item, alts.routes[0].waypointIndices[i + 1])
        let color = 'red'
        if (props.color[i]) {
          color = props.color[i]
        } else if (props.color.length > 0) {
          color = i % 2 === 0 ? props.color[0] : (props.color[1] || props.color[0])
        }

        l.push(new L.value.polyline(p, {color: color, weight: 5}))
      }
    })
  }

  lines.value = L.value.layerGroup(l)
  setTimeout(() => {
    if (map.value && lines.value) {
      map.value.addLayer(lines.value)
    }
    drawMarkers()
  }, 1)
}

/**
 * Calculate route by fetching from OSRM API
 * @method get
 */
const get = () => {
  emit('update:modelValue', {
    'points': points.value,
    'summary': {},
    'waypoints': []
  })

  drawMarkers()

  if (lines.value && map.value) {
    map.value.removeLayer(lines.value)
  }

  if (points_vals.value.length < 2) {
    return
  }

  let url = `https://routing.openstreetmap.de/routed-${props.by}/route/v1/driving/`
  points_vals.value.forEach(point => {
    url += point[1] + ',' + point[0] + ';'
  })
  url = url.substr(0, url.length - 1) + '?overview=false&steps=true'

  corslite(url, function (err, resp) {
    if (!err) {
      try {
        routing.value = JSON.parse(resp.responseText)
        draw()
      } catch (e) {
        console.error('Error parsing OSRM response: ' + e.toString())
      }
    } else {
      console.error('HTTP request failed: ' + err.type +
          (err.target && err.target.status ? ' HTTP ' + err.target.status + ': ' + err.target.statusText : ''))
    }
  })
}

/**
 * Cross-origin request helper function
 * @method corslite
 * @param {String} url - Request URL
 * @param {Function} callback - Callback function (err, response)
 * @returns {XMLHttpRequest} XHR object
 * @private
 */
const corslite = (url, callback) => {
  if (typeof window.XMLHttpRequest === 'undefined') {
    return callback(Error('Browser not supported'))
  }

  if (req_id.value) {
    req_id.value.abort()
  }

  const x = new window.XMLHttpRequest()

  function isSuccessful(status) {
    return status >= 200 && status < 300 || status === 304
  }

  function loaded() {
    if (x.status === undefined || isSuccessful(x.status)) {
      callback.call(x, null, x)
    } else {
      callback.call(x, x, null)
    }
  }

  if ('onload' in x) {
    x.onload = loaded
  } else {
    x.onreadystatechange = function readystate() {
      if (x.readyState === 4) {
        loaded()
      }
    }
  }

  x.timeout = 7000
  x.onerror = function error(e) {
    callback.call(this, e || true, null)
  }

  x.onprogress = function () {
  }

  x.ontimeout = function (e) {
    callback.call(this, e, null)
  }

  x.onabort = function (e) {
    callback.call(this, e, null)
  }

  x.open('GET', url, true)
  x.send(null)

  req_id.value = x
  return x
}

/**
 * Convert OSRM API response to internal route format
 * @method convertRoute
 * @param {Object} responseRoute - OSRM route object
 * @returns {Object} Formatted route object
 * @private
 */
const convertRoute = (responseRoute) => {
  const result = {
    name: '',
    coordinates: [],
    instructions: [],
    summary: {
      total_distance: responseRoute.distance,
      total_time: responseRoute.duration
    }
  }

  const legNames = []
  const waypointIndices = []
  let index = 0
  const legCount = responseRoute.legs.length
  const hasSteps = legCount > 0 && responseRoute.legs[0].steps.length > 0

  for (let i = 0; i < legCount; i++) {
    const leg = responseRoute.legs[i]
    legNames.push(leg.summary && leg.summary.charAt(0).toUpperCase() + leg.summary.substring(1))

    const stepCount = leg.steps.length
    for (let j = 0; j < stepCount; j++) {
      const step = leg.steps[j]
      const geometry = decodePolyline(step.geometry)
      result.coordinates.push(...geometry)

      const type = maneuverToInstructionType(step.maneuver, i === legCount - 1)
      const modifier = maneuverToModifier(step.maneuver)
      const text = [step, {legCount: legCount, legIndex: i}]

      if (type) {
        if ((i == 0 && step.maneuver.type == 'depart') || step.maneuver.type == 'arrive') {
          waypointIndices.push(index)
        }

        result.instructions.push({
          type: type,
          distance: step.distance,
          time: step.duration,
          road: step.name,
          direction: bearingToDirection(step.maneuver.bearing_after),
          exit: step.maneuver.exit,
          index: index,
          mode: step.mode,
          modifier: modifier,
          text: text
        })
      }

      index += geometry.length
    }
  }

  result.name = legNames.join(', ')
  if (!hasSteps) {
    result.coordinates = decodePolyline(responseRoute.geometry)
  } else {
    result.waypointIndices = waypointIndices
  }

  return result
}

/**
 * Convert bearing (degrees) to cardinal direction
 * @method bearingToDirection
 * @param {Number} bearing - Bearing in degrees (0-360)
 * @returns {String} Cardinal direction (N, NE, E, SE, S, SW, W, NW)
 * @private
 */
const bearingToDirection = (bearing) => {
  const oct = Math.round(bearing / 45) % 8
  return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][oct]
}

/**
 * Convert OSRM maneuver type to instruction type
 * @method maneuverToInstructionType
 * @param {Object} maneuver - OSRM maneuver object
 * @param {Boolean} lastLeg - Whether this is the last leg of the route
 * @returns {String} Instruction type
 * @private
 */
const maneuverToInstructionType = (maneuver, lastLeg) => {
  switch (maneuver.type) {
    case 'new name':
      return 'continue'
    case 'depart':
      return 'head'
    case 'arrive':
      return lastLeg ? 'destinationReached' : 'waypointReached'
    case 'roundabout':
    case 'rotary':
      return 'roundabout'
    case 'merge':
    case 'fork':
    case 'on ramp':
    case 'off ramp':
    case 'end of road':
      return maneuver.type.replaceAll(' ', '_')
    default:
      return maneuver.modifier?.replaceAll(' ', '_') || ''
  }
}

/**
 * Convert OSRM maneuver modifier to internal modifier format
 * @method maneuverToModifier
 * @param {Object} maneuver - OSRM maneuver object
 * @returns {String} Modified instruction modifier
 * @private
 */
const maneuverToModifier = (maneuver) => {
  let modifier = maneuver.modifier

  switch (maneuver.type) {
    case 'merge':
    case 'fork':
    case 'on ramp':
    case 'off ramp':
    case 'end of road':
      modifier = leftOrRight(modifier)
  }

  return modifier && modifier.replaceAll(' ', '_')
}

/**
 * Determine left or right direction from modifier string
 * @method leftOrRight
 * @param {String} d - Direction modifier string
 * @returns {String} 'left' or 'right'
 * @private
 */
const leftOrRight = (d) => {
  return d?.indexOf('left') >= 0 ? 'left' : 'right'
}

/**
 * Decode polyline string to coordinate array (OSRM geometry format)
 * @method polyline_decode
 * @param {String} str - Encoded polyline string
 * @param {Number} precision - Coordinate precision (default: 5)
 * @returns {Array<Array<Number>>} Array of [lat, lng] coordinates
 * @private
 */
const polyline_decode = (str, precision) => {
  let index = 0,
      lat = 0,
      lng = 0,
      coordinates = [],
      shift = 0,
      result = 0,
      byte = null,
      latitude_change,
      longitude_change,
      factor = Math.pow(10, precision || 5)

  while (index < str.length) {
    // Reset shift, result, and byte
    byte = null
    shift = 0
    result = 0

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1))

    shift = result = 0

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1))

    lat += latitude_change
    lng += longitude_change

    coordinates.push([lat / factor, lng / factor])
  }

  return coordinates
}

/**
 * Decode polyline and convert to Leaflet LatLng objects
 * @method decodePolyline
 * @param {String} routeGeometry - Encoded polyline geometry string
 * @returns {Array<L.LatLng>} Array of Leaflet LatLng objects
 * @private
 */
const decodePolyline = (routeGeometry) => {
  const cs = polyline_decode(routeGeometry, 5),
      result = []

  const lng = cs.length
  for (let i = lng - 1; i >= 0; i--) {
    result[i] = L.value.latLng(cs[i])
  }

  return result
}
</script>

<style lang="scss">
@use "../../style/variables/base";

.#{base.$prefix}map-route {
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
