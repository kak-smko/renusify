<template>
  <section>
    <r-meta title="rCalendar Component | Renusify"
            description="Document with example for Renusify rCalendar component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rCalendar Component
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
      "template": "<rCalendar \n :lang=\"lang\"\n :readonly=\"readonly\"\n :showHeaders=\"showHeaders\"\n :isDateDisabled=\"isDateDisabled\"\n :year=\"year\"\n :month=\"month\"\n@change=\"log('change',$event)\"\n@select=\"log('select',$event)\">\n</rCalendar>",
      "script": "import {ref} from 'vue';\n\nconst lang=ref(null)\nconst readonly=ref(null)\nconst showHeaders=ref(true)\nconst isDateDisabled=ref(() => false)\nconst year=ref(null)\nconst month=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "lang",
      "description": "Language/locale for calendar display @type {String}",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "readonly",
      "description": "Makes the calendar read-only @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "showHeaders",
      "description": "Shows calendar headers with navigation controls @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "isDateDisabled",
      "description": "Function to determine if a date should be disabled @type {Function} @default () => false @param {Date} date - Date to check @returns {Boolean} - Whether date is disabled",
      "type": "Function",
      "default": "() => false"
    },
    {
      "name": "year",
      "description": "Initial year to display @type {Number}",
      "type": "Number",
      "default": "undefined"
    },
    {
      "name": "month",
      "description": "Initial month to display (0-11) @type {Number}",
      "type": "Number",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "change",
      "description": "Emitted when the visible period changes .start - Start date of visible period .end - End date of visible period",
      "params": "@param {Object} range - Date range object\n@param {Date} range.start - Start date of visible period\n@param {Date} range.end - End date of visible period"
    },
    {
      "name": "select",
      "description": "Emitted when a date is selected",
      "params": "@param {String} dateString - ISO string of selected date"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for custom date cell content. Provides date scoped prop",
      "props": "date: item.date"
    }
  ],
  "expose": [],
  "provide": []
}
</script>