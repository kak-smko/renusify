<template>
  <section>
    <r-meta title="rBtnGroup Component | Renusify"
            description="Document with example for Renusify rBtnGroup component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rBtnGroup Component
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
    "button group usage": {
      "template": "<r-btn-group\n:items=\"buttonItems\"\n:icon=\"showIcon\"\n:is-select=\"isSelect\"\n:exact=\"exact\"\nv-model=\"selectedValue\"\n@open=\"log('open', $event)\"\n@update:model-Value=\"log('update:modelValue', $event)\"\n></r-btn-group>",
      "script": "import { ref } from 'vue'\n// Button items with descriptive SVG icons\nconst buttonItems = ref({\ninsertOrderedList: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M7 13v-2h14v2H7m0 6v-2h14v2H7M7 7V5h14v2H7M3 8V5H2V4h2v4H3m-1 9v-1h3v4H2v-1h2v-.5H3v-1h1V17H2m2.25-7a.75.75 0 0 1 .75.75c0 .2-.08.39-.21.52L3.12 13H5v1H2v-.92L4 11H2v-1h2.25Z\"/></svg>`,\ninsertUnorderedList: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M3 4h4v4H3V4m6 1v2h12V5H9m-6 5h4v4H3v-4m6 1v2h12v-2H9m-6 5h4v4H3v-4m6 1v2h12v-2H9\"/></svg>`,\nsubscript: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M16 7.41L11.41 12L16 16.59L14.59 18L10 13.41L5.41 18L4 16.59L8.59 12L4 7.41L5.41 6L10 10.59L14.59 6L16 7.41m5.85 13.62h-4.88v-1l.89-.8c.76-.65 1.32-1.19 1.7-1.63c.37-.44.56-.85.57-1.24a.898.898 0 0 0-.27-.7c-.18-.16-.47-.28-.86-.28c-.31 0-.58.06-.84.18l-.66.38l-.45-1.17c.27-.21.59-.39.98-.53s.82-.24 1.29-.24c.78.04 1.38.25 1.78.66c.4.41.62.93.62 1.57c-.01.56-.19 1.08-.54 1.55c-.34.47-.76.92-1.27 1.36l-.64.52v.02h2.58v1.35Z\"/></svg>`,\nsuperscript: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M16 7.41L11.41 12L16 16.59L14.59 18L10 13.41L5.41 18L4 16.59L8.59 12L4 7.41L5.41 6L10 10.59L14.59 6L16 7.41M21.85 9h-4.88V8l.89-.82c.76-.64 1.32-1.18 1.7-1.63c.37-.44.56-.85.57-1.23a.884.884 0 0 0-.27-.7c-.18-.19-.47-.28-.86-.29c-.31.01-.58.07-.84.17l-.66.39l-.45-1.17c.27-.22.59-.39.98-.53S18.85 2 19.32 2c.78 0 1.38.2 1.78.61c.4.39.62.93.62 1.57c-.01.56-.19 1.08-.54 1.55c-.34.48-.76.93-1.27 1.36l-.64.52v.02h2.58V9Z\"/></svg>`,\nbold: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M13.5 15.5H10v-3h3.5A1.5 1.5 0 0 1 15 14a1.5 1.5 0 0 1-1.5 1.5m-3.5-9h3A1.5 1.5 0 0 1 14.5 8A1.5 1.5 0 0 1 13 9.5h-3m5.6 1.29c.97-.68 1.65-1.79 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.1 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42Z\"/></svg>`,\nitalic: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8Z\"/></svg>`,\nstrikeThrough: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M3 14h18v-2H3m2-8v3h5v3h4V7h5V4m-9 15h4v-3h-4v3Z\"/></svg>`,\nunderline: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M5 21h14v-2H5v2m7-4a6 6 0 0 0 6-6V3h-2.5v8a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 11V3H6v8a6 6 0 0 0 6 6Z\"/></svg>`,\ninsertHorizontalRule: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M0 24h24v-4H0v4Z\"/></svg>`,\nremoveFormat: `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"M6 5v.18L8.82 8h2.4l-.72 1.68l2.1 2.1L14.21 8H20V5H6M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21L18 19.73L3.55 5.27L3.27 5Z\"/></svg>`\n})\nconst showIcon = ref(true) // Whether to show icons\nconst isSelect = ref(false) // Selection mode\nconst exact = ref(false) // Exact matching\nconst selectedValue = ref(null) // Currently selected value\nconst log = (name, event) => {\nconsole.log(name, event)\n}",
      "style": ""
    }
  },
  "props": [
    {
      "name": "items",
      "description": "Array or object of items to display in the button group. When isSelect is true, items should be objects with 'icon' and 'items' properties. @type {Array|Object}",
      "type": "[Array, Object]",
      "default": "undefined"
    },
    {
      "name": "icon",
      "description": "Whether to display items as icons @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "isSelect",
      "description": "Enables select mode with dropdown list @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "exact",
      "description": "Exact matching for selection @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "modelValue",
      "description": "Currently selected item index @type {Number|String}",
      "type": "[Number, String]",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "open",
      "description": "Emitted when the dropdown is opened or closed",
      "params": "@param {Boolean} isOpen - Whether dropdown is open"
    },
    {
      "name": "update:modelValue",
      "description": "Emitted when selection changes .menu - Menu index (for select mode) .item - Selected item (for select mode)",
      "params": "@param {Number|String|Object} value - Selected value\n@param {Number} value.menu - Menu index (for select mode)\n@param {Object} value.item - Selected item (for select mode)"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for custom button content. Provides item scoped prop",
      "props": "item: item"
    },
    {
      "name": "list",
      "description": "Named slot for custom list item content. Provides item scoped prop",
      "props": "item: item"
    }
  ],
  "expose": [],
  "provide": []
}
</script>