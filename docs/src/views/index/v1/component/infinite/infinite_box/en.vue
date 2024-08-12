<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-infinite-box
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-infinite-box</r-btn>
        A box that repeats forever.
      </p>
    </div>

    <table-props :items="items"></table-props>
  </section>
  <section>
    url response:{data:Array,total:Number}
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "color": "color-two",
    "isChat": false,
    "title": "messages",
    "url": "messages/list",
    "height": "400px",
    "query": null,
    "isLive": false,
    "liveTimer": 10000,
    "headers": null
}
}'
        template='<r-infinite-box :headers="headers" :color="color" :is-Chat="isChat" :title="title" :url="url" :height="height" :query="query" :is-Live="isLive" :live-Timer="liveTimer" >
	<template v-slot="{ item }">
	  {{item}}
	</template>
</r-infinite-box>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "infinite_box",
  data() {
    return {
      items: [
        {
          prop: "color",
          type: "String",
          default: "color-two",
          description: "Color",
        },
        {
          prop: "isChat",
          type: "Boolean",
          default: "null",
          description: "Automatically scrolling down",
        },
        {
          prop: "title",
          type: "String",
          default: "title",
          description: "Title",
        },
        {
          prop: "url",
          type: "String",
          default: "undefined",
          description:
              "The link to receive information, the return value of which should be based on the {data:Array,total:Number} format.",
        },
        {
          prop: "height",
          type: "String",
          default: "400px",
          description: "Height",
        },
        {
          prop: "query",
          type: "Object",
          default: "undefined",
          description: "If you want to send parameter.",
        },
        {
          prop: "isLive",
          type: "Boolean",
          default: "null",
          description: "Is Live",
        },
        {
          prop: "liveTimer",
          type: "Number",
          default: "10000",
          description:
              "After a certain amount of time, the page is refreshed again.",
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
