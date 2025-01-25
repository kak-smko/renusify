<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-float
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        ویژگی
        <r-btn readonly size="small"> r-float</r-btn>
        یک عنصر را در سمت چپ یا راست محتویات خود قرار می‌دهد و به متن و عناصر
        درون خطی اجازه می‌دهد که به اطراف آن بچرخند .
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
    "bordered": true,
    "disableZoom": false,
    "disableMove": false,
    "trnsfrmOrigin": null,
    "zoom": .8,
    "maxZoom": 10,
    "minZoom": 0.1
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-float :bordered="bordered" :disable-Zoom="disableZoom" :disable-Move="disableMove" :trnsfrm-Origin="trnsfrmOrigin" :zoom="zoom" :max-Zoom="maxZoom" :min-Zoom="minZoom" @move="log(`move`,$event)" @zoom="log(`zoom`,$event)" >
    <div class="color-one" style="height:600px"></div>
</r-float>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-5">
      <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
        PROP / <span>DisableZoom</span>
      </h1>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='<r-float disableZoom class="color-warning pa-4">
          <div class="color-one" style="height:600px"></div>
        </r-float>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-5">
      <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
        PROP / <span>DisableMove</span>
      </h1>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<r-float disableMove class="color-one pa-4">
          <div class="color-one" style="height:600px"></div>
        </r-float>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-5">
      <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
        Event / <span>Zoom</span>
      </h1>
      <r-card class="d-flex flex-column pt-5">
        <div class="subtitle-2">{{ r }}</div>
        <r-float class="color-gradient-one-45 pa-4" @zoom="r = $event">
          <r-btn>Click Me</r-btn>
        </r-float>
        <div class="pa-2 text-end color-success-text">Active Move</div>
        <r-divider class="color-gradient-one mx-3"></r-divider>
        <div class="pa-2 text-end color-success-text">Active Zoom</div>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
 r:false,
  }
}"
        template='    <r-card class="d-flex flex-column pt-5">
        <div class="subtitle-2">{{ r }}</div>
        <r-float class="color-gradient-one-45 pa-4" @zoom="r = $event">
         <div class="color-one" style="height:600px"></div>
        </r-float>
        <div class="pa-2 text-end color-success-text">Active Move</div>
        <r-divider class="color-gradient-one mx-3"></r-divider>
        <div class="pa-2 text-end color-success-text">Active Zoom</div>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-5">
      <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
        Event / <span>Move</span>
      </h1>
      <r-card class="d-flex flex-column pt-5">
        <div class="subtitle-2">{{ r }}</div>
        <r-float class="color-info pa-4" @move="r = $event">
          <r-btn>Click Me</r-btn>
        </r-float>
        <div class="pa-2 text-end color-success-text">Active Move</div>
        <r-divider class="color-info mx-3"></r-divider>
        <div class="pa-2 text-end color-success-text">Active Zoom</div>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
 r:false,
  }
}"
        template='     <r-card class="d-flex flex-column pt-5">
        <div class="subtitle-2">{{ r }}</div>
        <r-float class="color-info pa-4" @move="r = $event">
         <div class="color-one" style="height:600px"></div>
        </r-float>
        <div class="pa-2 text-end color-success-text">Active Move</div>
        <r-divider class="color-info mx-3"></r-divider>
        <div class="pa-2 text-end color-success-text">Active Zoom</div>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "float",
  data() {
    return {
      r: false,
      props: [
        {
          prop: "bordered",
          type: "Boolean",
          default: "null",
          description:
              "از ویژگی bordered برای تعیین نوع حاشیه عنصر استفاده می شود",
        },
        {
          prop: "disableZoom",
          type: "Boolean",
          default: "null",
          description: "بزرگنمایی را غیر فعال می کند ",
        },
        {
          prop: "disableMove",
          type: "Boolean",
          default: "null",
          description: "به حرکت درآمدن را غیر فعال می کند ",
        },
        {
          prop: "trnsfrmOrigin",
          type: "Object",
          default: "null",
          description: "جهت شروع حرکت را مشخص می کند",
        },
        {
          prop: "zoom",
          type: "Number",
          default: "1",
          description: "بزرگنمایی پیشفرض یک است و می توان آن را تغییر داد .",
        },
        {
          prop: "maxZoom",
          type: "Number",
          default: "10",
          description: "حداکثر زوم را مشخصی می کند ",
        },
        {
          prop: "minZoom",
          type: "Number",
          default: "0.1",
          description: "حداقل زوم را مشخص می کند",
        },
      ],
      events: [
        {
          event: "move",
          description:
              "وقتی شروع به حرکت کرد تابعی فراخوانی می شود که عرض و ارتفاع را نشان می دهد.",
        },
        {
          event: "zoom",
          description:
              "تابعی فراخوانی می‌شود که مقادیر زوم X، Y و Z را نمایش می‌دهد.",
        },
      ],
    };
  },
};
</script>
