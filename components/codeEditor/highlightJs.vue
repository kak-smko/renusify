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
  name: "highlight-script",
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
      let data = this.d.split("");
      let str = this.d.trim();

      if (str.substr(0, 1) === "{") {
        str = str.substr(1, str.length - 2);
      }
      let res = "";

      let in_quta = false;
      data.forEach((c) => {
        if (["=", "&", "{", "}", "<", ">"].includes(c)) {
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

      res = this.re_words(res);
      res = this.re_comment(res);
      res = this.re_func(res);

      // main function vuejs methods created ,...
      this.strToObj(str).forEach((item) => {
        if (item) {
          res = this.$helper.replacer(
              res,
              item,
              '<span class="color-func code-editor-span">' + item + "</span>"
          );
        }
      });

      return res;
    },
  },
  methods: {
    setTab(event) {
      if (event.key === "'" || event.key === '"' || event.key === '`') {
        const end = event.target.selectionEnd;
        event.preventDefault()
        document.execCommand('insertText', false, event.key.repeat(2));
        event.target.selectionEnd = end + 1;
        return false;
      }
      if (event.key === "{") {
        const end = event.target.selectionEnd;
        event.preventDefault()
        document.execCommand('insertText', false, '{}');
        event.target.selectionEnd = end + 1;
        return false;
      }
      if (event.key === "(") {
        const end = event.target.selectionEnd;
        event.preventDefault()
        document.execCommand('insertText', false, '()');
        event.target.selectionEnd = end + 1;
        return false;
      }
      if (event.key === "[") {
        const end = event.target.selectionEnd;
        event.preventDefault()
        document.execCommand('insertText', false, '[]');
        event.target.selectionEnd = end + 1;
        return false;
      }
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
    strToObj(str) {
      str = this.$helper.replacer(str, " ", "");
      str = this.$helper.replacer(str, "\n", "");
      str = this.$helper.replacer(str, "\r", "");
      let open = 0;
      let pre = 0;
      let to = 0;
      let items = [];
      const s = str;
      s.split("").forEach((c, i) => {
        to++;
        if (c === "{") {
          open++;
        }
        if (c === "}") {
          open--;
        }
        if (open === 0 && c === ",") {
          let new_str = str.substr(pre, to - 1);
          const o = new_str.indexOf(":");
          const f = new_str.indexOf("(");
          if ((f > 0 && f < o) || o < 0) {
            new_str = new_str.substr(0, f);
          } else {
            new_str = new_str.substr(0, o);
          }
          items.push(new_str);
          pre = i + 1;
          to = 0;
        }
      });
      let new_str = str.substr(pre, str.length);
      const o = new_str.indexOf(":");
      const f = new_str.indexOf("(");
      if ((f > 0 && f < o) || o < 0) {
        new_str = new_str.substr(0, f);
      } else {
        new_str = new_str.substr(0, o);
      }
      items.push(new_str);
      return items;
    },
    re_words(res) {
      res = this.$helper.replacer(
          res,
          "import ",
          '<span class="color-orange code-editor-span">import</span> '
      );
      res = this.$helper.replacer(
          res,
          " from ",
          ' <span class="color-orange code-editor-span">from</span> '
      );
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
          " var ",
          ' <span class="color-orange code-editor-span">var</span> '
      );
      res = this.$helper.replacer(
          res,
          " let ",
          ' <span class="color-orange code-editor-span">let</span> '
      );
      res = this.$helper.replacer(
          res,
          " const ",
          ' <span class="color-orange code-editor-span">const</span> '
      );
      res = this.$helper.replacer(
          res,
          " return ",
          ' <span class="color-orange code-editor-span">return</span> '
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
      res = this.$helper.replacer(
          res,
          " this.",
          ' <span class="color-orange code-editor-span">this</span>.'
      );

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
