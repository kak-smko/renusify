<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-infinite-box
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-infinite-box</r-btn>
        جعبه ای که برای همیشه تکرار می‌شود
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
    "color": "color-two",
    "isChat": false,
    "title": "messages",
    "url": "messages/list",
    "height": "400px",
    "query": null,
    "isLive": false,
    "liveTimer": 10000,
    "headers":null
}
}'
        template='<r-infinite-box :headers="headers" :color="color" :is-Chat="isChat" :title="title" :url="url" :height="height" :query="query" :is-Live="isLive" :live-Timer="liveTimer" >
	<template v-slot="{ item }">
	  {{item}}
	</template>
</r-infinite-box>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
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
          description: "رنگ مدنظر",
        },
        {
          prop: "isChat",
          type: "Boolean",
          default: "null",
          description: "scroll اتوماتیک به پایین هدایت می شود . ",
        },
        {
          prop: "title",
          type: "String",
          default: "title",
          description: "عنوان مدنظر",
        },
        {
          prop: "url",
          type: "String",
          default: "undefined",
          description:
              "لینک دریافت اطلاعات که مقدار برگشتی آن باید بر اساس فرمت {data:Array,total:Number} باشد.",
        },
        {
          prop: "height",
          type: "String",
          default: "400px",
          description: "ارتفاع ",
        },
        {
          prop: "query",
          type: "Object",
          default: "undefined",
          description: "اگر خواستید پارامتری هم ارسال کنید ",
        },
        {
          prop: "isLive",
          type: "Boolean",
          default: "null",
          description: "بطور زنده ",
        },
        {
          prop: "liveTimer",
          type: "Number",
          default: "10000",
          description: "بعداز تایم مدنظر دوباره صفحه رفرش می شود",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "هدر اضافی هنگام ارسال ",
        },
      ],
    };
  },
};
</script>
