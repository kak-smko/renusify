<template>
    <component
            :class="`${item.type==='item'?'breadcrumb-item':'breadcrumb-divider'} ${item.disabled?'breadcrumb-item-disabled':''}`"
            v-bind="att"
            :is="route.tag"
    >
        <r-icon v-if="item.type==='divider'" v-html="item.name"></r-icon>
        <div class="breadcrumbs-title" v-else>{{item.name}}</div>
    </component>
</template>

<script>
import {roots} from '../../tools/rootable.js'

export default {
      name: 'rBreadcrumbItem',
      mixins: [roots],
      props: {
        item: Object
      },
      computed: {
        att() {
          let res = {}
          if (this.href) {
            res['href'] = this.route.data.attrs.href
          }

                if (this.target) {
                    res['rel'] = 'noreferrer'
                    res['target'] = this.route.data.attrs.target
                }
                if (this.to) {
                    res['to'] = this.route.data.props.to
                }
                return res
            },
        }
    }
</script>
