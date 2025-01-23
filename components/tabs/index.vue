<template>
  <div :class="$r.prefix+'tabs'">
    <div ref="tabs" :class="[wrapperClass]" class="tabs-wrap">
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
          @click.prevent="handleClick(tab.value)"
      >
        <slot :item="tab">{{ tab.title }}</slot>
      </button>
      <div
          :class="lineClass"
          :style="{ width: `${activeLineWidth}px`, transform: `translateX(${activeLineOffset}px)` }"
          class="tabs__active-line"></div>
    </div>
  </div>
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
      activeLineWidth: 0,
      activeLineOffset: 0
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.modelValue) {
        this.moveActiveLine(this.modelValue.toString())
      }
    }, 100)
  },
  watch: {
    modelValue(newCurrentTab, o) {
      if (o === newCurrentTab) return
      setTimeout(() => {
        this.moveActiveLine(newCurrentTab)
      }, 100)
    }
  },

  methods: {
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
@use "../../style/variables/base";

$btnTabsWidth: 50px;

.#{base.$prefix}tabs {
  max-width: 100%;
  display: flex;
  flex-direction: row;

  .tabs-wrap {
    position: relative;
    margin: 0 auto;
    white-space: nowrap;
    width: calc(100% - #{$btnTabsWidth*2});
    overflow: auto;

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
    color: inherit;

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
