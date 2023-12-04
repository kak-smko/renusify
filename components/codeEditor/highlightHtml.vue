<template>
  <div class="code-editor-highlight ltr">
    <textarea
        v-model="d"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        @keydown="setKey"
    ></textarea>
    <div class="text-preview" v-html="build"></div>
  </div>
</template>

<script>
import mixin from './mixin'

export default {
  name: "highlight-html",
  props: {
    modelValue: String,
  },
  mixins: [mixin],
  data() {
    return {
      d: this.modelValue,
      runnable: false,
      code: "",
      openTag: null
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
      let data = this.d;
      data = this.$helper.replacer(data, "<", "&lt;");
      data = this.$helper.replacer(data, ">", "&gt;");
      let res = data;
      res = this.re_quote(res)

      res = this.re_comment(res);
      res = this.re_func(res);

      res = res.replace(/(&lt;+[\s\S]+&gt;)/g, '<span class="color-orange code-editor-span">$1</span>')
      res = res.replace(/\{\{([^}]+)}}/g, '<span class="color-blue code-editor-span">{{$1}}</span>')
      return res;
    },
  },
  methods: {
    setKey(event) {
      if (event.key === "<") {
        this.openTag = event.target.selectionEnd
        return false
      } else if (event.key === "/" && this.openTag !== null && this.openTag + 1 === event.target.selectionEnd) {
        this.openTag = null
        return false
      } else if (event.key === ">" && this.openTag !== null) {
        const end = event.target.selectionEnd;
        const sel = event.target.value.substring(this.openTag + 1, end).trim().split(' ')[0];
        const t = `></${sel}>`
        event.preventDefault()
        document.execCommand('insertText', false, t);
        event.target.selectionEnd = end + 1;
        this.openTag = null
        return false
      }
      if (event.key === "=") {
        const end = event.target.selectionEnd;
        event.preventDefault()
        document.execCommand('insertText', false, '=""');
        event.target.selectionEnd = end + 2;
        return false;
      }
      return this.setTab(event)
    },
    re_comment(res) {
      let regex = /(&lt;!--+[\s\S]+--&gt;)/g;
      return res.replace(regex, '<span class="color-comment code-editor-span">$1</span>')
    }
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
