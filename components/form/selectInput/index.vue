<template>
  <div ref="selectRef" v-click-outside="showMode==='modal'?()=>{}:closeList"
       :class="[`${$r.prefix}select-container`,{'open-to-top':openToTop}]">
    <r-input :active="active||openList"
             v-bind="$attrs"
             :modelValue="modelValue"
             @click.prevent="handleClick()">
      <div :class="{
        'flex-nowrap':!multiple
      }"
           class="select-wrap v-center">
        <span
            v-for="(item,key) in chips"
            :key="key"
            :class="{'px-0':!multiple,'chip body-3':multiple}"
            class=" ms-0 d-flex v-center">
          {{ item ? item[text] : '' }}
          <r-icon v-if="multiple" class="chip-icon cursor-pointer ms-1" height="16" width="16"
                  @click="handleChip(false,key)"
                  v-html="$r.icons.close"></r-icon>

        </span>
        <span>
        <input v-if="!disableSearch"
               ref="inputRef"
               :autofocus="autofocus"
               :placeholder="modelValue?'':placeholder"
               :type="type"
               :value="inputVal"
               autocomplete="no"
               class="select-input"
               @focusin="focusInput(true)"
               @focusout="focusInput(false)"
               @input="e => inputVal = e.target.value"
               @keydown.enter="add"
        />
          </span>
      </div>
      <r-progress-line v-if="loading" color="color-two"></r-progress-line>
    </r-input>
    <div v-if="showMode!=='modal'" :class="{
            'card-no-float':showMode==='noFloat',
            'card-select-active':genItems.length>0 && openList
        }" :style="{
                    width:width+'px'
                }"
         class="card-select"
    >
      <div v-for="(item,i) in genItems"
           :key="i"
           :class="{'card-item-active':$helper.searchArray(chips,text,item[text])!==false}"
           class="card-item"
           @click="handle_item(item)">
        <!-- Default slot for list item. Provide item prop. -->
        <slot :item="item">
          {{ item[text] }}
          <transition name="fade">
            <r-icon v-if="$helper.searchArray(chips,text,item[text])!==false" class="pe-1"
                    exact
                    v-html="$r.icons.check"
            ></r-icon>
          </transition>
        </slot>
      </div>
    </div>
    <r-modal v-else v-model="openList" full-width position="bottom">
      <div :class="`${$r.prefix}select-container`" class="pa-3">
        <r-input v-if="!disableSearch" :active="true"
                 :modelValue="$helper.ifHas(chips,null,0,value)"
                 v-bind="$attrs"
                 @click.prevent="handleClick()">
          <div :class="{
        'h-center':disableSearch,
        'flex-nowrap':!multiple
      }"
               class="select-wrap v-center">
        <span
            v-for="(item,key) in chips"
            :key="key"
            :class="{'px-0':!multiple,'chip body-3':multiple}"
            class=" ms-0 d-flex v-center">
          {{ item ? item[text] : '' }}
          <r-icon v-if="multiple" class="chip-icon cursor-pointer ms-1" height="16" width="16"
                  @click="handleChip(false,key)"
                  v-html="$r.icons.close"></r-icon>

        </span>
            <span>
        <input :type="type"
               v-if="!disableSearch"
               @focusin="focusInput(true)"
               @focusout="focusInput(false)"
               @keydown.enter="add"
               autocomplete="no"
               class="select-input"
               :value="inputVal"
               @input="e => inputVal = e.target.value"
        />
          </span>
          </div>
          <r-progress-line v-if="loading" color="color-two"></r-progress-line>
        </r-input>
        <div v-for="(item,i) in genItems"
             :key="i"
             :class="{'card-item-active':$helper.searchArray(chips,text,item[text])!==false}"
             class="card-item"
             @click="handle_item(item)">
          <!-- Default slot for list item. Provide item prop. -->
          <slot :item="item">
            {{ item[text] }}
            <transition name="fade">
              <r-icon v-if="$helper.searchArray(chips,text,item[text])!==false" class="pe-1"
                      exact
                      v-html="$r.icons.check"
              ></r-icon>
            </transition>
          </slot>
        </div>
      </div>
    </r-modal>
  </div>
</template>
<script setup>
import {ref, computed, watch, onMounted, inject, nextTick, useAttrs} from 'vue'

defineOptions({
  inheritAttrs: false
})

const attr = useAttrs()
const placeholder = attr.placeholder
const autofocus = attr.autofocus

const props = defineProps({
  /**
   * API endpoint URL for fetching search results
   * @type {String}
   */
  searchLink: String,
  /**
   * Input type for the select component
   * @type {String}
   * @default 'text'
   */
  type: {
    type: String,
    default: 'text'
  },
  /**
   * Property name for display text in items
   * @type {String}
   * @default 'name'
   */
  text: {
    type: String,
    default: 'name'
  },
  /**
   * Property name for value in items
   * @type {String}
   * @default 'value'
   */
  value: {
    type: String,
    default: 'value'
  },
  /**
   * Disable search functionality
   * @type {Boolean}
   */
  disableSearch: Boolean,
  /**
   * Static array of select items
   * @type {Array}
   */
  items: Array,
  /**
   * The selected value(s)
   * @type {String|Number|Array|Object}
   */
  modelValue: [String, Number, Array, Object],
  /**
   * Enable tag mode (allow custom values not in items)
   * @type {Boolean}
   */
  tags: Boolean,
  /**
   * Enable multiple selection
   * @type {Boolean}
   */
  multiple: Boolean,
  /**
   * Emit only values instead of full objects
   * @type {Boolean}
   */
  justValue: Boolean,
  /**
   * Open dropdown above the input
   * @type {Boolean}
   */
  openToTop: Boolean,
  /**
   * Enable translation for item texts
   * @type {Boolean}
   */
  translate: Boolean,
  /**
   * Automatically select first item when empty
   * @type {Boolean}
   */
  firstSelect: Boolean,
  /**
   * Disable floating label
   * @type {Boolean}
   */
  noFloat: Boolean,
  /**
   * Force modal display on all screen sizes
   * @type {Boolean}
   */
  modal: Boolean,
  /**
   * Auto display mode based on screen size
   * @type {String}
   * @default 'modal'
   * @validator ['modal', 'float', 'none']
   */
  auto: {type: String, default: 'modal', validator: value => ['modal', 'float', 'none'].includes(value)},
  /**
   * Additional headers for API requests
   * @type {Object}
   */
  headers: Object
})

const emit = defineEmits([
  /**
   * Emitted when selected value(s) change
   * @param {String|Number|Array|Object} value - Updated selected value(s)
   */
  'update:modelValue',
  /**
   * Emitted when a chip/tag is deleted
   * @param {Array} deletedItem - Array containing [index, deletedItem]
   */
  'del'
])

const {$helper, $t, $r} = inject('renusify')
const $axios = inject('axios')

// Reactive data
const apiData = ref([])
const loading = ref(false)
const active = ref(false)
const openList = ref(false)
const inputVal = ref(null)
const width = ref(100)
const chips = ref([])

// Template refs
const selectRef = ref(null)
const inputRef = ref(null)

// Computed properties
/**
 * Determines display mode based on props and screen size
 * @returns {String} Display mode: 'modal', 'noFloat', or 'none'
 */
const showMode = computed(() => {
  if ($r.breakpoint.mdAndDown) {
    if (props.auto === 'modal') {
      return 'modal'
    }
    if (props.auto === 'float') {
      return 'noFloat'
    }
  } else {
    if (props.modal) {
      return 'modal'
    }
    if (props.noFloat) {
      return 'noFloat'
    }
  }
  return 'none'
})

/**
 * Generates and filters items for display
 * @returns {Array} Processed and filtered items array
 */
const genItems = computed(() => {
  let res = []

  if (apiData.value.length > 0) {
    res = apiData.value
  }

  if (props.items) {
    res = [...(res || []), ...props.items]
  }

  // Convert primitive values to objects
  if (res.length > 0 && typeof res[0] !== 'object') {
    res = res.map(item => ({
      [props.text]: item.toString(),
      [props.value]: item
    }))
  }

  // Apply translation if enabled
  if (props.translate) {
    res = res.map(item => ({
      ...item,
      [props.text]: $t(item[props.text])
    }))
  }

  // Filter by search term if not using API search
  if (!props.searchLink && inputVal.value) {
    const searchTerm = inputVal.value.trim()
    return res.filter(el => {
      return el[props.text] && el[props.text].toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  return res
})

// Methods
/**
 * Fetches data from API search endpoint
 */
const get = async () => {
  if (!props.searchLink) return

  loading.value = true
  try {
    const {data} = await $axios.get(props.searchLink, {
      params: {
        s: inputVal.value || ''
      },
      headers: props.headers
    })
    apiData.value = data
  } catch (error) {
    console.error('Error fetching select data:', error)
  } finally {
    loading.value = false
  }
}

/**
 * Converts modelValue to chip format
 * @returns {Array} Array of chip objects
 */
const getValue = () => {
  // Validate modelValue against available items if not using tags
  if (!props.searchLink && !props.tags && props.modelValue !== undefined && props.modelValue !== null) {
    if (typeof props.modelValue === 'string' || typeof props.modelValue === 'number') {
      const index = $helper?.searchArray(genItems.value, props.value, props.modelValue)
      if (index === false) {
        emit('update:modelValue', null)
        return []
      }
    } else if (Array.isArray(props.modelValue)) {
      for (const item of props.modelValue) {
        if (typeof item === 'string' || typeof item === 'number') {
          const index = $helper?.searchArray(genItems.value, props.value, item)
          if (index === false) {
            emit('update:modelValue', null)
            return []
          }
        } else {
          const index = $helper?.searchArray(genItems.value, props.value, item[props.value])
          if (index === false) {
            emit('update:modelValue', null)
            return []
          }
        }
      }
    } else {
      const index = $helper?.searchArray(genItems.value, props.value, props.modelValue[props.value])
      if (index === false) {
        emit('update:modelValue', null)
        return []
      }
    }
  }

  // Convert modelValue to chip format
  if (props.modelValue !== undefined && props.modelValue !== null) {
    if ($helper?.ifHas(props.modelValue, false, props.text)) {
      return [props.modelValue]
    } else if (typeof props.modelValue === 'string' || typeof props.modelValue === 'number') {
      const index = $helper?.searchArray(genItems.value, props.value, props.modelValue)
      if (index !== false) {
        return [genItems.value[index]]
      }
      return [{
        [props.text]: props.modelValue.toString(),
        [props.value]: props.modelValue
      }]
    } else if (Array.isArray(props.modelValue) && (typeof props.modelValue[0] === 'string' || typeof props.modelValue[0] === 'number')) {
      return props.modelValue.map(item => {
        const index = $helper?.searchArray(genItems.value, props.value, item)
        if (index !== false) {
          return genItems.value[index]
        }
        return {
          [props.text]: item.toString(),
          [props.value]: item
        }
      })
    } else {
      return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
    }
  }

  emit('update:modelValue', null)
  return []
}

/**
 * Handles chip deletion or click
 * @param {Boolean} e - False if deleting, otherwise clicking
 * @param {Number} key - Chip index
 */
const handleChip = (e, key) => {
  if (e === false) {
    emit('del', [key, chips.value[key]])
    chips.value.splice(key, 1)
    emitVal()
  } else {
    handleClick()
  }
}

/**
 * Handles input click to open dropdown
 */
const handleClick = () => {
  if (selectRef.value) {
    nextTick(() => {
      width.value = selectRef.value.getBoundingClientRect().width
    })
  }
  if (inputRef.value) {
    inputRef.value.focus()
  } else {
    focusInput(true)
  }
}

/**
 * Adds custom tag from input value
 */
const add = () => {
  if (inputVal.value) {
    const val = {
      [props.text]: inputVal.value.toString(),
      [props.value]: inputVal.value
    }

    if (!props.multiple) {
      chips.value = []
    }

    if (!props.tags) {
      const exist = $helper?.searchArray(genItems.value, props.text, val[props.text])
      if (exist !== false) {
        chips.value.push(val)
      }
    } else {
      chips.value.push(val)
    }

    inputVal.value = null
    emitVal()
  }
}

/**
 * Emits updated value to parent
 */
const emitVal = () => {
  chips.value = $helper?.uniqArray(chips.value) || chips.value

  let val = chips.value
  if (props.justValue) {
    val = chips.value.map(chip => chip[props.value])
  }

  if (!props.multiple) {
    val = val[0]
    if (val) {
      closeList()
    }
  }

  if (val === undefined) {
    val = null
  }

  emit('update:modelValue', val)
}

/**
 * Focuses input and opens dropdown
 * @param {Boolean} val - Whether to focus/open
 */
const focusInput = (val) => {
  active.value = val
  if (val === true) {
    openList.value = true
  }

  setTimeout(() => {
    add()
  }, 200)
}

/**
 * Handles item selection from dropdown
 * @param {Object} item - Selected item
 */
const handle_item = (item) => {
  const index = $helper?.searchArray(chips.value, props.text, item[props.text])

  if (index !== false) {
    chips.value.splice(index, 1)
  } else {
    if (!props.multiple) {
      chips.value = []
    }
    chips.value.push(item)
  }

  inputVal.value = null
  if (!props.multiple && chips.value.length > 0) {
    chips.value = [chips.value[0]]
  }

  emitVal()
}

/**
 * Closes dropdown list
 */
const closeList = () => {
  active.value = false
  openList.value = false
}

// Watchers
watch(inputVal, (newVal) => {
  if (props.searchLink && newVal && newVal.length > 0) {
    get()
  }
})

watch(() => props.modelValue, (n) => {
  chips.value = getValue()
})

// Lifecycle hooks
onMounted(() => {
  chips.value = getValue()

  if (props.firstSelect && chips.value.length === 0 && genItems.value.length > 0) {
    chips.value.push(genItems.value[0])
    emitVal()
  }

  if (props.searchLink) {
    get()
  }

  if (selectRef.value) {
    nextTick(() => {
      width.value = selectRef.value.getBoundingClientRect().width
    })
  }
})
</script>
<style lang="scss">
@use "sass:map";
@use "../../../style" as *;


$min-height: 40px;
.#{$prefix}select-container {
  position: relative;
  scroll-margin: $min-height;

  &.open-to-top {
    display: flex;
    flex-direction: column-reverse;
  }

  .chip {
    background: var(--color-sheet);
    color: var(--color-on-sheet);
    border-radius: 50px;
    margin: 4px;
    @include rtl() {
      padding: 2px 8px 2px 4px;
    }
    @include ltr() {
      padding: 2px 4px 2px 8px;
    }

    .chip-icon {
      background: var(--color-sheet-container);
      border-radius: 50%;
      padding: 2px;
    }
  }

  .input-control {
    min-height: $min-height;
    height: auto;
    flex-direction: row;
    align-items: center;
    display: flex;
    flex: 1 1;
    flex-wrap: wrap;
    line-height: 24px;
    max-width: 100%;
    min-width: 0;
  }

  .select-wrap {
    max-width: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
  }

  input {
    flex: 1 1;
    margin-top: 0;
    min-width: 140px;
    position: relative;
  }

  .#{$prefix}chip {
    flex: 0 1 auto;
    margin: 4px;
  }

  .card-select {
    max-height: 0;
    overflow: auto;
    opacity: .5;
    transition: all .3s $primary-transition;
    left: 0;
    z-index: map.get($z-index, 'default');
    background: var(--color-sheet-container);
    color: var(--color-on-sheet);

    &:not(.card-no-float) {
      position: absolute;
    }
  }

  &.open-to-top {
    .card-select {
      bottom: $min-height+2px;
    }
  }


  .card-item {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    cursor: pointer;
    border-bottom: 1px solid var(--color-sheet-container-low);
  }

  .card-item-active {
    background: var(--color-one-container);
    color: var(--color-on-one-container);
  }

  .card-select-active {
    transition: all 0.3s $primary-transition;
    max-height: 300px;
    opacity: 1;
  }
}

</style>
