<script>
import {createApp} from 'vue'
    export default {
        name: 'r-frame',
        props: {
            head: String
        },
        render(h) {
            return h('iframe', {
                on: {load: this.renderChildren}
            })
        },
        beforeUpdate() {
            const head = this.$el.contentDocument.head
            head.innerHTML = this.head
            this.iApp.children = Object.freeze(this.$slots.default)
        },
        methods: {
            renderChildren() {
                const children = this.$slots.default
                const body = this.$el.contentDocument.body
                const el = document.createElement('DIV')
                body.appendChild(el)
                const iApp = createApp({
                    name: 'iApp',
                    data: function () {
                        return {children: Object.freeze(children)};
                    },
                    render(h) {
                        return h('div', this.children)
                    }
                })

                iApp.$mount(el)

                this.iApp = iApp
            }
        }
    }
</script>
<style>
    iframe {
        width: 100%;
    }
</style>
