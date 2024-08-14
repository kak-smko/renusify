<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-tabs
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-tabs</r-btn>
        تب ها برای صفحات وب قادر به نمایش موضوعات مختلف عالی هستند.
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
    "modelValue": 1,
    "items": [{title:"one",value:1},{title:"two",value:2},{title:"three",value:3},{title:"four",value:4}],
    "wrapperClass": null,
    "tabClass": null,
    "tabActiveClass": "",
    "lineClass": null,
    "autoScrollToView": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-tabs v-model="modelValue" :items="items" :wrapper-Class="wrapperClass" :tab-Class="tabClass" :tab-Active-Class="tabActiveClass" :line-Class="lineClass" :auto-Scroll-To-View="autoScrollToView" @update:model-Value="log(`update:modelValue`,$event)" ></r-tabs>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Items</span>
    </h1>
    <section>
      <r-card class="pa-4" outlined>
        <r-tabs
            v-model="tab"
            :items="[
            { title: 'Item one', value: 'Item one' },
            { title: 'Item two', value: 'Item two' },
            { title: 'Item three', value: 'Item three' },
            { title: 'Item four', value: 'Item four' },
          ]"
            class="background-two color-one-text font-weight-black"
        >
        </r-tabs>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
    tab:null
  }
}"
        template='
         <r-card outlined class="pa-4">
        <r-tabs
          v-model="tab"
          :items="[
           { title: `Item one`, value: `Item one` },
            { title: `Item two`, value: `Item two` },
            { title: `Item three`, value: `Item three` },
            { title: `Item four`, value: `Item four` },
          ]"
          class="background-two color-one-text font-weight-black"
        >
        </r-tabs>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>WrapperClass</span>
    </h1>
    <section>
      <r-card class="pa-4" outlined>
        <r-tabs
            v-model="tab"
            :items="[
            { title: 'one', value: 'Item One' },
            { title: 'two', value: 'Item Two' },
            { title: 'three', value: 'Item Three' },
            { title: 'four', value: 'Item Four' },
          ]"
            class="font-weight-black"
            wrapperClass="color-info"
        >
        </r-tabs>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  tab:null
  }
}"
        template='
        <r-card outlined class="pa-4 ">
        <r-tabs
          wrapperClass="color-info"
          v-model="tab"
          :items="[
            { title: `Item one`, value: `Item one` },
            { title: `Item two`, value: `Item two` },
            { title: `Item three`, value: `Item three` },
            { title: `Item four`, value: `Item four` },
          ]"
          class="font-weight-black"
        >
        </r-tabs>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>TabClass</span>
    </h1>
    <section>
      <r-card class="pa-4" outlined>
        <r-tabs
            v-model="tab"
            :items="[
            { title: 'one', value: '1' },
            { title: 'two', value: '2' },
            { title: 'three', value: '3' },
            { title: 'four', value: '4' },
          ]"
            class="font-weight-black"
            tabClass="color-success px-5"
        >
        </r-tabs>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  tab:null
  }
}"
        template='
          <r-card outlined class="pa-4">
        <r-tabs
          tabClass="color-success px-5"
          v-model="tab"
          :items="[
             { title: `one`, value: 1 },
            { title: `two`, value: 2 },
            { title: `three`, value: 3 },
            { title: `four`, value: 4 },
          ]"
          class="font-weight-black"
        >
        </r-tabs>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>TabActiveClass</span>
    </h1>
    <section>
      <r-card class="pa-4" outlined>
        <r-tabs
            v-model="tab"
            :items="[
            { title: 'Item One', value: 'One' },
            { title: 'Item Two', value: 'Two' },
            { title: 'Item Three', value: 'Three' },
            { title: 'Item Four', value: 'Four' },
            { title: 'Item Five', value: 'Five' },
          ]"
            class="font-weight-black"
            lineClass="color-two"
            tabActiveClass="color-two-text"
        >
        </r-tabs>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  tab:null
  }
}"
        template='
           <r-card outlined class="pa-4">
        <r-tabs
          tabActiveClass="color-two-text"
          lineClass="color-two"
          v-model="tab"
          :items="[
            { title: `Item one`, value: `Item one` },
            { title: `Item two`, value: `Item two` },
            { title: `Item three`, value: `Item three` },
            { title: `Item four`, value: `Item four` },

          ]"
          class="font-weight-black"
        >
        </r-tabs>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "tabs",
  data() {
    return {
      tab: 0,
      props: [
        {
          prop: "modelValue",
          type: "String,Number,Boolean",
          default: "undefined",
          description: "",
        },
        {
          prop: "items",
          type: "Array",
          default: "undefined",
          description: "آیتم  می گیرد ",
        },
        {
          prop: "wrapperClass",
          type: "String",
          default: "undefined",
          description: "کلاسی به wrapper می دهیم",
        },
        {
          prop: "tabClass",
          type: "String",
          default: "undefined",
          description: "کلاسی که به Tab اضافه می شود ",
        },
        {
          prop: "tabActiveClass",
          type: "String",
          default: "",
          description: "وقتی فعال بود چه کلاسی بگیرد ",
        },
        {
          prop: "lineClass",
          type: "String",
          default: "undefined",
          description: "کلاس خط پایین تب",
        },
        {
          prop: "autoScrollToView",
          type: "Boolean",
          default: "false",
          description: " اسکرول خودکار",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
