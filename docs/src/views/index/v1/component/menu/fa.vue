<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-menu
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        کامپوننتی
        <r-btn readonly size="small"> r-menu</r-btn>
        منو را در موقعیت عنصری که برای فعال کردن آن استفاده می شود نشان می دهد.
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
    "modelValue": null,
    "label": "select",
    "icon": null,
    "value": "value",
    "justValue": false,
    "reverse": false,
    "overlay": false,
    "items": [
            { name: `home`,value:1 },
            { name: `blog`,value:2 },
            { name: `contact`,value:3 },
            { name: `about`,value:4 },
          ]
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-menu v-model="modelValue" :label="modelValue?modelValue.name:label" :icon="icon" :value="value" :just-Value="justValue" :reverse="reverse" :overlay="overlay" :items="items" @update:model-Value="log(`update:modelValue`,$event)" ></r-menu>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6">
      <r-card class="pa-4" outlined>
        <r-menu
            v-model="valid"
            :items="[
            { name: `home`, value: 1 },
            { name: `blog`, value: 2 },
            { name: `contact`, value: 3 },
            { name: `about`, value: 4 },
          ]"
            label="select"
        >
          <template v-slot="{ item }">
            <div>{{ item.name }}</div>
          </template>
        </r-menu>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  value:null
  }
}"
        template='
         <r-card class="pa-4" outlined>
        <r-menu
        label="select"
          v-model="value"
          :items="[
            { name: `home`,value:1 },
            { name: `blog`,value:2 },
            { name: `contact`,value:3 },
            { name: `about`,value:4 },
          ]"
        >
          <template v-slot="{ item }">
            <div>{{ item.name }}</div>
          </template>
        </r-menu>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "menu",
  data() {
    return {
      valid: null,
      props: [
        {
          prop: "modelValue",
          type: "String,Number,Object",
          default: "undefined",
          description: "باید فعال کردن کامپوننت باید مقداری وارد شود . ",
        },
        {
          prop: "label",
          type: "String",
          default: "null",
          description: "label منو",
        },
        {
          prop: "icon",
          type: "String",
          default: "undefined",
          description: "آیکون منو",
        },
        {
          prop: "value",
          type: "String",
          default: "value",
          description: "مقدار",
        },
        {
          prop: "justValue",
          type: "Boolean",
          default: "null",
          description: "مقدار خاصی",
        },
        {
          prop: "reverse",
          type: "Boolean",
          default: "null",
          description:
              "وقتی منو را چپ و راست می کنید ممکنه آیکون و نوشته معکوس شوند ",
        },
        {
          prop: "overlay",
          type: "Boolean",
          default: "null",
          description: "رویهم قرار بگیرند ",
        },
        {
          prop: "items",
          type: "Array",
          default: "null",
          description: "آیتم ها منو",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
