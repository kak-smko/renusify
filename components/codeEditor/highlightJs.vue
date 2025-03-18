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
    <div class="text-preview" v-html="code"></div>
  </div>
</template>

<script>
import mixin from './mixin.js'
import mixin_h from '../highlight/mixin.js'

export default {
  name: "highlight-script",
  props: {
    modelValue: String,
  },
  mixins: [mixin, mixin_h],
  data() {
    return {
      d: this.modelValue,
      code: "",
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
      this.code = await this.highlight(this.d, "js", true)
    }
  }
};
</script>

<style lang="scss">

</style>
