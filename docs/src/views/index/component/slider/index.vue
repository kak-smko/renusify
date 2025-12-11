<template>
  <section>
    <r-meta title="rSlider Component | Renusify"
            description="Document with example for Renusify rSlider component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rSlider Component
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
    "Slider usage": {
      "template": "<r-slider\n:slides=\"slides\"\n:startIndex=\"startIndex\"\n:appear=\"appear\"\n:speed=\"speed\"\n:w-p-h=\"wPH\"\n:slidesClass=\"slidesClass\"\n:mode=\"mode\"\n:transitionRight=\"transitionRight\"\n:transitionLeft=\"transitionLeft\"\n:autoplay=\"autoplay\"\n:progress=\"progress\"\n:arrow=\"arrow\"\n:dots=\"dots\"\n@index=\"log('index', $event)\"\n>\n<template v-slot=\"{ item }\">\n<div\nclass=\"d-flex w-full h-full v-center h-center display-4 color-white-text\"\n:style=\"{ backgroundColor: item.color }\"\n>\n{{ item.name }}\n</div>\n</template>\n</r-slider>",
      "script": "import { ref } from 'vue'\nconst slides = ref([\n{ name: \"one\", color: \"red\" },\n{ name: \"two\", color: \"blue\" },\n{ name: \"three\", color: \"green\" }\n])\nconst speed = ref(5000)\nconst wPH = ref(2)\nconst autoplay = ref(false)\nconst progress = ref(false)\nconst arrow = ref(false)\nconst dots = ref(true)\nconst startIndex = ref(0)\nconst appear = ref(true)\nconst slidesClass = ref(\"position-absolute h-full\")\nconst mode = ref(\"\")\nconst transitionRight = ref(\"slide-start-to-end\")\nconst transitionLeft = ref(\"slide-end-to-start\")\n// Methods\nconst log = (name, e) => {\nconsole.log(name, e)\n}",
      "style": ""
    }
  },
  "props": [
    {
      "name": "slides",
      "description": "Array of slide data items @type {Array} @default () => []",
      "type": "Array",
      "default": "() => []"
    },
    {
      "name": "speed",
      "description": "Autoplay interval in milliseconds @type {Number} @default 5000",
      "type": "Number",
      "default": "5000"
    },
    {
      "name": "wPH",
      "description": "Width to height ratio (width/height) @type {Number} @default 2",
      "type": "Number",
      "default": "2"
    },
    {
      "name": "startIndex",
      "description": "Initial slide index to display @type {Number} @default 0",
      "type": "Number",
      "default": "0"
    },
    {
      "name": "autoplay",
      "description": "Enables automatic slide progression @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "progress",
      "description": "Shows progress bar during autoplay @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "arrow",
      "description": "Shows navigation arrows @type {Boolean} @default false",
      "type": "Boolean",
      "default": "false"
    },
    {
      "name": "dots",
      "description": "Shows navigation dots @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "appear",
      "description": "Enables appear transition on initial render @type {Boolean} @default true",
      "type": "Boolean",
      "default": "true"
    },
    {
      "name": "slidesClass",
      "description": "Additional CSS classes for slides container @type {String|Object|Array}",
      "type": "[String, Object, Array]",
      "default": "undefined"
    },
    {
      "name": "mode",
      "description": "Vue transition mode @type {String} @default 'out-in'",
      "type": "String",
      "default": "out-in"
    },
    {
      "name": "transitionRight",
      "description": "CSS transition name for right/next direction @type {String} @default 'slider-right'",
      "type": "String",
      "default": "slider-right"
    },
    {
      "name": "transitionLeft",
      "description": "CSS transition name for left/previous direction @type {String} @default 'slider-left'",
      "type": "String",
      "default": "slider-left"
    }
  ],
  "emits": [
    {
      "name": "index",
      "description": "Emitted when slide index changes",
      "params": "@param {Number} index - New slide index"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "@slot Default slot for slide content.\nProvide item(Current slide data), width(Width of the slide container), height(Height of the slide container)"
    },
    {
      "name": "dots",
      "description": "Slot for custom dots rendering\nProvide {Function} go - Function to go to a specific slide\nProvide {Number} index - Slide index",
      "props": "go: goToSlide, index: n"
    }
  ],
  "expose": [],
  "provide": []
}
</script>