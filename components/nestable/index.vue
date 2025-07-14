<template>
  <div
      ref="nestable"
      :class="`${$r.prefix}nestable`"
      aria-label="Nestable list"
  >
    <div class="nestable-list nestable-group" role="list">
      <template v-for="(item, index) in modelValue" :key="item[keyProp]">
        <nestable-item
            :childrenProp="childrenProp"
            :dragItem="dragItem"
            :editable="editable"
            :index="index"
            :item="item"
            :keyProp="keyProp"
            :maxDepth="maxDepth"
            @delete="del"
            @drag-start="dragstart"
            @touch-move="touchmove"
            @mouse-enter="mouseenter"
            @drag-end="onDragEnd"
        >
          <template v-slot="{ item }">
            <slot :item="item">{{ item.title || `Item ${item[keyProp]}` }}</slot>
          </template>
        </nestable-item>
      </template>


    </div>

    <div v-if="editable" class="d-flex v-end w-full mt-3">
      <slot :add="add" :form="form" name="form">
        <div class="pe-1 flex-grow-1">
          <r-text-input
              ref="inputField"
              v-model="form.title"
              :label="labelInput"
              @keydown.enter="form.title && add()"
          ></r-text-input>
        </div>
        <r-btn
            :aria-label="'Add new item'"
            :disabled="!form.title"
            class="color-success"
            icon
            @click="add"
        >
          <r-icon v-html="$r.icons.plus"></r-icon>
        </r-btn>
      </slot>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent, nextTick} from 'vue'
import methods from "./methods.js";
import editable from "./editable.js";

export default {
  name: "r-nestable",
  components: {
    NestableItem: defineAsyncComponent(() => import('./NestableItem.vue')),
  },
  mixins: [methods, editable],
  props: {
    labelInput: {
      type: String,
      default: "New item"
    },
    editable: {
      type: Boolean,
      default: false
    },
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
        last: {x: 0, y: 0},
        shift: {x: 0, y: 0},
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
  methods: {
    // Override add method to focus input after adding
    async add() {
      let items = this.modelValue;
      Object.assign(this.form, {
        [this.keyProp]: this.lastId(items) + 1,
        [this.childrenProp]: [],
      })
      items.push(this.form);
      this.$emit("update:model-value", items);
      this.form = {};

      await nextTick();
      this.$refs.inputField?.focus();
    },

    // Update mouse move for placeholder positioning
    onMouseMove(event) {
      event && event.preventDefault();

      const {clientX, clientY} = this.getXandYFromEvent(event);

      if (this.mouse.last.x === 0) {
        this.mouse.last.x = clientX;
        this.mouse.last.y = clientY;
      }

      const diffX = this.$r.rtl
          ? this.mouse.last.x - clientX
          : clientX - this.mouse.last.x;

      if (
          (diffX >= 0 && this.mouse.shift.x >= 0) ||
          (diffX <= 0 && this.mouse.shift.x <= 0)
      ) {
        this.mouse.shift.x += diffX;
      } else {
        this.mouse.shift.x = 0;
      }
      this.mouse.last.x = clientX;
      this.mouse.last.y = clientY;

      if (Math.abs(this.mouse.shift.x) > this.threshold) {
        if (this.mouse.shift.x > 0) {
          this.tryIncreaseDepth(this.dragItem);
        } else {
          this.tryDecreaseDepth(this.dragItem);
        }

        this.mouse.shift.x = 0;
      }
    },

    onDragEnd(event, isCancel = false) {
      event?.preventDefault();

      this.stopTrackMouse();
      if (isCancel) {
        this.dragRevert();
      } else {
        this.dragApply();
      }

      this.pathTo = null;
      this.itemsOld = null;
      this.dragItem = null;
    },
  }
};
</script>

<style lang="scss">
@use "../../style/variables/base";

.#{base.$prefix}nestable {
  position: relative;

  .nestable-handle {
    cursor: grab;
    transition: transform 0.2s ease, opacity 0.2s ease;

    &:active {
      cursor: grabbing;
    }
  }

  .is-dragging {
    opacity: 0.5;
    cursor: grabbing !important;
  }

  .nestable-drag-item {
    display: none;
  }

  .nestable-item-content {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    transition: background 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }


  .nestable-list {
    position: relative;
    transition: all 0.3s ease;
  }
}
</style>