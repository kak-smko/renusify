<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-infinite-page
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-infinite-page</r-btn>
        It loads automatically when scrolling.
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
    "url": "home/products",
    "query": null,
    "noItemMsg": "ITEMS NOT FOUND",
    "distanceLoad": 150,
    "headers": null
}
}'
        template='<r-infinite-page :url="url" :query="query" :no-Item-Msg="noItemMsg" :distance-Load="distanceLoad" :headers="headers" >
    <template v-slot="props">
      {{props}}
    </template>
  </r-infinite-page>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "infinite_page",
  data() {
    return {
      items: [
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
          description: "If you want to send parameter",
        },
        {
          prop: "noItemMsg",
          type: "String",
          default: "ITEMS NOT FOUND",
          description: "There is no message",
        },
        {
          prop: "distanceLoad",
          type: "Number",
          default: "150",
          description: "How far does scrolling occur",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "Headers",
        },
      ],
    };
  },
};
</script>
