<template>
    <div class="sheet sheet-tile">
        <r-container class="container-fluid">
            <r-row class="h-start h-space-between">
                <r-col class="col-auto">
                    <r-btn @click.prevent="newItem"
                           v-if="!disableAdd"
                           class="color-success-text"
                           outlined
                           rounded>{{$t('new','renusify')}}
                    </r-btn>
                </r-col>
                <r-col class="col-auto">
                    <template v-if="mcud">
                        <r-btn icon class="color-error mx-1" @click="showConfirm=true">
                            <r-icon v-html="$r.icons.delete"></r-icon>
                        </r-btn>
                        <r-btn icon class="color-success mx-1" @click.prevent="$emit('copy',true)">
                            <r-icon v-html="$r.icons.copy"></r-icon>
                        </r-btn>
                        <r-btn icon class="color-info mx-1" @click.prevent="$emit('edit',true)">
                            <r-icon v-html="$r.icons.edit"></r-icon>
                        </r-btn>
                    </template>
                    <r-btn @click.prevent="open"
                           v-if="advanceSearch"
                           :class="{'color-info':!show,'color-error':show}"
                           rounded>{{$t(!show?'advance_search':'search','renusify')}}
                    </r-btn>
                </r-col>
                <r-col v-if="!show" class="col-12">
                    <r-text-input :label="$t('search','renusify')"
                                  @update:modelValue="$emit('update:model-value',$event)"
                                  :model-value="search"></r-text-input>
                </r-col>
                <r-col v-else class="col-12">
                    <r-container class="pa-0" full-width>
                    <r-select :model-value="select" :items="header" text="text"
                              :label="$t('add','renusify')" @update:model-value="add"></r-select>
                        <r-divider class="my-3"></r-divider>
                    <template v-for="(item,i) in inputs" :key="i">
                        <r-row class="v-baseline" v-if="['text-input','text-area'].includes(item.option.type)">
                            <r-col class="col-5 md-3">
                            <r-select v-model="item.advance.action"
                                      :items="[
                                          {name:$t('advance_search_like','renusify'),value:'r'},
                                          {name:$t('advance_search_not_like','renusify'),value:'nr'},
                                          {name:$t('advance_search_equal','renusify'),value:'e'},
                                          {name:$t('advance_search_not_equal','renusify'),value:'ne'},
                                          {name:$t('advance_search_id','renusify'),value:'_id'}
                                          ]"
                                      justValue
                                      firstSelect
                                      :label="$t('advance_search_operator','renusify')"></r-select>
                                </r-col>
                            <r-col class="col-6 md-8">
                              <r-text-input v-model="item.advance.search" :label="item.text"></r-text-input>
                                </r-col>
                            <r-col class="col-1">
                                <r-btn class="color-error" icon @click.prevent="del(i)">
                                    <r-icon v-html="$r.icons.delete"></r-icon>
                                </r-btn>
                            </r-col>
                        </r-row>
                        <r-row class="v-baseline" v-else-if="'number'===item.option.type">
                            <r-col class="col-6 md-3">
                              <r-select v-model="item.advance.action"
                                        :items="[
                                          {name:$t('advance_search_equal','renusify'),value:'e'},
                                          {name:$t('advance_search_not_equal','renusify'),value:'ne'},
                                          {name:$t('advance_search_gt','renusify'),value:'gt'},
                                      {name:$t('advance_search_gte','renusify'),value:'gte'},
                                      {name:$t('advance_search_lt','renusify'),value:'lt'},
                                      {name:$t('advance_search_lte','renusify'),value:'lte'}]"
                                        firstSelect
                                        justValue
                                        :label="$t('advance_search_operator','renusify')"></r-select>
                                </r-col>
                            <r-col class="col-6 md-8">
                              <r-number v-model="item.advance.search" :label="item.text"></r-number>
                            </r-col>
                            <r-col class="col-1">
                                <r-btn class="color-error" icon @click.prevent="del(i)">
                                    <r-icon  v-html="$r.icons.delete"></r-icon>
                                </r-btn>
                            </r-col>
                        </r-row>
                        <r-row class="v-baseline" v-else-if="'switch'===item.option.type">
                            <r-col class="col-5 md-3">
                              <r-select v-model="item.advance.action"
                                        :items="[
                                          {name:$t('advance_search_equal','renusify'),value:'e'}
                                          ]"
                                        justValue
                                        firstSelect
                                        :label="$t('advance_search_operator','renusify')"></r-select>
                                </r-col>
                            <r-col class="col-6 md-8">
                              <r-switch v-model="item.advance.search" :label="item.text"></r-switch>
                            </r-col>
                            <r-col class="col-1">
                                <r-btn class="color-error" icon @click.prevent="del(i)">
                                    <r-icon  v-html="$r.icons.delete"></r-icon>
                                </r-btn>
                            </r-col>
                        </r-row>
                        <r-row class="v-baseline" v-else-if="'select'===item.option.type">
                            <r-col class="col-5 md-3">
                              <r-select v-model="item.advance.action"
                                        :items="[
                                          {name:$t('advance_search_in','renusify'),value:'in'},
                                          {name:$t('advance_search_not_in','renusify'),value:'nin'}
                                          ]"
                                        justValue
                                        firstSelect
                                        :label="$t('advance_search_operator','renusify')"></r-select>
                            </r-col>
                          <r-col class="col-6 md-8">
                            <r-select v-model="item.advance.search" :label="item.text" :items="item.option.items"
                                      multiple tags></r-select>
                          </r-col>
                          <r-col class="col-1">
                            <r-btn class="color-error" icon @click.prevent="del(i)">
                              <r-icon v-html="$r.icons.delete"></r-icon>
                            </r-btn>
                          </r-col>
                        </r-row>
                      <r-row class="v-baseline" v-else-if="['date-picker','time-ago'].includes(item.option.type)">
                        <r-col class="col-5 md-3" :a="item.advance.t='date'">
                          <r-select v-model="item.advance.action"
                                    :items="[
                                         {name:$t('advance_search_gt','renusify'),value:'gt'},
                                      {name:$t('advance_search_gte','renusify'),value:'gte'},
                                      {name:$t('advance_search_lt','renusify'),value:'lt'},
                                      {name:$t('advance_search_lte','renusify'),value:'lte'}
                                          ]"
                                    justValue
                                    firstSelect
                                    :label="$t('advance_search_operator','renusify')"></r-select>
                        </r-col>
                        <r-col class="col-6 md-8">
                          <r-date-picker with-time v-model="item.advance.search" :label="item.text"></r-date-picker>
                        </r-col>
                        <r-col class="col-1">
                          <r-btn class="color-error" icon @click.prevent="del(i)">
                            <r-icon v-html="$r.icons.delete"></r-icon>
                          </r-btn>
                        </r-col>
                      </r-row>
                    </template>
                        <r-btn block rounded class="color-info" :loading="loading" @click.prevent="send">{{$t('search','renusify')}}</r-btn>
                        </r-container>
                </r-col>
            </r-row>
        </r-container>
        <r-progress-liner color="color-two" v-if="loading"></r-progress-liner>
        <r-confirm
                hard
                v-model="showConfirm"
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
            search: String
        },
        data() {
            return {
                show: false,
                showConfirm: false,
                select: [],
                inputs: []
            }
        },
        methods: {
            accept(){
              this.$emit('delete',true)
                this.showConfirm=false
            },
            send() {
              this.$emit('update:model-value', '')
              let r = []
              this.inputs.forEach((item) => {
                r.push({'name': item.value, 'advance': item.advance})
              })
              this.$emit('a-search', r)
            },
            del(i){
                this.inputs.splice(i,1)
            },
            open(){
              this.show=!this.show
            },
            add($event) {
              this.inputs.push($event)
              $event.advance = {}
                if($event.option.type==='switch'){
                  $event.advance.search = false
                }
                this.select = []
            }
        },
        computed: {
            header() {
                let res = []
                this.headerTable.forEach((item) => {
                  if (['text-input', 'text-area', 'number', 'switch', 'select', 'date-picker', 'time-ago'].includes(item.option.type)) {
                    res.push(item)
                  }
                })
                return res
            }
        }
    }
</script>