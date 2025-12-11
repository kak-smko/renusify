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
          :scriptSetup="scriptSetup"
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
        >&lt;script <span class="highlight-syn-str" v-if="scriptSetup">setup</span>&gt;<br/>
          <template v-if="!scriptSetup">export default {</template></span
        >
        <highlight-script ref="h-js" v-model="scr"></highlight-script>
        <span v-show="scriptShow" class="highlight-syn-class"><template v-if="!scriptSetup">}</template><br/>&lt;/script&gt;</span>
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

<script setup>
import {ref, watch, defineAsyncComponent, inject} from 'vue'
import {useCodeFormatter} from "./useCodeFormatter"

const {pretty_html, pretty_js} = useCodeFormatter()
const HighlightCss = defineAsyncComponent(() => import("./highlightCss.vue"))
const HighlightScript = defineAsyncComponent(() => import("./highlightJs.vue"))
const HighlightHtml = defineAsyncComponent(() => import("./highlightHtml.vue"))
const RCodeEditorRun = defineAsyncComponent(() => import("./run.vue"))

const props = defineProps({
  /**
   * Enables run functionality for the code editor
   * @type {Boolean}
   */
  runnable: Boolean,

  /**
   * Shows/hides the template section
   * @type {Boolean}
   * @default true
   */
  templateShow: {type: Boolean, default: true},

  /**
   * Shows/hides the script section
   * @type {Boolean}
   * @default true
   */
  scriptShow: {type: Boolean, default: true},

  /**
   * Shows/hides the CSS section
   * @type {Boolean}
   * @default true
   */
  cssShow: {type: Boolean, default: true},

  /**
   * Template code content
   * @type {String}
   */
  template: String,

  /**
   * Script code content
   * @type {String}
   */
  script: String,

  /**
   * CSS code content
   * @type {String}
   */
  css: String,
  /**
   * Script code content is setup.
   */
  scriptSetup: Boolean
})

const emit = defineEmits([
  /**
   * Emitted when template content changes
   * @param {String} template - Updated template code
   */
  "update:template",

  /**
   * Emitted when script content changes
   * @param {String} script - Updated script code
   */
  "update:script",

  /**
   * Emitted when CSS content changes
   * @param {String} css - Updated CSS code
   */
  "update:css"
])

const renusify = inject('renusify')
const $r = renusify.$r
const $helper = renusify.$helper

const show = ref("code")
const temp = ref(props.template || "")
const scr = ref(props.script || "")
const sty = ref(props.css || "")
const id = ref($helper?.uniqueId() || Math.random().toString(36).substr(2, 9))

watch(() => props.template, (newValue) => {
  temp.value = newValue
})

watch(() => props.script, (newValue) => {
  scr.value = newValue
})

watch(() => props.css, (newValue) => {
  sty.value = newValue
})

watch(temp, (newValue) => {
  emit("update:template", newValue)
})

watch(scr, (newValue) => {
  emit("update:script", newValue)
})

watch(sty, (newValue) => {
  emit("update:css", newValue)
})

/**
 * Formats all code sections (template, script, CSS) to make them prettier
 */
const pretty = () => {
  temp.value = pretty_html(temp.value)
  scr.value = pretty_js(scr.value)
  sty.value = pretty_js(sty.value)
}
</script>

<style lang="scss">
@use "../../style" as *;

.#{$prefix}code-editor {
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
