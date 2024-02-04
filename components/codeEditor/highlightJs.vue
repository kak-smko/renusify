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
  name: "highlight-script",
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

      let res = this.d;
      res = this.$helper.replacer(res, "<", "&lt;");
      res = this.$helper.replacer(res, ">", "&gt;");
      res = this.re_quote(res);
      res = this.re_special(res, /([{}\[\]])/g);
      res = this.re_words(res, ['import', 'from', 'delete', 'window', 'new', 'var', 'let', 'const', 'return', 'true', 'false', 'this', 'null', 'String', 'Boolean', 'Object']);
      res = this.re_comment(res);
      res = this.re_func(res);
      res = this.re_number(res);
      res = this.re_special(res, /([(),])/g, 'color-func2');
      res = res.replace(/(&lt;)/g, '<span class="color-orange code-editor-span">$1</span>')
      res = res.replace(/(&gt;)/g, '<span class="color-orange code-editor-span">$1</span>')

      return res;
    },
  }
};
</script>

<style lang="scss">

</style>
