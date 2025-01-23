<template>
  <div :class="`${$r.prefix}table-manage`">
    <r-modal v-model="showForm" bottom full-width>
      <slot :autoSend="autoSend" :method="method"
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
    <r-modal v-model="showCopy" bottom full-width>
      <div class="pa-3">
        <div v-for="(item,key) in table.option" :key="key"
             class="mb-5">
          <template v-if="item['formInput']!==false">

            <r-json-input v-if="item['type']==='file-uploader'" v-model="copyItem['d'][key]" :label="$t(key,'renusify')"
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
    <div v-if="card" class="d-flex overflow-x-auto">
      <div class="d-flex">
        <r-card v-for="(item,i) in table.data" :key="i" :class="{'br-lg':!$r.inputs.tile}" class="pa-3 me-3"
                style="width: 300px">
          <div v-for="(h,j) in headerTable" :key="i+'-'+j" class="d-flex text-no-wrap overflow-x-auto">
            <slot :data="item" :header="h" name="card">
              <div v-if="h['option']['type']==='r-date-input' && item[h['value']]!==undefined" class="py-2">
                {{ h['text'] }}: {{ $d(new Date(item[h['value']]), h['option']['format'] || 'short') }}
              </div>
              <div
                  v-else-if="h['option']['type']==='r-time-ago' && item[h['value']]!==undefined" class="py-2">
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
                {{ h['text'] }}: {{ $n(item[h["value"]]) }}
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
              <r-btn v-for="(val,index) in actions" :key="index" :class="`color-${val.color}-text`" class="mx-0" icon
                     text @click.prevent="$emit(val.name,item)">
                <r-icon exact v-html="val.icon"></r-icon>
              </r-btn>
            </div>
          </div>
        </r-card>
      </div>
    </div>
    <r-table v-else :headers="headerTable" :items="table.data" :key-item="itemId" :responsive="responsive"
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
                      v-html="this.$r.icons.arrow_down"></r-icon>
              <r-icon v-if="(sortType !== 2 || sortBy !== item.value)"
                      v-html="this.$r.icons.arrow_up"></r-icon>

            </div>

          </div>
        </th>
      </template>

      <template v-slot:row="props">
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
            <slot :editItem="editItem" :item="props.item" :value="value" name="cell">
              <div
                  v-if="value['option']['type']==='r-date-input' && props.item[value['value']]!==undefined">
                {{ $d(new Date(props.item[value['value']]), value['option']['format'] || 'short') }}
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
                {{ $n(props.item[value["value"]]) }}
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
              <r-btn v-for="(val,index) in actions" :key="index" :class="`color-${val.color}-text`" class="mx-0" icon
                     text @click.prevent="$emit(val.name,props.item)">
                <r-icon exact v-html="val.icon"></r-icon>
              </r-btn>
            </div>
          </td>
        </slot>
      </template>

    </r-table>
    <manage-footer v-model:page="page" v-model:per-page="itemsPerPage" :total="table.total"></manage-footer>
    <r-confirm
        v-model="showConfirm"
        hard
        v-on:accept="accept"
        v-on:cancel="showConfirm = false"
    />
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {
  name: 'r-table-crud',
  components: {
    ManageHeader: defineAsyncComponent(() =>
        import("./header.vue")
    ), ManageFooter: defineAsyncComponent(() =>
        import("./footer.vue")
    )
  },
  props: {
    link: {
      required: true,
      type: String
    },
    actions: {
      default: function () {
        return []
      },
      type: Array
    },
    cast: {
      default: function () {
        return {}
      },
      type: Object
    },
    perPage: {
      type: Object, default: () => {
        return {name: '10', value: 10}
      }
    },
    query: Object,
    responsive: {
      type: Boolean,
      default: true
    },

    card: Boolean,
    disableAdd: Boolean,
    advanceSearch: {type: Boolean, default: true},
    disableDelete: Boolean,
    disableUpdate: Boolean,
    mcud: String,
    itemId: {type: String, default: "_id"},
    headers: Object
  },
  emits: ['actions'],
  data() {
    return {
      time_out_id: null,
      loading: false,
      showForm: false,
      showCopy: false,
      showConfirm: false,
      search: '',
      a_search: {},
      copyItem: {'d': {}, 'c': 1},
      editedItem: {},
      deleted: '',
      url: '',
      method: 'post',
      title: '',
      autoSend: false,
      itemsPerPage: this.perPage,
      page: 1,
      sortBy: null,
      sortType: 0,
      table: {
        headers: [],
        option: {},
        data: [],
        startTime: false,
        total: 0
      },
      check_all: false,
      checked: {}
    }
  },
  created() {
    this.refresh()
  },
  watch: {
    page: function (n, o) {
      if (n > 0) {
        this.refresh()
      }
    },
    itemsPerPage: function () {
      this.refresh()
    }
  },
  computed: {
    showMCUD() {
      if (this.check_all) {
        return true
      }
      for (let k in this.checked) {
        if (this.checked[k] === true) {
          return true
        }
      }
      return false
    },
    headerTable() {
      const headers = this.table.headers
      const res = []
      const lng = headers.length
      for (let i = 0; i < lng; i++) {
        if (this.$helper.ifHas(headers[i], true, 'option', 'tableShow') !== false) {
          res.push(headers[i])
        }
      }
      return res
    }
  },
  methods: {
    getAttr(data, typ) {
      let res = {}
      let ls = ['formInput', 'sortable', 'type', 'tableShow', 'priority']
      if (typ === 'edit') {
        ls.push('rules')
      }
      for (let i in data) {
        if (this.$helper.hasKey(data, i) &&
            !ls.includes(i)) {
          res[i] = data[i]
        }
      }
      return res
    },
    copyAll() {
      this.loading = true
      this.$axios[this.copyItem['t'] === 'copy' ? 'post' : 'put'](this.mcud, this.copyItem, {headers: this.headers}).then(() => {
        this.loading = false
        this.showCopy = false
        this.refresh()
      }, () => {
        this.loading = false
      })
    },
    copyHandle(typ = 'copy') {
      this.copyItem = {'d': {}, 'c': 1, 't': typ}
      if (typ === 'edit') {
        this.copyItem['ids'] = this.get_ids()
        if (this.copyItem['ids'].length === 0) {
          return
        }
      }
      if (typ === 'copy') {
        if (this.check_all) {
          this.copyItem['d'] = this.table.data[0]
          this.copyItem['c'] = 1
        }
        for (let k in this.checked) {
          if (this.checked[k] === true) {
            this.table.data.forEach((item) => {
              if (item[this.itemId] === k) {
                this.copyItem['d'] = item
                this.copyItem['c'] = 1
              }
            })
            break
          }
        }
      }
      this.showCopy = true
    },
    get_ids() {
      let res = []
      if (this.check_all) {
        this.table.data.forEach((item) => {
          res.push(item[this.itemId])
        })
      }
      for (let k in this.checked) {
        if (this.checked[k] === true) {
          res.push(k)
        }
      }
      return res
    },
    deleteAll() {
      let res = this.get_ids()
      if (res.length > 0) {
        this.$axios.delete(this.mcud, {
          data: {
            ids: res
          },
          headers: this.headers
        })
            .then(() => {
              this.refresh()
            })
      }
    },
    sortSetup(item) {
      if (!this.$helper.ifHas(item, true, 'option', 'sortable')) {
        return
      }
      if (this.sortBy !== item.value) {
        this.sortType = 0
      }
      this.sortBy = item.value
      if (this.sortType >= 2) {
        this.sortType = 0
      } else {
        this.sortType += 1
      }
      this.refresh()
    },
    ok() {
      this.refresh()
      this.autoSend = false
      this.showForm = false
    },
    refresh(e) {
      this.loading = true
      this.check_all = false
      this.checked = {}
      const perPage = e !== undefined ? e.value : this.itemsPerPage.value
      let params = this.query || {}
      params.page = this.page
      if (this.table.startTime !== false) {
        params.t = this.table.startTime
      }
      if (this.sortType !== 0) {
        const sort = (this.sortType === 2) ? 'desc' : 'asc'
        params[sort] = this.sortBy
      }
      params.per_page = perPage
      if (this.search.length >= 1) {
        params.search = this.search
      }
      if (this.$helper.size(this.a_search) > 0) {
        params.a_search = JSON.stringify(this.a_search)
      }

      this.setup(this.link, params)
    },
    searching() {
      clearTimeout(this.time_out_id)
      this.loading = true
      this.time_out_id = setTimeout(() => {
        this.page = 1
        this.refresh()
      }, 1000)

    },
    newItem() {
      this.title = this.$t('new', 'renusify')
      this.url = this.link
      const items = {}
      this.table.headers.map((item) => {
        if (item.option.formInput !== false) {
          if (item.option.type === 'boolean') {
            items[item.value] = false
          } else {
            items[item.value] = null
          }
        }
      })
      this.editedItem = items
      this.method = 'post'
      this.autoSend = false
      this.showForm = true
    },
    editItem(item, autoSend = false, key = null) {
      let sw
      this.title = this.$t('edit', 'renusify')
      this.url = this.link + '/' + item[this.itemId]
      if (key) {
        sw = !item[key]
      }
      const items = {}
      this.table.headers.map((header) => {
        if (header.option.formInput !== false) {
          if (header.option.type === 'boolean') {
            items[header.value] = item[header.value] !== undefined ? item[header.value] : false
          } else {
            items[header.value] = item[header.value] !== undefined ? item[header.value] : null
          }
        }
      })
      this.editedItem = Object.assign({}, items)

      if (key) {
        this.editedItem[key] = sw
      }
      this.method = 'put'
      this.autoSend = autoSend
      this.showForm = true
    },
    deleteItem(item) {
      this.showConfirm = true
      this.deleted = item[this.itemId]
    },
    delete(_id) {
      this.$axios.delete(this.link + '/' + _id, {headers: this.headers})
          .then((res) => {
            this.refresh()
          })
    },
    accept() {
      this.showConfirm = false
      this.delete(this.deleted)
      this.deleted = ''
      this.refresh()
    },
    setup(url, params = null) {
      this.loading = true

      this.$axios.get(url, {params: params, headers: this.headers}).then(({data}) => {
        let all = []
        if (this.mcud) {
          all.push({
            option: {type: "mcud", sortable: false, formInput: false, priority: 10},
            text: "action",
            value: "action"
          })
        }
        all = all.concat(data.headers)

        this.table.headers = all.map((item) => {
          this.table.option[item.value] = item.option
          item.text = this.$t(item.value)
          return item
        })
        this.table.data = data.data
        this.table.total = data.total
        this.table.startTime = this.$helper.ifHas(data, false, 't')
        this.loading = false
      })
    }
  }
}
</script>
