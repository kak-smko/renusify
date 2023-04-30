<template>
    <div class="infinite-page">
        <div class="infinite-page-container" v-scroll="onScroll">
            <slot :items="datacollection"></slot>
        </div>
        <r-progress-line color="color-two"
                         v-show="loading"

        ></r-progress-line>
        <div class="text-center subtitle-1"
             v-if="noItem"
        >{{noItemMsg}}
        </div>
    </div>
</template>

<script>

export default {
        name: 'r-infinite-page',
        props: {
            url: {
                required: true,
                type: String
            },
            query: {
                type: Object
            },
            noItemMsg: {
                type: String,
                default: 'ITEMS NOT FOUND'
            },
            distanceLoad: {
                type: Number,
                default: 150
            }
        },
        data() {
            return {
                datacollection: [],
                page: 1,
                active: true,
                loading: false,
                total: 0,
                set: null,
                noItem: false
            }
        },
        created() {
            this.get()
        },
        activated() {
            this.active = true
        },
        deactivated() {
            this.active = false
        },
        methods: {
            onScroll(e) {
                if (this.active && document.body.offsetHeight < ((window.innerHeight + window.scrollY) + this.distanceLoad).valueOf()) {
                    if (!this.loading) {
                        this.page++
                        if (this.datacollection.length < this.total) {
                            this.get()
                        }
                    }
                }

            },
            get() {
                this.$helper.log('infinite page get')
                this.loading = true
                this.noItem = false
                let par = {'page' :this.page}
                if (typeof this.query==='object') {
                    Object.assign(par,{},this.query)
                }
                this.$axios.get(this.url,{params:par}).then(
                    (res) => {
                        this.push(res.data.data)
                        this.total = res.data.total
                        if (this.total === 0) {
                            this.noItem = true
                        }
                        this.loading = false
                    }, () => {
                        this.loading = false
                    })
            },
            push(data) {
                const lng=data.length
                for (let key = 0; key < lng; key++) {
                    this.datacollection.push(data[key])
                }
            }
        },
    }
</script>
<style>
    .infinite-page {
        margin-bottom: 100px;
        width: 100%
    }
</style>
