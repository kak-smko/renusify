<template>
  <div :class="[$r.prefix + 'search-box',{
          'to-top': openToTop}]">
    <template v-if="!closable || show">
      <div
          :class="{ 'z-important search-open': open }"
          class="search-input"
      >
        <span v-if="categories" class="category-holder">
          <r-select-input
              v-model="category"
              :items="categories"
              class="mt-0 ps-2"
              disable-search
              first-select
              hide
              justValue
          ></r-select-input>
        </span>
        <span
            class="d-flex v-center flex-grow-1"
        >
          <input
              :placeholder="label"
              :value="lazyValue"
              autocomplete="no"
              class="flex-grow-1"
              type="text"
              @focusin="active = true"
              @focusout="active = false"
              @input="handle"
          />
          <!-- Slot for custom toggle button icon -->
          <slot name="icon">
            <r-icon class="mx-1" v-html="$r.icons.search"></r-icon>
          </slot>
        </span>
      </div>
      <r-card
          v-if="open"
          :class="{
          'card-tile': $attrs.tile !== undefined && $attrs.tile !== false
        }"
          class="card-search z-important"
      >
        <r-progress-line
            v-if="loading"
            class="w-full"
            color="color-two"
        ></r-progress-line>
        <div
            v-if="list.length > 0"
            @update:modelValue="listInput"
        >
          <div v-for="(item,i) in list" :key="i" class="list-item">
            <!-- Slot for custom search result item rendering. Provide item prop - The search result item -->
            <slot :item="item">
              {{ item["name"] }}
            </slot>
          </div>
        </div>
        <div v-else-if="!loading" class="py-5">
          {{ notFoundMsg }}
        </div>
      </r-card>
      <transition name="fade">
        <div v-if="open" :class="{'search-shadow':!noOverlay}" @click="handleclose"></div>
      </transition>
    </template>
    <r-btn v-else icon v-bind="btnAttr" @click.prevent="show = !show">
      <!-- Slot for custom toggle button icon -->
      <slot name="icon">
        <r-icon v-html="$r.icons.search"></r-icon>
      </slot>
    </r-btn>
  </div>
</template>

<script setup>
import {ref, watch, inject} from 'vue'

const props = defineProps({
  /**
   * Enables closable mode with toggle button
   * @type {Boolean}
   */
  closable: Boolean,
  /**
   * Message shown when no search results are found
   * @type {String}
   * @default "Can't Find Anything :("
   */
  notFoundMsg: {
    type: String,
    default: "Can't Find Anything :(",
  },
  /**
   * Placeholder text for the search input
   * @type {String}
   */
  label: String,
  /**
   * API endpoint URL for search requests
   * @type {String}
   */
  url: String,
  /**
   * Attributes passed to the toggle button in closable mode
   * @type {Object}
   */
  btnAttr: Object,
  /**
   * Query parameter name for the search term
   * @type {String}
   * @default "search"
   */
  query: {
    type: String,
    default: "search",
  },
  /**
   * Current search value (v-model)
   * @type {String|Number}
   */
  modelValue: [String, Number],
  /**
   * Disables the overlay/backdrop
   * @type {Boolean}
   */
  noOverlay: Boolean,
  /**
   * Opens search results dropdown above the input instead of below
   * @type {Boolean}
   */
  openToTop: Boolean,
  /**
   * Array of category items for search filtering
   * @type {Array}
   */
  categories: Array,
  /**
   * Additional HTTP headers for search requests
   * @type {Object}
   */
  headers: Object,
})

const emit = defineEmits([
  /**
   * Emitted when search value changes (v-model)
   * @param {String|Number} value - New search value
   */
  'update:modelValue',
  /**
   * Emitted when a search result item is selected
   * @param {*} item - Selected search result
   */
  'select'
])

const $axios = inject('axios')

const show = ref(false)
const lazyValue = ref(props.modelValue)
const loading = ref(false)
const active = ref(false)
const open = ref(false)
const idSet = ref(null)
const category = ref(null)
const list = ref([])

watch(() => props.modelValue, (newValue) => {
  lazyValue.value = newValue
})

/**
 * Closes the search results dropdown
 */
const handleclose = () => {
  open.value = false
}

/**
 * Fetches search results from the API
 */
const get = () => {
  if (!props.url || !$axios) return

  loading.value = true

  const params = {
    [props.query]: lazyValue.value
  }

  if (category.value) {
    params.category = category.value
  }

  $axios.get(props.url, {
    params: params,
    headers: props.headers
  })
      .then(({data}) => {
        list.value = data
        loading.value = false
        open.value = true
      })
      .catch(() => {
        loading.value = false
      })
}

/**
 * Handles search input changes with debouncing
 * @param {Event} e - Input event
 */
const handle = (e) => {
  lazyValue.value = e.target.value
  open.value = true
  loading.value = true

  clearTimeout(idSet.value)
  idSet.value = setTimeout(() => {
    emit('update:modelValue', lazyValue.value)
    get()
  }, 1000)
}

/**
 * Handles search result selection
 * @param {*} e - Selected item
 */
const listInput = (e) => {
  emit('select', e)
  open.value = false
}
</script>

<style lang="scss">
@use "sass:map";
@use "../../style/variables/base";
@use "../../style/mixins";


.#{base.$prefix}search-box {
  position: relative;

  &.to-top {
    .card-search {
      bottom: 47px;
      border-radius: map.get(base.$borders, "md") map.get(base.$borders, "md") 0 0;
    }

    .search-open {
      border-top-left-radius: 0px !important;
      border-top-right-radius: 0px !important;
    }
  }

  &:not(&.to-top) {
    .card-search {
      top: 47px;
      border-radius: 0 0 map.get(base.$borders, "md") map.get(base.$borders, "md");
    }

    .search-open {
      border-bottom-left-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
    }
  }

  .search-input {
    display: flex;
    align-items: center;
    border: solid 1px var(--color-border);
    color: var(--color-on-sheet);
    position: relative;
    border-radius: map.get(base.$borders, "md");
  }


  input {
    outline: none;
    line-height: 20px;
    padding: 12px;
    max-width: 100%;
    min-width: 0;
    caret-color: var(--color-on-sheet);
  }

  input::placeholder {
    color: var(--color-on-sheet);
    opacity: 1;
  }

  .card-search {
    position: absolute;
    left: 0;
    width: 100%;
    overflow-y: auto;
    max-height: 300px;
  }


  .search-shadow {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: map.get(base.$z-index, "medium");
    top: 0;
    left: 0;
    backdrop-filter: blur(3px) grayscale(30%);
  }

  .#{base.$prefix}select-container {
    .input-control {
      border-radius: 0;
      min-height: 30px;
      @include mixins.ltr() {
        border-right: 1px solid var(--color-sheet-container-low) !important;
      }

      @include mixins.rtl() {
        border-left: 1px solid var(--color-sheet-container-low) !important;
      }
    }

    .card-select {
      top: -6px;
      border-radius: map.get(base.$borders, "md");
      @include mixins.ltr() {
        border-top-right-radius: 0 !important;
      }

      @include mixins.rtl() {
        border-top-left-radius: 0 !important;
      }
    }
  }

  .category-holder {
    width: 100px;
  }

  .list-item {
    padding: 16px 8px;
    border-bottom: 1px solid var(--color-sheet-container-low);

    &:hover {
      background-color: var(--color-one-container);
      color: var(--color-on-one-container);
    }
  }
}
</style>
