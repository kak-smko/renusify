<template>
  <div :class="`${$r.prefix}chart`" ref="chart"></div>
</template>

<script>
export default {
  name: 'r-chart',
  props: {
    url: {type: String, default: 'https://codenus.com/storage/chart/apexcharts.js'},
    dark: Boolean,
    options: Object
  },
  data() {
    return {
      chartShape: null,
      timeout_id: null
    }
  },
  mounted() {
    let children = document.querySelectorAll('[name=\'apexcharts\']')
    if (children.length === 0) {
      let el = document.createElement('script')
      el.setAttribute('src', this.url)
      el.setAttribute('name', 'apexcharts')
      document.head.append(el)
    }
    if (this.dark) {
      if (!this.options['theme']) {
        this.options['theme'] = {}
      }
      this.options['theme']['mode'] = 'dark'
    }

    this.timeout_id = setTimeout(() => {
      this.build()
    }, 10)

  },
  methods: {
    build(n = 0) {
      try {
        this.chartShape = new ApexCharts(this.$refs.chart, this.options)
        this.chartShape.render()
      } catch (e) {
        this.timeout_id = setTimeout(() => {
          this.build(n + 1)
        }, 100)
        if (n > 30) {
          console.error(e)
        }
      }
    }
  },
  beforeUnmount() {
    clearTimeout(this.timeout_id)
    this.chartShape.destroy()
  }
}
</script>
<style lang="scss">
@use "../../style/variables/base";

.#{base.$prefix}chart {
  position: relative;
  direction: ltr;
  text-align: left;
  z-index: 0;
}
</style>
