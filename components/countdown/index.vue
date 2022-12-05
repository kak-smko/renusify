<template>
  <div>
    <slot :days="days" :hours="hours" :minutes="minutes" :seconds="seconds">
      <span v-if="days>0">{{ days }}{{ $t('days', 'renusify') }}</span>
      {{ hours }}:{{ minutes }}:{{ seconds }}
    </slot>
  </div>
</template>

<script>
const MILLISECONDS_SECOND = 1000
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR
export default {
  name: 'countdown',
  props: {
    autoStart: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 1000,
      validator: value => value >= 0
    },
    time: {
      type: Number,
      default: 0,
      validator: value => value >= 0
    }
  },
  data() {
    return {
      time_id: null,
      counting: false,
      totalMilliseconds: 0
    }
  },

  computed: {
    days() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY)
    },

    hours() {
      return Math.floor((this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR)
    },

    minutes() {
      return Math.floor((this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE)
    },

    seconds() {
      return Math.floor((this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND)
    },

    milliseconds() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND)
    }
  },

  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {
        this.totalMilliseconds = this.time

        if (this.autoStart) {
          this.start()
        }
      }
    }
  },

  methods: {
    start() {
      if (this.counting) {
        return
      }

      this.counting = true

      this.$emit('start')
      this.time_id = setInterval(() => {
        this.go()
      }, this.interval)
    },
    go() {
      if (this.totalMilliseconds <= 0) {
        clearInterval(this.time_id)
        this.$emit('end')
        return
      }
      this.totalMilliseconds = Math.max(this.totalMilliseconds - this.interval, 0)

    }
  },
  beforeUnmount() {
    clearInterval(this.time_id)
  }
}
</script>
