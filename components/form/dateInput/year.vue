<template>
  <div class="d-flex flex-wrap">
    <r-btn v-for="i in 12"
           :key="i"
           class="w-30 ma-2"
           :class="{'color-one-text':modelValue+i-6===modelValue}"
           outlined
           @click.prevent="emit(modelValue+i-6)">
      {{
        $d(new Date(modelValue + i - 6, month, 1, 0, timezoneOffset), 'year', locale)
      }}
    </r-btn>
  </div>
</template>
<script>
export default {
  name: 'year-tab',
  props: {
    modelValue: Number,
    timezoneOffset: Number,
    locale: String,
    month: Number
  },
  emits:['update:modelValue'],
  methods: {
    emit(n) {
      this.$emit('update:modelValue', n)
    }
  }
}
</script>