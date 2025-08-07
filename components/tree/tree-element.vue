<template>
  <r-container v-if="show" full-width :class="`${$r.prefix}tree-element px-0`" ref="tree">
    <r-row class="h-center flex-nowrap no-gutters">
      <r-col class="text-center">
        <div class="d-flex h-center mb-1 node-info" @click.prevent="$emit('select',{key:nodeKey,item:node[nodeKey]})">
          <slot :item="node[nodeKey]" :nodeKey="nodeKey"></slot>
        </div>
        <span v-if="size>0||(link &&(node[nodeKey]['childs_total']>0))"
              class="btn-extend"
              :class="{'btn-open':open,'single-child':size===1}">
                <r-btn class="tree-btn-expand"
                       icon
                       :loading="loading"
                       labelClass="color-one"
                       :label="node[nodeKey]['childs_total']"
                       @click.prevent="handleExpand(nodeKey,true)">
                    <r-icon v-if="!open" v-html="$r.icons.plus"></r-icon>
                    <r-icon v-else v-html="$r.icons.minus"></r-icon>
                </r-btn>
                    </span>
      </r-col>
    </r-row>
    <r-row class="h-center flex-nowrap childs-container no-gutters" :class="{'childs-show':open}">
      <r-col class="text-center childLevel mt-6" :class="{'single-child':size===1}" v-for="(child,k) in childs"
             :key="k">
        <r-tree-element @update:model-value="updateNode($event,child['gen'])"
                        :link="link"
                        :model-value="{[child['gen']]:child}"
                        @expand="handleExpand"
                        :expand="expand"
                        :openAll="openAll"
                        :sort-by="sortBy"
                        @select="$emit('select',$event)"
        >
         <template v-slot="{ item,nodeKey }">
            <slot :item="item" :nodeKey="nodeKey" itemscope></slot>
          </template>
        </r-tree-element>
      </r-col>
    </r-row>
  </r-container>
</template>
<script>

export default {
  name: 'r-tree-element',
  props: {
    modelValue: Object,
    link: String,
    parentNode: String,
    sortBy: {
      type: String,
      default: 'gen'
    },
    expand: {
      type: Boolean,
      default: false
    },
    childsName: {
      type: String,
      default: 'childs'
    },
    openAll: Boolean,
    headers: Object
  },
  emits:['update:modelValue','fire','select','expand'],
  data() {
    return {
      back: false,
      show: false,
      loading: false,
      open: this.expand,
    }
  },
  mounted() {
    if (this.modelValue) {
      this.show = true
    }
    if (this.openAll && this.childs.length > 0) {
      this.open = true;
    }
  },
  computed: {
    node() {
      return this.modelValue
    },
    size() {
      return this.childs.length
    },
    childs() {
      let res = []
      if (!this.node || !(this.nodeKey in this.node) || !(this.childsName in this.node[this.nodeKey])) {
        return res
      }
      const childs = this.node[this.nodeKey][this.childsName]

      let s = []
      for (const key in childs) {
        if (this.$helper.hasKey(childs, key)) {
          if (childs[key]['gen'] === undefined) {
            childs[key]['gen'] = key
          }
          s.push({
            'key': key,
            'value': childs[key]
          })
        }
      }
      const sortBy = this.sortBy
      s.sort(function (a, b) {
        if (a['value'][sortBy] !== undefined) {
          if (b['value'][sortBy] !== undefined) {
            if (typeof a['value'][sortBy] === 'number' && typeof b['value'][sortBy] === 'number') {
              return a['value'][sortBy] - b['value'][sortBy];
            } else {
              return String(a['value'][sortBy]).localeCompare(String(b['value'][sortBy]));
            }
          }
          return -1;
        }
        return b['value'][sortBy] !== undefined ? 1 : 0;
      });
      const lng = s.length
      for (let i = 0; i < lng; i++) {
        res.push(s[i]['value'])
      }
      return res
    },
    nodeKey() {
      const keys = Object.keys(this.node)
      if (keys) {
        return keys[0]
      }
      return false
    }
  },
  methods: {
    updateNode(e, key) {
      let res = Object.assign({}, this.modelValue)
      res[this.nodeKey][this.childsName][key] = e[key]
      this.$emit('update:modelValue', this.modelValue)
    },
    handleExpand(e, current) {
      if (current) {
        if (this.link && this.size === 0) {
          this.loading = true
          this.$axios.get(this.link + e, {headers: this.headers})
              .then(({data}) => {
                this.$emit('update:modelValue', data)
                this.open = !this.open
                setTimeout(() => {
                  this.$emit('expand', [this.open, this.$refs.tree.$el])
                }, 220)
                this.loading = false
              }, () => {
                this.loading = false
              })
        } else {
          this.open = !this.open
          setTimeout(() => {
            this.$emit('expand', [this.open, this.$refs.tree.$el])
          }, 250)
        }

      } else {
        this.$emit('expand', e)
      }
    }
  }
}
</script>
<style lang="scss">
@use "../../style/variables/base";

$distance: 20px;
.#{base.$prefix}tree-element {
  direction: ltr;
  position: relative;
  display: table;
  user-select: none;

  .btn-extend {
    position: relative;
    height: 40px;

    &::after {
      transition: .2s all ease-in-out;
      content: "";
      transform: translateY(-$distance*2);
      z-index: -1;
      max-height: 0;
      position: absolute;
      left: 50%;
      right: 50%;
      border-left: 2px solid #ccc;
    }

    &.btn-open.single-child::after {
      transition: .2s all ease-in-out;
      bottom: -$distance*2 - 10px;
      height: $distance*2;
      max-height: $distance*2;
      transform: translateY(0);
    }

    &.btn-open:not(.single-child)::after {
      transition: .2s all ease-in-out;
      bottom: -$distance - 12px;
      height: $distance;
      max-height: $distance;
      transform: translateY(0);
    }
  }

  .childLevel {
    position: relative;

    &:not(.single-child) {
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 100%;
        height: $distance;
        border-top: 2px solid #ccc;
      }

      &:not(:first-child):not(:last-child)::after {
        content: "";
        position: absolute;
        left: 50%;
        right: 50%;
        top: 0;
        height: $distance - 8px;
        border-left: 2px solid #ccc;
      }

      &:first-child::before {
        content: "";
        position: absolute;
        left: 50%;
        right: 0;
        width: 50%;
        border-radius: 8px 0 0 0;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
      }

      &:last-child::before {
        content: "";
        position: absolute;
        right: 50%;
        left: 0;
        width: 50%;
        border-radius: 0 8px 0 0;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
      }
    }
  }

  .childs-container {
    max-width: 0;
    max-height: 0;
    transform: translateY(-30px);
    opacity: .4;
    overflow: hidden;
    transition: 0.2s all ease-in-out;

    &.childs-show {
      opacity: 1;
      max-width: 1000000000vw;
      max-height: 1000000000vh;
      transform: translateY(0);
    }
  }
}
</style>
