<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-form-creator
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-form-creator</r-btn>
        فرم ها را بصورت خودکار می سازد .
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
    "url": null,
    "title": "Add form",
    "autoSend": false,
    "redirect": null,
    "method": "post",
    "headers": null,
    "options": {
      name:{"type": "r-text-input","props":{"rules": ["required"]}},
      family:{"type": "r-text-input","props":{"rules": ["required"]}},
      age:{"type": "r-number-input",$if:[["$name","!=","$family"]],"props":{"rules": ["required","min:7","max:70"]}},
      phone:{"type": "r-mask-input",$if:[["$age",">",7],["$age","<=",60]],"props":{"rules": ["required"],"mask": "0NNN NNN NNNN"}},
      mix:{"type": "r-text-input","$bind":[["label","name"]]},
     }
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-form-creator :url="url" :title="title" :auto-Send="autoSend" :redirect="redirect" :method="method" :options="options" v-model="modelValue" :headers="headers" @update:model-Value="log(`update:modelValue`,$event)" @ok="log(`ok`,$event)" ></r-form-creator>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Title</span>
    </h1>
    <section>
      <r-card>
        <r-form-creator title="title Form"></r-form-creator>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='  <r-card>
        <r-form-creator title="title Form"> </r-form-creator>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Url</span>
    </h1>
    <section>
      <r-card>
        <r-form-creator title="title Form" url="url"></r-form-creator>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='  <r-card>
        <r-form-creator title="title Form"  url="url"> </r-form-creator>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Method</span>
    </h1>
    <section>
      <r-card>
        <r-form-creator method="post" title="title Form" url="url">
        </r-form-creator>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='  <r-card>
        <r-form-creator method="post"  title="title Form"  url="url"> </r-form-creator>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "form_creator",
  data() {
    return {
      props: [
        {
          prop: "url",
          type: "String",
          default: "undefined",
          description: "url که فرم را به آن ارسال می کند . ",
        },
        {
          prop: "title",
          type: "String",
          default: "Add form",
          description: "یک عنوان می تواند بگیرد ",
        },
        {
          prop: "autoSend",
          type: "Boolean",
          default: "null",
          description: "بصورت خودکار ارسال شود یا نه .",
        },
        {
          prop: "redirect",
          type: "String",
          default: "undefined",
          description: "این راهی برای هدایت کردن به صفحه دیگر است",
        },
        {
          prop: "method",
          type: "String",
          default: "post",
          description: "متد های فرم",
        },
        {
          prop: "options",
          type: "Object,Array",
          default: "undefined",
          description: "نوع داده ها را می توانیم مشخص کنیم .",
        },
        {
          prop: "modelValue",
          type: "Object",
          default: "{}",
          description: "مقدار فرم را برمی گرداند.",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "هدر ارسال فرم",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "ok", description: ""},
      ],
    };
  },
};
</script>
