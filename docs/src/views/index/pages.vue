<template>
  <r-container>
    <r-row>
      <r-col class="col-12 md-9">
        <component :is="page" :key="lang + '-' + path"></component>
        <buttom-next-page></buttom-next-page>
      </r-col>

      <r-col class="col-12 md-3"></r-col>
    </r-row>
  </r-container>
</template>
<script>
import {defineAsyncComponent} from "vue";
import notFound from "../index/notFound/index";

export default {
  name: "pages",
  props: {
    lang: String,
    path: String
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    page() {
      let lang = this.lang || this.$storage.get("lang", "en");
      let path = this.path || "introduction-whyRenusify";
      return defineAsyncComponent({
        loader: () =>
            import(
            "../index/" +
            this.$helper.replacer(path, "-", "/") +
            "/" +
            lang +
            ".vue"
                ),
        errorComponent: notFound,
      });
    },
  },
};
</script>
