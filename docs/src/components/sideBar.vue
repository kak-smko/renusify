<template>
  <r-container class="side-bar" full-width>
    <slot name="first"></slot>
    <r-row class="flex-column">
      <r-col v-for="(item, i) in items" :key="i">
        <div v-if="item.type === 'hr'" class="text-center caption">
          {{ $t(item.name) }}
          <r-divider></r-divider>
        </div>
        <div
            v-else
            @click.prevent="select === i ? (select = null) : (select = i)"
        >
          <r-card
              :class="{
              'router-link-exact-active': select === i,
            }"
              :to="item.to"
              class="side-bar-item title d-flex h-space-between px-1 py-2"
              flat
              ripple
          >
            <span class="flex-grow-1">
              <r-icon v-if="item.icon" exact v-html="item.icon"></r-icon>
              {{ $t(item.name) }}
            </span>
            <r-icon
                v-if="item.childs"
                :class="{
                'side-bar-icon-active': select === i,
              }"
                v-html="$r.icons.chevron_down"
            ></r-icon>
          </r-card>
        </div>
        <div
            v-if="item.childs"
            :class="{
            'side-bar-sub-item-active': select === i,
          }"
            class="side-bar-sub-item ms-2"
        >
          <r-card
              v-for="(child, j) in item.childs"
              :key="`${i}-${j}`"
              :to="child.to"
              class="side-bar-sub-item-link d-block subtitle-1 px-1 py-2 mb-1"
              flat
              ripple
              @click.prevent="child.to ? '' : (select2 = i + '-' + j)"
          >
            <div class="d-flex h-space-between">
              {{ $t(child.name) }}
              <r-icon
                  v-if="child.childs"
                  :class="{
                  'side-bar-icon-active': select2 === i + '-' + j,
                }"
                  v-html="$r.icons.chevron_down"
              ></r-icon>
            </div>
            <div
                v-if="child.childs"
                :class="{
                'side-bar-sub-item2-active': select2 === i + '-' + j,
              }"
                class="side-bar-sub-item2 ms-2"
            >
              <r-card
                  v-for="(child2, k) in child.childs"
                  :key="`${i}-${j}-${k}`"
                  :to="child2.to"
                  class="side-bar-sub-item-link d-block subtitle-1 px-1 py-2 mb-1"
                  flat
                  ripple
              >
                {{ $t(child2.name) }}
              </r-card>
            </div>
          </r-card>
        </div>
      </r-col>
    </r-row>
  </r-container>
</template>

<script>
export default {
  name: "sideBar",
  props: {
    items: Array,
  },
  data() {
    return {
      select: null,
      select2: null,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~renusify/style/include";

.side-bar {
  &-item {
    cursor: pointer;
  }

  &-icon-active {
    transition: 0.3s all ease;
    transform: rotateZ(180deg) !important;
  }

  &-sub-item {
    opacity: 0.9;
    transition: 0.2s all ease-in-out;
    max-height: 0;
    height: auto;
    overflow: hidden;

    &-active {
      transition: 0.3s all ease-in;
      max-height: 2000px;
    }
  }

  &-sub-item2 {
    opacity: 0.8;
    transition: 0.2s all ease-in-out;
    max-height: 0;
    height: auto;
    overflow: hidden;

    &-active {
      transition: 0.3s all ease-in;
      max-height: 2000px;
    }
  }
}
</style>
