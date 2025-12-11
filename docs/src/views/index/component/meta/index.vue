<template>
  <section>
    <r-meta title="rMeta Component | Renusify"
            description="Document with example for Renusify rMeta component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rMeta Component
      </h1>
    </div>
    <table-props :items="info.props"></table-props>
    <table-events :items="info.emits"></table-events>
    <table-provide :items="info.provide"></table-provide>
    <table-expose :items="info.expose"></table-expose>
    <table-slots :items="info.slots"></table-slots>
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
    "Basic usage": {
      "template": "<r-meta\ntitle=\"pageTitle\"\ndescription=\"pageDescription\"\nkeywords=\"test,test2\"\n/>",
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