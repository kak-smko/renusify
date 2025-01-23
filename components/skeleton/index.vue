<template>
  <div :class="[$r.prefix+'skeleton']">
    <slot v-if="loading||showPreData"></slot>
    <slot v-if="!loading" name="case">
      <div :class="['sk-'+type]" :style="{width:width,height:height}"></div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "r-skeleton",
  props: {
    showPreData: Boolean,
    loading: Boolean,
    width: String,
    height: String,
    type: {
      type: String,
      default: 'card',
      validator: function (value) {
        return ['line', 'avatar', 'card'].indexOf(value) !== -1
      }
    },
  }
};
</script>

<style lang="scss">
@use "sass:map";
@use "../../style/variables/base";


.#{base.$prefix}skeleton {
  .sk-card, .sk-line, .sk-avatar {
    background: rgba(0, 0, 0, 0.12);
    overflow: hidden;
    position: relative;

    &:after {
      animation: skeletonloading 1.5s infinite;
      content: "";
      height: 100%;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(-100%);
      z-index: 1;
      background: linear-gradient(
              90deg,
              hsla(0, 0%, 100%, 0),
              hsla(0, 0%, 100%, 0.3),
              hsla(0, 0%, 100%, 0)
      );
    }
  }

  .sk-card {
    border-radius: map.get(base.$borders, 'sm');
  }

  .sk-line {
    height: 20px !important;
    border-radius: 10px;
    margin-bottom: 8px;
  }

  .sk-avatar {
    border-radius: 50%;
  }

  @keyframes skeletonloading {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
