<template>
  <r-container :class="`${$r.prefix}timeline`" full-width>
    <r-row v-for="(item,i) in items" :key="i" class="timeline-item" no-gutters>
      <r-col v-if="$r.breakpoint.mdAndUp" class="md-5">
        <slot :item="item" :k="i" name="back"></slot>
      </r-col>
      <r-col class="col-2 md-2">
        <slot :item="item" :k="i" name="counter">
          <div class="d-flex h-center v-center h-full">
            <div class="timeline-counter color-one d-flex h-center v-center">{{ i + 1 }}</div>
          </div>
        </slot>
      </r-col>
      <r-col class="col-10 md-5">
        <slot :item="item" :k="i">{{ item }}</slot>
      </r-col>
    </r-row>
  </r-container>
</template>
<script>
export default {
  name: "rTimeline",
  props: {
    items: {
      type: Array
    }
  }
}
</script>
<style lang="scss">
@use "sass:math";
@use "../../style/variables/base";
@use "../../style/mixins";
@use "../../style/mixins/container" as mixins2;

.#{base.$prefix}timeline {
  .timeline-item {
    position: relative;
    padding: 30px 0;

    &:not(:last-child):before {
      content: '';
      width: 1px;
      height: 40%;
      border-right: 2px solid var(--color-border);
      position: absolute;
      bottom: -20%;
      z-index: 0;
      @include mixins.rtl() {
        right: math.percentage(math.div(1, base.$grid-columns));
      }
      @include mixins.ltr() {
        left: math.percentage(math.div(1, base.$grid-columns));
      }
    }

    @include mixins2.media-breakpoint-up('md') {
      &:nth-child(2n) {
        flex-direction: row-reverse;
      }
      &:not(:last-child):before {
        left: 50% !important;
        right: unset !important;
      }
    }

  }

  .timeline-counter {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    z-index: 1;
  }
}
</style>