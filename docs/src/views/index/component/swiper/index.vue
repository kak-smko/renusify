<template>
  <section>
    <r-meta title="rSwiper Component | Renusify"
            description="Document with example for Renusify rSwiper component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rSwiper Component
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
    "Swiper usage": {
      "template": "<r-swiper\n:items=\"items\"\n:width-Item=\"widthItem\"\n:dots=\"dots\"\n:num-Show=\"numShow\"\n>\n<template v-slot=\"{ item }\">\n<r-card class=\"d-flex h-center v-center ma-2\" style=\"height: 200px\">\n{{ item.name }}\n</r-card>\n</template>\n</r-swiper>",
      "script": "import { ref } from 'vue'\nconst items = ref([\n{ name: 'One' },\n{ name: 'Two' },\n{ name: 'Three' },\n{ name: 'Four' },\n{ name: 'Five' },\n{ name: 'Six' },\n{ name: 'Seven' },\n{ name: 'Eight' },\n{ name: 'Nine' },\n{ name: 'Ten' }\n])\nconst widthItem = ref(null)\nconst dots = ref(true)\nconst numShow = ref(5)",
      "style": ""
    }
  },
  "props": [
    {
      "name": "items",
      "description": "Array of items to display in the swiper @type {Array}",
      "type": "Array",
      "default": "undefined"
    },
    {
      "name": "widthItem",
      "description": "Fixed width for each swiper item in pixels @type {Number}",
      "type": "Number",
      "default": "undefined"
    },
    {
      "name": "dots",
      "description": "Shows navigation dots @type {Boolean}",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "numShow",
      "description": "Number of items to show simultaneously, or responsive object @type {Number|Object}",
      "type": "[Number, Object]",
      "default": "undefined"
    }
  ],
  "emits": [],
  "slots": [
    {
      "name": "left",
      "description": "@slot Left navigation slot\n@binding {Function} left - Function to navigate left/previous",
      "props": "left: left"
    },
    {
      "name": "right",
      "description": "@slot Right navigation slot\n@binding {Function} right - Function to navigate right/next",
      "props": "right: right"
    },
    {
      "name": "default",
      "description": "@slot Default slot for swiper item content\n@binding {*} item - Current item data\n@binding {Number} index - Item index",
      "props": "item: item, index: i"
    },
    {
      "name": "dots",
      "description": "@slot Slot for custom dots rendering\n@binding {Function} go - Function to go to a specific slide\n@binding {Number} index - Slide index",
      "props": "go: goToSlide, index: n"
    }
  ],
  "expose": [],
  "provide": []
}
</script>