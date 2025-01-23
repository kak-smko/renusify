<template>
  <div ref="nestable" :class="`${$r.prefix}nestable`">
    <div class="nestable-list nestable-group">
      <template v-for="(item, index) in modelValue" :key="index">
        <nestable-item
            :childrenProp="childrenProp"
            :dragItem="dragItem"
            :editable="editable"
            :index="index"
            :item="item"
            :keyProp="keyProp"
            @delete="del"
            @drag-start="dragstart"
            @touch-move="touchmove"
            @mouse-enter="mouseenter"
            @drag-end="onDragEnd"
        >
          <template v-slot="{ item }">
            <slot :item="item">{{ item }}</slot>
          </template>
        </nestable-item>
      </template>
    </div>
    <div v-if="editable" class="d-flex v-end w-full">
      <slot :add="add" :form="form" name="form">
        <div class="pe-1 flex-grow-1">
          <r-text-input v-model="form.title" :label="labelInput"></r-text-input>
        </div>
        <r-btn :disabled="!form.title" class="color-success" icon @click="add">
          <r-icon v-html="$r.icons.plus"></r-icon>
        </r-btn>
      </slot>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import methods from "./methods.js";
import editable from "./editable.js";

export default {
  name: "r-nestable",
  components: {
    NestableItem:defineAsyncComponent(()=>import('./NestableItem.vue')),
  },
  mixins: [methods, editable],
  props: {
    labelInput: String,
    editable: Boolean,
    modelValue: {
      type: Array,
      default: () => [],
    },
    threshold: {
      type: Number,
      default: 30,
    },
    maxDepth: {
      type: Number,
      default: 7,
    },
    keyProp: {
      type: String,
      default: "id",
    },
    childrenProp: {
      type: String,
      default: "children",
    },
  },
  data() {
    return {
      itemsOld: null,
      dragItem: null,
      mouse: {
        last: {x: 0},
        shift: {x: 0},
      },
    };
  },
  mounted() {
    const items = this.listAddChildren(this.modelValue, this.childrenProp);
    this.$emit("update:model-value", items);
  },
  beforeUnmount() {
    this.stopTrackMouse();
  },
};
</script>
<style lang="scss">
@use "../../style/variables/base";

.#{base.$prefix}nestable {
  .nestable-handle {
    cursor: grab;
  }

  .is-dragging {
    cursor: grabbing !important;
  }

  .nestable-drag-item {
    display: none;
  }

  .nestable-item-content {
    display: flex;
  }
}
</style>
