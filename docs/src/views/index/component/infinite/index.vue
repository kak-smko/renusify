<template>
  <section>
    <r-meta title="rInfinite Component | Renusify"
            description="Document with example for Renusify rInfinite component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
        rInfinite Component
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
      "template": "<rInfinite \n :url=\"url\"\n :query=\"query\"\n :noItemMsg=\"noItemMsg\"\n :distanceLoad=\"distanceLoad\"\n :headers=\"headers\"\n :isChat=\"isChat\"\n :height=\"height\"\n :live=\"live\"\n :liveTimer=\"liveTimer\"\n@update:modelValue=\"log('update:modelValue',$event)\">\n</rInfinite>",
      "script": "import {ref} from 'vue';\n\nconst url=ref(null)\nconst query=ref(null)\nconst noItemMsg=ref('ITEMS NOT FOUND')\nconst distanceLoad=ref(150)\nconst headers=ref(null)\nconst isChat=ref(null)\nconst height=ref(null)\nconst live=ref(null)\nconst liveTimer=ref(10000)\nconst log=(name,e)=>{\n        console.log(name,e)\n        }"
    }
  },
  "props": [
    {
      "name": "url",
      "description": "API endpoint URL for fetching data @required @description The URL to fetch data from. Can be a relative or absolute URL. @example '/api/users'",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "query",
      "description": "Query parameters for the API request @description Query parameters to be sent with the request. Supports dynamic parameters for filtering, pagination, etc. @example { sortBy: 'created_at', sortOrder: 'desc' }",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "noItemMsg",
      "description": "Message to display when no items are found @description The text displayed in the UI when the data fetch returns an empty result. Can be overridden for localization or custom messaging. @example 'No records found'",
      "type": "String",
      "default": "ITEMS NOT FOUND"
    },
    {
      "name": "distanceLoad",
      "description": "Distance from bottom to trigger infinite loading @description Distance in pixels from the bottom of the scroll container that triggers loading more items (infinite scrolling). Smaller values trigger loading earlier, larger values trigger later. @example 200 // Triggers loading when 200px from bottom",
      "type": "Number",
      "default": "150"
    },
    {
      "name": "headers",
      "description": "Custom HTTP headers for the request @description Additional HTTP headers to include with the request. Useful for authentication, content-type specification, etc. @example { 'Authorization': 'Bearer token123' }",
      "type": "Object",
      "default": "undefined"
    },
    {
      "name": "isChat",
      "description": "Chat mode toggle When true, applies chat UI patterns like reverse order",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "height",
      "description": "Container height @description CSS height value for the container element. Accepts any valid CSS height value (px, %, vh, etc.). @example '500px'",
      "type": "String",
      "default": "undefined"
    },
    {
      "name": "live",
      "description": "Live updates toggle @description Enables automatic polling for live updates. When true, periodically fetches new data based on `liveTimer` interval.",
      "type": "Boolean",
      "default": "undefined"
    },
    {
      "name": "liveTimer",
      "description": "Live update interval in milliseconds @description Time interval (in milliseconds) between automatic live updates. Only applies when `live` prop is true. @example 5000 // Update every 5 seconds",
      "type": "Number",
      "default": "10000"
    }
  ],
  "emits": [
    {
      "name": "update:modelValue"
    }
  ],
  "slots": [
    {
      "name": "default",
      "description": "Default slot for contents. Provide items, total props",
      "props": "items: datacollection, total: total"
    }
  ],
  "expose": [],
  "provide": []
}
</script>