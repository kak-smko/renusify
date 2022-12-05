<template>
  <main :class="{[$r.prefix+'content']:true,
  'flipped':flipped,
  'moved':moved,
  'below-header':belowHeader}">
    <slot></slot>
  </main>
</template>

<script>
import './style.scss'

export default {
  name: 'r-content',
  props: {
    belowHeader: Boolean,
    flipped: Boolean,
    moved: Boolean
  }
}
</script>
