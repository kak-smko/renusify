<template>
  <section>
    <r-meta title="rIcon Component | Renusify"
            description="Document with example for Renusify rIcon component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rIcon Component
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
    "basic usage": {
      "template": "<rIcon \n :width=\"width\"\n :height=\"height\"\n :disabled=\"disabled\"\n :exact=\"exact\">\n</rIcon>",
      "script": "import {ref} from 'vue';\n\nconst width=ref(null)\nconst height=ref(null)\nconst disabled=ref(null)\nconst exact=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "width",
      "description": "Width of the component @description CSS width value (e.g., '100px', '50%', 'auto') @example '100%' @example '300px'",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "height",
      "description": "Height of the component @description CSS height value (e.g., '100px', '50%', 'auto') @example '200px' @memberof ComponentProps",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "disabled",
      "description": "Whether the icon is disabled @description When true, user interaction is prevented and visual styling indicates disabled state",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "exact",
      "description": "Whether to apply exact icon for both rtl and ltr",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for icon content."
    }
  ],
  "expose": [],
  "provide": []
}
</script>