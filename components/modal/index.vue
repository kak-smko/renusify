<template>
  <teleport :to="`.${$r.prefix}app`">
    <transition :name="animate">
      <div v-if="modelValue" :class="{
        [`${$r.prefix}modal`]:true,
        'h-end': bottom,
        'modal-no-overlay': noOverlay,
        'animate-modal-vibrate': run_animate,
      }" v-bind="$attrs" @click.self="close"
      >
        <div class="modal-container" :style="{'max-width':maxWidth,'max-height':maxHeight}" :class="{
      'modal-bottom':bottom,
      [color]:color,
     'modal-full-width':fullWidth,
     'modal-full-height':fullHeight,
      'modal-mini':minWidth,
      'modal-flat':flat

    }">
          <div class="modal-btn text-end">
            <r-btn class="color-error-text"
                   text
                   @click.prevent="close(true)"
                   fab
                   size="small"
                   v-if="closebtn">
              <r-icon v-html="$r.icons.close"></r-icon>
            </r-btn>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import './style.scss'

export default {
  name: 'r-modal',
  inheritAttrs: false,
  props: {
    modelValue: Boolean,
    bottom: Boolean,
    noOverlay: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    maxWidth: String,
    maxHeight: String,
    minWidth: {type: Boolean, default: true},
    flat: Boolean,
    closable: Boolean,
    routeHistory: String,
    closebtn: {type: Boolean, default: true},
    color: String,
    animate: {
      type: String,
      default: 'scale'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      state: null,
      run_animate: false
    }
  },
  created() {
    if (this.routeHistory) {
      const h = this.$route.hash.replace('#', '').split('&')
      if (h.includes(this.routeHistory)) {
        this.$emit('update:modelValue', true)
      }
    }
  },
  watch: {
    '$route': function (n) {
      let h = []
      if (this.$route.hash) {
        h = this.$route.hash.replace('#', '').split('&')
      }
      if (!h.includes(this.routeHistory)) {
        this.$emit('update:modelValue', false)
      } else {
        this.$emit('update:modelValue', true)
      }
    },
    modelValue: {
      // immediate: true, watch at created component
      handler: function (newVal, oldVal) {
        if (newVal === true) {
          document.documentElement.style.overflow = 'hidden'
          if (this.routeHistory) {
            const routeHashs = this.$route.hash.replace('#', '').split('&')
            if (!routeHashs.includes(this.routeHistory)) {
              let h = ''
              if (this.$route.hash) {
                h = this.$route.hash + '&' + this.routeHistory
              } else {
                h = '#' + this.routeHistory
              }
              this.$router.push({path: this.$route.fullPath, hash: h})
            }
          }
        } else {
          document.documentElement.style.overflow = null
        }
      }
    }
  },
  methods: {
    close(force = false) {
      if (this.closable || force === true) {
        if (this.routeHistory) {
          if (history.state.back) {
            this.$router.back()
          } else {
            let h = ''
            if (this.$route.hash) {
              h = this.$route.hash.replace('#', '').split('&')
              h.splice(h.indexOf(this.routeHistory), 1)
              let s = ''
              let first = true
              h.forEach((item) => {
                if (item) {
                  s += (first ? '#' : '&') + item
                }
              })
              h = s
            }
            this.$router.replace({'path': this.$route.fullPath, hash: h})
          }
        }
        this.$emit('update:modelValue', false)
      } else {
        this.run_animate = true
        setTimeout(() => {
          this.run_animate = false
        }, 300)
      }
    }
  },
  beforeUnmount() {
    document.documentElement.style.overflow = null
  }
}
</script>
