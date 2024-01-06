<template>
  <transition name="slide-up">
    <ul :class="classes" v-if="genItems.length>0">
      <li
        :key="key"
        v-for="(item,key) in genItems">

        <r-breadcrumb-item :href="item.href"
                           :item="item"
                           :to="item.to"
                           @click.prevent="go(item)"></r-breadcrumb-item>
      </li>
    </ul>
  </transition>
</template>

<script>
import './style.scss'
import RBreadcrumbItem from "./bredcrumbItem";

export default {
  name: 'r-breadcrumbs',
  components: {RBreadcrumbItem},
  props: {
    sheet: {
      type: Boolean,
      default: true
    },
    divider: {
      type: String
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  emits:['click'],
  computed: {
    classes() {
      let a = {}
      a[`breadcrumbs-sheet`] = this.sheet
      a[`${this.$r.prefix}breadcrumbs`] = true
      return a
    },
    genItems () {
      const lists = []
      const lng=this.items.length
      for (let i = 0; i < lng; i++) {
        if (i !== 0) {
          lists.push({ name: this.divider||this.$r.icons.chevron_right, type: 'divider' })
        }
        let c = {}
        c = this.items[i]
        c.type = 'item'

        if (i === (this.items.length - 1)) {
          c.disabled = true
        } else {
          c.disabled = false
        }
        lists.push(c)
      }

      return lists
    }
  },
  methods: {
    go (key) {
      this.$emit('click', key)
    }
  }
}
</script>
