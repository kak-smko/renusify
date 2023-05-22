<template>
    <div class="manage-footer">
        <r-container class="container-fluid">
            <r-row class="v-baseline h-end">
                <r-col class="col-auto">
                    <r-select-input class="per-page" open-to-top :items="[
                      {name: '10', value: 10},
                      {name: '20', value: 20},
                      {name: '50', value: 50},
                      {name: '100', value: 100},
                      {name: '200', value: 200},
              ]"
                                    disable-search
                                    @update:modelValue="perPageE"
                                    :modelValue="perPage"></r-select-input>
                </r-col>
                <r-col class="col-auto ms-1">{{totalSetup}}</r-col>
                <r-col class="col-auto">
                    <div class="btn-page">
                        <r-btn :disabled="page===1" @click.prevent="pageBtn('prev')" class="btn-shaped"
                               icon
                               text>
                            <r-icon v-html="this.$r.icons.chevron_left"></r-icon>

                        </r-btn>
                      <input name="input-page" type="text" :value="page" @input="pageN" class="input-page text-center">
                        <r-btn :disabled="endPage" @click.prevent="pageBtn('next')" class="btn-shaped"
                               icon
                               text>
                            <r-icon v-html="this.$r.icons.chevron_right"></r-icon>

                        </r-btn>
                    </div>
                </r-col>
            </r-row>
        </r-container>
    </div>
</template>
<script>
    export default {
        name: 'manageFooter',
        props: {
            page: {type: Number, default: 1},
            total: {},
            perPage: {
                type: Object, default: () => {
                    return {name: '10', value: 10}
                }
            }
        },
        emits: ['update:per-page', 'update:page'],
        computed: {
            totalSetup() {
                let to = this.page * this.perPage.value
                const from = to - this.perPage.value
                if (to > this.total) {
                    to = this.total
                }
                return this.$t(['from_to_manage', [from, to, this.total]], 'renusify')
            },
            endPage() {
                let to = this.page * this.perPage.value
                if (to > this.total) {
                    to = this.total
                }

                return to === this.total
            }
        },
        methods: {
            perPageE(e) {
                this.$emit('update:per-page', e)
            },
            pageN(e) {
                e = parseInt(e.target.value)
                if (e < 1) {
                    e = 1
                }
                this.$emit('update:page', e)
            },
            pageBtn(v) {
                if (v === 'prev') {
                    this.$emit('update:page', this.page - 1)
                } else {
                    this.$emit('update:page', this.page + 1)
                }
            },
        }
    }
</script>