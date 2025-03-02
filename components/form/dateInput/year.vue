<template>
  <div class="date-picker-year d-flex flex-wrap">
    <r-btn v-for="i in 200"
           :key="i"
           class="w-30 ma-2"
           :class="{'color-one year-select':modelValue+i-100===modelValue}"
           outlined
           @click.prevent="emit(modelValue+i-100)">
      {{
      $d(new Date(modelValue + i - 100, month, 5, 0, timezoneOffset), 'year', locale)
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
  mounted() {
    let el = document.querySelector('.year-select')
    if (el) {
      el.scrollIntoView(true)
    }
  },
  methods: {
    emit(n) {
      this.$emit('update:modelValue', n - this.modelValue)
    }
  }
}
</script>
