<template>
  <nav :class="$r.prefix+'tabs'">
    <div class="btn-tabs d-flex h-end v-center">
      <r-btn @click.stop="isRtl?scroll_right():scroll_left()"
             icon
             text
             v-if="isRtl?!disableRight:!disableLeft">
        <r-icon v-html="$r.icons.chevron_left"></r-icon>
      </r-btn>
    </div>

    <div :class="[wrapperClass,{
    'tabs-hidden':$r.breakpoint.width>960
    }]" class="tabs-wrap" ref="tabs">
      <button
          v-for="tab in items"
          :key="tab.title"
          :ref="tab.value.toString()"
          :class="[
        { 'tabs__item_active' : tab.value === modelValue,
        [tabActiveClass]:tab.value === modelValue },
        tabClass,
      ]"
          :disabled="tab.disabled || false"
          class="tabs__item"
          type="button"
          @click="handleClick(tab.value)"
      >
        <slot :item="tab">{{ tab.title }}</slot>
      </button>
      <div
          :class="lineClass"
          :style="{ width: `${activeLineWidth}px`, transform: `translateX(${activeLineOffset}px)` }"
          class="tabs__active-line"></div>
    </div>
    <div class="btn-tabs d-flex h-start v-center">
      <r-btn @click.stop="isRtl?scroll_left():scroll_right()"
             icon
             text
             v-if="isRtl?!disableLeft:!disableRight">
        <r-icon v-html="$r.icons.chevron_right"></r-icon>
      </r-btn>
    </div>

  </nav>
</template>

<script>
export default {
  name: 'r-tabs',
  props: {
    modelValue: {
      type: [String, Number, Boolean]
    },
    items: {
      type: Array,
      required: true
    },
    wrapperClass: {
      type: String,
      required: false
    },
    tabClass: {
      type: String,
      required: false
    },
    tabActiveClass: {
      type: String,
      default: ''
    },
    lineClass: {
      type: String,
      required: false
    },
    autoScrollToView: Boolean
  },
  emits: ['update:modelValue'],
  data() {
    return {
      disableLeft: true,
      disableRight: true,
      activeLineWidth: 0,
      activeLineOffset: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this.offset()
      if (this.modelValue) {
        this.moveActiveLine(this.modelValue.toString())
      }
    }, 100)
  },
  watch: {
    modelValue(newCurrentTab, o) {
      if (o === newCurrentTab) return
      setTimeout(() => {
        this.offset()
        this.moveActiveLine(newCurrentTab)
      }, 100)
    }
  },
  computed: {
    isRtl() {
      return this.$r.rtl
    }
  },
  methods: {
    scroll_left() {
      this.$refs.tabs.scrollLeft -= this.$refs.tabs.clientWidth * 3 / 4
      this.offset()
    },
    scroll_right() {
      this.$refs.tabs.scrollLeft += this.$refs.tabs.clientWidth * 3 / 4
      this.offset()
    },
    offset() {
      const div = this.$refs.tabs
      this.disableLeft = true
      this.disableRight = true
      if (!div) {
        return false
      }

      setTimeout(() => {
        if (div.clientWidth === div.scrollWidth) {
          this.disableLeft = true
          this.disableRight = true
        } else if (div.scrollLeft === 0) {
          this.disableLeft = true
          this.disableRight = false
        } else if (div.scrollLeft + div.clientWidth === div.scrollWidth) {
          this.disableRight = true
          this.disableLeft = false
        }
      }, 100)
    },
    handleClick(value) {
      this.$emit('update:modelValue', value)
      this.moveActiveLine(value.toString())
    },
    moveActiveLine(newValue) {
      if (!this.modelValue) return
      if (!this.$refs[newValue]) return
      let element = this.$refs[newValue][0] || this.$refs[newValue]
      this.activeLineWidth = element.clientWidth
      this.activeLineOffset = element.offsetLeft
      if (this.autoScrollToView) {
        element.scrollIntoView()
      }
    }
  }
}
</script>
<style lang="scss">
@import "../../style/include";

$btnTabsWidth: 50px;

.#{$prefix}tabs {
  max-width: 100%;
  display: flex;
  flex-direction: row;

  .tabs-wrap {
    position: relative;
    margin: 0 auto;
    white-space: nowrap;
    width: calc(100% - #{$btnTabsWidth*2});
    overflow: auto;

    &.tabs-hidden {
      overflow: hidden;
    }

    scroll-behavior: smooth;
  }

  .tabs__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: currentColor;
    transition: transform 0.4s ease, width 0.4s ease;
  }

  .tabs__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    padding-bottom: 8px;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;

    &:focus {
      outline: none;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .btn-tabs {
    width: $btnTabsWidth;
  }
}
</style>
