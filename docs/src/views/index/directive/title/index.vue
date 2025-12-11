<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        title Directive
      </h1>
    </div>
  </section>
  <br/>
  <section v-for="(item,i) in info.example" :key="i">
    <div class="title-1">{{ i }}</div>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        scriptSetup
        :script='item.script'
        :template='item.template'
        :css='item.style'
    >
    </r-code-editor>
  </section>
</template>
<script setup>
const info = {
  "example": {
    "v-title usage": {
      "template": "<div class=\"tooltip-section\">\n<h2>Top Tooltips</h2>\n<div class=\"d-flex h-space-around\">\n<button v-title.top=\"'This is a top tooltip'\" class=\"tooltip-btn btn-primary\">\nTop Tooltip\n</button>\n<div v-title.top=\"'Save your changes'\" class=\"tooltip-icon\">\n💾\n</div>\n<a v-title.top=\"'Visit our documentation'\" href=\"#\" class=\"tooltip-link\">\nDocumentation\n</a>\n</div>\n</div>\n<!-- Bottom Tooltips -->\n<div class=\"tooltip-section\">\n<h2>Bottom Tooltips</h2>\n<div class=\"d-flex h-space-around\">\n<button v-title.bottom=\"'Click to download file'\" class=\"tooltip-btn btn-success\">\nDownload\n</button>\n<div v-title.bottom=\"'Delete this item'\" class=\"tooltip-icon\">\n🗑️\n</div>\n<a v-title.bottom=\"'Contact support team'\" href=\"#\" class=\"tooltip-link\">\nSupport\n</a>\n</div>\n</div>\n<!-- Left Tooltips -->\n<div class=\"tooltip-section\">\n<h2>Left Tooltips</h2>\n<div class=\"d-flex h-space-around\">\n<button v-title.left=\"'Previous page'\" class=\"tooltip-btn btn-info\">\n← Back\n</button>\n<div v-title.left=\"'User settings'\" class=\"tooltip-icon\">\n⚙️\n</div>\n<a v-title.left=\"'View your profile'\" href=\"#\" class=\"tooltip-link\">\nProfile\n</a>\n</div>\n</div>\n<!-- Right Tooltips -->\n<div class=\"tooltip-section\">\n<h2>Right Tooltips</h2>\n<div class=\"d-flex h-space-around\">\n<button v-title.right=\"'Next page'\" class=\"tooltip-btn btn-warning\">\nNext →\n</button>\n<div v-title.right=\"'Open notifications'\" class=\"tooltip-icon\">\n🔔\n</div>\n<a v-title.right=\"'Go to home page'\" href=\"#\" class=\"tooltip-link\">\nHome\n</a>\n</div>\n</div>",
      "script": "",
      "style": ""
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>