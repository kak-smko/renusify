export const toolbar= {
    props: {
            menu: {
                type: Array,
                default: () => {
                    return []
                }
            },
            logo: String,
            logoW: {type: Number, default: 180},
            logoH: {type: Number, default: 60},
            search: String,
            searchLabel: {type:String,default:'search'},
            fixed: Boolean,
            flat: Boolean,
            sticky: Boolean,
            tile: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                open: false
            }
        },
        watch: {
            '$route': function () {
                this.open = false
            }
        },
        computed: {
            classes() {
                let a = {
                    'toolbar-fixed': this.fixed,
                    'toolbar-sticky': this.sticky,
                    'elevation-md': !this.flat
                }
                a[this.$r.prefix + 'toolbar'] = true
                a['sheet'] = true
                a['sheet-tile'] = this.tile
                return a
            }
        }
}