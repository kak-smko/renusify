<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        ripple Directive
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
    "v-ripple usage": {
      "template": "<div class=\"text-center\">\n<span v-ripple class=\"mt-12 pa-12 rippl br-md cursor-pointer\">click me</span>\n</div>",
      "script": "",
      "style": ".rippl{\nbackground-color: var(--color-sheet-container-low);\ncolor: var(--color-on-sheet);\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>