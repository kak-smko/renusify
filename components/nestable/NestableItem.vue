<template>
  <div
      :class="itemClasses"
      class="nestable-handle"
      draggable="true"
      @dragstart="dragstart"
      @touchend="touchend"
      @touchmove="touchmove"
      @touchstart="dragstart"
      :aria-expanded="!closed"
      :aria-label="item.title || `Item ${item[keyProp]}`"
      role="listitem"
  >
    <div
        class="nestable-item-content"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @mousemove="onMouseMove"
        tabindex="0"
        @keydown="onKeyDown"
    >
      <r-btn-confirm
          v-if="editable"
          :aria-label="`Delete ${item.title || 'item'}`"
          icon
          text
          @click="del(item)"
          class="color-error-text mr-2"
      >
        <r-icon v-html="$r.icons.delete"></r-icon>
      </r-btn-confirm>

      <r-btn
          v-if="hasChildren"
          :aria-label="closed ? 'Expand' : 'Collapse'"
          class="mr-2"
          icon
          text
          @click="toggleChildren"
      >
        <r-icon v-html="closed ? $r.icons.plus : $r.icons.minus"></r-icon>
      </r-btn>

      <r-btn
          v-else
          aria-hidden="true"
          class="mr-2"
          icon
          text
      ></r-btn>

      <slot :item="item">{{ item.title || `Item ${item[keyProp]}` }}</slot>
    </div>

    <transition name="nestable-children">
      <div
          v-if="hasChildren && !closed"
          class="nestable-list ms-5"
          role="group"
      >
        <template
            v-for="(child, childIndex) in item[childrenProp]"
            :key="child[keyProp]"
        >
          <NestableItem
              :childrenProp="childrenProp"
              :dragItem="dragItem"
              :editable="editable"
              :index="childIndex"
              :item="child"
              :keyProp="keyProp"
              :maxDepth="maxDepth"
              is-child
              @delete="$emit('delete', $event)"
              @drag-start="$emit('drag-start', $event)"
              @touch-move="$emit('touch-move', $event)"
              @mouse-enter="$emit('mouse-enter', $event)"
              @drag-end="$emit('drag-end', $event)"
          >
            <template v-slot="{ item }">
              <slot :item="item" itemscope>{{ item.title || `Item ${item[keyProp]}` }}</slot>
            </template>
          </NestableItem>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "NestableItem",
  props: {
    editable: Boolean,
    keyProp: String,
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    index: {
      type: Number,
      required: false,
      default: null,
    },
    isChild: {
      type: Boolean,
      required: false,
      default: false,
    },
    childrenProp: String,
    dragItem: Object,
    maxDepth: Number,
  },
  data() {
    return {
      breakPoint: null,
      moveDown: false,
      closed: false,
      isKeyboardNavigating: false
    };
  },
  computed: {
    isDragging() {
      return (
          this.dragItem && this.dragItem[this.keyProp] === this.item[this.keyProp]
      );
    },

    hasChildren() {
      return (
          this.item[this.childrenProp] && this.item[this.childrenProp].length > 0
      );
    },

    itemClasses() {
      const classes = [
        "nestable-item",
        `nestable-item-${this.item[this.keyProp]}`,
      ];

      if (this.isDragging) {
        classes.push("is-dragging");
      }

      if (this.isKeyboardNavigating) {
        classes.push("is-focused");
      }

      return classes;
    },

    depth() {
      return this.getDepth(this.item);
    }
  },
  methods: {
    getDepth(item, level = 0) {
      if (!item[this.childrenProp] || item[this.childrenProp].length === 0) {
        return level;
      }

      let maxDepth = level;
      item[this.childrenProp].forEach(child => {
        const childDepth = this.getDepth(child, level + 1);
        if (childDepth > maxDepth) {
          maxDepth = childDepth;
        }
      });

      return maxDepth;
    },

    toggleChildren() {
      this.closed = !this.closed;
    },

    del(item) {
      this.$emit("delete", item);
    },

    dragstart(event) {
      event.dataTransfer.setData('text/plain', this.item[this.keyProp]);
      event.dataTransfer.effectAllowed = 'move';
      this.$emit("drag-start", [event, this.item]);
    },

    touchend(event) {
      this.$emit("drag-end", event);
    },

    touchmove(event) {
      this.$emit("touch-move", event);
    },

    onMouseEnter(event) {
      if (!this.dragItem) return;

      if (!event.movementY) {
        return this.sendNotification(event);
      }

      this.moveDown = event.movementY > 0;
      this.breakPoint = event.target.getBoundingClientRect().height / 2;
    },

    onMouseLeave() {
      this.breakPoint = null;
    },

    onMouseMove(event) {
      if (!this.breakPoint) return;

      const delta = event.offsetY - this.breakPoint;

      if (this.moveDown && delta < this.breakPoint / 4) return;
      if (!this.moveDown && delta > -this.breakPoint / 4) return;

      this.sendNotification(event);
    },

    sendNotification(event) {
      this.breakPoint = null;
      this.$emit("mouse-enter", [event, this.item]);
    },

    onKeyDown(event) {
      // Handle keyboard navigation
      switch (event.key) {
        case 'ArrowUp':
          this.navigate(-1);
          break;
        case 'ArrowDown':
          this.navigate(1);
          break;
        case 'ArrowLeft':
          if (!this.closed && this.hasChildren) {
            this.closed = true;
          }
          break;
        case 'ArrowRight':
          if (this.closed && this.hasChildren) {
            this.closed = false;
          }
          break;
        case 'Enter':
        case ' ':
          if (this.hasChildren) {
            this.closed = !this.closed;
          }
          break;
        case 'Delete':
          if (this.editable) {
            this.del(this.item);
          }
          break;
        default:
          return;
      }

      event.preventDefault();
    },

    navigate(direction) {
      // Implement keyboard navigation between items
      this.isKeyboardNavigating = true;
      // You'll need to implement actual navigation logic here
      // This would involve finding the next/previous item in the tree
      // and focusing it
    }
  }
};
</script>

<style lang="scss">
@use "../../style/variables/base";

.#{base.$prefix}nestable {
  .nestable-item {
    outline: none;

    &.is-focused {
      box-shadow: 0 0 0 2px #4a90e2;
    }
  }

  .nestable-children-enter-active,
  .nestable-children-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .nestable-children-enter-from,
  .nestable-children-leave-to {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }

  .nestable-children-enter-to,
  .nestable-children-leave-from {
    opacity: 1;
    transform: translateY(0);
    max-height: 1000px;
  }
}
</style>