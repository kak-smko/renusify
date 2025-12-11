<template>
  <section>
    <r-meta title="rTimeAgo Component | Renusify"
            description="Document with example for Renusify rTimeAgo component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rTimeAgo Component
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
    "TimeAgo usage": {
      "template": "<r-time-ago\n:time=\"time\"\n:no-Trans=\"noTrans\"\n:live-Time=\"liveTime\"\n:live=\"live\"\n></r-time-ago>",
      "script": "import { ref } from 'vue'\nconst time = ref(Date.now() - (60 * 60 * 24 * 1000)) // 1 day ago\nconst noTrans = ref(true)\nconst liveTime = ref(2000)\nconst live = ref(false)",
      "style": ""
    }
  },
  "props": [
    {
      "name": "time",
      "description": "The time value to display relative time for @type {Number|String|Date} @required",
      "type": "",
      "default": "undefined"
    },
    {
      "name": "noTrans",
      "description": "Disables translation, shows English text only @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "liveTime",
      "description": "Update interval in milliseconds for live updates @type {Number} @default 5000",
      "type": "Number",
      "default": "5000"
    },
    {
      "name": "live",
      "description": "Enables live time updates @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>