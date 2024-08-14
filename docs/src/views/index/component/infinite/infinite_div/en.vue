<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-infinite-div
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        A
        <r-btn readonly size="small"> r-infinite-div</r-btn>
        that repeats forever.
      </p>
    </div>

    <table-props :items="items"></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "isChat": false,
    "height": "400px",
    "url": "messages/list",
    "query": null,
    "live": false,
    "liveTimer": 10000,
    "headers": null
}
}'
        template='<r-infinite-div :is-Chat="isChat" :height="height" :url="url" :query="query" :live="live" :live-Timer="liveTimer" :headers="headers" ></r-infinite-div>'
    ></r-code-editor>
  </section>

  <br/>
  <br/>
</template>
<script>
export default {
  name: "infinite_div",
  data() {
    return {
      items: [
        {
          prop: "isChat",
          type: "Boolean",
          default: "null",
          description: "Automatically scrolling down",
        },
        {
          prop: "height",
          type: "String",
          default: "400px",
          description: "Height",
        },
        {
          prop: "url",
          type: "String",
          default: "undefined",
          description:
              "The link to receive information, the return value of which should be based on the {data:Array,total:Number} format.",
        },
        {
          prop: "query",
          type: "Object",
          default: "undefined",
          description: "If you want to send parameter.",
        },
        {prop: "live", type: "Boolean", default: "null", description: "Live"},
        {
          prop: "liveTimer",
          type: "Number",
          default: "10000",
          description:
              "After a certain amount of time, the page is refreshed again",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "Extra header for sending",
        },
      ],
    };
  },
};
</script>
