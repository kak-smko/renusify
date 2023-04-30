<template>
    <div
         :class="{
        [`${$r.prefix}table`]:true,
        'table-editable':editable,
         'table-bordered':borderd,
         'row-thin':thin,
         'table-fixed-header':fixedHeader,
         'table-sortable':sortable,
         'table-stripped':stripped,
         'table-fixed-first-columns':fixedFirstColumn}">
        <div class="d-flex h-end v-end" v-if="editable">
            <svg class="table-svg" height="18" width="18">
                <path class="table-svg-path" d="M 0 0 l 0 18 l 18 0 q -18 0 -18 -18"/>
            </svg>
            <span class="color-info-text table-editable-icon px-2"
                  @click.prevent="open_modal()">
                <r-icon v-html="$r.icons.setting" ></r-icon>
            </span>
        </div>
        <div class="table-wrapper">
            <div class="table-container" ref="table">
                <r-progress-line v-if="loading" color="color-two"></r-progress-line>
                <table>
                    <thead>
                    <tr>
                        <slot name="header" v-bind:header="th">
                            <th :key="key" class="text-start text-no-wrap"
                                :class="{'color-info-text':sortKey===item.value}"
                                v-for="(item,key) in th"
                                @click.prevent="sorting(item.value)">
                                {{translate?$t(item.text,'renusify'):item.text}}
                                <r-icon v-if="sortKey===item.value" :class="{'sort-desc':!sortAsc}" v-html="$r.icons.arrow_up" ></r-icon>
                            </th>
                        </slot>
                    </tr>
                    </thead>
                    <transition-group :name="transition" tag="tbody">
                        <template v-for="(item,key) in lists" :key="gen_key(item)||key">
                            <template v-if="true">
                                <tr :key="`${gen_key(item)||key}- f`">
                                    <slot name="row" :item="item" :th="th" :key="key" :opened="opened" :open="open"
                                          :show="show">
                                        <td :key="`${key}- ${k}`" v-for="(value,k) in th">
                                            <div>
                                                <r-btn @click.prevent="open(key)"
                                                       icon text v-if="show(k)">
                                                    <r-icon v-if="opened!==key" v-html="$r.icons.plus" ></r-icon>
                            <r-icon v-else v-html="$r.icons.minus" ></r-icon>
                                                </r-btn>
                                                {{item[value.value]}}
                                            </div>
                                        </td>
                                    </slot>
                                </tr>
                                <tr v-if="opened===key" class="tr-hidden"
                                    :key="`${gen_key(item)||key}- l`">
                                    <td :colspan="($helper.size(th)||th.length)">
                                        <div class="pa-2" v-for="(v,h) in hidden" :key="key+h">
                                            <span class="title">{{getText(h)}}: </span>
                                            <span>{{item[h]}}</span>
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
    <r-modal v-model="showModal" v-if="editable">
        <r-card>
            <r-container
                    v-sortable="{
            items: cols,
            end: store_db,
            grab: '.drag-btn'
          }"
            >
                <r-row
                        v-for="(col, i) in cols"
                        :key="col.value+i"
                        class="no-gutters"
                >
                    <r-col>
                        <r-card tile class="pa-4 ma-1 d-flex h-space-between">
                <span class="title">
                  <r-btn class="drag-btn" icon text>
                    <r-icon v-html="$r.icons.drag"></r-icon>
                  </r-btn>
                  {{ col.text }}
                </span>
                          <span>
                                <r-switch-input :label="$t('show','renusify')" v-model="col.show"
                                                @update:model-value="store_db(cols)"></r-switch-input>
                </span>
                        </r-card>
                    </r-col>
                </r-row>
            </r-container>
        </r-card>
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
            sortable: Boolean,
            sortableKey: String,
            fixedHeader: Boolean,
            fixedFirstColumn: Boolean,
            headers: Array,
            items: Array
        },
        data() {
            return {
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
        created(){
           if(!this.$r.icons.setting){
               this.$r.icons.setting = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"/></svg>'
           }
           if(!this.$r.icons.drag){
             this.$r.icons.drag = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M7 19v-2h2v2H7m4 0v-2h2v2h-2m4 0v-2h2v2h-2m-8-4v-2h2v2H7m4 0v-2h2v2h-2m4 0v-2h2v2h-2m-8-4V9h2v2H7m4 0V9h2v2h-2m4 0V9h2v2h-2M7 7V5h2v2H7m4 0V5h2v2h-2m4 0V5h2v2h-2Z"/></svg>'
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

                if (res && this.sortKey !== null) {
                    return res.sort(this.dynamicSort(this.sortKey, this.sortAsc, this.sortableKey))
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
                const l = this.$helper.keys(this.th)
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
                    const lng=this.headers.length
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
                if (this.sortable) {
                    this.loading = true
                    setTimeout(() => {
                        this.loading = false
                    }, 1000)
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
                        if (sortable_key !== undefined && av[sortable_key] !== undefined && bv[sortable_key] !== undefined) {
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
