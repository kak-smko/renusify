<template>
  <section>
    <r-meta title="rNotify Component | Renusify"
            description="Document with example for Renusify rNotify component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rNotify Component
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
    "Notify usage": {
      "template": "<r-notify>\n<template v-slot=\"{data}\">\n<div>\n<div class=\"title\">{{data.content.head}}</div>\n<div>{{data.content.body}}</div>\n</div>\n</template>\n</r-notify>\n<r-btn @click=\"notify(`info`)\">show info</r-btn>\n<r-btn @click=\"notify(`error`)\">show error</r-btn>\n<r-btn @click=\"notify(`success`)\">show success</r-btn>\n<r-btn @click=\"notify(`warning`)\">show warning</r-btn>",
      "script": "const msg={\"head\":\"title msg\",\"body\":\"this is a message.\"}\nconst {$notify} = inject('renusify')\nconst notify=(status)=>{\n$notify(msg,{\n\"timeout\":5000,\n\"status\":status,\n\"permanent\":false,\nwidth:\"300px\",\non_close_all:()=>{\nconsole.log(\"close all\")\n},\non_close:()=>{\nconsole.log(\"close\")\n},\non_click:()=>{\nconsole.log(\"click\")\n}\n});\n}",
      "style": ""
    }
  },
  "props": [
    {
      "name": "permanent",
      "description": "Makes notifications permanent (no auto-dismiss) @type {Boolean} @default false",
      "type": "",
      "default": "false"
    },
    {
      "name": "top",
      "description": "Positions notifications at the top of the screen @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "left",
      "description": "Positions notifications at the left side of the screen @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "status",
      "description": "Default status/color for notifications @type {String} @default 'info'",
      "type": "String",
      "default": "info"
    },
    {
      "name": "width",
      "description": "Minimum width of the notifications container @type {String} @default '350px'",
      "type": "String",
      "default": "350px"
    },
    {
      "name": "timeout",
      "description": "Default auto-dismiss timeout in milliseconds @type {Number} @default 4000",
      "type": "Number",
      "default": "4000"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for custom notification content",
      "props": "data: item"
    }
  ],
  "expose": [],
  "provide": []
}
</script>