<template>
    <r-container class="container-fluid">
        <r-row>
            <r-col class="pa-0">
                <div :style="{'max-height': height,'height': height,}"
                     v-scroll="onScroll"
                     ref="chat"
                     class="infinite-container">
                    <transition-group :name="isChat?'slide-up':'slide-down'"
                                      :class="{'flex-column-reverse':isChat}"
                                      tag="div" class="row no-gutters">
                        <r-col class="col-12" v-for="(item,i) in datacollection" :key="item._id||i">
                            <slot v-bind:item="item">{{item}}</slot>
                        </r-col>
                        <r-col class="col-12" key="loading">
                          <r-progress-line color="color-two"
                                           v-show="loading"></r-progress-line>
                        </r-col>
                    </transition-group>
                </div>

            </r-col>
            <r-col class="col-12 text-center title"
                   v-if="noItem"
            >{{$t('no_item','renusify')}}
            </r-col>
        </r-row>
    </r-container>
</template>

<script>

export default {
        name: 'r-infinite-div',
        props: {
            isChat: Boolean,
            height: {
                default: '400px',
                type: String
            },
            url: {
                required: true,
                type: String
            },
            query: {
                type: Object
            },
            live: Boolean,
            liveTimer: {
                default: 10000,
                type: Number
            },
        },
        data() {
            return {
                datacollection: [],
                page: 1,
                loading: false,
                total: 0,
                set: null,
                noItem: false,
                id: null,
                first: true,
                active: true,
            }
        },
        mounted() {
            this.get(this.live)
        },
        watch: {
            live: function () {
                clearInterval(this.id)
                if (this.live) {
                    this.get(true)
                }
            }
        },
        methods: {
            onScroll(e) {
                let offset = 0
                if (this.isChat) {
                    offset = e.target.scrollTop
                } else {
                    offset = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
                }
                if (offset < 200) {
                    if (!this.loading) {
                        if (this.datacollection.length < this.total) {
                            this.page++
                            this.get()
                        }
                    }
                }
            },
            get(live = false) {
              clearInterval(this.id)
              if (!this.active) {
                return
              }
              this.loading = true
              this.noItem = false
              let end = true
              let par = {'page': this.page}

              if (live === true) {
                par = {'page': 1}
                end = false
              }
              if (this.query) {
                Object.assign(par, this.query)

              }
              this.$axios.get(this.url, {params: par}).then(
                  (res) => {
                    this.push(res.data.data, end)
                    this.total = res.data.total
                    if (this.total === 0) {
                      this.noItem = true
                    }
                    this.loading = false
                  }, () => {
                    this.loading = false
                  })
                if (live&&this.live) {
                    this.id = setInterval(() => {
                        this.get(true)
                    }, this.liveTimer)
                }
            },
            push(data, end = false) {
                let el = this.$refs.chat
                let can = false
                if (this.isChat) {
                    can = el.scrollHeight <= el.scrollTop + el.clientHeight
                } else {
                    can = el.scrollTop === 0
                }
                if (!end) {
                    let d = data
                    const lng=this.datacollection.length
                    for (let key = 0; key < lng; key++) {
                        if (key <= data.length) {
                            if (this.$helper.searchArray(d, '_id', this.datacollection[key]['_id']) === false) {
                                d.push(this.datacollection[key])
                            }
                        } else {
                            d.push(this.datacollection[key])
                        }
                    }
                    this.datacollection = d
                } else {
                    let d = this.datacollection
                    const lng=data.length
                    for (let key = 0; key < lng; key++) {
                        if (this.$helper.searchArray(d, '_id', data[key]['_id']) === false) {
                            d.push(data[key])
                        }
                    }
                    this.datacollection = d
                }

                setTimeout(() => {
                    if (this.isChat) {
                        if (this.first || can) {
                            el.scrollTop = el.scrollHeight;
                            this.first = false
                        }
                    } else if (can) {
                        el.scrollTop = 0;
                    }

                }, 0)
            }
        },
        activated() {
            this.active = true
        },
        deactivated() {
            this.active = false
        },
        unmounted() {
            this.active = false
            clearInterval(this.id)
        }
    }
</script>
<style lang="scss">
    .infinite-container {
        width: 100%;
        overflow-x: hidden;
    }
</style>
