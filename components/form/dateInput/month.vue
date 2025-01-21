<template>
  <div class="d-flex flex-wrap">
    <r-btn v-for="i in 12"
           :key="i"
           outlined
           class="w-30 ma-2"
           :class="{'color-one-text':i+p===modelValue}"
           @click.prevent="emit(i+p)">
      {{
        $d(new Date(year, i + p, 1, 0, timezoneOffset), 'month', locale)
      }}
    </r-btn>
  </div>
</template>
<script>
export default {
  name: 'month-tab',
  props: {
    modelValue: Number,
    timezoneOffset: Number,
    locale: String,
    month: Number,
    year: Number
  },
  emits:['update:modelValue'],
  data() {
    return {
      p: 0
    }
  },
  beforeMount() {
    const c = this.$d(new Date(this.year, 1, 1, 0, this.timezoneOffset), 'me', this.locale)
    if (c > 1) {
      this.p = (1 - c)
    }
  },
  methods: {
    emit(n) {
      this.$emit('update:modelValue', n)
    }
  }
}
</script>