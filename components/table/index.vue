<template>
  <div
      v-bind="$attrs"
      :class="{
        [`${$r.prefix}table`]:true,
        'table-editable':editable,
         'table-bordered':bordered,
         'row-thin':thin,
         'table-fixed-header':fixedHeader,
         'table-sortable':sortable,
         'table-stripped':stripped,
         'table-fixed-first-columns':fixedFirstColumn}">
    <div v-if="editable" class="d-flex h-end v-end">
      <svg class="table-svg" height="18" width="18">
        <path class="table-svg-path" d="M 0 0 l 0 18 l 18 0 q -18 0 -18 -18"/>
      </svg>
      <span class="table-editable-icon px-2"
            @click.prevent="open_modal()">
                <r-icon v-html="$r.icons.setting"></r-icon>
            </span>
    </div>
    <div class="table-wrapper">
      <div ref="tableRef" class="table-container">
        <r-progress-line v-if="loading" color="color-two"></r-progress-line>
        <table>
          <thead>
          <tr>
            <!-- @slot Slot for custom header rendering
             @binding {Array} header - Table header configuration -->
            <slot name="header" v-bind:header="th">
              <th v-for="(item,key) in th" :key="key"
                  :class="{'color-info-text':sortKey===item.value}"
                  class="text-start text-no-wrap"
                  @click.prevent="sorting(item.value)">
                {{ translate ? $t(item.text, 'renusify') : item.text }}
                <r-icon v-if="sortKey===item.value" :class="{'sort-desc':!sortAsc}" v-html="$r.icons.arrow_up"></r-icon>
              </th>
            </slot>
          </tr>
          </thead>
          <transition-group :name="transition" tag="tbody">
            <template v-for="(item,key) in lists" :key="gen_key(item)||key">
              <template v-if="true">
                <tr :key="`${gen_key(item)||key}- f`">
                  <!--  Slot for custom row rendering
                  @binding {*} item - Row data item
                  @binding {Function} open - Function to toggle row expansion
                  @binding {Number|null} opened - Currently opened row index
                  @binding {Function} show - Function to check if expand button should be shown
                  @binding {Array} th - Table header configuration -->
                  <slot :key="key" :item="item" :open="open" :opened="opened" :show="show" :th="th"
                        name="row">
                    <td v-for="(value,k) in th" :key="`${key}- ${k}`">
                      <!-- Dynamic slot for individual cell content, named 'td-[value.value]'
                       @binding {*} item - Row data item
                       @binding {Object} value - Column configuration -->
                      <slot :item="item" :value="value" :name="'td-'+value.value">
                        <div>
                          <r-btn v-if="show(k)"
                                 icon text @click.prevent="open(key)">
                            <r-icon v-if="opened!==key" v-html="$r.icons.plus"></r-icon>
                            <r-icon v-else v-html="$r.icons.minus"></r-icon>
                          </r-btn>
                          {{ item[value.value] }}
                        </div>
                      </slot>
                    </td>
                  </slot>
                </tr>
                <tr v-if="opened===key" :key="`${gen_key(item)||key}- l`"
                    class="tr-hidden">
                  <td :colspan="($helper.size(th)||th.length)">
                    <div v-for="(v,h) in hidden" :key="key+h" class="pa-2">
                      <span class="title-1">{{ getText(h) }}: </span>
                      <span>{{ item[h] }}</span>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
          </transition-group>
        </table>
      </div>
    </div>
  </div>
  <r-modal v-if="editable" v-model="showModal">
    <div
        :key="key"
        v-sortable="{
            items: cols,
            end: store_db,
            grab: '.drag-btn'
          }"
    >
      <r-card v-for="(col, i) in cols"
              :key="i" class="pa-4 ma-1 d-flex h-space-between" tile>
                <span class="title-1">
                  <r-btn class="drag-btn" icon text>
                    <r-icon v-html="$r.icons.drag"></r-icon>
                  </r-btn>
                  {{ col.text }}
                </span>
        <span>
          <r-switch-input v-model="col.show" :label="$t('show','renusify')"
                          @update:model-value="store_db(cols)"></r-switch-input>
                </span>
      </r-card>
    </div>
  </r-modal>
</template>

<script setup>
import {ref, computed, watch, onMounted, nextTick, inject} from 'vue'

/**
 * @example // Table usage
 * <template>
 *   <r-table
 *     :transition="transition"
 *     :key-Item="keyItem"
 *     :thin="thin"
 *     :responsive="responsive"
 *     :translate="translate"
 *     :editable="editable"
 *     :stripped="stripped"
 *     :bordered="bordered"
 *     :sortable="sortable"
 *     :fixed-Header="fixedHeader"
 *     :fixed-First-Column="fixedFirstColumn"
 *     :headers="headers"
 *     :items="items"
 *   ></r-table>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * const transition = ref('table-row')
 * const keyItem = ref(null)
 * const thin = ref(false)
 * const responsive = ref(false)
 * const translate = ref(false)
 * const editable = ref(true)
 * const stripped = ref(true)
 * const borderd = ref(false)
 *
 * const sortable = ref({
 *   id: true,
 *   name: true,
 *   age: false,
 *   skill: 'vuejs'
 * })
 *
 * const fixedHeader = ref(false)
 * const fixedFirstColumn = ref(false)
 *
 * const headers = ref([
 *   { text: 'id', value: 'id' },
 *   { text: 'name', value: 'name' },
 *   { text: 'lastname', value: 'lastname' },
 *   { text: 'age', value: 'age' },
 *   { text: 'skill', value: 'skill' }
 * ])
 *
 * const items = ref([
 *   { id: 1, name: 'Smko', lastname: 'Bzd', age: 29, skill: { vuejs: 20, python: 25 } },
 *   { id: 2, name: 'Noah', lastname: 'Ava', age: 23, skill: { vuejs: 18, python: 32 } },
 *   { id: 3, name: 'James', lastname: 'Barr', age: 18, skill: { vuejs: 45, python: 25 } },
 *   { id: 4, name: 'William', lastname: 'Emma', age: 30, skill: { vuejs: 30, python: 50 } },
 *   { id: 5, name: 'Liam', lastname: 'Emma', age: 53, skill: { vuejs: 15, python: 20 } }
 * ])
 * <//script>
 *
 * */
const props = defineProps({
  /**
   * CSS transition name for table rows
   * @type {String}
   * @default 'table-row'
   */
  transition: {
    type: String,
    default: 'table-row'
  },
  /**
   * Key property or function to generate unique row keys
   * @type {String|Function}
   */
  keyItem: [String, Function],
  /**
   * Applies thin row styling
   * @type {Boolean}
   */
  thin: Boolean,
  /**
   * Enables responsive column hiding on small screens
   * @type {Boolean}
   */
  responsive: Boolean,
  /**
   * Enables text translation for header texts
   * @type {Boolean}
   */
  translate: Boolean,
  /**
   * Enables column configuration editing
   * @type {Boolean}
   */
  editable: Boolean,
  /**
   * Applies stripped row styling
   * @type {Boolean}
   */
  stripped: Boolean,
  /**
   * Applies bordered styling
   * @type {Boolean}
   */
  bordered: Boolean,
  /**
   * Sorting configuration object mapping column values to sortable keys
   * @type {Object}
   */
  sortable: Object,
  /**
   * Enables fixed header
   * @type {Boolean}
   */
  fixedHeader: Boolean,
  /**
   * Enables fixed first column
   * @type {Boolean}
   */
  fixedFirstColumn: Boolean,
  /**
   * Array of header configuration objects
   * @type {Array}
   */
  headers: Array,
  /**
   * Array of data items for table rows
   * @type {Array}
   */
  items: Array
})

const emit = defineEmits([
  /**
   * Emitted when table sorting changes
   * @param {Object} sort - Sorting information
   * @param {String} sort.key - Column key being sorted
   * @param {Boolean} sort.asc - Whether sorting is ascending
   */
  'sort'
])

const {$helper, $storage} = inject('renusify')

const key = ref(0)
const opened = ref(null)
const sortKey = ref(null)
const sortAsc = ref(true)
const showModal = ref(false)
const loading = ref(false)
const hidden_col = ref({})
const hidden = ref({})
const cols = ref([])

const tableRef = ref(null)

const priority = computed(() => {
  const res = {}
  th.value.forEach((item) => {
    if (item && $helper.ifHas(item, false, 'option', 'priority') !== false) {
      res[item.value] = item.option.priority
    } else {
      res[item.value] = 0
    }
  })
  return res
})

const lists = computed(() => {
  if (!props.items) return []

  let res = [...props.items]

  if (res.length > 0 && props.sortable && sortKey.value && props.sortable[sortKey.value]) {
    return res.sort(dynamicSort(sortKey.value, sortAsc.value, props.sortable[sortKey.value]))
  }
  return res
})

const th = computed(() => {
  const res = []
  const list = cols.value.length > 0 ? cols.value : th_all.value

  list.forEach((item) => {
    if (item && !(item.value in hidden.value) && !(item.value in hidden_col.value)) {
      res.push(item)
    }
  })
  return res
})

const th_all = computed(() => {
  const res = []

  if (props.headers && props.headers.length > 0) {
    props.headers.forEach((item) => {
      if (item) {
        res.push(item)
      }
    })
  } else if (props.items && props.items.length > 0) {
    for (let name in props.items[0]) {
      if ($helper.hasKey(props.items[0], name)) {
        res.push({text: name, value: name})
      }
    }
  }

  return res
})

const hash_key = computed(() => {
  let r = ''
  th_all.value.forEach((item) => {
    if (item) {
      r += item.value
    }
  })
  return $helper.hash(r)
})

// Methods
const check_hidden = () => {
  const d = $storage.get('table_' + hash_key.value)
  if (d) {
    const res = {}
    d.forEach((item) => {
      if (item && item.show === false) {
        res[item.value] = true
      }
    })
    hidden_col.value = res
    cols.value = d
  }
}

const store_db = (data) => {
  $storage.set('table_' + hash_key.value, data)
  key.value++
  check_hidden()
  if (props.responsive) {
    build()
  }
}

const open_modal = () => {
  const d = $storage.get('table_' + hash_key.value)
  if (d) {
    cols.value = []
    d.forEach((item) => {
      if (item) {
        cols.value.push(item)
      }
    })
  } else {
    cols.value = []
    th_all.value.forEach((item) => {
      if (item) {
        cols.value.push({text: item.text, value: item.value, show: true})
      }
    })
  }

  showModal.value = true
}

const gen_key = (item) => {
  if (!props.keyItem) return null

  if (typeof props.keyItem === 'string') {
    return item[props.keyItem]
  }

  if (typeof props.keyItem === 'function') {
    return props.keyItem(item)
  }

  return null
}

const open = (rowKey) => {
  if (opened.value === rowKey) {
    opened.value = null
  } else {
    opened.value = rowKey
  }
}

const show = (k) => {
  if (Object.keys(hidden.value).length === 0) {
    return false
  }

  if (Array.isArray(th.value) && k === 0) {
    return true
  }

  const keys = Object.keys(th.value)
  return keys[0] === k.toString()
}

const setup = () => {
  if (props.editable) {
    check_hidden()
    const s = $storage.get('table_sort')
    if (s && hash_key.value in s) {
      sortKey.value = s[hash_key.value][0]
      sortAsc.value = s[hash_key.value][1]
    }
  }

  if (props.responsive) {
    build()
  }
}

const build = () => {
  if (!tableRef.value) return

  opened.value = null
  hidden.value = {}

  nextTick(() => {
    const table = tableRef.value.querySelector('table')
    if (!table) return

    const all_th = table.querySelectorAll('th') || []
    const th_w = []

    all_th.forEach((th) => {
      if (th) {
        th_w.push(th.clientWidth)
      }
    })

    const thn_w = {}
    let i = 0
    for (let name in priority.value) {
      if ($helper.hasKey(priority.value, name)) {
        thn_w[name] = th_w[i]
        i++
      }
    }

    if (tableRef.value.clientWidth < table.clientWidth) {
      const [show, hide] = extractor(tableRef.value.clientWidth, table.clientWidth, thn_w, priority.value)
      hidden.value = hide
    }
  })
}

const extractor = (width, table_w, th, priority, removed = 0, hide = {}) => {
  if (table_w > width + removed) {
    const name = remove_one(priority)
    hide[name] = true
    const newPriority = {...priority}
    delete newPriority[name]
    return extractor(width, table_w, th, newPriority, removed + th[name], hide)
  }
  return [priority, hide]
}

const remove_one = (priority) => {
  const res = []
  for (let name in priority) {
    if ($helper.hasKey(priority, name)) {
      res.push({name: name, value: priority[name]})
    }
  }

  res.sort((a, b) => {
    return a.value - b.value
  })

  return res[0]?.name
}

const getText = (key) => {
  if (Array.isArray(props.headers)) {
    const header = props.headers.find(item => item.value === key)
    return header?.text || key
  }
  return key
}

const sorting = (name) => {
  if (props.sortable && props.sortable[name]) {
    loading.value = true

    setTimeout(() => {
      loading.value = false
    }, 500)

    if (sortKey.value === name) {
      sortAsc.value = !sortAsc.value
    } else {
      sortKey.value = name
      sortAsc.value = true
    }

    if (props.editable) {
      let t = $storage.get('table_sort') || {}
      t[hash_key.value] = [name, sortAsc.value]
      $storage.set('table_sort', t)
    }

    emit('sort', {key: name, asc: sortAsc.value})
  }
}

const dynamicSort = (property, sortAsc, sortable_key = undefined) => {
  let sortOrder = sortAsc ? 1 : -1

  return function (a, b) {
    let result = 0

    if (a[property] !== undefined && b[property] !== undefined) {
      let av = a[property]
      let bv = b[property]

      if (sortable_key && av && bv &&
          av[sortable_key] !== undefined &&
          bv[sortable_key] !== undefined) {
        av = av[sortable_key]
        bv = bv[sortable_key]
      }

      if (av < bv) {
        result = -1
      } else if (av > bv) {
        result = 1
      }
    } else if (a[property] === undefined && b[property] !== undefined) {
      result = -1
    } else if (a[property] !== undefined && b[property] === undefined) {
      result = 1
    }

    return result * sortOrder
  }
}


onMounted(() => {
  setup()
})

watch(() => props.items, () => {
  setTimeout(() => {
    setup()
  }, 100)
}, {immediate: true})

</script>
<style lang="scss">
@use "sass:map";
@use "../../style" as *;

$data-table-thin-header-height: 38px !default;
$data-table-thin-row-height: 32px !default;
$data-table-regular-row-height: 42px !default;
$data-table-regular-header-height: 38px !default;

.#{$prefix}table {
  position: relative;

  .table-wrapper {
    background-color: var(--color-sheet-container-lowest);
    color: var(--color-on-sheet);
  }

  .table-svg-path {
    fill: var(--color-sheet);
  }

  .table-editable-icon {
    background-color: var(--color-sheet);
    color: var(--color-on-sheet);
  }

  &.table-fixed-header {
    thead th {
      box-shadow: inset 0 -2px var(--color-border)
    }
  }

  thead {
    tr {
      &:last-child th {
        border-bottom: 1px solid var(--color-border)
      }

      th {
        background-color: var(--color-sheet);
        color: var(--color-on-sheet)
      }
    }
  }

  &.table-fixed-first-columns {
    tr {
      th:first-child {
        background: var(--color-sheet);
        color: var(--color-on-sheet)
      }

      td:first-child {
        background: var(--color-sheet);
        color: var(--color-on-sheet)
      }

      &:hover {
        td:first-child {
          background: var(--color-sheet-container);
          color: var(--color-on-sheet)
        }
      }
    }
  }

  &.table-stripped {
    tbody {
      tr:nth-child(2n):not(:hover) {
        td {
          background: var(--color-sheet-container-low)
        }
      }
    }
  }

  tbody {
    tr {
      &:active {
        background: var(--color-sheet-container)
      }

      &:hover {
        background: var(--color-sheet-container)
      }
    }

    tr:not(:last-child) {
      td {
        border-bottom: 1px solid var(--color-border)
      }
    }
  }

  &.table-bordered .table-wrapper {
    border: 1px solid var(--color-border);
    border-collapse: collapse;
  }

  .table-wrapper {
    border-radius: map.get($borders, 'lg');
    overflow: hidden;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }

  td, th {
    padding: 0 16px;
    @include ltr() {
      text-align: left
    }
    @include rtl() {
      text-align: right
    }
  }

  th {
    user-select: none;
    font-size: 14px;
    font-weight: bold;
    height: $data-table-regular-header-height;

  }

  td {
    font-size: 14px;
    font-weight: normal;
    height: $data-table-regular-row-height;
  }

  &.row-thin {
    th {
      font-size: 12px;
      height: $data-table-thin-header-height;

    }

    td {
      font-size: 12px;
      height: $data-table-thin-row-height
    }
  }

  .table-container {
    overflow-x: auto
  }

  &.table-fixed-header {
    .table-container {
      overflow-y: auto;
      max-height: 85vh;
    }

    thead {
      th {
        border-bottom: 0px !important;
        position: sticky;
        top: 0;
        z-index: 2;

        tr:nth-child(2) {
          th {
            top: $data-table-regular-header-height
          }
        }
      }
    }
  }

  &.table-fixed-first-columns {
    tr {
      position: relative;

      th:first-child {
        min-width: 300px !important;
        position: sticky;
        width: 300px;
        @include rtl() {
          right: 0;
        }
        @include ltr() {
          left: 0;
        }
        z-index: map.get($z-index, 'medium');
      }

      td:first-child {
        position: sticky;
        width: 300px;
        @include rtl() {
          right: 0;
        }
        @include ltr() {
          left: 0;
        }
        height: auto;
        z-index: map.get($z-index, 'low');
      }
    }
  }

  &.table-sortable {
    th {
      &:hover {
        cursor: pointer;
      }
    }
  }

  &.table-editable {
    .table-editable-icon {
      cursor: pointer;
      border-radius: 20px 20px 0 0;
      border: none;
      min-width: 25px !important;
      padding-top: 8px;
      height: 30px !important;
    }

    .table-wrapper {
      @include rtl() {
        border-top-left-radius: 0;
      }
      @include ltr() {
        border-top-right-radius: 0;
      }
    }

    .table-svg {
      @include ltr() {
        transform: rotateY(180deg);
      }
    }
  }

  .sort-desc {
    transform: rotate(180deg) !important;
  }

  tr, td, td > * {
    transition: height .4s ease-in-out;
  }

  td > * {
    overflow-y: hidden;
    overflow-x: auto;
  }

  .tr-hidden {
    overflow: hidden;
  }

  .table-row-enter-active, .table-row-leave-active {
    transition: height .3s linear;
    line-height: 0;
  }

  .table-row-enter-from {
    td {
      height: 0;
      line-height: 0;
      overflow: hidden;
    }
  }

  .table-row-leave-to {
    td {
      height: 0;
      line-height: 0;
      overflow: hidden;

    }
  }

  .table-row-move {
    transition: transform .3s ease-in-out;
  }
}
</style>