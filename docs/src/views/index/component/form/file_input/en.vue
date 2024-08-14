<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-file-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-file-input</r-btn>
        component is
        input that provides for selecting files, showing detailed selection
        information and upload progress.
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
    "uploadLink": null,
    "accept": "*",
    "size": 3,
    "wPH": null,
    "maxFileSize": null,
    "meta": null,
    "metaRequired": true
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-file-input :upload-Link="uploadLink" :accept="accept" :size="size" :w-P-H="wPH" :max-File-Size="maxFileSize" v-model="modelValue" :meta="meta" :meta-Required="metaRequired" @update:model-Value="log(`update:modelValue`,$event)" @add="log(`add`,$event)" ></r-file-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Size</span>
    </h1>
    <section class="pa-4" style="border: 1px #0aa6ee solid">
      <r-form v-model="valid">
        <p class="px-5 display-5 color-one-text">Select a file</p>
        <r-file-input :size="1"></r-file-input>
        <h3 class="pa-2">Drop file here</h3>
      </r-form>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
      valid: false,
      info: {},

  }
}"
        template='
      <r-form v-model="valid">
        <p class="px-5 display-5 color-one-text">Select a file</p>
        <r-file-input :size="1"></r-file-input>
        <h3 class="pa-2">Drop file here</h3>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "file_input",
  data() {
    return {
      props: [
        {
          prop: "uploadLink",
          type: "String",
          default: "undefined",
          description: "The uploaded link.",
        },
        {prop: "accept", type: "String", default: "*", description: "Accept"},
        {prop: "size", type: "Number", default: "3", description: "Size"},
        {
          prop: "wPH",
          type: "Number,String,Array",
          default: "null",
          description: "width and height",
        },
        {
          prop: "maxFileSize",
          type: "Number",
          default: "null",
          description: "Maximum file size.",
        },
        {
          prop: "modelValue",
          type: "Array",
          default: "[]",
          description: "If the inputs are valid in the form, it becomes true.",
        },
        {prop: "meta", type: "Array", default: "null", description: "Meta"},
        {
          prop: "metaRequired",
          type: "Boolean",
          default: "true",
          description: "Meta Required",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "add", description: ""},
      ],
    };
  },
};
</script>
