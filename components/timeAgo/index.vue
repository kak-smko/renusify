<template>
  <span :key="k">{{ timeAgo(time) }}</span>
</template>

<script setup>
import {ref, onUnmounted, inject} from 'vue'

/**
 * @example // TimeAgo usage
 * <template>
 *   <r-time-ago
 *     :time="time"
 *     :no-Trans="noTrans"
 *     :live-Time="liveTime"
 *     :live="live"
 *   ></r-time-ago>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * const time = ref(Date.now() - (60 * 60 * 24 * 1000)) // 1 day ago
 * const noTrans = ref(true)
 * const liveTime = ref(2000)
 * const live = ref(false)
 * <//script>
 *
 *
 * */
const props = defineProps({
  /**
   * The time value to display relative time for
   * @type {Number|String|Date}
   * @required
   */
  time: {
    required: true
  },
  /**
   * Disables translation, shows English text only
   * @type {Boolean}
   * @default false
   */
  noTrans: {
    default: false,
    type: Boolean
  },
  /**
   * Update interval in milliseconds for live updates
   * @type {Number}
   * @default 5000
   */
  liveTime: {
    default: 5000,
    type: Number
  },
  /**
   * Enables live time updates
   * @type {Boolean}
   */
  live: Boolean
})

const $t = inject('renusify').$t

const id = ref(null)
const k = ref(0)

const timeAgo = (time) => {
  let date

  switch (typeof time) {
    case 'number':
      date = new Date(time)
      break
    case 'string':
      if (time.split('T').length > 1) {
        date = new Date(time)
      } else {
        date = new Date(time + ' UTC')
      }
      break
    case 'object':
      date = time
      break
    default:
      date = new Date()
  }

  const timeFormats = [
    [60, t('seconds'), 1], // 60
    [120, t('1_minute_ago'), t('1_minute_from_now')], // 60*2
    [3600, t('minutes'), 60], // 60*60, 60
    [7200, t('1_hour_ago'), t('1_hour_from_now')], // 60*60*2
    [86400, t('hours'), 3600], // 60*60*24, 60*60
    [172800, t('yesterday'), t('tomorrow')], // 60*60*24*2
    [604800, t('days'), 86400], // 60*60*24*7, 60*60*24
    [1209600, t('last_week'), t('next_week')], // 60*60*24*7*4*2
    [2419200, t('weeks'), 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, t('last_month'), t('next_month')], // 60*60*24*7*4*2
    [29030400, t('months'), 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, t('last_year'), t('next_year')], // 60*60*24*7*4*12*2
    [2903040000, t('years'), 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, t('last_century'), t('next_century')], // 60*60*24*7*4*12*100*2
    [58060800000, t('centuries'), 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ]

  let seconds = (new Date() - date) / 1000
  let token = t('ago')
  let listChoice = 1

  if (seconds < 0) {
    seconds = Math.abs(seconds) + 1
    token = t('from_now')
    listChoice = 2
  }

  if (seconds < 5) {
    return t('just_now')
  }

  const lng = timeFormats.length
  for (let i = 0; i < lng; i++) {
    const format = timeFormats[i]
    if (seconds < format[0]) {
      if (typeof format[2] === 'string') {
        return format[listChoice]
      } else {
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token
      }
    }
  }

  return date
}

const t = (val) => {
  if (props.noTrans) {
    return val.replace(/_/g, ' ')
  }
  return $t('date_time_' + val, 'renusify')
}

const setup = () => {
  if (props.live) {
    id.value = setInterval(() => {
      k.value++
    }, props.liveTime)
  }
}

setup()

onUnmounted(() => {
  if (id.value) {
    clearInterval(id.value)
  }
})
</script>
