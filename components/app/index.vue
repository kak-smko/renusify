<template>
  <div :class="{
        [$r.prefix+'app']:true,
                    'app-rtl': isRtl,
                    'app-ltr': !isRtl
                }" :id="id">
    <div class="app-wrap" :style="{'min-height':$r.breakpoint.height+'px'}">
      <slot></slot>
    </div>
    <r-toast></r-toast>
  </div>
</template>

<script>
import './style.scss'
import RToast from './toast/index.vue'

export default {
  name: 'r-app',
  components: {RToast},
  props: {
    id: {
      type: [String, Number],
      default: 'renusify'
    },
    rtl: {type: Boolean, default: undefined}
  },
  computed: {
    isRtl() {
      if (this.rtl !== undefined) {
        return this.rtl
      }
      return this.$r.rtl
    }
  }
}
</script>
