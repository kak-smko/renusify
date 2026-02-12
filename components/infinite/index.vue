<template>
  <r-container :class="[$r.prefix+'infinite']">
    <div ref="chat"
         v-scroll="{handler:onScroll,target:target}"
         :style="{'max-height': height,'height': height}"
         :class="{'overflow-div':height}" class="infinite-page-container">
      <transition-group :class="{'flex-column-reverse':isChat}"
                        :name="isChat?'slide-up':'slide-down'"
                        class="row"
                        tag="div">
        <!-- Default slot for contents. Provide items, total props -->
        <slot :items="datacollection" :total="total">{{ datacollection }}</slot>
        <r-col key="loading" class="col-12">
          <r-progress-line v-show="loading"
                           color="color-two"></r-progress-line>
        </r-col>
      </transition-group>
    </div>
    <div v-if="noItem"
         class="text-center title-2"
    >{{ noItemMsg }}
    </div>
  </r-container>
</template>
<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
  watch,
  inject, nextTick
} from 'vue'

const props = defineProps({
  /**
   * API endpoint URL for fetching data
   * @required
   * @description The URL to fetch data from. Can be a relative or absolute URL.
   * @example '/api/users'
   */
  url: {
    required: true,
    type: String
  },

  /**
   * Query parameters for the API request
   * @description Query parameters to be sent with the request.
   * Supports dynamic parameters for filtering, pagination, etc.
   * @example { sortBy: 'created_at', sortOrder: 'desc' }
   */
  query: {
    type: Object
  },

  /**
   * Message to display when no items are found
   * @description The text displayed in the UI when the data fetch returns an empty result.
   * Can be overridden for localization or custom messaging.
   * @example 'No records found'
   */
  noItemMsg: {
    type: String,
    default: 'ITEMS NOT FOUND'
  },

  /**
   * Distance from bottom to trigger infinite loading
   * @description Distance in pixels from the bottom of the scroll container
   * that triggers loading more items (infinite scrolling).
   * Smaller values trigger loading earlier, larger values trigger later.
   * @example 200 // Triggers loading when 200px from bottom
   */
  distanceLoad: {
    type: Number,
    default: 150
  },

  /**
   * Custom HTTP headers for the request
   * @description Additional HTTP headers to include with the request.
   * Useful for authentication, content-type specification, etc.
   * @example { 'Authorization': 'Bearer token123' }
   */
  headers: Object,

  /**
   * Chat mode toggle
   * When true, applies chat UI patterns like reverse order
   */
  isChat: Boolean,

  /**
   * Container height
   * @description CSS height value for the container element.
   * Accepts any valid CSS height value (px, %, vh, etc.).
   * @example '500px'
   */
  height: String,

  /**
   * Live updates toggle
   * @description Enables automatic polling for live updates.
   * When true, periodically fetches new data based on `liveTimer` interval.
   */
  live: Boolean,

  /**
   * Live update interval in milliseconds
   * @description Time interval (in milliseconds) between automatic live updates.
   * Only applies when `live` prop is true.
   * @example 5000 // Update every 5 seconds
   */
  liveTimer: {
    default: 10000,
    type: Number
  }
})

const emit = defineEmits(['update:modelValue'])

const $axios = inject('axios')
const $helper = inject('renusify').$helper

// Reactive state
const datacollection = ref([])
const page = ref(1)
const first = ref(true)
const chat = ref(null)
const active = ref(true)
const loading = ref(false)
const total = ref(0)
const noItem = ref(false)

const target = computed(() => props.height ? false : 'window')

// Methods
const onScroll = (e) => {
  if (props.height) {
    let offset = 0
    if (props.isChat) {
      offset = e.target.scrollTop
    } else {
      offset = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
    }
    if (offset < 200) {
      if (!loading.value) {
        if (datacollection.value.length < total.value) {
          page.value++
          get()
        }
      }
    }
  } else {
    if (active.value &&
        (document.body.offsetHeight < ((window.innerHeight + window.scrollY) + props.distanceLoad)) &&
        !loading.value &&
        (datacollection.value.length < total.value)
    ) {
      page.value++
      get()
    }
  }
}

const get = () => {
  $helper.log('infinite page get')
  loading.value = true
  noItem.value = false

  let end = true
  let params = {'page': page.value}

  if (props.live === true) {
    params = {'page': 1}
    end = false
  }
  if (typeof props.query === 'object') {
    Object.assign(params, props.query)
  }

  $axios.get(props.url, {params, headers: props.headers})
      .then(({data}) => {
        push(data.data, end)
        total.value = data.total
        if (total.value === 0) {
          noItem.value = true
        }
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
}

const push = (data, end = false) => {
  if (!end) {
    let d = data
    const lng = datacollection.value.length
    for (let key = 0; key < lng; key++) {
      if (key <= data.length) {
        if ($helper.searchArray(d, '_id', datacollection.value[key]['_id']) === false) {
          d.push(datacollection.value[key])
        }
      } else {
        d.push(datacollection.value[key])
      }
    }
    datacollection.value = d
  } else {
    let d = datacollection.value
    const lng = data.length
    for (let key = 0; key < lng; key++) {
      if ($helper.searchArray(d, '_id', data[key]['_id']) === false) {
        d.push(data[key])
      }
    }
    datacollection.value = d
  }
  nextTick(() => {
    let el = chat.value
    let can = false
    if (props.isChat) {
      can = el.scrollHeight <= el.scrollTop + el.clientHeight
    } else {
      can = el.scrollTop === 0
    }

    if (props.isChat) {
      if (first.value || can) {
        el.scrollTop = el.scrollHeight
        first.value = false
      }
    } else if (can) {
      el.scrollTop = 0
    }
  })
}

let liveInterval = null
const setupLiveUpdates = () => {
  if (props.live) {
    clearInterval(liveInterval)
    liveInterval = setInterval(() => {
      if (active.value && !loading.value) {
        get()
      }
    }, props.liveTimer)
  }
}

onMounted(() => {
  get()

  setupLiveUpdates()
})

onActivated(() => {
  active.value = true
})

onDeactivated(() => {
  active.value = false
})

watch(() => props.live, (newValue) => {
  if (newValue) {
    get()
    setupLiveUpdates()
  } else {
    clearInterval(liveInterval)
  }
})

onUnmounted(() => {
  clearInterval(liveInterval)
})

</script>

<style lang="scss">
@use "sass:map";
@use "../../style" as *;

.#{$prefix}infinite {
  width: 100%;

  .overflow-div {
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
