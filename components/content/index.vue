<template>
  <main :class="{[$r.prefix+'content']:true,
  'flipped':flipped,
  'moved':moved,
  'below-header':belowHeader}" :style="{'--belowHeader':belowHeader}">
    <slot></slot>
  </main>
</template>

<script>

export default {
  name: 'r-content',
  props: {
    belowHeader: String,
    flipped: Boolean,
    moved: Boolean
  }
}
</script>

<style lang="scss">
@import '../../style/_include';

.#{$prefix}content {
  --belowHeader: #{$toolbar-height};
  width: 100%;
  max-width: 100%;
  transition: 0.2s map-get($transition, 'fast-out-slow-in');
  position: relative;
  @include firefox() {
    @media print {
      display: block
    }
  }

  &.flipped {
    @include rtl() {
      padding-right: $navbar-width;
    }
    @include ltr() {
      padding-left: $navbar-width;
    }
  }

  &.moved {
    width: calc(100% + #{$navbar-width});
    @include rtl() {
      margin-right: $navbar-width;
    }
    @include ltr() {
      margin-left: $navbar-width;
    }
  }

  &.below-header {
    margin-top: var(--belowHeader);
  }

}
</style>
