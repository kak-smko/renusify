<template>
  <div
      :class="itemClasses"
      class="nestable-handle"
      draggable="true"
      @dragstart="dragstart"
      @touchend="touchend"
      @touchmove="touchmove"
      @touchstart="dragstart"
  >
    <div
        class="nestable-item-content"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @mousemove="onMouseMove"
    >
      <r-btn-confirm
          v-if="editable"
          class="color-error-text"
          icon
          text
          @click="del(item)"
      >
        <r-icon v-html="$r.icons.delete"></r-icon>
      </r-btn-confirm>
      <r-btn v-if="hasChildren" icon text @click="closed=!closed">
        <r-icon v-html="closed?$r.icons.plus:$r.icons.minus"></r-icon>
      </r-btn>
      <r-btn v-else icon text></r-btn>
      <slot :item="item">{{ item }}</slot>
    </div>
    <div v-if="hasChildren&&!closed" class="nestable-list ms-5">
      <template
          v-for="(child, childIndex) in item[childrenProp]"
          :key="childIndex"
      >
        <NestableItem
            :childrenProp="childrenProp"
            :dragItem="dragItem"
            :index="childIndex"
            :item="child"
            :key-prop="keyProp"
            is-child
            @delete="$emit('delete', $event)"
            @drag-start="$emit('drag-start', $event)"
            @touch-move="$emit('touch-move', $event)"
            @mouse-enter="$emit('mouse-enter', $event)"
            @drag-end="$emit('drag-end', $event)"
        >
          <template v-slot="{ item }">
            <r-btn-confirm
                v-if="editable"
                class="color-error-text"
                icon
                text
                @click="del(item)"
            >
              <r-icon v-html="$r.icons.delete"></r-icon>
            </r-btn-confirm>
            <slot :item="item" itemscope>{{ item }}</slot>
          </template>
        </NestableItem>
      </template>
    </div>
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
  },
  data() {
    return {
      breakPoint: null,
      moveDown: false,
      closed: false
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
      const isDragging = this.isDragging ? ["is-dragging"] : [];

      return [
        "nestable-item",
        `nestable-item-${this.item[this.keyProp]}`,
        ...isDragging,
      ];
    },
  },
  methods: {
    del(item) {
      this.$emit("delete", item);
    },
    dragstart(event) {
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
  },
};
</script>
