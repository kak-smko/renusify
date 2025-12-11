<template>
  <div :class="`${$r.prefix}json-view d-flex v-start flex-wrap`"
       v-for="(value,key) in modelValue"
       :key="key">
    <div class="d-flex v-center me-1">
      <r-btn v-if="!disableDel" class="color-error-text" icon text @click.prevent="del(key)">
        <r-icon v-html="$r.icons.delete"></r-icon>
      </r-btn>
      <div v-if="typeof value==='object'">{{ t(key) }}</div>
    </div>
    <div v-if="typeof value==='object'" class="flex-grow-1 w-full ps-10">
      <r-json-input :tile="tile"
                    :model-value="value"
                    @update:model-value="emitValue(key,$event)"
                    :disableAdd="disableAdd||template!==undefined"
                    :disableDel="disableDel||template!==undefined"
                    :translate="translate"
                    disableEditKey
      ></r-json-input>
    </div>
    <div v-else class="mb-1 flex-grow-1">
      <r-text-input v-if="typeof value==='string'"
                    :tile="tile"
                    :label="!is_array?t(key):''"
                    :model-value="value" @update:model-value="emitValue(key,$event)"></r-text-input>
      <r-number-input v-else-if="typeof value==='number'"
                      :tile="tile"
                      :label="!is_array?t(key):''"
                      :model-value="value" @update:model-value="emitValue(key,$event)"></r-number-input>
      <r-switch-input v-else-if="typeof value==='boolean'"
                      :tile="tile"
                      :label="!is_array?t(key):''"
                      :model-value="value" @update:model-value="emitValue(key,$event)"></r-switch-input>

    </div>

  </div>
</template>
<script setup>
import {computed, inject} from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  template: Object,
  disableAdd: Boolean,
  disableDel: Boolean,
  tile: Boolean,
  translate: Boolean
})

const emit = defineEmits(['update:modelValue'])

const {$t} = inject('renusify')


const is_array = computed(() => Array.isArray(props.modelValue))

const t = (key) => {
  if (props.translate && $t) {
    return $t(key)
  }
  return key
}

const del = (key) => {
  const newValue = JSON.parse(JSON.stringify(props.modelValue))

  if (is_array.value) {
    newValue.splice(key, 1)
  } else {
    delete newValue[key]
  }

  emit('update:modelValue', newValue)
}

const emitValue = (key, value) => {
  const newValue = JSON.parse(JSON.stringify(props.modelValue))

  newValue[key] = value

  emit('update:modelValue', newValue)
}

</script>
<style lang="scss">
@use "../../../style" as *;

.#{$prefix}json-view {
  background-color: var(--color-sheet-container);
}
</style>
