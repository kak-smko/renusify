<template>
  <div :class="`${$r.prefix}chart`" ref="chart"></div>
</template>

<script>
import * as Chart from './apexcharts'

export default {
  name: "r-chart",
  props: {
    options: Object
  },
  data() {
    return {
      chartShape: null
    };
  },
  mounted() {
    this.build();
  },
  methods: {
    build() {
      this.chartShape = new Chart(this.$refs.chart, this.options);
      this.chartShape.render()
    }
  }
};
</script>
<style lang="scss">
@import "../../style/include";

.#{$prefix}chart {
  position: relative;
  direction: ltr;
  text-align: left;
  z-index: 0;
}
</style>
