<template>
  <div :class="`${$r.prefix}code-editor`">
    <div class="code-action text-right">
      <r-btn
          class="image-copy"
          icon
          text
          @click.prevent="$helper.copy($refs.codeView.innerText)"
      >
        <r-icon v-html="$r.icons.copy"></r-icon>
      </r-btn>
      <r-btn v-if="show === 'code' && runnable" text @click="show = 'run'">
        run
        <r-icon v-html="$r.icons.play" exact></r-icon>
      </r-btn>
      <r-btn v-if="show === 'run'" text @click="show = 'code'">
        <r-icon v-html="$r.icons.code_tags" exact></r-icon>
      </r-btn>
    </div>
    <div v-show="false" ref="codeSlot">
      <slot></slot>
    </div>
    <div v-if="show === 'run' && runnable" class="code-compile">
      <r-code-editor-run
          :id="id"
          :script="script"
          :style="style"
          :template="template"
      ></r-code-editor-run>
    </div>
    <div v-show="show !== 'run'" ref="codeView" class="code-wrapper">
      <div v-show="templateShow">
        <span class="color-green">&lt;template&gt;</span>
        <highlight-html v-model="temp"></highlight-html>
        <span class="color-green">&lt;/template&gt;</span>
        <br/>
      </div>
      <div v-show="scriptShow">
        <span class="color-orange"
        >&lt;script&gt;<br/>export default {</span
        >
        <highlight-script v-model="scr"></highlight-script>
        <span class="color-orange">}<br/>&lt;script&gt;</span>
      </div>
      <div v-show="styleShow">
        <span class="color-orange"
        >&lt;style lang<span class="color-green">="css"</span>&gt;</span
        >
        <highlight-css v-model="sty"></highlight-css>
        <span class="color-orange">&lt;style&gt;</span>
      </div>
    </div>
  </div>
</template>

<script>
import RCodeEditorRun from "./run";
import highlightHtml from "./highlightHtml";
import HighlightScript from "./highlightJs";
import HighlightCss from "./highlightCss";

export default {
  name: "r-code-editor",
  components: {HighlightCss, HighlightScript, highlightHtml, RCodeEditorRun},
  props: {
    runnable: Boolean,
    templateShow: {type: Boolean, default: true},
    scriptShow: {type: Boolean, default: true},
    styleShow: {type: Boolean, default: true},
    template: String,
    script: String,
    style: String,
  },
  emits: ["update:template", "update:script", "update:style"],
  data() {
    return {
      show: "code",
      code: "",
      edited: false,
      temp: this.template,
      scr: this.script,
      sty: this.style,
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
  mounted() {
    this.get_code("codeSlot");
  },
  watch: {
    temp: function () {
      this.$emit("update:template", this.temp);
    },
    scr: function () {
      this.$emit("update:script", this.scr);
    },
    sty: function () {
      this.$emit("update:style", this.sty);
    },
  },
  methods: {
    toHTML(htmlString) {
      let div = document.createElement("div");
      div.innerHTML = htmlString;
      return div;
    },
    get_code(slot = "codeSlot") {
      if (!this.$refs[slot]) {
        setTimeout(() => {
          this.get_code(slot);
        }, 100);
        return;
      }

      this.code = this.toHTML(this.$refs[slot].innerHTML);
      let temp = this.code.querySelector(".code-template");

      if (temp && temp.childNodes.length > 0) {
        for (let i = 0; i < temp.childNodes.length; i++) {
          if (temp.childNodes[i].nodeName === "#comment") {
            this.template = this.toHTML(temp.childNodes[i].nodeValue).innerHTML;
            break;
          }
        }
      }

      let script = this.code.querySelector(".code-script");
      if (script && script.childNodes.length > 0) {
        for (let i = 0; i < script.childNodes.length; i++) {
          if (script.childNodes[i].nodeName === "#comment") {
            this.script = script.childNodes[i].nodeValue;
            break;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";

.#{$prefix}code-editor {
  position: relative;
  white-space: break-spaces;
  caret-color: white;
  background-color: #15212e;
  color: #fff;
  padding: 10px;

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

  .color-func {
    color: #db92e3;
  }

  .color-func2 {
    color: #deca10;
  }

  .color-orange {
    color: orange;
  }

  .color-green {
    color: #0cde27;
  }

  .color-blue {
    color: #3bb7ee;
  }

  .color-number {
    color: #7ad5ff;
  }

  .color-purple {
    color: #d2a8ee;
  }

  .color-comment {
    color: #898d8c;
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
