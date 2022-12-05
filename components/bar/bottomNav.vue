<template>
  <nav :class="classes">
    <slot></slot>
  </nav>
</template>

<script>
import './scss/bottomNav.scss'

export default {
  name: 'r-bottomNav',
  props: {
    fixed: Boolean,
    grow: Boolean
  },
  computed:{
    classes(){
      let a={
    'elevation-md':true,
    'bottom-navigation-fixed':this.fixed,
    'bottom-navigation-grow':this.grow
  }
  a[`${this.$r.prefix}bottom-navigation`]=true
  return a
    }
  }
}
</script>
