<template>
  <div ref="container"
       class="ltr"
       :class="{ [$r.prefix+'img-preview-container']:true}">
    <div
        :style="wrapperStyle"
        class="image-wrapper"
        @mousedown="startDrag"
        @touchstart="startDrag"
        @wheel.prevent="handleWheel"
    >
      <span :style="imageHolderStyle">
        <img
            :src="src"
            :style="imageStyle"
            alt="Preview image"
            @load="handleImageLoad"
        >
      </span>
    </div>

    <div v-if="showControls" class="controls">
      <button @click="zoomIn">
        <r-icon v-html="$r.icons.plus"></r-icon>
      </button>
      <button @click="zoomOut">
        <r-icon v-html="$r.icons.minus"></r-icon>
      </button>
      <button class="font-weight-bold" @click="rotate">↻</button>
      <button @click="reset">R</button>
      <button @click="$emit('close',true)">
        <r-icon v-html="$r.icons.close"></r-icon>
      </button>
    </div>
  </div>
</template>

<script>
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    maxScale: {
      type: Number,
      default: 5
    },
    minScale: {
      type: Number,
      default: 0.1
    },
    showControls: {
      type: Boolean,
      default: true
    }
  },

  setup(props) {
    const container = ref(null);
    const scale = ref(1);
    const rotation = ref(0);
    const position = ref({x: 0, y: 0});
    const isDragging = ref(false);
    const dragStart = ref({x: 0, y: 0});
    const naturalSize = ref({width: 0, height: 0});
    const containerSize = ref({width: 0, height: 0});

    const wrapperStyle = computed(() => ({
      transform: `translate(${position.value.x}px, ${position.value.y}px)`,
      cursor: isDragging.value ? 'grabbing' : 'grab'
    }));

    const imageStyle = computed(() => ({
      transform: `scale(${scale.value})`,
      transformOrigin: '0 0',
      width: naturalSize.value.width ? `${naturalSize.value.width}px` : 'auto',
      height: naturalSize.value.height ? `${naturalSize.value.height}px` : 'auto',
      display: 'block'
    }));
    const imageHolderStyle = computed(() => ({
      transform: `rotate(${rotation.value}deg)`,
      transformOrigin: 'center center',
      width: naturalSize.value.width ? `${naturalSize.value.width * scale.value}px` : 'auto',
      height: naturalSize.value.height ? `${naturalSize.value.height * scale.value}px` : 'auto',
      display: 'block'
    }));

    const handleImageLoad = (event) => {
      naturalSize.value = {
        width: event.target.naturalWidth,
        height: event.target.naturalHeight
      };
      updateContainerSize();
      centerImage();
    };

    const updateContainerSize = () => {
      if (container.value) {
        containerSize.value = {
          width: container.value.clientWidth,
          height: container.value.clientHeight
        };
      }
    };

    const centerImage = () => {
      if (!container.value || !naturalSize.value.width) return;

      const widthRatio = containerSize.value.width / naturalSize.value.width;
      const heightRatio = containerSize.value.height / naturalSize.value.height;
      const initialScale = Math.min(widthRatio, heightRatio, 1); // Don't scale up initially

      scale.value = initialScale;
      rotation.value = 0;

      position.value = {
        x: (containerSize.value.width - naturalSize.value.width * scale.value) / 2,
        y: (containerSize.value.height - naturalSize.value.height * scale.value) / 2
      };
    };

    const rotate = () => {
      if (!container.value) return;
      rotation.value = (rotation.value + 22.5) % 360;
    };

    const zoom = (factor, clientX, clientY) => {
      if (!container.value) return;

      const oldScale = scale.value;
      scale.value = Math.min(
          Math.max(scale.value * factor, props.minScale),
          props.maxScale
      );

      const rect = container.value.getBoundingClientRect();
      const containerX = clientX - rect.left;
      const containerY = clientY - rect.top;

      const imageX = (containerX - position.value.x) / oldScale;
      const imageY = (containerY - position.value.y) / oldScale;

      position.value.x = containerX - imageX * scale.value;
      position.value.y = containerY - imageY * scale.value;
    };

    const zoomIn = () => {
      if (!container.value) return;
      const rect = container.value.getBoundingClientRect();
      zoom(1.2, rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    const zoomOut = () => {
      if (!container.value) return;
      const rect = container.value.getBoundingClientRect();
      zoom(0.8, rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    const reset = () => {
      centerImage();
    };

    const startDrag = (e) => {
      if (isDragging.value) return
      isDragging.value = true;
      const clientX = e.clientX || e.touches[0].clientX;
      const clientY = e.clientY || e.touches[0].clientY;

      dragStart.value = {
        x: clientX - position.value.x,
        y: clientY - position.value.y
      };

      e.preventDefault();
    };

    const handleDrag = (e) => {
      if (!isDragging.value) return;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      if (clientX === undefined || clientY === undefined) return;

      position.value = {
        x: clientX - dragStart.value.x,
        y: clientY - dragStart.value.y
      };
      e.preventDefault();
    };

    const endDrag = () => {
      isDragging.value = false;
    };

    const handleWheel = (e) => {
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      zoom(factor, e.clientX, e.clientY);
    };

    onMounted(() => {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('touchmove', handleDrag, {passive: false});
      window.addEventListener('touchend', endDrag);
      window.addEventListener('resize', updateContainerSize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', endDrag);
      window.removeEventListener('resize', updateContainerSize);
    });

    return {
      container,
      scale,
      rotation,
      position,
      wrapperStyle,
      imageStyle,
      imageHolderStyle,
      handleImageLoad,
      startDrag,
      handleWheel,
      zoomIn,
      zoomOut,
      reset,
      rotate
    };
  }
};
</script>
