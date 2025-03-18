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
    <div class="text-preview" v-html="code"></div>
  </div>
</template>

<script>
import mixin from './mixin.js'
import mixin_h from '../highlight/mixin.js'

export default {
  name: "highlight-html",
  props: {
    modelValue: String,
  },
  mixins: [mixin, mixin_h],
  data() {
    return {
      d: this.modelValue,
      code: ""
    };
  },
  async created() {
    if (this.modelValue) {
      await this.build_code()
    }
  },
  watch: {
    modelValue: function () {
      this.d = this.modelValue;
    },
    d: async function () {
      await this.build_code()
      this.$emit("update:modelValue", this.d);
    },
  },
  methods: {
    async build_code() {
      this.code = await this.highlight(this.d, "html", true)
    },
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
    }
  },
};
</script>

<style lang="scss">

</style>
