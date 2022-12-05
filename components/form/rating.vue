<template>
  <div :class="`${$r.prefix}rating `">
    <r-btn :class="`${Math.round(modelValue)>=i?'color-warning-text':''}`" :key="i"
           :readonly="readonly"
           :size="size"
           @click="select(i)"
           icon
           text
           v-for="i in count">
      <r-icon v-html="$r.icons.star"></r-icon>
    </r-btn>
  </div>
</template>

<script>
import './scss/rating.scss'

export default {
  name: 'r-rating',
  props: {
    count: {
      type: Number,
      default: 5
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['x-small', 'small', 'default', 'large', 'x-large'].indexOf(value) !== -1
      }
    },
    modelValue: Number,
    readonly: Boolean
  },
  created(){
    if(!this.$r.icons.star) {
      this.$r.icons.star = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27Z"/></svg>'
    }
  },
  methods: {
    select (n) {
      this.$emit('update:modelValue', n)
    }
  }
}
</script>
