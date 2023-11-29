<template>
  <div class="code-editor-highlight ltr">
    <textarea
        v-model="d"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        @keydown="setTab"
    ></textarea>
    <div class="text-preview" v-html="build"></div>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: "highlight-css",
  props: {
    modelValue: String,
  },
  mixins: [mixin],
  data() {
    return {
      d: this.modelValue,
      runnable: false,
      code: "",
    };
  },
  watch: {
    modelValue: function () {
      this.d = this.modelValue;
    },
    d: function () {
      this.$emit("update:modelValue", this.d);
    },
  },
  computed: {
    build() {
      if (!this.d) {
        return "";
      }
      let res = this.d
      res = this.re_quote(res);
      res = this.re_func(res);
      res = this.re_class(res);
      res = this.re_id(res);
      res = this.re_comment(res);
      res = this.re_special(res, /([{};,:])/g, 'color-func2');
      return res;
    },
  },
  methods: {
    re_class(res) {
      return res = res.replace(/(\.+[_a-zA-Z0-9-:#{}$].*)\{/g, '<span class="color-func2 code-editor-span">$1</span>{')
    },
    re_id(res) {
      return res = res.replace(/(#+[_a-zA-Z0-9-:#{}$].*)\{/g, '<span class="color-func2 code-editor-span">$1</span>{')
    }
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
