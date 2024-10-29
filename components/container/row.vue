<template>
  <section :class="{'row-dense':dense,'no-gutters':noGutters,'row-grid':grid}" class="row">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'r-row',
  props:{
    dense:Boolean,
    grid: Boolean,
    noGutters:Boolean
  }
}
</script>
