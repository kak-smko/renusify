<template>
  <div :class="`${$r.prefix}table-manage`">
    <r-modal v-model="showForm" full-width position="bottom">
      <!-- @slot Slot for custom form rendering
      @binding {Boolean} autoSend - Whether to auto-send form
      @binding {String} method - HTTP method (post/put)
      @binding {Object} modelValue - Edited item data
      @binding {Function} ok - Function to call on successful form submission
      @binding {Object} options - Form field options from table headers
      @binding {String} title - Form title
      @binding {String} url - Form submission URL -->
      <slot :autoSend="autoSend"
            :method="method"
            :modelValue="editedItem"
            :ok="ok"
            :options="table.option"
            :title="title"
            :url="url"
            name="form">
        <r-form-creator :autoSend="autoSend"
                        :method="method"
                        :modelValue="editedItem"
                        :options="table.option"
                        :title="title"
                        :url="url"
                        @ok="ok"
        ></r-form-creator>
      </slot>
    </r-modal>
    <r-modal v-model="showCopy" full-width position="bottom">
      <div class="pa-3">
        <div v-for="(item,key) in table.option" :key="key"
             class="mb-5">
          <template v-if="item['formInput']!==false">

            <r-json-input v-if="item['type']==='file-uploader'" v-model="copyItem['d'][key]"
                          :label="$t(key,'renusify')"
                          baseArray></r-json-input>
            <component
                :is="item['type']"
                v-else
                v-model="copyItem['d'][key]"
                :label="$t(key,'renusify')"
                v-bind="getAttr(table.option[key],copyItem['t'])['props']"
            ></component>
          </template>
        </div>

        <r-divider class="my-5"></r-divider>
        <div class="d-flex h-space-between v-baseline">
                <span>
                  <r-number-input v-if="copyItem['t']==='copy'" :label="$t('count_copy','renusify')"
                                  v-model="copyItem['c']"></r-number-input>
                </span>
          <r-btn :loading="loading" class="color-success" @click.prevent="copyAll()">{{
              $t('send', 'renusify')
            }}
          </r-btn>
        </div>
      </div>
    </r-modal>
    <manage-header v-model="search" :advance-search="advanceSearch"
                   :disable-add="disableAdd"
                   :header-table="table.headers"
                   :loading="loading" :mcud="showMCUD" :new-item="newItem"
                   @copy="copyHandle('copy')"
                   @delete="deleteAll()"
                   @edit="copyHandle('edit')"
                   @update:modelValue="searching()"
                   @a-search="(a_search=$event),(searching())"></manage-header>
    <template v-if="card">
      <!-- @slot Slot for custom cards view rendering
      @binding {Function} deleteItem - Function to delete an item
      @binding {Function} editItem - Function to edit an item
      @binding {Array} header - Table headers
      @binding {Array} items - Table data items -->
      <slot :deleteItem="deleteItem" :editItem="editItem" :header="headerTable" :items="table.data" name="cards">
        <div class="d-flex overflow-x-auto">
          <div class="d-flex">
            <r-card v-for="(item,i) in table.data" :key="i"
                    class="pa-3 me-3"
                    style="width: 300px">
              <div v-for="(h,j) in headerTable" :key="i+'-'+j"
                   class="d-flex text-no-wrap overflow-x-auto">
                <!-- @slot Dynamic slot for card content, named 'td-[h.value]'
                @binding {Function} editItem - Function to edit an item
                @binding {Object} item - Card data item
                @binding {Object} value - Header configuration -->
                <slot :editItem="editItem" :item="item" :name="'td-'+h.value" :value="h">
                  <div v-if="h['option']['type']==='r-date-input' && item[h['value']]!==undefined"
                       class="py-2">
                    {{ h['text'] }}:
                    {{ $d(new Date(item[h['value']]), h['option']['format'] || 'short') }}
                  </div>
                  <div
                      v-else-if="h['option']['type']==='r-time-ago' && item[h['value']]!==undefined"
                      class="py-2">
                    {{ h['text'] }}:
                    <r-time-ago :time="item[h['value']]"></r-time-ago>
                  </div>
                  <div v-else-if="h['option']['type']==='r-switch-input'" class="d-flex py-2">
                    {{ h['text'] }}:
                    <r-switch-input
                        :modelValue="item[h['value']]"
                        :readonly="h['option']['formInput']===false"
                        class="mt-0"
                        @update:modelValue="h['option']['formInput']!==false?editItem(item,true,h['value']):''"
                    ></r-switch-input>
                  </div>
                  <div v-else-if="h['option']['type'] === 'r-number-input'" class="py-2">
                    {{ h['text'] }}: {{ $n(item[h['value']]) }}
                  </div>
                  <div v-else-if="h['option']['type']!=='action'" class="py-2">
                    {{ h['text'] }}: {{
                      h['value'] in cast ?
                          $helper.ifHas(item, '', h['value'], cast[h['value']])
                          : item[h['value']]
                    }}
                  </div>
                </slot>
                <div v-if="h['option']['type']==='action'" class="w-full text-end">
                  <r-divider class="mt-3"></r-divider>
                  <r-btn v-if="!disableUpdate" class="mx-0 color-success-text"
                         icon text @click.prevent="editItem(item)">
                    <r-icon exact v-html="$r.icons.edit"></r-icon>
                  </r-btn>
                  <r-btn v-if="!disableDelete" class="mx-0 color-error-text"
                         icon text @click.prevent="deleteItem(item)">
                    <r-icon v-html="$r.icons.delete"></r-icon>
                  </r-btn>
                  <r-btn v-for="(val,index) in actions" :key="index" :class="`color-${val.color}-text`"
                         class="mx-0" icon
                         text @click.prevent="$emit(val.name,item)">
                    <r-icon exact v-html="val.icon"></r-icon>
                  </r-btn>
                </div>
              </div>
            </r-card>
          </div>
        </div>
      </slot>
    </template>
    <r-table v-else :headers="headerTable" :items="table.data" :key-item="itemId"
             :responsive="responsive"
             transition="table-row">
      <template v-slot:header="{header}">
        <th v-for="(item,key) in header"
            :key="`th-${key}`"
            :class="{
              'header-sortable':$helper.ifHas(item, true, 'option', 'sortable')
              }"
            @click.stop="sortSetup(item)">
          <div v-if="item.option.type==='mcud'">
            <input
                v-model="check_all"
                class="table-checkbox"
                type="checkbox">
          </div>
          <div v-else class="d-flex v-end">
            <div class="w-90"><span>{{ item.text }}</span></div>
            <div :class="{
            'icon-hidden': !(sortBy === item.value && sortType !== 0)
            }" class="w-10 icon-holder"
            >
              <r-icon v-if="(sortType === 2 && sortBy === item.value)"
                      v-html="$r.icons.arrow_down"></r-icon>
              <r-icon v-if="(sortType !== 2 || sortBy !== item.value)"
                      v-html="$r.icons.arrow_up"></r-icon>

            </div>

          </div>
        </th>
      </template>

      <template v-slot:row="props">
        <!-- @slot Slot for custom row rendering in table view
        @binding {Function} deleteItem - Function to delete an item
        @binding {Function} editItem - Function to edit an item
        @binding {Object} table - Table props object -->
        <slot :deleteItem="deleteItem" :editItem="editItem" :table="props" name="row">
          <td v-for="(value,key2) in props.th"
              :key="`td-${key2}`">
            <input v-if="value['option']['type']==='mcud'"
                   v-model="checked[props.item[itemId]]"
                   :checked="check_all"
                   class="table-checkbox"
                   type="checkbox"
                   @update:model-value="$event===false?check_all=false:''">
            <r-btn v-if="props.show(key2)"
                   icon text @click.prevent="props.open(props.key)">
              <r-icon v-html="props.opened!==props.key?$r.icons.plus:$r.icons.minus"></r-icon>
            </r-btn>
            <!-- @slot Dynamic slot for table cell content, named 'td-[value.value]'
            @binding {Function} editItem - Function to edit an item
            @binding {Object} item - Row data item
            @binding {Object} value - Header configuration -->
            <slot :editItem="editItem" :item="props.item" :value="value" :name="'td-'+value.value">
              <div
                  v-if="value['option']['type']==='r-date-input' && props.item[value['value']]!==undefined">
                {{
                  $d(new Date(props.item[value['value']]), value['option']['format'] || 'short')
                }}
              </div>
              <div
                  v-else-if="value['option']['type']==='r-time-ago' && props.item[value['value']]!==undefined">
                <r-time-ago :time="props.item[value['value']]"></r-time-ago>
              </div>
              <div v-else-if="value['option']['type']==='r-switch-input'">
                <r-switch-input
                    :modelValue="props.item[value['value']]"
                    :readonly="value['option']['formInput']===false"
                    class="mt-0"
                    @update:modelValue="value['option']['formInput']!==false?editItem(props.item,true,value['value']):''"
                ></r-switch-input>
              </div>
              <div v-else-if="value['option']['type'] === 'r-number-input'">
                {{ $n(props.item[value['value']]) }}
              </div>
              <div v-else-if="value['option']['type']!=='action'">
                {{
                  value['value'] in cast ?
                      $helper.ifHas(props.item, '', value['value'], cast[value['value']])
                      : props.item[value['value']]
                }}
              </div>
            </slot>
            <div v-if="value['option']['type']==='action'">
              <r-btn v-if="!disableUpdate" class="mx-0 color-success-text"
                     icon text @click.prevent="editItem(props.item)">
                <r-icon exact v-html="$r.icons.edit"></r-icon>
              </r-btn>
              <r-btn v-if="!disableDelete" class="mx-0 color-error-text"
                     icon text @click.prevent="deleteItem(props.item)">
                <r-icon v-html="$r.icons.delete"></r-icon>
              </r-btn>
              <r-btn v-for="(val,index) in actions" :key="index" :class="`color-${val.color}-text`"
                     class="mx-0" icon
                     text @click.prevent="$emit(val.name,props.item)">
                <r-icon exact v-html="val.icon"></r-icon>
              </r-btn>
            </div>
          </td>
        </slot>
      </template>

    </r-table>
    <manage-footer v-model:page="page" v-model:per-page="itemsPerPage"
                   :total="table.total"></manage-footer>

    <r-confirm
        v-model="showConfirm"
        hard
        v-on:accept="accept"
        v-on:cancel="showConfirm = false"
    />
  </div>
</template>

<script setup>
import {ref, computed, watch, onMounted, inject} from 'vue'
import ManageFooter from "./footer.vue";
import ManageHeader from "./header.vue";


const props = defineProps({
  /**
   * API endpoint URL for data operations
   * @type {String}
   * @required
   */
  link: {
    required: true,
    type: String
  },
  /**
   * Array of custom action buttons configuration
   * @type {Array}
   * @default () => []
   */
  actions: {
    default: () => [],
    type: Array
  },
  /**
   * Object mapping field names to nested property paths for display
   * @type {Object}
   * @default () => ({})
   */
  cast: {
    default: () => ({}),
    type: Object
  },
  /**
   * Default items per page configuration
   * @type {Object}
   * @default () => ({name: '10', value: 10})
   */
  perPage: {
    type: Object,
    default: () => ({name: '10', value: 10})
  },
  /**
   * Additional query parameters for API requests
   * @type {Object}
   */
  query: Object,
  /**
   * Enables responsive table behavior
   * @type {Boolean}
   */
  responsive: Boolean,
  /**
   * Displays data in cards view instead of table
   * @type {Boolean}
   */
  card: Boolean,
  /**
   * Disables "Add New" functionality
   * @type {Boolean}
   */
  disableAdd: Boolean,
  /**
   * Enables advanced search functionality
   * @type {Boolean}
   * @default true
   */
  advanceSearch: {type: Boolean, default: true},
  /**
   * Disables delete functionality
   * @type {Boolean}
   */
  disableDelete: Boolean,
  /**
   * Disables update/edit functionality
   * @type {Boolean}
   */
  disableUpdate: Boolean,
  /**
   * Mass CRUD operations endpoint URL
   * @type {String}
   */
  mcud: String,
  /**
   * Property name that serves as unique item identifier
   * @type {String}
   * @default '_id'
   */
  itemId: {type: String, default: '_id'},
  /**
   * Additional HTTP headers for API requests
   * @type {Object}
   */
  headers: Object
})

const {$helper, $t} = inject('renusify')
const $axios = inject('axios')

const time_out_id = ref(null)
const loading = ref(false)
const showForm = ref(false)
const showCopy = ref(false)
const showConfirm = ref(false)
const search = ref('')
const a_search = ref({})
const copyItem = ref({d: {}, c: 1})
const editedItem = ref({})
const deleted = ref('')
const url = ref('')
const method = ref('post')
const title = ref('')
const autoSend = ref(false)
const itemsPerPage = ref(props.perPage)
const page = ref(1)
const sortBy = ref(null)
const sortType = ref(0)
const table = ref({
  headers: [],
  option: {},
  data: [],
  startTime: false,
  total: 0
})
const check_all = ref(false)
const checked = ref({})


const showMCUD = computed(() => {
  if (check_all.value) return true

  for (let k in checked.value) {
    if (checked.value[k] === true) {
      return true
    }
  }
  return false
})

const headerTable = computed(() => {
  const headers = table.value.headers
  const res = []
  const lng = headers.length

  for (let i = 0; i < lng; i++) {
    if ($helper.ifHas(headers[i], true, 'option', 'tableShow') !== false) {
      res.push(headers[i])
    }
  }
  return res
})


const getAttr = (data, typ) => {
  const res = {}
  const ls = ['formInput', 'sortable', 'type', 'tableShow', 'priority']

  if (typ === 'edit') {
    ls.push('rules')
  }

  for (let i in data) {
    if ($helper.hasKey(data, i) && !ls.includes(i)) {
      res[i] = data[i]
    }
  }
  return res
}

const copyAll = () => {
  loading.value = true

  const axiosMethod = copyItem.value.t === 'copy' ? 'post' : 'put'
  $axios[axiosMethod](props.mcud, copyItem.value, {headers: props.headers})
      .then(() => {
        loading.value = false
        showCopy.value = false
        refresh()
      })
      .catch(() => {
        loading.value = false
      })
}

const copyHandle = (typ = 'copy') => {
  copyItem.value = {d: {}, c: 1, t: typ}

  if (typ === 'edit') {
    copyItem.value.ids = get_ids()
    if (copyItem.value.ids.length === 0) {
      return
    }
  }

  if (typ === 'copy') {
    if (check_all.value) {
      copyItem.value.d = table.value.data[0]
      copyItem.value.c = 1
    }

    for (let k in checked.value) {
      if (checked.value[k] === true) {
        table.value.data.forEach((item) => {
          if (item[props.itemId] === k) {
            copyItem.value.d = item
            copyItem.value.c = 1
          }
        })
        break
      }
    }
  }

  showCopy.value = true
}

const get_ids = () => {
  const res = []

  if (check_all.value) {
    table.value.data.forEach((item) => {
      res.push(item[props.itemId])
    })
  }

  for (let k in checked.value) {
    if (checked.value[k] === true) {
      res.push(k)
    }
  }
  return res
}

const deleteAll = () => {
  const res = get_ids()
  if (res.length > 0) {
    $axios.delete(props.mcud, {
      data: {ids: res},
      headers: props.headers
    })
        .then(() => {
          refresh()
        })
        .catch(error => {
          console.error('Delete error:', error)
        })
  }
}

/**
 * Sets up sorting for a column
 * @param {Object} item - Header configuration object
 */
const sortSetup = (item) => {
  if (!$helper.ifHas(item, true, 'option', 'sortable')) {
    return
  }

  if (sortBy.value !== item.value) {
    sortType.value = 0
  }

  sortBy.value = item.value

  if (sortType.value >= 2) {
    sortType.value = 0
  } else {
    sortType.value += 1
  }

  refresh()
}

/**
 * Handles successful form submission
 */
const ok = () => {
  table.value.startTime = false
  page.value = 1
  sortBy.value = null
  sortType.value = 0
  autoSend.value = false
  showForm.value = false
  refresh()
}

/**
 * Refreshes table data
 * @param {Object} e - Event object with perPage value
 */
const refresh = (e) => {
  loading.value = true
  check_all.value = false
  checked.value = {}

  const perPage = e !== undefined ? e.value : itemsPerPage.value.value
  const params = {...props.query}

  params.page = page.value
  params.per_page = perPage

  if (table.value.startTime !== false) {
    params.t = table.value.startTime
  }

  if (sortType.value !== 0) {
    const sort = (sortType.value === 2) ? 'desc' : 'asc'
    params[sort] = sortBy.value
  }

  if (search.value.length >= 1) {
    params.search = search.value
  }

  if (Object.keys(a_search.value).length > 0) {
    params.a_search = JSON.stringify(a_search.value)
  }

  setup(props.link, params)
}

/**
 * Performs search with debouncing
 */
const searching = () => {
  clearTimeout(time_out_id.value)
  loading.value = true

  time_out_id.value = setTimeout(() => {
    page.value = 1
    refresh()
  }, 1000)
}

/**
 * Opens form for creating a new item
 */
const newItem = () => {
  title.value = $t('new', 'renusify')
  url.value = props.link

  const items = {}
  table.value.headers.forEach((item) => {
    if (item.option.formInput !== false) {
      if (item.option.type === 'boolean') {
        items[item.value] = false
      } else {
        items[item.value] = null
      }
    }
  })

  editedItem.value = items
  method.value = 'post'
  autoSend.value = false
  showForm.value = true
}

/**
 * Opens form for editing an existing item
 * @param {Object} item - Item to edit
 * @param {Boolean} autoSendFlag - Whether to auto-save changes
 * @param {String|null} key - Specific field key to edit
 */
const editItem = (item, autoSendFlag = false, key = null) => {
  let sw
  title.value = $t('edit', 'renusify')
  url.value = `${props.link}/${item[props.itemId]}`

  if (key) {
    sw = !item[key]
  }

  const items = {}
  table.value.headers.forEach((header) => {
    if (header.option.formInput !== false) {
      if (header.option.type === 'boolean') {
        items[header.value] = item[header.value] !== undefined ? item[header.value] : false
      } else {
        items[header.value] = item[header.value] !== undefined ? item[header.value] : null
      }
    }
  })

  editedItem.value = {...items}

  if (key) {
    editedItem.value[key] = sw
  }

  method.value = 'put'
  autoSend.value = autoSendFlag
  showForm.value = true
}

/**
 * Opens confirmation dialog for deleting an item
 * @param {Object} item - Item to delete
 */
const deleteItem = (item) => {
  showConfirm.value = true
  deleted.value = item[props.itemId]
}

/**
 * Deletes an item by ID
 * @param {String} _id - Item ID to delete
 */
const deleteItemById = (_id) => {
  $axios.delete(`${props.link}/${_id}`, {headers: props.headers})
      .then(() => {
        refresh()
      })
      .catch(error => {
        console.error('Delete item error:', error)
      })
}

/**
 * Handles confirmation dialog acceptance
 */
const accept = () => {
  showConfirm.value = false
  deleteItemById(deleted.value)
  deleted.value = ''
  refresh()
}

/**
 * Fetches table data from API
 * @param {String} url - API endpoint URL
 * @param {Object|null} params - Query parameters
 */
const setup = (url, params = null) => {
  loading.value = true

  $axios.get(url, {params: params, headers: props.headers})
      .then(({data}) => {
        let all = []

        if (props.mcud) {
          all.push({
            option: {type: 'mcud', sortable: false, formInput: false, priority: 10},
            text: 'action',
            value: 'action'
          })
        }

        all = all.concat(data.headers)

        table.value.headers = all.map((item) => {
          table.value.option[item.value] = item.option
          item.text = $t(item.value)
          return item
        })

        table.value.data = data.data
        table.value.total = data.total
        table.value.startTime = $helper.ifHas(data, false, 't')
        loading.value = false
      })
      .catch(error => {
        console.error('Setup error:', error)
        loading.value = false
      })
}

onMounted(() => {
  refresh()
})

watch(page, (newValue) => {
  if (newValue > 0) {
    refresh()
  }
})

watch(itemsPerPage, () => {
  refresh()
})
</script>
<style lang="scss">
@use "../../../style" as *;


.#{$prefix}table-manage {
  white-space: nowrap;

  .overflow-x-auto {
    overflow-x: auto;
  }

  .table-checkbox {
    width: 17px;
    height: 17px;
  }

  .manage-footer {
    .btn-page {
      color: var(--color-on-sheet);
      border: solid 1px var(--color-sheet-low);
      background-color: var(--color-sheet-container);
    }
  }

  th {
    position: relative;
    transition: 0.2s;

    .icon-hidden {
      visibility: hidden;
    }

    &.header-sortable:hover {
      cursor: pointer;

      .icon-hidden {
        visibility: visible;
      }
    }
  }

  td {
    max-width: 130px !important;
    overflow: auto;
  }

  .manage-footer {
    .btn-page {
      border-radius: 30px;
      padding: 2px;
    }

    .per-page {
      width: 80px;
    }

    .input-page {
      outline: none;
      width: 20px;

    }
  }
}

</style>