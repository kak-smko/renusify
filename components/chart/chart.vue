<template>
  <div :class="`${$r.prefix}chart`" ref="chart"></div>
</template>

<script>

export default {
  name: "r-chart",
  props: {
    options: Object
  },
  data() {
    return {
      chartShape: null,
      Chart: null
    };
  },
  mounted(){
    import('./apexcharts').then((d)=>{
      this.Chart=d.default;
      this.build()
    })
  },
  methods: {
    build() {
      this.chartShape = new this.Chart(this.$refs.chart, this.options);
      this.chartShape.render()
    }
  },
  beforeUnmount() {
    this.chartShape.destroy();
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
