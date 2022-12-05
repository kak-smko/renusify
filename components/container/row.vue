<template>
  <section class="row" :class="{'row-dense':dense,'no-gutters':noGutters}">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'r-row',
  props:{
    dense:Boolean,
    noGutters:Boolean
  }
}
</script>
