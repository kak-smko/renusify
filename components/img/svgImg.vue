<template>
  <span ref="img"></span>
</template>
<script>
export default {
  name: "svgImg",
  props: {
    link: String,
    size: Object
  },
  created() {
    this.ImgToSvg()
  },
  methods: {
    replace(svg) {
      if (!this.$refs.img) {
        setTimeout(() => {
          this.replace(svg)
        }, 10)
        return
      }
      this.$refs.img.replaceWith(svg)
    },
    ImgToSvg() {
      const that = this
      fetch(this.link).then(x => {
        x.text().then((d) => {
          const el = document.createElement('div')
          el.innerHTML = d
          let svg = el.querySelector('svg')
          svg.setAttribute('width', that.size.width + 'px')
          svg.setAttribute('height', that.size.height + 'px')
          that.replace(svg)
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
