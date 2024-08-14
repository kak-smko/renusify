<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-search-box
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        اجزای جعبه متنی برای جمع آوری اطلاعاتی که کاربر ارائه می دهد استفاده می
        شود.
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
    "label": "جستجو",
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
          description: "قابلیت بسته شدن ",
        },
        {
          prop: "notFoundMsg",
          type: "String",
          default: "Can't Find Anything :(",
          description: "پیام برای چیزی یافت نشد ",
        },
        {prop: "url", type: "String", default: "null", description: "سورس "},
        {
          prop: "query",
          type: "String",
          default: "search",
          description: "در داخل کادر چه متنی نوشته شود",
        },
        {
          prop: "inputControlClass",
          type: "String,Object,Array",
          default: "null",
          description: "کلاس های مختلف Input",
        },
        {
          prop: "modelValue",
          type: "String,Number",
          default: "null",
          description: "مقدار داخل کادر ",
        },
        {
          prop: "noOverlay",
          type: "Boolean",
          default: "null",
          description: "یک حالت کدر ایجاد می کند",
        },
        {
          prop: "openToTop",
          type: "Boolean",
          default: "null",
          description: "باز شدن در بالای صفحه",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "هدر ",
        },
        {
          prop: "categories",
          type: "Object",
          default: "null",
          description: "دسته بندی جستحوها",
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
