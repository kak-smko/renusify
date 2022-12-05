<template>
    <div :class="`${this.$r.prefix}highlight-html`" v-html="build"></div>
</template>
<script>
    export default {
        name: 'highlightHtml',
        props: {
            code: String,
            runnable: Boolean
        },
        data() {
            return {}
        },
        computed: {
            build() {
                let data = this.code.split('')
                let res = ''
                let in_quta = false
                data.forEach((c, i) => {
                    if (c === '=') {
                        res += '<span class="color-blue">=</span>'
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

                res = this.$helper.replacer(res, '&lt;', '<span class="color-orange">&lt;')
                res = this.$helper.replacer(res, '&gt;', '&gt;</span>')
                res = this.$helper.replacer(res, '{{', '<span class="color-blue">{{')
                res = this.$helper.replacer(res, '}}', '}}</span>')
                res = this.$helper.replacer(res, '$r.', '<span class="color-blue">$r.</span>')
                let regex = /\+(.*?)\+/g
                let matched = res.matchAll(regex)
                for (const match of matched) {
                    res = this.$helper.replacer(res, match[0], ' <span class="color-blue">' + match[0] + '</span>')
                }
                return (this.runnable ? '<span class="color-green">&lt;template&gt;</span>' : '') + res + (this.runnable ? '\n<span class="color-green">&lt;/template&gt;</span>' : '')
            }
        }
    }
</script>
<style lang="scss">
    @import "../../style/include";

    .#{$prefix}highlight-html {
        white-space: break-spaces;

        .color-green {
            color: #0cde27;
        }

        .color-orange {
            color: orange;
        }

        .color-blue {
            color: #7ad5ff;
        }
    }
</style>
