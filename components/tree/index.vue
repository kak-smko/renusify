<template>
  <r-container ref="treeRef" :class="classes" full-width>
    <r-row v-if="searchLink">
      <r-col>
        <r-select-input
            :label="$t('search','renusify')"
            :model-value="search"
            :searchLink="searchLink"
            @update:model-value="change($event)"
        ></r-select-input>
      </r-col>
    </r-row>
    <r-float v-if="show" :minZoom="0.01" :zoom="0.7" bordered>
      <template v-slot="{move,ease,transform}">
        <div :class="{
          'tree-rotate':rotate
        }">
          <r-tree-element :expand="expand"
                          :link="link"
                          :model-value="node"
                          :sortBy="sortBy"
                          @expand="handleExpand(ease,move,transform,$event)"
                          @select="handleSelect"
                          @update:model-value="$emit('update:modelValue',$event)"
          >
            <template v-slot="{ item,nodeKey }">
              <!-- Default slot for custom tree node content
              @binding {Object} item - The tree node item
              @binding {String} nodeKey - The key identifier for the node -->
              <slot :item="item" :nodeKey="nodeKey">{{ item }}</slot>
            </template>
          </r-tree-element>
        </div>
      </template>
    </r-float>
  </r-container>
</template>
<script setup>
import {ref, computed, watch, inject} from 'vue'

/**
 * @example // Tree usage
 * <template>
 *   <r-tree style="height:600px" v-model="treeData" :link="link" :searchLink="searchLink" :gen="gen" :selected="selected" :rotate="rotate" :childsName="childsName" :openAll="openAll" :headers="headers" @update:model-Value="log(`update:modelValue`,$event)" @select-node="log(`select-node`,$event)">
 *  <template v-slot="{nodeKey,item}">
 *         <r-card class="pa-5 title-1 mx-1">{{nodeKey}}:{{item.name}}</r-card>
 *       </template>
 * </r-tree>
 *   </template>
 * <script>
 * import { ref } from 'vue'
 *
 * const treeData = ref({
 *   "0": {
 *     "name": "Root",
 *     "childs": {
 *       "1": {
 *         "name": "Child 1",
 *         "childs": {
 *           "3": {
 *             "name": "Grandchild 1",
 *             "childs": {
 *               "4": {
 *                 "name": "Great Grandchild 1",
 *                 "childs": {
 *                   "6": {
 *                     "name": "Level 5 Node 1",
 *                     "childs": {
 *                       "7": {
 *                         "name": "Level 6 Node 1",
 *                         "childs": {},
 *                       },
 *                       "8": {
 *                         "name": "Level 6 Node 2",
 *                         "childs": {},
 *                       }
 *                     },
 *                   }
 *                 },
 *               },
 *               "5": {
 *                 "name": "Great Grandchild 2",
 *                 "childs": {},
 *               }
 *             },
 *           }
 *         },
 *       },
 *       "2": {
 *         "name": "Child 2",
 *         "childs": {},
 *       }
 *     },
 *   }
 * })
 *
 * const link = ref(null)
 * const searchLink = ref(null)
 * const gen = ref("0") // Root node ID
 * const selected = ref(null)
 * const rotate = ref(false)
 * const childsName = ref("childs") // Property name for children
 * const openAll = ref(false)
 * const headers = ref({})
 *
 * const log = (name, event) => {
 *   console.log(name, event)
 * }
 * <//script>
 * */


const props = defineProps({
  /**
   * Tree data model
   * @type {Object}
   */
  modelValue: Object,
  /**
   * API endpoint URL for fetching tree data
   * @type {String}
   */
  link: String,
  /**
   * API endpoint URL for search functionality
   * @type {String}
   */
  searchLink: String,
  /**
   * Property name to sort tree nodes by
   * @type {String}
   * @default 'gen'
   */
  sortBy: {
    type: String,
    default: 'gen'
  },
  /**
   * Initial node identifier to load
   * @type {String}
   */
  gen: String,
  /**
   * Currently selected node identifier
   * @type {String}
   */
  selected: String,
  /**
   * Rotates the tree layout
   * @type {Boolean}
   */
  rotate: Boolean,
  /**
   * Expands all tree nodes by default
   * @type {Boolean}
   * @default false
   */
  expand: {
    type: Boolean,
    default: false
  },
  /**
   * Property name for child nodes in tree data
   * @type {String}
   * @default 'childs'
   */
  childsName: {
    type: String,
    default: 'childs'
  },
  /**
   * Additional headers for API requests
   * @type {Object}
   */
  headers: Object
})

const emit = defineEmits([
  /**
   * Emitted when tree data changes
   * @param {Object} data - Updated tree data
   */
  'update:modelValue',
  /**
   * Emitted when a tree node is selected
   * @param {Object} node - Selected node data
   */
  'select-node'
])

const {$r} = inject('renusify')
const $axios = inject('axios')

const show = ref(false)
const search = ref(null)
const nodeParent = ref(props.gen)
const node = ref(props.modelValue)

const treeRef = ref(null)

const classes = computed(() => {
  const a = {'tree-searchable': props.searchLink}
  a[`${$r.prefix}tree`] = true
  return a
})

/**
 * Handles search selection changes
 * @param {Object} e - Selected search item with value property
 */
const change = (e) => {
  if (e && "value" in e) {
    nodeParent.value = e.value
    show.value = false
    get()
  }
}

/**
 * Fetches tree data from the API endpoint
 */
const get = () => {
  $axios.get(props.link + nodeParent.value, {headers: props.headers})
      .then(({data}) => {
        node.value = data
        show.value = true
      })
}

/**
 * Handles tree node expansion with animation
 * @param {Function} ease - Animation easing function
 * @param {Function} move - Move function for positioning
 * @param {Function} transform - Transform function
 * @param {Array} $event - Event data containing node information
 */
const handleExpand = (ease, move, transform, $event) => {
  const el = $event[1].getBoundingClientRect()
  ease()
  const node_info = $event[1].querySelector('.node-info').getBoundingClientRect()
  const card_h = node_info.height
  const card_w = node_info.width
  const parent = treeRef.value.$el
  const bb = treeRef.value.$el.getBoundingClientRect()
  move(parent.offsetWidth / 2 - (el.left - bb.left + ($event[0] ? el.width / 2 : el.width - card_w / 2)),
      parent.offsetHeight / 2 - (el.top - bb.top + (props.rotate ? el.height - card_h : card_h / 2)))
}

/**
 * Handles tree node selection
 * @param {Object} e - Selected node data
 */
const handleSelect = (e) => {
  emit('select-node', e)
}

if (props.modelValue) {
  show.value = true
} else if (props.link) {
  get()
}

// Watchers
watch(() => props.modelValue, (newVal) => {
  node.value = newVal
})

</script>
<style lang="scss">
@use "../../style" as *;

$distance: 20px;
.#{$prefix}tree {
  position: relative;
  width: 100%;
  height: 100%;

  &.tree-searchable {
    .#{$prefix}float {
      height: calc(100% - 70px)
    }
  }

  .#{$prefix}float {
    direction: ltr;
  }

  .tree-rotate {
    transform: rotateX(180deg);

    .node-info {
      transform: rotateX(-180deg);
    }

    .tree-btn-expand {
      transform: rotateX(-180deg);
    }
  }

}
</style>
