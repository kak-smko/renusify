<template>
  <div class="code-editor-highlight ltr">
    <textarea
        v-model="d"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        @keydown="setKey"
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
const openTag = ref(null)
const build_code = async () => {
  if (d.value) {
    code.value = await highlight(d.value, "html", true)
  } else {
    code.value = ''
  }
}

const setKey = (event) => {
  if (event.key === "<") {
    openTag.value = event.target.selectionEnd
    return false
  } else if (event.key === "/" && openTag.value !== null && openTag.value + 1 === event.target.selectionEnd) {
    openTag.value = null
    return false
  } else if (event.key === ">" && openTag.value !== null) {
    const end = event.target.selectionEnd;
    const sel = event.target.value.substring(openTag.value + 1, end).trim().split(' ')[0];
    const t = `></${sel}>`
    event.preventDefault()
    document.execCommand('insertText', false, t);
    event.target.selectionEnd = end + 1;
    openTag.value = null
    return false
  }
  if (event.key === "=") {
    const end = event.target.selectionEnd;
    event.preventDefault()
    document.execCommand('insertText', false, '=""');
    event.target.selectionEnd = end + 2;
    return false;
  }
  return setTab(event)
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
