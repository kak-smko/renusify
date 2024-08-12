<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-slider
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        با استفاده از کامپوننت
        <r-btn readonly size="small"> r-slider</r-btn>
        شما می‌توانید یک اسلایدر حرفه‌ای ایجاد کنید.
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
    "slides":[{name:"one",color:"red"},{name:"two",color:"blue"},{name:"three",color:"green"}],
    "speed": 5000,
    "wPH": 2,
    "autoplay": false,
    "progress": false,
    "arrow": false,
    "dots": true,
    "startIndex":0,
    "appear":true,
    "slidesClass":"position-absolute h-full",
    "mode":"",
    "transitionRight":"slide-start-to-end",
    "transitionLeft":"slide-end-to-start"
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-slider :slides="slides" :startIndex="startIndex" :appear="appear" :speed="speed"
  :w-p-h="wPH" :slidesClass="slidesClass" :mode="mode" :transitionRight="transitionRight" :transitionLeft="transitionLeft"
  :autoplay="autoplay" :progress="progress" :arrow="arrow" :dots="dots" @index="log(`index`,$event)" >
    <template v-slot="{item}">
    <div class="d-flex w-full h-full v-center h-center display-4 color-white-text" :style="{backgroundColor:item.color}">
        {{item.name}}
      </div>
    </template>
  </r-slider>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Autoplay</span>
    </h1>
    <section>
      <r-slider
          :slides="[
          { name: 'PHP' },
          { name: 'JAVA' },
          { name: 'PYTHON' },
          { name: 'JAVASCRIPT' },
        ]"
          autoplay
          class="color-one"
          slidesClass="h-full"
      >
        <template v-slot="{ item }">
          <div
              class="background-two d-flex h-full w-full v-center h-center color-one-text"
          >
            {{ item.name }}
          </div>
        </template>
      </r-slider>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template=' <r-slider
        :slides="[
          { name: `PHP` },
          { name: `JAVA` },
          { name: `PYTHON` },
          { name: `JAVASCRIPT` },
        ]"
        autoplay
        class="color-one"
        slidesClass="h-full"
      >
        <template v-slot="{ item }">
          <div
            class="background-two d-flex h-full w-full v-center h-center color-one-text"
          >
            {{ item.name }}
          </div>
        </template>
      </r-slider>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Speed</span>
    </h1>
    <section>
      <r-slider
          :slides="[
          { name: 'One' },
          { name: 'Two' },
          { name: 'Three' },
          { name: 'Four' },
        ]"
          :speed="1000"
          autoplay
          class="color-success"
          slidesClass="h-full"
      >
        <template v-slot="{ item }">
          <div
              class="background-two d-flex h-full w-full v-center h-center color-success-text"
          >
            {{ item.name }}
          </div>
        </template>
      </r-slider>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
            <r-slider
        :speed="1000"
        :slides="[
          { name: `PHP` },
          { name: `JAVA` },
          { name: `PYTHON` },
          { name: `JAVASCRIPT` },
        ]"
        autoplay
        slidesClass="h-full"
      >
        <template v-slot="{ item }">
          <div
            class="background-two d-flex h-full w-full v-center h-center color-success-text"
          >
            {{ item.name }}
          </div>
        </template>
      </r-slider>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>wPH</span>
    </h1>
    <section>
      <r-slider
          :slides="[
          { name: 'One' },
          { name: 'Two' },
          { name: 'Three' },
          { name: 'Four' },
        ]"
          :wPH="5 / 1"
          autoplay
      >
        <template v-slot="{ item }">
          <div
              class="color-info text-center py-20 color-white-text"
              style="width: 100%"
          >
            {{ item.name }}
          </div>
        </template>
      </r-slider>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
             <r-slider
        :wPH="5 / 1"
        :slides="[
          { name: `PHP` },
          { name: `JAVA` },
          { name: `PYTHON` },
          { name: `JAVASCRIPT` },
        ]"
        autoplay
      >
        <template v-slot="{ item }">
          <div
            class="color-info text-center py-20 color-white-text"
            style="width: 100%"
          >
            {{ item.name }}
          </div>
        </template>
      </r-slider>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Progress</span>
    </h1>
    <section>
      <r-slider
          :slides="[
          { name: 'One' },
          { name: 'Two' },
          { name: 'Three' },
          { name: 'Four' },
        ]"
          :wPH="4 / 2"
          autoplay
          progress
      >
        <template v-slot="{ item }">
          <div class="color-success text-center h-full w-full py-20">
            {{ item.name }}
          </div>
        </template>
      </r-slider>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                 <r-slider
        :wPH="4 / 2"
        progress
        :slides="[
          { name: `PHP` },
          { name: `JAVA` },
          { name: `PYTHON` },
          { name: `JAVASCRIPT` },
        ]"
        autoplay
      >
        <template v-slot="{ item }">
          <div
            class="color-success text-center h-full w-full py-20"
          >
            {{ item.name }}
          </div>
        </template>
      </r-slider>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Arrow</span>
    </h1>
    <section>
      <r-slider
          :slides="[
          { name: 'One' },
          { name: 'Two' },
          { name: 'Three' },
          { name: 'Four' },
        ]"
          :wPH="4 / 2"
          arrow
          autoplay
          progress
      >
        <template v-slot="{ item }">
          <div class="color-warning display-3 d-flex h-center v-center w-full">
            {{ item.name }}
          </div>
        </template>
      </r-slider>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                <r-slider
        :wPH="4 / 2"
        progress
        arrow
        :slides="[
          { name: `PHP` },
          { name: `JAVA` },
          { name: `PYTHON` },
          { name: `JAVASCRIPT` },
        ]"
        autoplay
      >
        <template v-slot="{ item }">
          <div
            class="color-warning display-3 d-flex h-center v-center w-full"
          >
            {{ item.name }}
          </div>
        </template>
      </r-slider>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "slider",
  data() {
    return {
      props: [
        {
          prop: "slides",
          type: "Array",
          default: "[]",
          description: "اسلایدر",
        },
        {
          prop: "speed",
          type: "Number",
          default: "5000",
          description: "سرعت عوض شدن اسلایدرها",
        },
        {
          prop: "startIndex",
          type: "Number",
          default: "1",
          description: "شروع از اسلاید",
        },
        {
          prop: "appear",
          type: "Boolean",
          default: "true",
          description: "اسلاید اول با انیمه ظاهر شود",
        },
        {
          prop: "slidesClass",
          type: "String,Object,Array",
          default: "null",
          description: "کلاس اضافه برای اسلایدها",
        },
        {
          prop: "mode",
          type: "String",
          default: "out-in",
          description: "مود انتقال",
        },
        {
          prop: "transitionRight",
          type: "String",
          default: "slider-right",
          description: "کلاس انتقال به راست",
        },
        {
          prop: "transitionLeft",
          type: "String",
          default: "slider-left",
          description: "کلاس انتقال به چپ",
        },
        {
          prop: "wPH",
          type: "Number",
          default: "2",
          description: "نسبت ابعاد",
        },
        {
          prop: "autoplay",
          type: "Boolean",
          default: "false",
          description: "پخش اتوماتیک ",
        },
        {
          prop: "progress",
          type: "Boolean",
          default: "false",
          description: "اضافه کردن progress به اسلایدرها",
        },
        {
          prop: "arrow",
          type: "Boolean",
          default: "false",
          description: "اضافه کردن arrow ",
        },
        {
          prop: "dots",
          type: "Boolean",
          default: "true",
          description: "اضافه کردن dots ",
        },
      ],
      events: [{event: "index", description: ""}],
    };
  },
};
</script>
