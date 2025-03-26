<template>
  <div :class="`${$r.prefix}code-editor`">
    <div class="code-action text-right">
      <r-btn
          class="color-white-text"
          icon
          text
          @click.prevent="$helper.copy($refs.codeView.innerText)"
      >
        <r-icon v-html="$r.icons.copy"></r-icon>
      </r-btn>
      <r-btn
          v-if="runnable"
          class="color-white-text"
          icon
          text
          @click.prevent="pretty"
      >
        P
      </r-btn>
      <r-btn v-if="show === 'code' && runnable" class="color-white-text" text @click.prevent="show = 'run'">
        run
        <r-icon exact v-html="$r.icons.play"></r-icon>
      </r-btn>
      <r-btn v-if="show === 'run'" class="color-white-text" text @click.prevent="show = 'code'">
        <r-icon exact v-html="$r.icons.code_tags"></r-icon>
      </r-btn>
    </div>
    <div v-if="show === 'run' && runnable" class="code-compile">
      <r-code-editor-run
          :id="id"
          :css="sty"
          :script="scr"
          :template="temp"
      ></r-code-editor-run>
    </div>
    <div v-show="show !== 'run'" ref="codeView" class="code-wrapper">
      <div>
        <span v-show="templateShow" class="highlight-syn-func">&lt;template&gt;</span>
        <highlight-html ref="h-html" v-model="temp"></highlight-html>
        <span v-show="templateShow" class="highlight-syn-func">&lt;/template&gt;</span>
      </div>
      <div>
        <span v-show="scriptShow" class="highlight-syn-class"
        >&lt;script&gt;<br/>export default {</span
        >
        <highlight-script ref="h-js" v-model="scr"></highlight-script>
        <span v-show="scriptShow" class="highlight-syn-class">}<br/>&lt;/script&gt;</span>
      </div>
      <div>
        <span v-show="cssShow" class="highlight-syn-class"
        >&lt;style lang<span class="color-green">="css"</span>&gt;</span
        >
        <highlight-css ref="h-css" v-model="sty"></highlight-css>
        <span v-show="cssShow" class="highlight-syn-class">&lt;/style&gt;</span>
      </div>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {
  name: "r-code-editor",
  components: {
    HighlightCss: defineAsyncComponent(() =>
        import("./highlightCss.vue")
    ), HighlightScript: defineAsyncComponent(() =>
        import("./highlightJs.vue")
    ), highlightHtml: defineAsyncComponent(() =>
        import("./highlightHtml.vue")
    ), RCodeEditorRun: defineAsyncComponent(() =>
        import("./run.vue")
    )
  },
  props: {
    runnable: Boolean,
    templateShow: {type: Boolean, default: true},
    scriptShow: {type: Boolean, default: true},
    cssShow: {type: Boolean, default: true},
    template: String,
    script: String,
    css: String,
  },
  emits: ["update:template", "update:script", "update:css"],
  data() {
    return {
      show: "code",
      code: "",
      edited: false,
      temp: this.template,
      scr: this.script,
      sty: this.css,
      id: this.$helper.uniqueId(),
    };
  },
  created() {
    if (!this.$r.icons.play) {
      this.$r.icons.play =
          '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7l-11-7Z"/></svg>';
    }
    if (!this.$r.icons.code_tags) {
      this.$r.icons.code_tags =
          '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m14.6 16.6l4.6-4.6l-4.6-4.6L16 6l6 6l-6 6l-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6l6 6l1.4-1.4Z"/></svg>';
    }
  },
  watch: {
    template: function (n) {
      this.temp = n
    },
    script: function (n) {
      this.scr = n
    },
    css: function (n) {
      this.sty = n
    },
    temp: function () {
      this.$emit("update:template", this.temp);
    },
    scr: function () {
      this.$emit("update:script", this.scr);
    },
    sty: function () {
      this.$emit("update:css", this.sty);
    },
  },
  methods: {
    pretty() {
      this.temp = this.$refs["h-html"].pretty_html(this.temp)
      this.scr = this.$refs["h-js"].pretty_js(this.scr)
      this.sty = this.$refs["h-css"].pretty_js(this.sty)
    }
  },
};
</script>

<style lang="scss">
@use "../../style/variables/base";

.#{base.$prefix}code-editor {
  position: relative;
  white-space: break-spaces;
  caret-color: #f8f8f2;
  background-color: #1a1a1c;
  color: #f8f8f2;
  padding: 10px;
  font-size: 14px;

  .code-script,
  .code-template {
    padding: 0 20px;
  }

  .code-wrapper {
    direction: ltr;
    text-align: left;
    padding: 10px;
  }

  .code-compile {
    background-color: #fafafa;
    min-height: 300px;
    padding: 10px;
    margin: 0 -10px -10px -10px;
    color: black;
  }


  .highlight-syn-deleted,
  .highlight-syn-err,
  .highlight-syn-var {
    color: #ff5261
  }

  .highlight-syn-section,
  .highlight-syn-kwd {
    color: #ff7cc6
  }

  .highlight-syn-class {
    color: #eab07c
  }

  .highlight-numbers,
  .highlight-syn-cmnt {
    color: #7d828b
  }

  .highlight-syn-insert,
  .highlight-syn-type,
  .highlight-syn-func,
  .highlight-syn-bool {
    color: #71d58a
  }

  .highlight-syn-num {
    color: #b581fd
  }

  .highlight-syn-oper {
    color: #80c6ff
  }

  .highlight-syn-str {
    color: #4dacfa
  }

  .code-editor-highlight {
    position: relative;
    margin: -12px 0;

    .text-preview {
      white-space: pre-wrap;
      word-break: keep-all;
      overflow-wrap: break-word;
      min-height: 40px;
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 20px;
      margin: 0;
      border: 0;
      padding: 12px;
    }

    textarea {
      &::selection {
        background-color: #fafafa;
        -webkit-text-fill-color: #000;
        color: #000;
      }

      padding: 12px;
      margin: 0;
      border: 0;
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 20px;
      -webkit-font-smoothing: antialiased;
      -webkit-text-fill-color: transparent;
      outline: none;
      width: 100%;
      height: 100%;
      min-height: 40px;
      white-space: pre-wrap;
      word-break: keep-all;
      overflow-wrap: break-word;
      position: absolute;
      top: 0;
      left: 0;
      resize: none;
      overflow: hidden;
    }
  }
}
</style>
