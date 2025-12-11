<template>
  <r-input :class="[`${$r.prefix}radio-input`]"
           :modelValue="modelValue"
           label-active>
    <div v-for="(item,i) in list"
         :key="i"
         :class="{'radio-item-selected':current===item.value}" class="radio-item my-2">
      <!-- Custom slot for radio item rendering with emit function, index, and item data -->
      <slot :emit="emitValue" :index="i" :item="item">
            <span class="radio-input-item" :class="{
                   'br-circle':rounded,
                   'radio-input-select':current===item.value
               }" @click.prevent="emitValue(item)"></span>
        <span class="ms-2 radio-label" @click.prevent="emitValue(item)">
                {{ item[text] }}
            </span>
      </slot>
    </div>
  </r-input>
</template>

<script setup>
import {computed, inject} from 'vue'

const props = defineProps({
  /**
   * Array of radio items (objects or primitives)
   * @type {Array}
   * @default () => []
   *
   * If objects, each should have at least a 'value' property and optionally a text property
   * If primitives, they will be converted to objects with value and text properties
   */
  items: {
    type: Array,
    default: () => []
  },
  /**
   * Property name to use for display text in items
   * @type {String}
   * @default 'title'
   */
  text: {
    type: String,
    default: 'title'
  },
  /**
   * Use circular radio buttons instead of square
   * @type {Boolean}
   */
  rounded: Boolean,
  /**
   * Emit only the value instead of the entire item object
   * @type {Boolean}
   */
  justValue: Boolean,
  /**
   * Enable translation for item texts
   * @type {Boolean}
   */
  translate: Boolean,
  /**
   * The selected radio item's model value
   * @type {String|Number|Object}
   */
  modelValue: [String, Number, Object]
})

const emit = defineEmits([
  /**
   * Emitted when a radio item is selected
   * @param {Object|String|Number} value - Selected item or value
   *
   * When justValue is true: emits the item's value property
   * When justValue is false: emits the entire item object
   */
  'update:modelValue'
])

const {$t} = inject('renusify')

// Computed properties
/**
 * Gets the current selected value for comparison
 * @returns {String|Number|null} Current selected value or null if none
 */
const current = computed(() => {
  if (!props.modelValue) {
    return null
  }
  return props.justValue ? props.modelValue : props.modelValue.value
})

/**
 * Processes items array for consistent format
 * @returns {Array} Processed list of radio items
 *
 * Converts primitive values to objects with {text, value} structure
 * Applies translation if enabled
 */
const list = computed(() => {
  const l = props.items.length
  if (typeof props.items[0] === 'object') {
    return props.items
  }

  let r = []
  for (let i = 0; i < l; i++) {
    r.push({
      [props.text]: props.translate ? $t(props.items[i]) : props.items[i],
      'value': props.items[i]
    })
  }
  return r
})

// Methods
/**
 * Emits the selected radio item
 * @param {Object} val - The selected radio item
 */
const emitValue = (val) => {
  if (props.readonly) {
    return
  }

  emit('update:modelValue', props.justValue ? val.value : val)
}
</script>

<style lang="scss">
@use "sass:map";
@use "../../../style" as *;

.#{$prefix}radio-input {
  width: 100%;
  cursor: pointer;

  .input-control {
    height: auto;
  }

  .radio-label {
    color: var(--color-on-sheet);
  }

  .radio-item {
    display: flex;
    align-items: center;
  }

  .radio-input-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: map.get($borders, 'sm');
    transition: all $primary-transition;
    border: 1px solid var(--color-on-sheet-low);

    &::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: inherit;
      background-color: currentColor;
      opacity: 0;
      transition: all $primary-transition;
    }
  }

  .radio-input-select::before {
    opacity: 1;
  }
}
</style>