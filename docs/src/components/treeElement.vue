<template>
  <r-card
      class="pa-10 color-info color-white-text mx-2"
      style="width: 200px; height: 100px"
  >
    {{ node.name }}
  </r-card>
</template>

<script>
export default {
  name: "treeElement",
  props: {
    node: Object,
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
