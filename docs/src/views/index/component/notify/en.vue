<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-notify
      </h1>
    </div>
  </section>
  <br/>
  <section>
    <h1 class="font-weight-bold color-white title ps-4 pt-1 pb-1 br-sm">
      Examples for r-notify
    </h1>
    <div>
      برای نمایش ییام ها باید ابتدا در قسمت تنظیمات renusify در هنگام نصب مقدار
      useNotify را برابر true قرار دهید.
    </div>
    <table-props
        :items="[
        {
          prop: 'notifyLeft',
          type: 'Boolean',
          default: 'false',
          description: 'پیام های اطلاع رسانی را در سمت چپ صفحه نمایش می دهد.',
        },
        {
          prop: 'notifyTop',
          type: 'Boolean',
          default: 'false',
          description: 'پیام های اطلاع رسانی را در بالای صفحه نمایش می دهد.',
        },
        {
          prop: 'permanent',
          type: 'Boolean',
          default: 'false',
          description: 'نمایش دائمی یبام ها',
        },
        {
          prop: 'status',
          type: 'String',
          default: 'info',
          description: 'رنگ پیام ها',
        },
        {
          prop: 'width',
          type: 'String',
          default: '350px',
          description: 'عرض پیام ها',
        },
        {
          prop: 'timeout',
          type: 'Number',
          default: '4000',
          description: 'زمان نمایش پیام ها',
        },
      ]"
    ></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "msg": {"head":"title msg","body":"this is a message."}
 }
},
methods:{
  notify(status){
    this.$notify(this.msg,{
    "timeout":5000,
      "status":status,
      "permanent":false,
      width:"300px",
      on_close_all:()=>{
        console.log("close all")
      },
      on_close:()=>{
        console.log("close")
      },
      on_click:()=>{
        console.log("click")
      }
    });
  }
}'
        template='<r-notify>
  <template v-slot="{data}">
    <div>
      <div class="title">{{data.content.head}}</div>
      <div>{{data.content.body}}</div>
    </div>
  </template>
</r-notify>
<r-btn @click="notify(`info`)">show info</r-btn>
<r-btn @click="notify(`error`)">show error</r-btn>
<r-btn @click="notify(`success`)">show success</r-btn>
<r-btn @click="notify(`warning`)">show warning</r-btn>
'
    >
    </r-code-editor>
  </section>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
};
</script>

