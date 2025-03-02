<template>
  <div
      v-bind="$attrs"
      :class="{
        [`${$r.prefix}table`]:true,
        'table-editable':editable,
         'table-bordered':borderd,
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
      <div ref="table" class="table-container">
        <r-progress-line v-if="loading" color="color-two"></r-progress-line>
        <table>
          <thead>
          <tr>
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
                  <slot :key="key" :item="item" :open="open" :opened="opened" :show="show" :th="th"
                        name="row">
                    <td v-for="(value,k) in th" :key="`${key}- ${k}`">
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

<script>
import './style.scss'

export default {
  name: 'r-table',
  props: {
    transition: {
      type: String,
      default: 'table-row'
    },
    keyItem: [String, Function],
    thin: Boolean,
    responsive: Boolean,
    translate: Boolean,
    editable: Boolean,
    stripped: Boolean,
    borderd: Boolean,
    sortable: Object,
    fixedHeader: Boolean,
    fixedFirstColumn: Boolean,
    headers: Array,
    items: Array
  },
  data() {
    return {
      key: 0,
      showTable: true,
      opened: null,
      sortKey: null,
      sortAsc: true,
      showModal: false,
      loading: false,
      eventsHandler: null,
      hidden_col: {},
      hidden: {},
      cols: []
    }
  },
  watch: {
    items: {
      immediate: true,
      handler() {
        setTimeout(() => {
          this.setup()
        }, 100)
      },
    }
  },
  computed: {
    priority() {
      let res = {}
      this.th.forEach((item) => {
        if (this.$helper.ifHas(item, false, 'option', 'priority') !== false) {
          res[item.value] = item['option']['priority']
        } else {
          res[item.value] = 0
        }
      })

      return res
    },
    lists() {
      let res = this.items

      if (res && this.sortable && this.sortable[this.sortKey]) {
        return res.sort(this.dynamicSort(this.sortKey, this.sortAsc, this.sortable[this.sortKey]))
      }
      return res
    },
    th() {
      let res = []
      let list = this.cols.length > 0 ? this.cols : this.th_all
      list.forEach((item) => {
        if (item && !(item.value in this.hidden) && !(item.value in this.hidden_col)) {
          res.push(item)
        }
      })
      return res
    },
    th_all() {
      let res = []
      if (this.headers) {
        this.headers.forEach((item) => {
          if (item) {
            res.push(item)
          }
        })
      } else {
        for (let name in this.items[0]) {
          if (this.$helper.hasKey(this.items[0], name)) {
            res.push({text: name, value: name})
          }
        }
      }
      return res
    },
    hash_key() {
      let r = ''
      this.th_all.forEach((item) => {
        if (item) {
          r += item.value
        }
      })
      return this.$helper.hash(r)
    }
  },
  methods: {
    check_hidden() {
      const d = this.$storage.get('table_' + this.hash_key)
      if (d) {
        let res = {}
        d.forEach((item) => {
          if (item && item.show === false) {
            res[item.value] = true
          }
        })
        this.hidden_col = res
        this.cols = d
      }

    },
    store_db(data) {
      this.$storage.set('table_' + this.hash_key, data)
      this.key++
      this.check_hidden()
      if (this.responsive) {
        this.build()
      }
    },
    open_modal() {
      const d = this.$storage.get('table_' + this.hash_key)
      if (d) {
        this.cols = []
        d.forEach((item) => {
          if (item) {
            this.cols.push(item)
          }
        })
      } else {
        this.cols = []
        this.th_all.forEach((item) => {
          if (item) {
            this.cols.push({text: item.text, value: item.value, show: true})
          }
        })
      }

      this.showModal = true
    },
    gen_key(item) {
      if (!this.keyItem) {
        return false
      }
      if (typeof this.keyItem === 'string') {
        return item[this.keyItem]
      }
      return this.keyItem(item)
    },
    open(key) {
      if (this.opened === key) {
        this.opened = null
      } else {
        this.opened = key
      }
    },
    show(k) {
      if (this.$helper.size(this.hidden) === 0) {
        return false
      }
      if (this.$helper.isArray(this.th) && k === 0) {
        return true
      }
      const l = Object.keys(this.th)
      return l[0] === k;

    },
    setup() {
      if (this.editable) {
        this.check_hidden()
        const s = this.$storage.get('table_sort')
        if (s && this.hash_key in s) {
          this.sortKey = s[this.hash_key][0]
          this.sortAsc = s[this.hash_key][1]
        }
      }
      if (this.responsive) {
        this.build()
      }
    },
    build() {
      let el = this.$refs.table
      if (!el) {
        return
      }
      this.opened = null
      this.hidden = {}
      setTimeout(() => {
        let table = el.querySelector('table')
        let all_th = table.querySelectorAll('th') || []
        let th_w = []
        all_th.forEach((th) => {
          if (th) {
            th_w.push(th.clientWidth)
          }
        })
        let thn_w = {}
        let i = 0
        for (let name in this.priority) {
          if (this.$helper.hasKey(this.priority, name)) {
            thn_w[name] = th_w[i]
            i++
          }
        }
        if (el.clientWidth < table.clientWidth) {
          const [show, hide] = this.extractor(el.clientWidth, table.clientWidth, thn_w, this.priority)
          this.hidden = hide
        }
      }, 10)

    },
    extractor(width, table_w, th, priority, removed = 0, hide = {}) {

      if (table_w > width + removed) {
        const name = this.remove_one(priority)
        hide[name] = true
        delete priority[name]
        return this.extractor(width, table_w, th, priority, removed + th[name], hide)
      }
      return [priority, hide]

    },
    remove_one(priority) {
      let res = []
      for (let name in priority) {
        if (this.$helper.hasKey(priority, name)) {
          res.push({'name': name, 'value': priority[name]})
        }
      }
      res = res.sort((a, b) => {
        return a['value'] - b['value']
      })
      return res[0]['name']

    },
    getText(key) {
      if (this.$helper.isArray(this.headers)) {
        const lng = this.headers.length
        for (let i = 0; i < lng; i++) {
          const item = this.headers[i]
          if (item.value === key) {
            return item.text
          }
        }

      } else {
        return key
      }
    },
    sorting(name) {
      if (this.sortable && this.sortable[name]) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 500)
        if (this.sortKey === name) {
          this.sortAsc = !this.sortAsc
        } else {
          this.sortKey = name
          this.sortAsc = true
        }
        if (this.editable) {
          let t = this.$storage.get('table_sort')
          if (!t) {
            t = {}
          }
          t[this.hash_key] = [name, this.sortAsc]
          this.$storage.set('table_sort', t)
        }
      }
    },
    dynamicSort(property, sortAsc, sortable_key = undefined) {
      let sortOrder = 1
      if (!sortAsc) {
        sortOrder = -1
      }
      const that = this
      return function (a, b) {
        let result = -1
        if (a[property] !== undefined && b[property] !== undefined) {
          let av = a[property]
          let bv = b[property]
          if (av[sortable_key] !== undefined && bv[sortable_key] !== undefined) {
            av = av[sortable_key]
            bv = bv[sortable_key]
          }
          result = (av < bv) ? -1 : (av > bv) ? 1 : 0
        } else if (a[property] === undefined && b[property] !== undefined) {
          result = -1
        } else if (a[property] !== undefined && b[property] === undefined) {
          result = 1
        }

        return result * sortOrder
      }
    }
  }
}
</script>
