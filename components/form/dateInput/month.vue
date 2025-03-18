<template>
  <div class="d-flex flex-wrap h-space-around">
    <r-btn v-for="i in ls"
           :key="i"
           outlined
           class="w-25 ma-1"
           :class="{'color-one':i===modelValue}"
           @click.prevent="emit(i)">
      {{
      $d(new Date(year, i, 1, 0, timezoneOffset), 'month', locale)
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
  emits: ['update:modelValue'],
  data() {
    return {
      ls: []
    }
  },
  beforeMount() {
    const year = this.$d(new Date(this.year, this.month, 5, 0, this.timezoneOffset), 'ye', this.locale)
    let ls = []
    let first = 0
    let n = 0
    while (true) {
      n++
      if (n > 100) {
        break
      }
      const y = this.$d(new Date(this.year, first, 5, 0, this.timezoneOffset), 'ye', this.locale)
      const m = parseInt(this.$d(new Date(this.year, first, 5, 0, this.timezoneOffset), 'me', this.locale))
      if (y === year && m === 1) {
        break
      }
      if (y > year) {
        first--
      } else if (y < year) {
        first++
      } else if (m > 1) {
        first--
      } else {
        first++
      }
    }
    for (let i = 0; i < 12; i++) {
      ls.push(first + i)
    }
    this.ls = ls
  },
  methods: {
    emit(n) {
      this.$emit('update:modelValue', n)
    }
  }
}
</script>