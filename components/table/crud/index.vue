<template>
    <div :class="`${$r.prefix}table-manage`">
        <r-modal bottom full-width v-model="showForm">
            <slot name="form" :autoSend="autoSend"
                  :method="method"
                  :options="table.option"
                  :title="title"
                  :url="url"
                  :modelValue="editedItem"
                  :ok="ok">
                <r-form-creator :autoSend="autoSend"
                                :method="method"
                                :options="table.option"
                                :title="title"
                                :url="url"
                                :modelValue="editedItem"
                                @ok="ok"
                ></r-form-creator>
            </slot>
        </r-modal>
        <r-modal v-model="showCopy" bottom full-width>
            <div class="pa-3">
                <div :key="key" class="mb-5"
                     v-for="(item,key) in table.option">
                    <template v-if="item['formInput']!==false">

                        <r-json-input v-if="item['type']==='file-uploader'" baseArray :label="$t(key,'renusify')"
                                      v-model="copyItem['d'][key]"></r-json-input>
                        <component
                            v-else
                            :is="item['type']"
                            :label="$t(key,'renusify')"
                            v-model="copyItem['d'][key]"
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
        <manage-header v-model="search" @update:modelValue="searching()"
                       :header-table="table.headers"
                       :mcud="showMCUD"
                       :advance-search="advanceSearch" :disable-add="disableAdd" :new-item="newItem"
                       :loading="loading"
                       @delete="deleteAll()"
                       @copy="copyHandle('copy')"
                       @edit="copyHandle('edit')"
                       @a-search="(a_search=$event),(searching())"></manage-header>
        <r-table :responsive="responsive" transition="table-row" :headers="headerTable" :items="table.data"
                 key-item="_id">
            <template v-slot:header="{header}">
                <th :class="{
              'header-sortable':$helper.ifHas(item, true, 'option', 'sortable')
              }"
                    :key="`th-${key}`"
                    @click.stop="sortSetup(item)"
                    v-for="(item,key) in header">
                    <div v-if="item.option.type==='mcud'">
                        <input
                            class="table-checkbox"
                            v-model="check_all"
                            type="checkbox">
                    </div>
                    <div v-else class="d-flex v-end">
                        <div class="w-90"><span>{{ item.text }}</span></div>
                        <div class="w-10 icon-holder" :class="{
            'icon-hidden': !(sortBy === item.value && sortType !== 0)
            }"
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
                <slot name="row" :table="props" :editItem="editItem" :deleteItem="deleteItem">
                    <td :key="`td-${key2}`"
                        v-for="(value,key2) in props.th">
                        <input v-if="value['option']['type']==='mcud'"
                               class="table-checkbox"
                               v-model="checked[props.item['_id']]"
                               @update:model-value="$event===false?check_all=false:''"
                               :checked="check_all"
                               type="checkbox">
                        <r-btn @click.prevent="props.open(props.key)"
                               icon text v-if="props.show(key2)">
                            <r-icon v-html="props.opened!==props.key?$r.icons.plus:$r.icons.minus"></r-icon>
                        </r-btn>
                        <slot name="cell" :value="value" :item="props.item" :editItem="editItem">
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
                                    :readonly="value['option']['formInput']===false"
                                    :modelValue="props.item[value['value']]"
                                    @update:modelValue="value['option']['formInput']!==false?editItem(props.item,true,value['value']):''"
                                    class="mt-0"
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
                            <r-btn v-if="!disableUpdate" @click.prevent="editItem(props.item)"
                                   class="mx-0 color-success-text" icon text>
                                <r-icon exact v-html="$r.icons.edit"></r-icon>
                            </r-btn>
                            <r-btn v-if="!disableDelete" @click.prevent="deleteItem(props.item)"
                                   class="mx-0 color-error-text" icon text>
                                <r-icon v-html="$r.icons.delete"></r-icon>
                            </r-btn>
                            <r-btn :key="index" @click.prevent="$emit(val.name,props.item)" class="mx-0" icon text
                                   v-for="(val,index) in actions" :class="`color-${val.color}-text`">
                                <r-icon exact v-html="val.icon"></r-icon>
                            </r-btn>
                        </div>
                    </td>
                </slot>
            </template>

        </r-table>
        <manage-footer v-model:page="page" v-model:per-page="itemsPerPage" :total="table.total"></manage-footer>
        <r-confirm
            hard
            v-model="showConfirm"
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
            import("./header")
        ), ManageFooter: defineAsyncComponent(() =>
            import("./footer")
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

        disableAdd: Boolean,
        advanceSearch: {type: Boolean, default: true},
        disableDelete: Boolean,
        disableUpdate: Boolean,
        mcud: String,
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
                            if (item._id === k) {
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
                    res.push(item._id)
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

            this.setup('/' + this.link, params)
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
            this.url = this.link + '/' + item._id
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
            this.deleted = item._id
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
