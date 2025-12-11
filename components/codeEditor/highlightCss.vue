<template>
  <div class="code-editor-highlight ltr">
    <textarea
        v-model="d"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        @keydown="setTab"
    ></textarea>
    <div class="text-preview" v-html="code"></div>
  </div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import {useHighlight} from '../highlight/useHighlight.js'
import {useCodeFormatter} from './useCodeFormatter.js'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const {highlight} = useHighlight()
const {setTab} = useCodeFormatter()

const d = ref(props.modelValue || '')
const code = ref('')

const build_code = async () => {
  if (d.value) {
    code.value = await highlight(d.value, "css", true)
  } else {
    code.value = ''
  }
}

watch(() => props.modelValue, (newValue) => {
  d.value = newValue
})

watch(d, async (newValue) => {
  await build_code()
  emit('update:modelValue', newValue)
}, {immediate: true})

onMounted(async () => {
  if (props.modelValue) {
    await build_code()
  }
})
</script>
