<template>
  <teleport v-if="mounted" :to="`.${$r.prefix}app`">
    <div
        v-if="modelValue && !noOverlay"
        :class="`${$r.prefix}modal-overlay`"
    ></div>

    <transition :name="computedAnimation">
      <div
          v-if="modelValue"
          :class="modalClasses"
          v-bind="$attrs"
          @click.self="close()"
      >
        <div
            :class="containerClasses"
            :style="containerStyles"
            class="modal-container"
        >
          <div class="modal-btn text-end">
            <r-btn
                v-if="!noCloseBtn"
                class="color-error-text"
                fab
                size="small"
                text
                @click.prevent="close(true)"
            >
              <r-icon v-html="$r.icons.close"></r-icon>
            </r-btn>
          </div>

          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import './style.scss'

export default {
  name: 'r-modal',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    position: {
      type: String,
      default: 'center',
      validator: (value) => ['center', 'bottom', 'start', 'end', 'top'].includes(value)
    },
    noOverlay: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    maxWidth: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: null
    },
    minWidth: {
      type: Boolean,
      default: true
    },
    noClosable: Boolean,
    noCloseBtn: Boolean,
    routeHistory: String,
    color: String,
    animation: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      mounted: false,
      runAnimation: false
    }
  },
  created() {
    this.initFromRoute();
    setTimeout(() => {
      this.mounted = true;
    }, 10);
  },
  watch: {
    '$route': 'handleRouteChange',
    modelValue: 'handleModelValueChange'
  },
  computed: {
    computedAnimation() {
      if (this.animation) return this.animation;

      switch (this.position) {
        case 'bottom':
          return 'slide-up';
        case 'top':
          return 'slide-down';
        case 'start':
          return 'slide-end';
        case 'end':
          return 'slide-start';
        default:
          return 'scale';
      }
    },
    modalClasses() {
      return [
        `${this.$r.prefix}modal`,
        `modal-${this.position}`,
        {
          'animate-modal-vibrate': this.runAnimation
        }
      ];
    },
    containerClasses() {
      return [
        this.color,
        {
          'modal-full-width': this.fullWidth,
          'modal-full-height': this.fullHeight,
          'modal-mini': this.minWidth,
          [`modal-${this.position}`]: this.position !== 'center'
        }
      ];
    },
    containerStyles() {
      return {
        'max-width': this.maxWidth,
        'max-height': this.maxHeight
      };
    }
  },
  methods: {
    initFromRoute() {
      if (!this.routeHistory) return;

      const hashValues = this.$route.hash.replace('#', '').split('&');
      if (hashValues.includes(this.routeHistory)) {
        this.$emit('update:modelValue', true);
      }
    },
    handleRouteChange(newRoute) {
      if (!this.routeHistory) return;

      const hashValues = newRoute.hash.replace('#', '').split('&');
      this.$emit('update:modelValue', hashValues.includes(this.routeHistory));
    },
    handleModelValueChange(isOpen) {
      if (isOpen) {
        document.documentElement.style.overflow = 'hidden';
        this.handleOpenState();
      } else {
        document.documentElement.style.overflow = null;
      }
    },
    handleOpenState() {
      if (!this.routeHistory) return;

      const hashValues = this.$route.hash.replace('#', '').split('&');
      if (!hashValues.includes(this.routeHistory)) {
        const newHash = this.$route.hash
            ? `${this.$route.hash}&${this.routeHistory}`
            : `#${this.routeHistory}`;

        this.$router.push({
          path: this.$route.fullPath,
          hash: newHash
        });
      }
    },
    close(force = false) {
      if (this.noClosable && !force) {
        this.runAnimation = true;
        setTimeout(() => this.runAnimation = false, 300);
        return;
      }

      if (this.routeHistory) {
        this.handleRouteClose();
      }

      this.$emit('update:modelValue', false);
    },
    handleRouteClose() {
      if (history.state.back) {
        this.$router.back();
        return;
      }

      let hashValues = this.$route.hash.replace('#', '').split('&');
      hashValues = hashValues.filter(val => val !== this.routeHistory);

      const newHash = hashValues.length
          ? `#${hashValues.join('&')}`
          : '';

      this.$router.replace({
        path: this.$route.fullPath,
        hash: newHash
      });
    }
  },
  beforeUnmount() {
    document.documentElement.style.overflow = null;
  }
}
</script>