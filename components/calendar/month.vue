<template>
  <div class="d-flex flex-wrap h-space-around">
    <r-btn v-for="i in ls"
           :key="i"
           class="btn-month ma-1"
           :class="{'color-one':i===modelValue}"
           @click.prevent="emitValue(i)">
      {{
        $d(new Date(year, i, 1, 0, timezoneOffset), 'month', locale)
      }}
    </r-btn>
  </div>
</template>
<script setup>
import {ref, inject, onBeforeMount} from 'vue'

const props = defineProps({
  modelValue: Number,
  timezoneOffset: Number,
  locale: String,
  month: Number,
  year: Number
})

const emit = defineEmits(['update:modelValue'])

const $d = inject('renusify').$d

const ls = ref([])

const emitValue = (n) => {
  emit('update:modelValue', n)
}

const yearValue = $d(new Date(props.year, props.month, 5, 0, props.timezoneOffset), 'ye', props.locale)
let list = []
let first = 0
let n = 0

while (true) {
  n++
  if (n > 100) {
    break
  }

  const y = $d(new Date(props.year, first, 5, 0, props.timezoneOffset), 'ye', props.locale)
  const m = parseInt($d(new Date(props.year, first, 5, 0, props.timezoneOffset), 'me', props.locale))

  if (y === yearValue && m === 1) {
    break
  }

  if (y > yearValue) {
    first--
  } else if (y < yearValue) {
    first++
  } else if (m > 1) {
    first--
  } else {
    first++
  }
}

for (let i = 0; i < 12; i++) {
  list.push(first + i)
}

ls.value = list
</script>
<style lang="scss">
.btn-month {
  width: 25%;
  background-color: var(--color-sheet-container);
  border: 1px solid var(--color-border-low);
}
</style>