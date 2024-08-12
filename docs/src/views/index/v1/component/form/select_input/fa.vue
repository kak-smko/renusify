<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-select-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        کامپوننت‌های
        <r-btn readonly size="small"> r-text-area</r-btn>
        فیلد انتخابی برای جمع‌آوری اطلاعاتی که کاربر ارائه می‌دهد از بین لیست
        گزینه‌ها استفاده می شوند .
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
    "searchLink": null,
    "type": "text",
    "text": "name",
    "value": "value",
    "disableSearch": false,
    "readonly": false,
    "textChip": false,
    "items": [1,2,3,4,5],
    "modelValue": null,
    "tags": false,
    "multiple": false,
    "justValue": false,
    "openToTop": false,
    "translate": false,
    "firstSelect": false,
    "headers": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-select-input :search-Link="searchLink" :type="type" :text="text" :value="value" :disable-Search="disableSearch" :readonly="readonly" :text-Chip="textChip" :items="items" v-model="modelValue" :tags="tags" :multiple="multiple" :just-Value="justValue" :open-To-Top="openToTop" :translate="translate" :first-Select="firstSelect" :headers="headers" @update:model-Value="log(`update:modelValue`,$event)" @del="log(`del`,$event)" ></r-select-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">Select</h1>
    <section class="pt-3 px-20 text-center">
      <r-card class="pa-4 text-center" outlined>
        <div class="color-one-text px-2 py-1">Select</div>
        <r-divider class="color-one"></r-divider>
        <r-select-input
            v-model="valid"
            :items="[
            { name: 'item 1' },
            { name: 'item 2' },
            { name: 'item 3' },
            { name: 'item 4' },
            { name: 'item 5' },
          ]"
        >
        </r-select-input>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){

return {
 valid: null,
}
}"
        template='      <r-card class="pa-4 text-center" outlined>
        <div class="color-one-text px-2 py-1">Select</div>
        <r-divider class="color-one"></r-divider>
        <r-select-input
          v-model="valid"
          :items="[
            { name: `item 1` },
            { name: `item 2` },
            { name: `item 3` },
            { name: `item 4` },
            { name: `item 5` },
          ]"
        >
        </r-select-input>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Multiple</span>
    </h1>
    <section class="pt-3 px-20 text-center">
      <r-card class="pa-4 text-center" outlined>
        <div class="color-two-text px-2 py-1">Select</div>
        <r-divider class="color-two"></r-divider>
        <r-select-input
            v-model="valid"
            :items="[
            { name: 'one' },
            { name: 'two' },
            { name: 'there' },
            { name: 'four' },
          ]"
            multiple
        >
        </r-select-input>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){

return {
 valid: null,
}
}"
        template='      <r-card class="pa-4 text-center" outlined>
        <div class="color-two-text px-2 py-1">Select</div>
        <r-divider class="color-two"></r-divider>
        <r-select-input
          multiple
          v-model="valid"
          :items="[
            { name: `one` },
            { name: `two` },
            { name: `there` },
            { name: `four` },
          ]"
        >
        </r-select-input>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Disable Search</span>
    </h1>
    <section class="pt-3 px-20 text-center">
      <r-card class="pa-4 text-center" outlined>
        <div class="color-info-text px-2 py-1">Select</div>
        <r-divider class="color-info"></r-divider>
        <r-select-input
            v-model="valid"
            :items="[
            { name: 'one' },
            { name: 'two' },
            { name: 'there' },
            { name: 'four' },
          ]"
            disableSearch
        >
        </r-select-input>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){

return {
 valid: null,
}
}"
        template='        <r-card class="pa-4 text-center" outlined>
        <div class="color-info-text px-2 py-1">Select</div>
        <r-divider class="color-info"></r-divider>
        <r-select-input
          disableSearch
          v-model="valid"
          :items="[
            { name: `one` },
            { name: `two` },
            { name: `there` },
            { name: `four` },
          ]"
        >
        </r-select-input>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "select_input",
  data() {
    return {
      props: [
        {
          prop: "searchLink",
          type: "String",
          default: "null",
          description: "قابلیت سرچ کردن دارد",
        },
        {
          prop: "type",
          type: "String",
          default: "text",
          description: "نوع تایپ",
        },
        {prop: "text", type: "String", default: "name", description: "متن"},
        {
          prop: "value",
          type: "String",
          default: "value",
          description: "مقدار می گیرد",
        },
        {
          prop: "disableSearch",
          type: "Boolean",
          default: "null",
          description: "غیرفعال کردن سرچ",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "قابلیت خواندن فعال می شود",
        },
        {
          prop: "textChip",
          type: "Boolean",
          default: "null",
          description: "متن ها را تخت می کند ",
        },
        {prop: "items", type: "Array", default: "null", description: "آیتم "},
        {
          prop: "modelValue",
          type: "String,Number,Array,Object",
          default: "null",
          description: "Model Value می گیرد",
        },
        {
          prop: "tags",
          type: "Boolean",
          default: "null",
          description: "تگ ها",
        },
        {
          prop: "multiple",
          type: "Boolean",
          default: "null",
          description: "چندین",
        },
        {
          prop: "justValue",
          type: "Boolean",
          default: "null",
          description: "فقط مقدار value را بر می گرداند",
        },
        {
          prop: "openToTop",
          type: "Boolean",
          default: "null",
          description: "باز شدن از بالا",
        },
        {
          prop: "translate",
          type: "Boolean",
          default: "null",
          description: " ترجمه می کند",
        },
        {
          prop: "firstSelect",
          type: "Boolean",
          default: "null",
          description: "اولین لانتخاب",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "سر برگ",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "del", description: ""},
      ],
    };
  },
};
</script>
