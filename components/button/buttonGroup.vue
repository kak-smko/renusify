<template>
  <div v-click-outside="handleClose" :class="classes">
    <div class="btn-container">
      <r-btn v-for="(item,k) in items"
             :key="k" :class="{'button-group-active':k===modelValue}" :icon="icon" text @click.prevent="emitValue(k)">
        <!-- Default slot for custom button content. Provides item scoped prop -->
        <slot :item="item">
          <r-icon v-if="icon" exact v-html="isSelect?item['icon']:item"></r-icon>
          <span v-else>{{ item }}</span>
        </slot>
      </r-btn>
    </div>
    <transition name="slide-down">
      <div v-if="open" class="button-group-select text-center"
      >
        <div v-for="(item,i) in items[selected]['items']" :key="i"
             class="list-item"
             @click="listInput(item)">
          <!-- Named slot for custom list item content. Provides item scoped prop -->
          <slot :item="item" name="list">
            <div class="list-title">{{ item['name'] }}</div>
          </slot>
        </div>
      </div>

    </transition>
  </div>
</template>

<script setup>
import {ref, computed, inject} from 'vue'

/**
 * @example // button group usage
 * <template>
 *   <r-btn-group
 *     :items="buttonItems"
 *     :icon="showIcon"
 *     :is-select="isSelect"
 *     :exact="exact"
 *     v-model="selectedValue"
 *     @open="log('open', $event)"
 *     @update:model-Value="log('update:modelValue', $event)"
 *   ></r-btn-group>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * // Button items with descriptive SVG icons
 * const buttonItems = ref({
 *   insertOrderedList: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M7 13v-2h14v2H7m0 6v-2h14v2H7M7 7V5h14v2H7M3 8V5H2V4h2v4H3m-1 9v-1h3v4H2v-1h2v-.5H3v-1h1V17H2m2.25-7a.75.75 0 0 1 .75.75c0 .2-.08.39-.21.52L3.12 13H5v1H2v-.92L4 11H2v-1h2.25Z"/></svg>`,
 *   insertUnorderedList: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h4v4H3V4m6 1v2h12V5H9m-6 5h4v4H3v-4m6 1v2h12v-2H9m-6 5h4v4H3v-4m6 1v2h12v-2H9"/></svg>`,
 *   subscript: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M16 7.41L11.41 12L16 16.59L14.59 18L10 13.41L5.41 18L4 16.59L8.59 12L4 7.41L5.41 6L10 10.59L14.59 6L16 7.41m5.85 13.62h-4.88v-1l.89-.8c.76-.65 1.32-1.19 1.7-1.63c.37-.44.56-.85.57-1.24a.898.898 0 0 0-.27-.7c-.18-.16-.47-.28-.86-.28c-.31 0-.58.06-.84.18l-.66.38l-.45-1.17c.27-.21.59-.39.98-.53s.82-.24 1.29-.24c.78.04 1.38.25 1.78.66c.4.41.62.93.62 1.57c-.01.56-.19 1.08-.54 1.55c-.34.47-.76.92-1.27 1.36l-.64.52v.02h2.58v1.35Z"/></svg>`,
 *   superscript: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M16 7.41L11.41 12L16 16.59L14.59 18L10 13.41L5.41 18L4 16.59L8.59 12L4 7.41L5.41 6L10 10.59L14.59 6L16 7.41M21.85 9h-4.88V8l.89-.82c.76-.64 1.32-1.18 1.7-1.63c.37-.44.56-.85.57-1.23a.884.884 0 0 0-.27-.7c-.18-.19-.47-.28-.86-.29c-.31.01-.58.07-.84.17l-.66.39l-.45-1.17c.27-.22.59-.39.98-.53S18.85 2 19.32 2c.78 0 1.38.2 1.78.61c.4.39.62.93.62 1.57c-.01.56-.19 1.08-.54 1.55c-.34.48-.76.93-1.27 1.36l-.64.52v.02h2.58V9Z"/></svg>`,
 *   bold: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 15.5H10v-3h3.5A1.5 1.5 0 0 1 15 14a1.5 1.5 0 0 1-1.5 1.5m-3.5-9h3A1.5 1.5 0 0 1 14.5 8A1.5 1.5 0 0 1 13 9.5h-3m5.6 1.29c.97-.68 1.65-1.79 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.1 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42Z"/></svg>`,
 *   italic: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8Z"/></svg>`,
 *   strikeThrough: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 14h18v-2H3m2-8v3h5v3h4V7h5V4m-9 15h4v-3h-4v3Z"/></svg>`,
 *   underline: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21h14v-2H5v2m7-4a6 6 0 0 0 6-6V3h-2.5v8a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 11V3H6v8a6 6 0 0 0 6 6Z"/></svg>`,
 *   insertHorizontalRule: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M0 24h24v-4H0v4Z"/></svg>`,
 *   removeFormat: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M6 5v.18L8.82 8h2.4l-.72 1.68l2.1 2.1L14.21 8H20V5H6M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21L18 19.73L3.55 5.27L3.27 5Z"/></svg>`
 * })
 *
 * const showIcon = ref(true) // Whether to show icons
 * const isSelect = ref(false) // Selection mode
 * const exact = ref(false) // Exact matching
 * const selectedValue = ref(null) // Currently selected value
 *
 * const log = (name, event) => {
 *   console.log(name, event)
 * }
 * <//script>
 *
 * */


const props = defineProps({
  /**
   * Array or object of items to display in the button group.
   * When isSelect is true, items should be objects with 'icon' and 'items' properties.
   * @type {Array|Object}
   */
  items: [Array, Object],

  /**
   * Whether to display items as icons
   * @type {Boolean}
   * @default true
   */
  icon: {
    type: Boolean,
    default: true
  },

  /**
   * Enables select mode with dropdown list
   * @type {Boolean}
   */
  isSelect: Boolean,

  /**
   * Exact matching for selection
   * @type {Boolean}
   */
  exact: Boolean,

  /**
   * Currently selected item index
   * @type {Number|String}
   */
  modelValue: [Number, String]
})

const emit = defineEmits([
  /**
   * Emitted when the dropdown is opened or closed
   * @param {Boolean} isOpen - Whether dropdown is open
   */
  'open',

  /**
   * Emitted when selection changes
   * @param {Number|String|Object} value - Selected value
   * @param {Number} value.menu - Menu index (for select mode)
   * @param {Object} value.item - Selected item (for select mode)
   */
  'update:modelValue'
])

const $r = inject('renusify').$r

// Reactive data
const open = ref(false)
const selected = ref(null)

// Computed
const classes = computed(() => [
  `${$r.prefix}button-group`,
  {'button-group-open': open.value},
  'd-flex',
  'h-center'
])

// Methods
/**
 * Closes the dropdown when clicking outside
 */
const handleClose = () => {
  open.value = false
}

/**
 * Handles button click to select item or open dropdown
 * @param {Number} k - Item index
 */
const emitValue = (k) => {
  if (props.isSelect) {
    selected.value = k
    emit('open', true)
    open.value = true
  } else {
    emit('update:modelValue', k)
  }
}

/**
 * Handles list item selection in dropdown
 * @param {Object} e - Selected item
 */
const listInput = (e) => {
  emit('open', false)
  emit('update:modelValue', {menu: selected.value, item: e})
  open.value = false
}
</script>
<style lang="scss">
@use "sass:map";
@use "../../style" as *;

.#{$prefix}button-group {
  position: relative;
  color: var(--color-on-sheet);
  background-color: var(--color-sheet-container);
  border-radius: map.get($borders, 'lg');
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  .list-item {
    padding: 12px;
    border-bottom: 1px solid var(--color-sheet);
    cursor: pointer;
    text-align: center;
  }

  &.button-group-open {
    z-index: map.get($z-index, 'default');
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }

  .btn-container {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    border-radius: map.get($borders, 'lg');
    justify-content: center;
    max-width: 100%;
    outline: 0;
    position: relative;
    text-decoration: none;
    transition-property: box-shadow, transform, opacity;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;

    .#{$prefix}btn {
      border-radius: 0;
      position: relative;
      transition: all 0.2s ease;
      padding: 10px 16px;
      font-weight: 500;
      letter-spacing: 0.025em;

      &:not(:last-child) {
        margin-right: 1px;
      }


      &.button-group-active {
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: var(--color-one);
        }
      }

      &.btn-pressed {
        transform: scale(0.96);
      }

      &:focus-visible {
        outline: 2px solid var(--color-one);
        outline-offset: -2px;
        z-index: 2;
      }
    }

    @include rtl() {
      .#{$prefix}btn:not(:first-child):not(:last-child) {
        border-left: 1px solid var(--color-border-low);
      }

      .#{$prefix}btn:first-child {
        border-left: 1px solid var(--color-border-low);
      }
    }
    @include ltr() {
      .#{$prefix}btn:not(:first-child):not(:last-child) {
        border-right: 1px solid var(--color-border-low);
      }

      .#{$prefix}btn:first-child {
        border-right: 1px solid var(--color-border-low);
      }
    }
  }

  .button-group-select {
    position: absolute;
    top: calc(100% + 8px);
    width: 100%;
    z-index: map.get($z-index, 'default');
    max-height: 320px;
    overflow: auto;
    border-radius: map.get($borders, 'lg');
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    background-color: transparent;
    color: var(--color-on-sheet);
    animation: fadeIn 0.3s ease-out;

    .list-item {
      padding: 12px 16px;
      transition: all 0.2s ease;

      &:last-child {
        border-bottom: none;
      }
    }

    .list-title {
      font-weight: 500;
      font-size: 0.95rem;
      margin-bottom: 4px;
      color: var(--color-on-sheet);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>