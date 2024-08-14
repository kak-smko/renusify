<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-infinite-page
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-infinite-page</r-btn>
        هنگام scroll اتوماتیک loading می شود .
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
              "لینک دریافت اطلاعات که مقدار برگشتی آن باید بر اساس فرمت {data:Array,total:Number} باشد.",
        },
        {
          prop: "query",
          type: "Object",
          default: "undefined",
          description: "اگر خواستید پارامتری هم ارسال کنید",
        },
        {
          prop: "noItemMsg",
          type: "String",
          default: "ITEMS NOT FOUND",
          description: " عدم وجود پیام",
        },
        {
          prop: "distanceLoad",
          type: "Number",
          default: "150",
          description: "scroll بعداز چه فاصله انجام گیرد ",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "سرتیتر",
        },
      ],
    };
  },
};
</script>
