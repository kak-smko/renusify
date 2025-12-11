<template>
  <section>
    <r-meta title="rBtn Component | Renusify" description="Document with example for Renusify rBtn component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rBtn Component
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
      "template": "<rBtn \n :tag=\"tag\"\n :type=\"type\"\n :size=\"size\"\n :label=\"label\"\n :labelClass=\"labelClass\"\n :block=\"block\"\n :depressed=\"depressed\"\n :outlined=\"outlined\"\n :rounded=\"rounded\"\n :icon=\"icon\"\n :fab=\"fab\"\n :text=\"text\"\n :tile=\"tile\"\n :disabled=\"disabled\"\n :readonly=\"readonly\"\n :loading=\"loading\"\n :ariaLabel=\"ariaLabel\"\n :activeClass=\"activeClass\"\n :exactActiveClass=\"exactActiveClass\"\n :link=\"link\"\n :href=\"href\"\n :to=\"to\"\n :target=\"target\"\n@click=\"log('click',$event)\">\n<template #default>\nClick Me\n</template>\n</rBtn>",
      "script": "import {ref} from 'vue';\n\nconst tag=ref('button')\nconst type=ref('button')\nconst size=ref('md')\nconst label=ref(null)\nconst labelClass=ref(null)\nconst block=ref(null)\nconst depressed=ref(null)\nconst outlined=ref(null)\nconst rounded=ref(null)\nconst icon=ref(null)\nconst fab=ref(null)\nconst text=ref(null)\nconst tile=ref(null)\nconst disabled=ref(null)\nconst readonly=ref(null)\nconst loading=ref(null)\nconst ariaLabel=ref('btn')\nconst activeClass=ref(null)\nconst exactActiveClass=ref(null)\nconst link=ref(null)\nconst href=ref(null)\nconst to=ref(null)\nconst target=ref(null)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "tag",
      "description": "The HTML tag to use for the button @values button, a, router-link, etc.",
      "type": "String",
      "default": "button"
    },
    {
      "name": "type",
      "description": "The type attribute for the button element @values button, submit, reset",
      "type": "String",
      "default": "button"
    },
    {
      "name": "size",
      "description": "The size of the button @values xs, sm, md, lg, xl,xxl",
      "type": "String",
      "default": "md"
    },
    {
      "name": "label",
      "description": "Text or number to display as a label on the button",
      "type": "[String, Number]",
      "default": "undefined"
    },
    {
      "name": "labelClass",
      "description": "Additional CSS classes for the label",
      "type": "[String, Array, Object]",
      "default": "undefined"
    },
    {
      "name": "block",
      "description": "Makes the button expand to full width",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "depressed",
      "description": "Removes the button's elevation",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "outlined",
      "description": "Outlined button style",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "rounded",
      "description": "Rounded button style",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "icon",
      "description": "Icon button style",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "fab",
      "description": "FAB (Floating Action Button) style",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "text",
      "description": "Text button style",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "tile",
      "description": "Removes border-radius",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "disabled",
      "description": "Disables the button",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "readonly",
      "description": "Makes the button read-only",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "loading",
      "description": "Shows loading state",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "ariaLabel",
      "description": "Custom aria-label for accessibility",
      "type": "String",
      "default": "btn"
    },
    {
      "name": "activeClass",
      "description": "Active class for router-link",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "exactActiveClass",
      "description": "Exact active class for router-link",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "link",
      "description": "Enables link styling",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "href",
      "description": "URL for link button",
      "type": "[String, Object]",
      "default": "undefined"
    },
    {
      "name": "to",
      "description": "Route location for vue-router",
      "type": "[String, Object]",
      "default": "undefined"
    },
    {
      "name": "target",
      "description": "Target attribute for links",
      "type": "String",
      "default": "undefined"
    }
  ],
  "emits": [
    {
      "name": "click",
      "description": "Emitted when button is clicked",
      "params": "@param {Event} event - Click event"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for button content",
      "example": "Click Me"
    }
  ],
  "expose": [],
  "provide": []
}
</script>