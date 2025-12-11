<template>
  <section>
    <r-meta title="rTour Component | Renusify"
            description="Document with example for Renusify rTour component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rTour Component
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
    "Tour usage": {
      "template": "<div>\n<div class=\"header1 py-4\">header1</div>\n<div class=\"header2 py-4\">header2</div>\n<div>\n<r-btn id=\"one\" @click=\"checkCode('click btn')\">Click</r-btn>\n</div>\n<r-tour\nabort-on-not-found\nref=\"tour\"\n:steps=\"[\n{ msg: 'Item One is on', key: '.header1' },\n{\nmsg: 'this is Btn',\nkey: '#one',\noptions: {\nclickable: true,\ndisable_next: true,\n},\n},\n{ msg: 'Item Two', key: '.header2' },\n]\"\n></r-tour>\n</div>",
      "script": "import { ref } from 'vue'\n// Template ref\nconst tour = ref(null)\n// Methods\nconst checkCode = (e) => {\nconsole.log(e)\nif (tour.value) {\ntour.value.next()\n}\n}",
      "style": ""
    }
  },
  "props": [
    {
      "name": "steps",
      "description": "Array of step configurations for the tour @type {Array} @default () => []",
      "type": "Array",
      "default": "() => {\r\n      return []\r\n    }"
    },
    {
      "name": "canFinish",
      "description": "Allows finishing the tour (shows finish button) @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "abortOnNotFound",
      "description": "Aborts the tour when a step element is not found @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "delay",
      "description": "Delay in milliseconds before starting the tour @type {Number} @default 2000",
      "type": "Number",
      "default": "2000"
    }
  ],
  "emits": [],
  "slots": [],
  "expose": [
    {
      "name": "next",
      "description": "Moves to the next step"
    },
    {
      "name": "prev",
      "description": "Moves to the previous step"
    },
    {
      "name": "reset",
      "description": "Resets tour styling and state"
    },
    {
      "name": "finish",
      "description": "Finishes the tour"
    },
    {
      "name": "step",
      "description": "Current step index @type {Number}"
    }
  ],
  "provide": []
}
</script>