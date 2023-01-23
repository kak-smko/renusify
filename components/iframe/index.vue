<script>
import {createApp, h} from 'vue'
import renusify from "renusify";

export default {
  name: 'r-frame',
  props: {
    head: String,
    plugins: Array,
    renusifyConfig: {
      type: Object,
      default: () => {
        return {
          prefix: "sm-",
          lang: "en",
          package: 'renusify',
          directives: []
        }
      }
    }
  },
  render() {
    return h('iframe', {
      onLoad: this.renderChildren
    })
  },
  beforeUpdate() {
    const head = this.$el.contentDocument.head
    head.innerHTML = this.head
    this.iApp.children = this.$slots.default()
  },
  methods: {
    renderChildren() {
      const children = this.$slots.default()
      const head = this.$el.contentDocument.head
      head.innerHTML = this.head
      const body = this.$el.contentDocument.body
      const el = document.createElement('DIV')
      body.appendChild(el)
      const iApp = createApp({
        name: 'iApp',
        data: function () {
          return {children: children};
        },
        render() {
          return h('div', this.children)
        }
      })
      if (this.plugins) {
        this.plugins.forEach((item) => {
          iApp.use(item)
        })
      }
      iApp.use(renusify, this.renusifyConfig)
      iApp.mount(el)

      this.iApp = iApp
    }
  }
}
</script>
<style>
iframe {
  width: 100%;
  height: 100%;
}
</style>
