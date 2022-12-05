<template>
    <span ref="icon" :class="classes">
        <slot></slot>
    </span>
</template>

<script>
    import './style.scss'

    export default {
      name: 'index',
      props: {
        width: {type: String},
        height: {type: String},
        disabled: Boolean,
        exact: Boolean
      },
      mounted() {
        if (this.width || this.height) {
          const el = this.$refs.icon.firstElementChild
          if (el) {
            if (this.width) {
              el.setAttribute('width', this.width)
            }
            if (this.height) {
              el.setAttribute('height', this.height)
            }
          }
        }
      },
      computed: {
        classes() {
          let a = {
            'icon-disabled': this.disabled,
            'exact-icon': this.exact
          }
          a[`${this.$r.prefix}icon`] = true
          return a
        }
      }
    }
</script>
