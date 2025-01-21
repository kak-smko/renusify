<template>
  <div>
    <r-container class="container-fluid pa-0 mb-3">
      <r-row class="h-start h-space-between" no-gutter>
        <r-col class="col-auto">
          <r-btn v-if="!disableAdd"
                 class="color-success-text"
                 outlined
                 rounded
                 @click.prevent="newItem">{{ $t('new', 'renusify') }}
          </r-btn>
        </r-col>
        <r-col class="col-auto">
          <template v-if="mcud">
            <r-btn class="color-error mx-1" icon @click.prevent="showConfirm=true">
              <r-icon v-html="$r.icons.delete"></r-icon>
            </r-btn>
            <r-btn class="color-success mx-1" icon @click.prevent="$emit('copy',true)">
              <r-icon v-html="$r.icons.copy"></r-icon>
            </r-btn>
            <r-btn class="color-info mx-1" icon @click.prevent="$emit('edit',true)">
              <r-icon v-html="$r.icons.edit"></r-icon>
            </r-btn>
          </template>
          <r-btn v-if="advanceSearch"
                 :class="{'color-info':!show,'color-error':show}"
                 rounded
                 @click.prevent="open">{{ $t(!show ? 'advance_search' : 'search', 'renusify') }}
          </r-btn>
        </r-col>
        <r-col v-if="!show" class="col-12">
          <r-text-input :label="$t('search','renusify')"
                        :model-value="modelValue"
                        @update:modelValue="$emit('update:modelValue',$event)"></r-text-input>
        </r-col>
        <r-col v-else class="col-12">
          <r-container class="pa-0" full-width>
            <r-json-input v-model="advance"
                          :label="$t('search','renusify')">
              <template v-slot="{info,add}">
                <r-select-input v-model="info.key"
                                :items="headers[0]"
                                :label="$t('name','renusify')"
                                just-value></r-select-input>

                <r-select-input v-if="info.key" :key="info.key" v-model="info.action" style="min-width: 30px"
                                :items="[
                                          {name:$t('advance_search_equal','renusify'),value:'e'},
                                          {name:$t('advance_search_not_equal','renusify'),value:'ne'},
                                          {name:$t('advance_search_gt','renusify'),value:'gt'},
                                          {name:$t('advance_search_lt','renusify'),value:'lt'}]"
                                :label="$t('advance_search_operator','renusify')"
                                disableSearch
                                firstSelect
                                justValue></r-select-input>

                <div v-if="info.key" :key="info.key">
                  <component :is="headers[1][info.key].type" v-if="headers[1][info.key].type"
                             v-model="info.value"
                             :label="$t('search','renusify')"
                             v-bind="headers[1][info.key].props"></component>
                </div>
                <r-btn :rounded="!$r.inputs.tile" class="ms-1 color-success" @click.prevent="added(info,add)">
                  {{ $t('add', 'renusify') }}
                </r-btn>
              </template>
            </r-json-input>

            <r-btn :disabled="!advance" :loading="loading" block class="color-info mt-2" rounded @click.prevent="send">
              {{ $t('search', 'renusify') }}
            </r-btn>
          </r-container>
        </r-col>
      </r-row>
    </r-container>
    <r-progress-line v-if="loading" color="color-one"></r-progress-line>
    <r-confirm
        v-model="showConfirm"
        hard
        v-on:accept="accept"
        v-on:cancel="showConfirm = false"
    />
  </div>
</template>
<script>
export default {
  name: 'manageHeader',
  props: {
    headerTable: Object,
    loading: Boolean,
    disableAdd: Boolean,
    advanceSearch: Boolean,
    mcud: Boolean,
    newItem: Function,
    modelValue: String
  },
  emits: ['update:modelValue', 'copy', 'edit', 'delete', 'a-search'],
  data() {
    return {
      show: false,
      showConfirm: false,
      advance: null
    }
  },
  computed: {
    headers() {
      let r = []
      let r2 = {}
      for (let i = 0; i < this.headerTable.length; i++) {
        r.push({'name': this.$t(this.headerTable[i].text), 'value': this.headerTable[i].value})
        r2[this.headerTable[i].value] = this.headerTable[i].option
        if (this.headerTable[i].option.type === 'r-date-input' || this.headerTable[i].option.type === 'r-time-ago') {
          r2[this.headerTable[i].value]['withTime'] = true
        }
      }
      return [r, r2]
    }
  },
  methods: {
    added(info, add) {
      let item = this.headers[1][info.key]
      if (info.key === '_id' || item.is_object_id === true) {
        info.value = {'$oid': info.value}
      } else if (item.is_object_id) {
        info.value[item.is_object_id] = {'$oid': info.value[item.is_object_id]}
      } else if (item.type === 'r-date-input' || item.type === 'r-time-ago') {
        if (info.action === 'eq') {
          info.value = {'$date': info.value}
        } else if (info.action === 'ne') {
          info.value = {'$ne': {'$date': info.value}}
        } else if (info.action === 'gt') {
          info.value = {'$gt': {'$date': info.value}}
        } else if (info.action === 'lt') {
          info.value = {'$lt': {'$date': info.value}}
        }
      } else {
        if (info.action === 'ne') {
          info.value = {'$ne': info.value}
        } else if (info.action === 'gt') {
          info.value = {'$gt': info.value}
        } else if (info.action === 'lt') {
          info.value = {'$lt': info.value}
        }
      }
      add()
    },
    accept() {
      this.$emit('delete', true)
      this.showConfirm = false
    },
    send() {
      this.$emit('update:modelValue', '')
      this.$emit('a-search', this.advance)
    },
    open() {
      this.show = !this.show
    },
  }
}
</script>
