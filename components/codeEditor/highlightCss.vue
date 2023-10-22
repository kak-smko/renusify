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
export default {
  name: "highlight-css",
  props: {
    modelValue: String,
  },
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
      this.$emit("update:model-value", this.d);
    },
  },
  computed: {
    build() {
      if (!this.d) {
        return "";
      }
      const data = this.d.split("");
      let res = "";
      let in_quta = false;
      data.forEach((c) => {
        if (["=", "&"].includes(c)) {
          res += '<span class="color-blue code-editor-span">' + c + "</span>";
        } else if ([",", ";", ":"].includes(c)) {
          res += '<span class="color-orange code-editor-span">' + c + "</span>";
        } else if (parseInt(c) > -1) {
          res += '<span class="color-number code-editor-span">' + c + "</span>";
        } else if ((c === '"' || c === "'" || c === "`") && !in_quta) {
          in_quta = c;
          res += '<span class="color-green code-editor-span">' + c;
        } else if (c === in_quta) {
          in_quta = false;
          res += c + "</span>";
        } else {
          res += c;
        }
      });

      res = this.re_class(res);
      res = this.re_id(res);
      res = this.re_comment(res);

      return res;
    },
  },
  methods: {
    setTab(event) {
      if (event.keyCode === 9) {
        event.preventDefault()
        document.execCommand('insertText', false, ' '.repeat(4));
        return false;
      }
      if (event.keyCode === 13) {
        event.preventDefault()
        let n = event.target.value.substr(0, event.target.selectionStart).split('\n')
        n = n[n.length - 1].split('')
        let w = ''
        for (let i = 0; i < n.length; i++) {
          if (n[i] === ' ') {
            w += ' '
          } else {
            break
          }
        }

        document.execCommand('insertText', false, '\n' + w);
        return false;
      }
      return true
    },
    re_class(res) {
      let regex = /\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s*\{/g;
      let matched = res.matchAll(regex);
      for (const match of matched) {
        res = this.$helper.replacer(
            res,
            match[0],
            '<span class="color-func2 code-editor-span">' +
            match[0].slice(0, match[0].indexOf("{")) +
            "</span>{"
        );
      }
      return res;
    },
    re_id(res) {
      let regex = /#-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s*\{/g;
      let matched = res.matchAll(regex);
      for (const match of matched) {
        res = this.$helper.replacer(
            res,
            match[0],
            '<span class="color-func2 code-editor-span">' +
            match[0].slice(0, match[0].indexOf("{")) +
            "</span>{"
        );
      }
      return res;
    },
    re_comment(res) {
      //eslint-disable-next-line
      let regex = /(\/\*[\w\'\s\r\n\*]*\*\/)|(\/\/[\w\s\']*)/g;
      let matched = res.matchAll(regex);
      for (const match of matched) {
        res = this.$helper.replacer(
            res,
            match[0],
            '<span class="color-comment code-editor-span">' + match[0] + "</span>"
        );
      }
      return res;
    },
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
