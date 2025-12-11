<template>
  <r-input :class="[`${$r.prefix}json-input`]"
           :model-value="modelValue"
           label-active>
    <div class="d-flex v-center">
      <r-btn v-if="!disableEditKey" class="my-1" icon size="sm" @click.prevent="modeForm=!modeForm">{ }</r-btn>
    </div>
    <div v-if="modeForm">
      <json-view :model-value="modelValue"
                 @update:model-value="emitValue"
                 :template="template"
                 :disableAdd="disableAdd"
                 :disableDel="disableDel"
                 :translate="translate"
      ></json-view>
      <r-btn
          v-if="!show &&!disableAdd"
          class="my-3 ms-1"
          icon
          size="sm"
          @click.prevent="open">
        <r-icon v-html="$r.icons.plus"></r-icon>
      </r-btn>
      <div v-else-if="show" class="d-flex v-baseline flex-wrap">
        <!-- Custom slot for add form with add function and info object -->
        <slot :add="add" :info="info">
          <r-text-input
              v-if="!is_array"
              v-model="info.key"
              :placeholder="keyLabel||$t('key','renusify')"
              class="w-30 pe-1"></r-text-input>
          <div v-if="!valueType" class="w-20">
            <r-select-input v-model="info.type"
                            :items="['text','number','boolean','json','array']"
                            :translate="translate"
                            class="me-1"
                            disableSearch
                            firstSelect
                            just-value
                            @update:model-value="info.value=null"></r-select-input>
          </div>
          <r-text-input v-if="info.type==='text'"
                        v-model="info.value"
                        :placeholder="valueLabel||$t('value','renusify')"
          ></r-text-input>
          <r-number-input v-else-if="info.type==='number'"
                          v-model="info.value"
                          :placeholder="valueLabel||$t('value','renusify')"></r-number-input>
          <r-switch-input v-else-if="info.type==='boolean'"
                          v-model="info.value"
                          :label="valueLabel||$t('value','renusify')"></r-switch-input>
          <r-btn class="ms-1 color-success" size="sm" @click.prevent="add">{{ $t('add', 'renusify') }}</r-btn>
        </slot>
      </div>
    </div>
    <div v-else :class="{'state-error':error}" class="json-highlight ltr">
      <textarea
          v-model="lazyValue"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          class="ltr w-full"
          spellcheck="false"
          :rows="modelValue?Object.keys(modelValue).length+5:5"
      ></textarea>
      <div class="text-preview" v-html="code"></div>
    </div>
  </r-input>
</template>

<script setup>
import {computed, inject, onMounted, ref, watch} from 'vue'
import {useHighlight} from '../../highlight/useHighlight.js'
import JsonView from "./JsonView.vue"

const props = defineProps({
  /**
   * Label text for the key input field
   * @type {String}
   * @default 'key'
   */
  keyLabel: {
    type: String,
    default: 'key'
  },
  /**
   * Label text for the value input field
   * @type {String}
   * @default 'value'
   */
  valueLabel: {
    type: String,
    default: 'value'
  },
  /**
   * The JSON data model value (object or array)
   * @type {Object|Array}
   */
  modelValue: [Object, Array],
  /**
   * Fixed value type for all items when specified
   * @type {String}
   * @validator ['text', 'number', 'boolean']
   */
  valueType: {
    type: String,
    validator: (value) => ['text', 'number', 'boolean'].includes(value)
  },
  /**
   * Template object for new items when adding
   * @type {Object}
   */
  template: Object,
  /**
   * Treat the model value as an array base
   * @type {Boolean}
   */
  baseArray: Boolean,
  /**
   * Disable the ability to add new items
   * @type {Boolean}
   */
  disableAdd: Boolean,
  /**
   * Disable the edit key toggle button
   * @type {Boolean}
   */
  disableEditKey: Boolean,
  /**
   * Disable the ability to delete items
   * @type {Boolean}
   */
  disableDel: Boolean,
  /**
   * Enable translation for UI texts
   * @type {Boolean}
   */
  translate: Boolean
})

const emit = defineEmits([
  /**
   * Emitted when the JSON data changes
   * @param {Object|Array} value - The updated JSON data
   */
  'update:modelValue'
])

const {highlight} = useHighlight()

const $t = inject('renusify').$t

// Reactive data
const lazyValue = ref('')
const modeForm = ref(true)
const error = ref(false)
const show = ref(false)
const code = ref('')
const info = ref({})

// Computed properties
/**
 * Determines if the model value is an array
 * @returns {Boolean} True if model is an array
 */
const is_array = computed(() => {
  if (props.baseArray) {
    return true
  }
  return Array.isArray(props.modelValue)
})

// Methods
/**
 * Builds syntax-highlighted code from JSON
 */
const build_code = async () => {
  try {
    code.value = await highlight(lazyValue.value, 'json', true)
  } catch (err) {
    console.error('Error highlighting code:', err)
  }
}

/**
 * Opens the add form or applies template
 */
const open = () => {
  if (props.template) {
    let newValue = props.modelValue

    if (!newValue) {
      newValue = props.baseArray ? [] : {}
    }

    if (props.baseArray) {
      const templateCopy = JSON.parse(JSON.stringify(props.template))
      newValue.push(templateCopy)
    } else {
      newValue = JSON.parse(JSON.stringify(props.template))
    }

    emit('update:modelValue', newValue)
  } else {
    if (props.valueType) {
      info.value.type = props.valueType
    }
    show.value = true
  }
}

/**
 * Emits updated value from JsonView component
 * @param {Object|Array} value - The updated JSON value
 */
const emitValue = (value) => {
  emit('update:modelValue', value)
}

/**
 * Adds a new item to the JSON data
 */
const add = () => {
  let newValue = props.modelValue

  if (!newValue) {
    newValue = props.baseArray ? [] : {}
  }

  newValue = JSON.parse(JSON.stringify(newValue))

  if (info.value.type === 'json') {
    if (is_array.value) {
      newValue.push({})
    } else {
      newValue[info.value.key] = {}
    }
  } else if (info.value.type === 'array') {
    if (is_array.value) {
      newValue.push([])
    } else {
      newValue[info.value.key] = []
    }
  } else {
    if (is_array.value) {
      newValue.push(info.value.value)
    } else {
      newValue[info.value.key] = info.value.value
    }
  }

  show.value = false
  info.value = {}
  emit('update:modelValue', newValue)
}

// Watchers
watch(modeForm, () => {
  lazyValue.value = JSON.stringify(props.modelValue || {}, null, 4)
})

watch(() => props.modelValue, (newValue) => {
  try {
    error.value = false

    if (lazyValue.value) {
      const currentParsed = JSON.parse(lazyValue.value)
      if (JSON.stringify(currentParsed) !== JSON.stringify(newValue)) {
        lazyValue.value = JSON.stringify(newValue || {}, null, 4)
      }
    } else {
      lazyValue.value = JSON.stringify(newValue || {}, null, 4)
    }
  } catch (er) {
    error.value = true
    console.error('Error parsing JSON:', er)
  }
}, {deep: true})

watch(lazyValue, async (newValue) => {
  try {
    error.value = false
    await build_code()
    const parsed = JSON.parse(newValue)
    emit('update:modelValue', parsed)
  } catch (er) {
    error.value = true
    console.error('Error in lazyValue watch:', er)
  }
})

// Lifecycle hooks
onMounted(async () => {
  if (props.modelValue) {
    try {
      lazyValue.value = JSON.stringify(props.modelValue, null, 4)
      await build_code()
    } catch (err) {
      console.error('Error initializing component:', err)
    }
  }
})
</script>

<style lang="scss">
@use "sass:map";
@use "../../../style/variables/base";


.#{base.$prefix}json-input {
  > .input-control {
    height: auto;
    padding: 8px;
  }

  .input-holder {
    .input-control {
      background-color: var(--color-sheet-container-low);
    }
  }

  .state-error {
    border: 1px solid var(--color-error);
  }

  .json-highlight {
    position: relative;
    margin: 12px 0;

    .text-preview {
      white-space: pre-wrap;
      word-break: keep-all;
      overflow-wrap: break-word;
      min-height: 40px;
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 20px;
      margin: 0;
      border: 0;
      padding: 12px;
    }

    textarea {
      &::selection {
        background-color: var(--color-one);
        -webkit-text-fill-color: var(--color-on-one);
        color: var(--color-on-one);
      }

      padding: 12px;
      margin: 0;
      border: 0;
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 20px;
      -webkit-font-smoothing: antialiased;
      -webkit-text-fill-color: transparent;
      outline: none;
      width: 100%;
      height: 100%;
      min-height: 40px;
      white-space: pre-wrap;
      word-break: keep-all;
      overflow-wrap: break-word;
      position: absolute;
      top: 0;
      left: 0;
      resize: none;
      overflow: hidden;
    }


    .highlight-syn-deleted,
    .highlight-syn-err,
    .highlight-syn-var {
      color: var(--color-error);
    }


    .highlight-syn-insert,
    .highlight-syn-type,
    .highlight-syn-func,
    .highlight-syn-bool {
      color: var(--color-warning);
    }

    .highlight-syn-num, .highlight-numbers {
      color: var(--color-info);
    }


    .highlight-syn-str {
      color: var(--color-success);
    }
  }
}
</style>
