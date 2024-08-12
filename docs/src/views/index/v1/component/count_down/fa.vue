<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-count-down
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-count-down</r-btn>
        کامپوننتی که تایمر شمارش معکوس را به صورت ساعت، دقیقه و ثانیه نمایش
        می‌ده .
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
    "autoStart": true,
    "interval": 1000,
    "time": 500000
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-count-down :auto-Start="autoStart" :interval="interval" :time="time" @start="log(`start`,$event)" @end="log(`end`,$event)" ></r-count-down>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="d-flex h-space-between">
      <r-btn @click="d = true">Start</r-btn>
      <r-count-down :autoStart="d" :time="30000"></r-count-down>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
 start: false,
  }
}"
        template='   <r-btn @click="start = true">Start</r-btn>
      <r-count-down :autoStart="d" :time="30000"></r-count-down>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="d-flex h-space-between">
      <r-btn @click="d = true">Start</r-btn>
      <r-count-down :autoStart="d" :time="3000000"></r-count-down>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
 start: false,
  }
}"
        template='   <r-btn @click="start = true">Start</r-btn>
      <r-count-down :autoStart="start" :time="30000"></r-count-down>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "count_down",
  data() {
    return {
      d: false,
      props: [
        {
          prop: "autoStart",
          type: "Boolean",
          default: "true",
          description: "پیشفرض رندر  می شود .",
        },
        {
          prop: "interval",
          type: "Number",
          default: "1000",
          description: "مدت زمان کم شدن زمان یک ثانیه است. ",
        },
        {
          prop: "time",
          type: "Number",
          default: "0",
          description: "کاهش زمان بر حسب میلی ثانیه",
        },
      ],
      events: [
        {
          event: "start",
          description: "به محض اینکه شروع شد تابعی را فراخوانی کند .",
        },
        {
          event: "end",
          description: "به محض اینکه زمان تمام شد تابعی را فراخوانی کند .",
        },
      ],
    };
  },
};
</script>
