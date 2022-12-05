<template>
  <hr :class="classes"/>
</template>

<script>
export default {
  name: 'r-divider',
  props: {
    inset: Boolean,
    vertical: Boolean
  },
  computed: {
    classes () {
      let c = this.$r.prefix+'divider'
      if (this.inset) {
        c += ' divider-inset'
      }
      if (this.vertical) {
        c += ' divider-vertical'
      }
      return c
    }
  }
}
</script>
