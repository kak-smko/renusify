<template>
  <r-container v-if="show" ref="treeRef" :class="`${$r.prefix}tree-element px-0`" full-width>
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
<script setup>
import {ref, computed, inject} from 'vue'

const props = defineProps({
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
    headers: Object
})

const emit = defineEmits(['update:modelValue', 'fire', 'select', 'expand'])

const {$helper} = inject('renusify')
const $axios = inject('axios')

const show = ref(false)
const loading = ref(false)
const open = ref(props.expand)

const treeRef = ref(null)

const node = computed(() => props.modelValue)

const size = computed(() => childs.value.length)

const childs = computed(() => {
  const res = []
  const nodeKeyValue = nodeKey.value

  if (!node.value || !nodeKeyValue || !(nodeKeyValue in node.value) || !(props.childsName in node.value[nodeKeyValue])) {
    return res
  }

  const childs = node.value[nodeKeyValue][props.childsName]
  const s = []

  for (const key in childs) {
    if ($helper.hasKey(childs, key)) {
      if (childs[key]['gen'] === undefined) {
        childs[key]['gen'] = key
      }
      s.push({
        'key': key,
        'value': childs[key]
      })
    }
  }

  const sortBy = props.sortBy
  s.sort(function (a, b) {
    if (a['value'][sortBy] !== undefined) {
      if (b['value'][sortBy] !== undefined) {
        if (typeof a['value'][sortBy] === 'number' && typeof b['value'][sortBy] === 'number') {
          return a['value'][sortBy] - b['value'][sortBy]
        } else {
          return String(a['value'][sortBy]).localeCompare(String(b['value'][sortBy]))
        }
      }
      return -1
    }
    return b['value'][sortBy] !== undefined ? 1 : 0
  })

  const lng = s.length
  for (let i = 0; i < lng; i++) {
    res.push(s[i]['value'])
  }

  return res
})

const nodeKey = computed(() => {
  if (!node.value) return false

  const keys = Object.keys(node.value)
  if (keys.length > 0) {
    return keys[0]
  }

  return false
})

const updateNode = (e, key) => {
  const res = {...props.modelValue}
  res[nodeKey.value][props.childsName][key] = e[key]
  emit('update:modelValue', props.modelValue)
}

const handleExpand = (e, current) => {
  if (current) {
    if (props.link && size.value === 0) {
      loading.value = true
      $axios.get(props.link + e, {headers: props.headers})
          .then(({data}) => {
            emit('update:modelValue', data)
            open.value = !open.value
            setTimeout(() => {
              emit('expand', [open.value, treeRef.value.$el])
            }, 220)
            loading.value = false
          })
          .catch(() => {
            loading.value = false
          })
    } else {
      open.value = !open.value
      setTimeout(() => {
        emit('expand', [open.value, treeRef.value.$el])
      }, 250)
    }
  } else {
    emit('expand', e)
  }
}
if (props.modelValue) {
  show.value = true
}
</script>
<style lang="scss">
@use "../../style" as *;

$distance: 20px;
.#{$prefix}tree-element {
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
