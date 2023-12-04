<template>
  <span :key="k">{{ timeAgo(time) }}</span>
</template>

<script>
export default {
  name: 'r-timeAgo',
  props: {
    time: {
      required: true
    },
    noTrans: {
      default: false,
      type: Boolean
    },
    liveTime: {
      default: 5000,
      type: Number
    },
    live: Boolean
  },
  data() {
    return {
      id: null,
      k: 0
    }
  },
  created() {
    this.setup()
  },
  methods: {
    timeAgo(time) {
      switch (typeof time) {
        case 'number':
          time = new Date(time)
          break
        case 'string':
          if (time.split('T').length > 1) {
            time = new Date(time)
          } else {
            time = new Date(time + ' UTC')
          }
          break
        case 'object':
          break
        default:
          time = new Date()
      }
      const timeFormats = [
        [60, this.t('seconds'), 1], // 60
        [120, this.t('1_minute_ago'), this.t('1_minute_from_now')], // 60*2
        [3600, this.t('minutes'), 60], // 60*60, 60
        [7200, this.t('1_hour_ago'), this.t('1_hour_from_now')], // 60*60*2
        [86400, this.t('hours'), 3600], // 60*60*24, 60*60
        [172800, this.t('yesterday'), this.t('tomorrow')], // 60*60*24*2
        [604800, this.t('days'), 86400], // 60*60*24*7, 60*60*24
        [1209600, this.t('last_week'), this.t('next_week')], // 60*60*24*7*4*2
        [2419200, this.t('weeks'), 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, this.t('last_month'), this.t('next_month')], // 60*60*24*7*4*2
        [29030400, this.t('months'), 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, this.t('last_year'), this.t('next_year')], // 60*60*24*7*4*12*2
        [2903040000, this.t('years'), 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, this.t('last_century'), this.t('next_century')], // 60*60*24*7*4*12*100*2
        [58060800000, this.t('centuries'), 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
      ]
      let seconds = (new Date() - time) / 1000
      let token = this.t('ago')
      let listChoice = 1

      if (seconds < 0) {
        seconds = Math.abs(seconds) + 1
        token = this.t('from_now')
        listChoice = 2
      }

      if (seconds < 5) {
        return this.t('just_now')
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
      return time
    },
    setup() {
      if (this.live) {
        this.id = setInterval(() => {
          this.k++
        }, this.liveTime)
      }
    },
    t(val) {
      if (this.noTrans) {
        return val.replace(/_/g, ' ')
      }
      return this.$t('date_time_' + val, 'renusify')
    }
  },
  beforeUnmount() {
    clearInterval(this.id)
  }
}
</script>
