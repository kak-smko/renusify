<template>
  <div class="year-tab d-flex flex-wrap h-space-around">
    <r-btn v-for="i in 200"
           :key="i"
           class="btn-year ma-1"
           :class="{'color-one year-select':modelValue+i-100===modelValue}"
           @click.prevent="emitValue(modelValue+i-100)">
      {{
      $d(new Date(modelValue + i - 100, month, 5, 0, timezoneOffset), 'year', locale)
      }}
    </r-btn>
  </div>
</template>
<script setup>
import {onMounted} from 'vue'

const props = defineProps({
  modelValue: Number,
  timezoneOffset: Number,
  locale: String,
  month: Number
})

const emit = defineEmits(['update:modelValue'])

const emitValue = (n) => {
  emit('update:modelValue', n - props.modelValue)
}

onMounted(() => {
  let el = document.querySelector('.year-select')
  if (el) {
    el.scrollIntoView(true)
  }
})
</script>
<style lang="scss">
.year-tab {
  max-height: 300px;
}

.btn-year {
  width: 25%;
  background-color: var(--color-sheet-container);
  border: 1px solid var(--color-border-low);
}
</style>