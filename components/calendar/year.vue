<template>
  <div class="calendar-year-tab d-flex flex-wrap h-space-around">
    <r-btn v-for="i in 200"
           :key="i"
           class="w-25 ma-1"
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
  emits: ['update:modelValue'],
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
<style>
.calendar-year-tab {
  max-height: 300px;
}
</style>