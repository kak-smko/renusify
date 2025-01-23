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
@use "sass:map";
@use "../../style/variables/base";
@use "../../style/mixins";


.#{base.$prefix}content {
  --belowHeader: #{base.$toolbar-height};
  width: 100%;
  max-width: 100%;
  transition: 0.2s map.get(base.$transition, 'fast-out-slow-in');
  position: relative;
  @include mixins.firefox() {
    @media print {
      display: block
    }
  }

  &.flipped {
    @include mixins.rtl() {
      padding-right: base.$navbar-width;
    }
    @include mixins.ltr() {
      padding-left: base.$navbar-width;
    }
  }

  &.moved {
    width: calc(100% + #{base.$navbar-width});
    @include mixins.rtl() {
      margin-right: base.$navbar-width;
    }
    @include mixins.ltr() {
      margin-left: base.$navbar-width;
    }
  }

  &.below-header {
    margin-top: var(--belowHeader);
  }

}
</style>
