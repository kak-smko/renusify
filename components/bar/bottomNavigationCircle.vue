<template>
  <nav :class="`${$r.prefix}bottom-navigation-circle`">
    <router-link
        :to="item.to"
        class="navigation-item"
        v-for="(item, i) in items"
        :key="i"
    >
      <div class="navigation-item-icon">
        <slot name="icon" :item="item">
          <r-icon v-html="item.icon"></r-icon>
        </slot>
      </div>
      <div class="navigation-item-text">
        <slot name="name" :item="item">{{ item.name }}</slot>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "rBottomNavigationCircle",
  props: {
    items: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@import "../../style/include";

.#{$prefix}bottom-navigation-circle {
  position: fixed;
  bottom: 0;
  display: flex;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 56px;
  z-index: map_get($z-index, "default");
  background-color: var(--color-sheet);
  color: var(--color-on-sheet);
  @include typography($headings, 'body-3');

  .navigation-item {
    width: 100%;
    max-width: 100%;
    text-align: center;
    position: relative;

    &-text {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
    }

    &-icon {
      transition: 0.3s all ease-in-out;
      position: absolute;
      bottom: 12px;
      left: 0;
      right: 0;
      width: 50px;
      height: 50px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .router-link-exact-active {
    color: var(--color-one);
    .navigation-item-icon {
      transition: 0.3s all ease-in-out;
      bottom: 31px;
      background-color: var(--color-one);
      border-radius: 50%;
      padding: 12px;
      width: 50px;
      height: 50px;
      border: 3px solid var(--color-on-one);

      .#{$prefix}icon {
        color: var(--color-on-one);
      }
    }
  }
}
</style>
