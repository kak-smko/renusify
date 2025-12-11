<template>
  <r-input :class="`${$r.prefix}group-input`"
           :model-value="modelValue"
           label-active
  >
    <div>
      <div :key="key" v-sortable="{grab:'.grab-btn-group-input',end:end}">
        <div v-for="(item,i) in modelValue" :key="i" class="group-holder">
          <div class="group-slot">
            <!-- Default slot for custom group item content. Provide disableDel, index, item props.  -->
            <slot :disableDel="disDel" :index="i" :item="item">
              <div v-if="template" class="d-flex flex-wrap pt-5 v-start">
                <template v-for="(v,k) in item" :key="i+'-'+k">
                  <component :is="template[k]['type']" v-if="template[k]&&template[k]['type']" v-model="item[k]"
                             :label="t(k)"
                             class="flex-grow-0 me-1" v-bind="template[k]['props']"></component>
                </template>
              </div>
            </slot>
          </div>
          <div class="group-action">
            <r-btn class="grab-btn-group-input" icon text>
              <r-icon v-html="$r.icons.drag"></r-icon>
            </r-btn>
            <r-btn v-if="!disableItems.includes(itemKey?item[itemKey]:'')" icon text @click.prevent="del(i)">
              <r-icon class="color-error-text" v-html="$r.icons.delete"></r-icon>
            </r-btn>
          </div>
        </div>
      </div>
      <div :class="addBtnClass" class="my-3">
        <transition name="scale">
          <r-btn v-if="show_add" class="color-success" icon @click.prevent="add">
            <r-icon v-html="$r.icons.plus" class="color-white-text"></r-icon>
          </r-btn>
        </transition>
      </div>
    </div>
  </r-input>
</template>
<script setup>
import {ref, computed, inject} from 'vue'

const props = defineProps({
  /**
   * Key to identify items that should not be deletable
   * @type {String}
   */
  itemKey: String,

  /**
   * The model value for the group items (v-model)
   * @type {Array}
   * @default () => []
   */
  modelValue: {
    type: Array,
    default: () => []
  },

  /**
   * Maximum number of items allowed
   * @type {Number}
   */
  size: Number,

  /**
   * Disables the add button
   * @type {Boolean}
   */
  disableAdd: Boolean,

  /**
   * Enables translation for item keys
   * @type {Boolean}
   */
  translate: Boolean,

  /**
   * Template configuration for dynamic form generation
   * @type {Object}
   */
  template: Object,

  /**
   * CSS class for the add button container
   * @type {String}
   * @default 'text-center'
   */
  addBtnClass: {
    type: String,
    default: 'text-center'
  }
})

const emit = defineEmits([
  /**
   * Emitted when the model value changes
   * @param {Array} items - Updated array of items
   */
  'update:modelValue',

  /**
   * Emitted when a new item is added
   * @param {Boolean} true - Indicates an item was added
   */
  'add',

  /**
   * Emitted when an item is deleted
   * @param {Number} index - Index of the deleted item
   */
  'delete'
])

const {$t, $helper} = inject('renusify')

const key = ref(0)
const disabledDel = ref({})

const disableItems = computed(() => Object.keys(disabledDel.value))

const show_add = computed(() => {
  if (props.disableAdd) {
    return false
  }

  const length = $helper.ifHas(props.modelValue, 0, 'length')
  return !(props.size && length >= props.size)
})

/**
 * Handles drag-and-drop reordering completion
 * @param {Array} e - Array of new item indices after reorder
 */
const end = (e) => {
  const newArray = []
  for (let i = 0; i < e.length; i++) {
    const index = parseInt(e[i])
    if (props.modelValue[index] !== undefined) {
      newArray.push(props.modelValue[index])
    }
  }

  emit('update:modelValue', newArray)
  key.value++
}

/**
 * Translates a key if translation is enabled
 * @param {String} k - Key to translate
 * @returns {String} Translated text or original key
 */
const t = (k) => {
  if (props.translate && $t) {
    return $t(k)
  }
  return k
}

/**
 * Marks an item as non-deletable
 * @param {String} value - Item value to disable deletion for
 */
const disDel = (value) => {
  disabledDel.value[value] = true
}

/**
 * Adds a new item to the group
 */
const add = () => {
  if (!show_add.value) return

  const newArray = [...(props.modelValue || [])]
  let newItem = {}

  if (props.template) {
    for (const key in props.template) {
      let defaultValue = props.template[key]?.default !== undefined
          ? props.template[key].default
          : null

      if (typeof defaultValue === 'object' && defaultValue !== null) {
        defaultValue = $helper.clearProxy(defaultValue)
      }

      newItem[key] = defaultValue
    }
  }

  newArray.push(newItem)
  emit('add', true)
  emit('update:modelValue', newArray)
}

/**
 * Deletes an item from the group
 * @param {Number} index - Index of the item to delete
 */
const del = (index) => {
  const newArray = [...(props.modelValue || [])]
  newArray.splice(index, 1)

  emit('delete', index)
  emit('update:modelValue', newArray)
}
</script>
<style lang="scss">
@use "../../../style" as *;

.#{$prefix}group-input {
  > .input-control {
    height: auto;
  }

  .group-holder {
    .input-control {
      background-color: var(--color-sheet-container-low);
    }
  }

  .group-holder {
    position: relative;

    .group-action {
      position: absolute;
      top: 0;
      @include ltr() {
        right: 0;
      }
      @include rtl() {
        left: 0;
      }
    }
  }
}
</style>
