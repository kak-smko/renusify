<template>
    <div :class="`${$r.prefix}highlight-script`" v-html="build"></div>
</template>
<script>
    export default {
        name: 'highlightScript',
        props: {
            code: String,
            runnable:Boolean
        },
        data() {
            return {}
        },
        computed: {
            build() {
                let data = this.code.split('')
                let str = this.code.trim()
                if (str.substr(0, 1) === '{') {
                    str = str.substr(1, str.length - 2)
                }
                let res = this.runnable?'<span class="color-orange">&lt;script&gt;\n export default{</span>':''
                let in_quta = false

                data.forEach((c, i) => {
                    if (['=', '$', '&', '{', '}', '(', ')', '<', '>'].includes(c)) {
                        res += '<span class="color-blue">' + c + '</span>'
                    } else if ([',', ';', ':'].includes(c)) {
                        res += '<span class="color-orange">' + c + '</span>'
                    } else if (parseInt(c) > -1) {
                        res += '<span class="color-number">' + c + '</span>'
                    } else if ((c === '"' || c === "'") && !in_quta) {
                        in_quta = c
                        res += '<span class="color-green">' + c
                    } else if (c === in_quta) {
                        in_quta = false
                        res += c + '</span>'
                    } else {
                        res += c
                    }
                })
                res += this.runnable?'\n<span class="color-orange">}\n&lt;/script&gt;</span>':''
                res = this.$helper.replacer(res, ' var ', ' <span class="color-orange">var</span> ')
                res = this.$helper.replacer(res, '<span class="color-blue">$</span>r.', '<span class="color-blue">$r.</span>')
                res = this.$helper.replacer(res, ' let ', ' <span class="color-orange">let</span> ')
                res = this.$helper.replacer(res, ' const ', ' <span class="color-orange">const</span> ')
                res = this.$helper.replacer(res, ' return ', ' <span class="color-orange">return</span> ')
                res = this.$helper.replacer(res, ' this.', ' <span class="color-orange">this.</span>')
                let regex = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)|(\<![\-\-\s\w\>\/]*\>)/g
                let matched = res.matchAll(regex)
                for (const match of matched) {
                    res = this.$helper.replacer(res, match[0], ' <span class="color-comment">' + match[0] + '</span>')
                }

                this.strToObj(str).forEach((item)=>{
                    res = this.$helper.replacer(res, item, ' <span class="color-purple">'+item+'</span>')
                })

                return res
            }
        },
        methods: {
            strToObj(str) {
                str = this.$helper.replacer(str, ' ', '')
                str = this.$helper.replacer(str, "\n", '')
                str = this.$helper.replacer(str, "\r", '')
                let open = 0
                let pre = 0
                let to = 0
                let items = []
                const s = str
                s.split('').forEach((c, i) => {
                    to++
                    if (c === '{') {
                        open++
                    }
                    if (c === '}') {
                        open--
                    }
                    if (open === 0 && c === ',') {
                        let new_str = str.substr(pre, to - 1)
                        const o = new_str.indexOf(':')
                        const f = new_str.indexOf('(')
                        if ((f > 0 && f < o) || o < 0) {
                            new_str = new_str.substr(0, f)
                        } else {
                            new_str = new_str.substr(0, o)
                        }
                        items.push(new_str)
                        pre = i + 1
                        to = 0
                    }
                })
                let new_str = str.substr(pre, str.length)
                const o = new_str.indexOf(':')
                const f = new_str.indexOf('(')
                if ((f > 0 && f < o) || o < 0) {
                    new_str = new_str.substr(0, f)
                } else {
                    new_str = new_str.substr(0, o)
                }
                items.push(new_str)
                return items
            },
        }
    }
</script>
<style lang="scss">
    @import "../../style/include";

    .#{$prefix}highlight-script {
        .color-green {
            color: #0cde27;
        }

        .color-orange {
            color: orange;
        }

        .color-blue {
            color: #0c9ddc;
        }

        .color-number {
            color: #7ad5ff;
        }
        .color-purple {
            color: #d2a8ee;
        }

        .color-comment{
            color: #898d8c;
        }
    }
</style>
