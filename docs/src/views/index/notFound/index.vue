<template>
  <component :is="comp"></component>
</template>

<script>
import {defineAsyncComponent} from "vue";
import en from "./en";

export default {
  name: "index",

  computed: {
    comp() {
      const lang = this.$route.params.lang || "en";
      return defineAsyncComponent({
        loader: () => import(`./${lang}.vue`),
        errorComponent: en,
      });
    },
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
