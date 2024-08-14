<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-search-box
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        Text field components are used for collecting user provided information.
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
    "closable": false,
    "notFoundMsg": "Cant Find Anything :(",
    "label": "search",
    "url": "home/product/search",
    "query": "search",
    "inputControlClass": null,
    "modelValue": null,
    "noOverlay": false,
    "openToTop": false,
    "headers": null,
    "categories":[{name:"laptop",value:"a"},{name:"mobile",value:"b"},{name:"pc",value:"c"}]
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-search-box :label="label" :categories="categories" :closable="closable" :not-Found-Msg="notFoundMsg" :url="url" :query="query" :input-Control-Class="inputControlClass" v-model="modelValue" :no-Overlay="noOverlay" :open-To-Top="openToTop" :headers="headers" @update:model-Value="log(`update:modelValue`,$event)" @select="log(`select`,$event)" ></r-search-box>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">Search Box</h1>
    <section class="d-flex h-space-around pt-6">
      <r-card class="pa-4 color-two-text w-45" outlined>
        <p>Default</p>
        <r-search-box url="home/product/search"></r-search-box>
      </r-card>
      <r-card class="pa-4 color-warning-text w-45" outlined>
        <p>closable</p>
        <r-search-box closable url="home/product/search"></r-search-box>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<div class="d-flex h-space-around">
	<r-card outlined class="pa-4 color-two-text w-45">
		<p>Default</p>
		<r-search-box url="home/product/search"></r-search-box>
	</r-card>
	<r-card outlined class="pa-4 color-warning-text w-45">
		<p>closable</p>
		<r-search-box closable url="home/product/search"></r-search-box>
	</r-card>
</div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>NotFoundMsg</span>
    </h1>
    <section class="d-flex h-space-around pt-6">
      <r-card class="pa-4 color-two-text w-45" outlined>
        <p>NotFoundMsg</p>
        <r-search-box
            notFoundMsg="nothing to show :("
            url="home/product/search"
        >
        </r-search-box>
      </r-card>
      <r-card class="pa-4 color-warning-text w-45" outlined>
        <p>Default</p>
        <r-search-box url="home/product/search"></r-search-box>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template=' <div class="d-flex h-space-around">
       <r-card outlined class="pa-4 color-two-text w-45">
        <p>NotFoundMsg</p>
        <r-search-box notFoundMsg="nothing to show :(" url="home/product/search"> </r-search-box>
      </r-card>
      <r-card outlined class="pa-4 color-warning-text w-45">
        <p>Default</p>
        <r-search-box url="home/product/search"> </r-search-box>
      </r-card>
        </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "search_box",
  data() {
    return {
      props: [
        {
          prop: "closable",
          type: "Boolean",
          default: "null",
          description: "The ability to close it",
        },
        {
          prop: "notFoundMsg",
          type: "String",
          default: "Can't Find Anything :(",
          description: "Message not found ",
        },
        {
          prop: "label",
          type: "String",
          default: "null",
          description: "label",
        },
        {
          prop: "inputControlClass",
          type: "String,Object,Array",
          default: "null",
          description: "Classes for input",
        },
        {prop: "url", type: "String", default: "null", description: "Url"},
        {
          prop: "query",
          type: "String",
          default: "search",
          description: "What should be written inside the box",
        },

        {
          prop: "modelValue",
          type: "String,Number",
          default: "null",
          description: "The value inside the box",
        },
        {
          prop: "noOverlay",
          type: "Boolean",
          default: "null",
          description: "It creates a murky situation.",
        },
        {
          prop: "openToTop",
          type: "Boolean",
          default: "null",
          description: "Open at the top of the page.",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "Headers",
        },
        {
          prop: "categories",
          type: "Object",
          default: "null",
          description: "categories of search",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "select", description: ""},
      ],
    };
  },
};
</script>
