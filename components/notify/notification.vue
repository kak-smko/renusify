<template>
    <transition
            :name="`slide-fade-${pos}`"
    >
        <div v-if="show" :class="[status, 'notify-msg']" :style="{ width: width }">
            <slot>
              <div>
                <h3 class="title"><b>{{ content.title }}</b></h3>
                <p class="subtitle-1 ma-0">{{ content.text }}</p>
              </div>
            </slot>
          <r-btn class="h-end" icon text @click.prevent.stop="hideMe">
            <r-icon v-html="$r.icons.close"></r-icon>
          </r-btn>
        </div>
    </transition>
</template>
<script>
export default {
  props: {
    pos: {
      default: 'right'
    },
    permanent: {
      default: false
    },
    content: {},
    status: {
      type: String,
      default: 'alert-success'
    },
    width: {
      type: String,
      default: '350px'
    },
    timeout: {
      type: Number,
      default: 4000
    }
  },
  emits:['hide'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    hideMe () {
      this.$emit('hide',true)
    }
  },
  created () {
    setTimeout(() => {
      this.show = true
    }, 10)
    if (!this.permanent) {
      setTimeout(() => {
        this.hideMe()
      }, this.timeout)
    }
  }
}
</script>
<style lang="scss">
@import "../../style/include";

.notify-msg {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  border-radius: map-get($borders, 'md');
  position: relative;
  z-index: map_get($z-index, 'important');
  margin: 0.3rem 0;
}
</style>
