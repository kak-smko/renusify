<template>
  <div ref="menuRef" v-click-outside="close" :class="$r.prefix+'menu'">
    <div class="d-flex h-start flex-row v-center">
      <span class="menu-label" v-if="label" @click.prevent="open">{{ label }}</span>
      <transition name="fade" mode="out-in">
        <!-- Header Navigation Menu Icons -->
        <r-btn icon text v-if="show" key="on" @click.prevent="close">
          <r-icon v-html="$r.icons.chevron_up"></r-icon>
        </r-btn>
        <r-btn icon text v-else key="off" @click.prevent="open">
          <r-icon v-html="icon||$r.icons.chevron_down"></r-icon>
        </r-btn>

      </transition>
      <div class="dropdown-menu mt-1"
           v-if="show"
           :style="{
                    'top':top+'px',
                    'left':left,
                    'right':right,
                    'opacity':opacity
                }">
        <r-card>
          <div class="dropdown-menu-item pa-2" v-for="(item,i) in list" :key="i"
               :class="{'menu-selected':selected===item[value]}"
               @click.prevent="emitItem(item)">
            <!--
              Default slot for custom menu item rendering
              @binding {Object|String|Number} item - The current menu item
            -->
            <slot :item="item">
              {{ item }}
            </slot>
          </div>
        </r-card>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, computed, inject, nextTick} from 'vue'


/**
 * @example // Menu usage
 * <template>
 * <r-menu
 * v-model="modelValue"
 * :label="modelValue?modelValue.name:label"
 * :icon="icon"
 * :value="value"
 * :just-Value="justValue"
 * :reverse="reverse"
 * :overlay="overlay"
 * :items="items"
 * @update:model-Value="log(`update:modelValue`,$event)" ></r-menu>
 * </template>
 * <script>
 * import { ref } from 'vue'
 *
 * const modelValue=ref(null)
 * const icon=ref(null)
 * const label=ref("label")
 * const value=ref("value")
 * const justValue=ref(false)
 * const reverse=ref(false)
 * const overlay=ref(false)
 * const items=ref([
 *             { name: `home`,value:1 },
 *             { name: `blog`,value:2 },
 *             { name: `contact`,value:3 },
 *             { name: `about`,value:4 },
 *           ])
 * const log=(name,e)=>{
 *   console.log(name,e)
 * }
 * <//script>
 *
 * */
const props = defineProps({
  /**
   * Currently selected value (v-model)
   * @model
   * @type {String|Number|Object}
   */
  modelValue: {
    type: [String, Number, Object]
  },

  /**
   * Menu label text
   * @type {String}
   */
  label: String,

  /**
   * Custom icon for the open button
   * @type {String}
   * @default Chevron down icon from Renusify icons
   */
  icon: {
    type: String
  },

  /**
   * Property name to use as value key in item objects
   * @type {String}
   * @default 'value'
   */
  value: {
    type: String,
    default: 'value'
  },

  /**
   * If true, emits only the value property instead of the whole item object
   * @type {Boolean}
   * @default false
   */
  justValue: Boolean,

  /**
   * If true, reverses the menu positioning
   * @type {Boolean}
   * @default false
   */
  reverse: Boolean,

  /**
   * If true, menu overlays the trigger instead of pushing content down
   * @type {Boolean}
   * @default false
   */
  overlay: Boolean,

  /**
   * Array of menu items
   * Can be array of objects or primitives (strings/numbers)
   * @type {Array}
   * @example
   * // Array of objects
   * [{ value: 1, name: 'Option 1' }, { value: 2, name: 'Option 2' }]
   * // Array of primitives
   * ['Option 1', 'Option 2']
   */
  items: Array
})

const emit = defineEmits([
  /**
   * Emitted when selected value changes
   * @event update:modelValue
   * @param {String|Number|Object} value - Selected value
   */
  'update:modelValue'
])

const {$r} = inject('renusify')

const show = ref(false)
const top = ref(null)
const left = ref(null)
const right = ref(null)
const opacity = ref(0)
const menuRef = ref(null)

const list = computed(() => {
  const result = []
  if (props.items) {
    props.items.forEach((item) => {
      if (typeof item === 'object') {
        result.push(item)
      } else {
        result.push({'name': item, [props.value]: item})
      }
    })
  }
  return result
})

const selected = computed(() => {
  if (!props.modelValue) {
    return null
  }
  return props.justValue ? props.modelValue : props.modelValue[props.value]
})

const emitItem = (item) => {
  emit('update:modelValue', props.justValue ? item[props.value] : item)
  close()
}

const open = () => {
  if (!menuRef.value) return

  const elm = menuRef.value.getBoundingClientRect()
  top.value = -20

  if (!props.overlay) {
    top.value += elm.height
  }

  opacity.value = 0

  if (props.reverse) {
    if (!$r.rtl) {
      right.value = 0
      left.value = null
    } else {
      left.value = 0
      right.value = null
    }
  } else {
    if (!$r.rtl) {
      left.value = 0
      right.value = null
    } else {
      right.value = 0
      left.value = null
    }
  }

  show.value = true

  nextTick(() => {
    top.value = top.value + 20
    opacity.value = 1
  })
}

const close = () => {
  top.value = top.value - 20
  opacity.value = 0

  setTimeout(() => {
    show.value = false
  }, 200)
}
</script>

<style lang="scss">
@use "sass:map";
@use "../../style/variables/base";


.#{base.$prefix}menu {
  position: relative;

  .menu-selected {
    position: relative;
    color: var(--color-one);

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background-color: var(--color-one);
      opacity: .1;
      width: 100%;
      height: 100%;
    }
  }

  .dropdown-menu {
    border: 1px solid var(--color-border-low);

    &-item:hover {
      background-color: var(--color-sheet-container-high);
    }
  }

  .menu-label {
    cursor: pointer;
  }

  .dropdown-menu {
    scroll-behavior: smooth;
    transition: all .3s ease;
    position: absolute;
    z-index: 10;
    min-width: 150px;
    max-height: 200px;
    overflow-y: auto;
    background-clip: padding-box;
    border-radius: map.get(base.$borders, 'sm');

    &-item {
      cursor: pointer;
    }

  }
}


</style>