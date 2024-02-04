<template>
  <div :class="`${$r.prefix}rating size-${size} ms-n1`">
    <r-btn :key="i" :class="`${Math.round(modelValue)>=i?'color-rating':''}`"
           :readonly="readonly"
           @click.prevent="select(i)"
           icon
           text
           v-for="i in count">
      <r-icon v-html="$r.icons.star"></r-icon>
    </r-btn>
  </div>
</template>

<script>

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
  emits: ['update:modelValue'],
  created() {
    if (!this.$r.icons.star) {
      this.$r.icons.star = '<svg xmlns="http://www.w3.org/2000/svg"   preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27Z"/></svg>'
    }
  },
  methods: {
    select(n) {
      this.$emit('update:modelValue', n)
    }
  }
}
</script>
<style lang="scss">
@import "../../../style/include";

$btn-sizes: (
    'x-small': 20,
    'small': 25,
    'default': 30,
    'large': 35,
    'x-large': 40
) !default;
.#{$prefix}rating {
  max-width: 100%;
  white-space: nowrap;
  transition: 1s $primary-transition;

  * {
    color: var(--color-on-sheet-low);
  }

  .color-rating * {
    color: #fbc02d !important;
  }

  @each $name, $size in $btn-sizes {
    &.size-#{$name} {
      .#{$prefix}btn {
        height: #{$size}px;
        width: #{$size}px
      }

      .#{$prefix}icon {
        height: #{$size - 4px};
        width: #{$size - 4px}
      }
    }
  }
}

</style>
