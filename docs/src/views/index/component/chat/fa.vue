<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-chat
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        این کامپوننت
        <r-btn readonly size="small"> r-chat</r-btn>
        به شما اجازه می‌دهد اتاق‌های گفت و گویی بسازید، به آنها ملحق شوید و با
        استفاده از اموجی، احساسات خود را بیان کنید و برای بارگیری پیام‌های قبلی
        به بالا اسکرول کنید.
      </p>
    </div>
    <table-props :items="props"></table-props>
    <table-events :items="events" class="mt-5"></table-events>
  </section>
  <section class="mt-10">
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "sendByEnter": false,
    "placeholder": "type here",
    "hideBottomBtn": false,
    "hideSend": false,
    "maxLenMsg": 200,
    "participants": {"1":{"name":"smko","img":"/"},"2":{"name":"pegi","img":"/"},},
    "messages": [{
      "type": "text",
      "content": "hi, Pegi",
      "_id": "bllfcfdedfa7egkf",
      "created_at": "2023-08-17T15:55:40.309Z",
      "user_id":"1"
    },{
      "type": "text",
      "content": "hi, smko",
      "_id": "bllfcfdedfa7egkm",
      "created_at": "2023-08-17T15:57:40.309Z",
      "user_id":"2"
    }],
    "myself": {"id":"1","name":"smko","img":"/"},
    "title": null,
    "canFile": false,
    "maxFileSize": 1048576,
    "uploadLink": "/storage/chat",
    "newMsg":{num: 0,first_id: null}
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-chat style="height:300px" :send-By-Enter="sendByEnter" :placeholder="placeholder" :hide-bottom-btn="hideBottomBtn" :hide-send="hideSend" :max-len-msg="maxLenMsg" :new-msg="newMsg" :participants="participants" :messages="messages" :myself="myself" :title="title" :can-file="canFile" :max-file-size="maxFileSize" :upload-link="uploadLink" @see="log(`see`,$event)" @msg-submit="log(`msg-submit`,$event)" ></r-chat>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "chat",
  data() {
    return {
      props: [
        {
          prop: "sendByEnter",
          type: "Boolean",
          default: "null",
          description: "فرستادن پیام با زدن کلید enter",
        },
        {
          prop: "placeholder",
          type: "String",
          default: "type here",
          description:
              "قبل از اینکه کاربر مقداری را وارد کند، راهنمایی کوتاه در قسمت ورودی نمایش داده می شود.",
        },
        {
          prop: "hideBottomBtn",
          type: "Boolean",
          default: "null",
          description: "مخفی کردن پایین Btn",
        },
        {
          prop: "hideSend",
          type: "Boolean",
          default: "null",
          description: "مخفی کردن فرستادن پیام",
        },
        {
          prop: "maxLenMsg",
          type: "Number",
          default: "200",
          description: "حداکثر طول پیام",
        },
        {
          prop: "newMsg",
          type: "Object",
          default: "{num: 0,first_id: null}",
          description: "پیام جدید",
        },
        {
          prop: "participants",
          type: "Object",
          default: "undefined",
          description: "شركت كنندگان",
        },
        {
          prop: "messages",
          type: "Array",
          default: "undefined",
          description: "پیام ها",
        },
        {
          prop: "myself",
          type: "Object",
          default: "undefined",
          description: "پیام های خودت",
        },
        {
          prop: "title",
          type: "String",
          default: "null",
          description: "عنوان",
        },
        {
          prop: "canFile",
          type: "Boolean",
          default: "null",
          description: "فایل",
        },
        {
          prop: "maxFileSize",
          type: "Number",
          default: "1048576",
          description: "حداکثر حجم فایل",
        },
        {
          prop: "uploadLink",
          type: "String",
          default: "/storage/chat",
          description: "آپلود کردن لینک",
        },
      ],
      events: [
        {event: "see", description: ""},
        {event: "msg-submit", description: ""},
      ],
    };
  },
};
</script>
