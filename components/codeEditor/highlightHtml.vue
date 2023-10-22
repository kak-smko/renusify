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
  name: "highlight-html",
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
      let data = this.d;
      data = this.$helper.replacer(data, "<", "&lt;");
      data = this.$helper.replacer(data, ">", "&gt;");
      data = data.split("");
      let res = "";
      let in_quta = false;
      data.forEach((c) => {
        if (c === "=") {
          res += '<span class="color-blue">=</span>';
        } else if ((c === '"' || c === "'") && !in_quta) {
          in_quta = c;
          res += '<span class="color-green">' + c;
        } else if (c === in_quta) {
          in_quta = false;
          res += c + "</span>";
        } else {
          res += c;
        }
      });

      res = this.$helper.replacer(
          res,
          "&lt;",
          '<span class="color-orange code-editor-span">&lt;'
      );
      res = this.$helper.replacer(res, "&gt;", "&gt;</span>");
      res = this.$helper.replacer(
          res,
          "{{",
          '<span class="color-blue code-editor-span">{{'
      );
      res = this.$helper.replacer(res, "}}", "}}</span>");

      let regex = /\+(.*?)\+/g;
      let matched = res.matchAll(regex);
      for (const match of matched) {
        res = this.$helper.replacer(
            res,
            match[0],
            '<span class="color-blue code-editor-span">' + match[0] + "</span>"
        );
      }
      res = this.re_words(res);
      res = this.re_comment(res);
      res = this.re_func(res);
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
    re_words(res) {
      res = this.$helper.replacer(
          res,
          " window.",
          ' <span class="color-orange code-editor-span">window</span>.'
      );
      res = this.$helper.replacer(
          res,
          " new ",
          ' <span class="color-orange code-editor-span">new</span> '
      );
      res = this.$helper.replacer(
          res,
          " true",
          ' <span class="color-orange code-editor-span">true</span>'
      );
      res = this.$helper.replacer(
          res,
          " false",
          ' <span class="color-orange code-editor-span">false</span>'
      );

      return res;
    },
    re_comment(res) {
      let regex = /&lt;!--(.*?)--&gt;/g;
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
    re_func(res) {
      //function like Date()
      let regex = /([a-zA-Z_{1}][a-zA-Z0-9_]+)[ ]{0,1}(?=\()/g;
      let matched = res.matchAll(regex);
      for (const match of matched) {
        res = this.$helper.replacer(
            res,
            match[0],
            '<span class="color-func2 code-editor-span">' + match[0] + "</span>"
        );
      }

      //function like $r $d()
      regex = /(\$([a-zA-z0-9]*)[.|(])/g;
      matched = res.matchAll(regex);
      for (const match of matched) {
        res = this.$helper.replacer(
            res,
            match[0].substr(0, match[0].length - 1),
            '<span class="color-func code-editor-span">' +
            match[0].substr(0, match[0].length - 1) +
            "</span>"
        );
      }
      res = this.$helper.replacer(
          res,
          "(",
          '<span class="color-func2 code-editor-span">(</span>'
      );
      res = this.$helper.replacer(
          res,
          ")",
          '<span class="color-func2 code-editor-span">)</span>'
      );
      return res;
    },
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
