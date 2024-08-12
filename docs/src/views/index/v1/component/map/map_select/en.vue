<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-map-select
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-map-select</r-btn>
        Do you have the ability to select a route
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
    "height": "500px",
    "zoom": 13
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-map-select v-model="modelValue" :height="height" :zoom="zoom" @update:model-Value="log(`update:modelValue`,$event)" ></r-map-select>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6">
      <div>{{ valid }}</div>
      <r-map-select v-model="valid"></r-map-select>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
  return {
    value:null
  }
}"
        template='<div>{{ value }}</div>
      <r-map-select v-model="value" :zoom=15></r-map-select>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "map_select",
  data() {
    return {
      props: [
        {
          prop: "modelValue",
          type: "Array",
          default: "null",
          description: "When you click on the map, it returns the value.",
        },
        {
          prop: "height",
          type: "String",
          default: "500px",
          description: "Height",
        },
        {
          prop: "zoom",
          type: "Number",
          default: "13",
          description: "Zoom rate",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
