<template>
  <div :class="$r.prefix + 'skeleton-loader'" :style="{width:width,height:height}"></div>
</template>

<script>
export default {
  name: "r-skeletonLoader",
  props:{
    width:String,
    height:String,
  }
};
</script>

<style lang="scss">
@import "~renusify/style/include";
.#{$prefix}skeleton-loader {
  background: rgba(0, 0, 0, 0.12);
  &:after {
    animation: loading 1.5s infinite;
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
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
