<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
import './style.scss'

export default {
  name: 'r-container',
  props: {
    fullWidth: Boolean,
    fill: Boolean
  },
  computed:{
    classes(){
      let a={'container-fluid':this.fullWidth,'fill':this.fill}
      a[`${this.$r.prefix}container`]=true
      return a
    }
  }
}
</script>
