<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-text-editor
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        Web pages can be created using professional
        <r-btn readonly size="small"> r-text-editor</r-btn>
        editors
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
    "uploadLink": "/storage",
    "headers": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-text-editor :upload-Link="uploadLink" v-model="modelValue" :headers="headers" @update:model-Value="log(`update:modelValue`,$event)" ></r-text-editor>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>modelValue</span>
    </h1>
    <section class="pa-4">
      <r-form v-model="valid">
        <r-text-editor :label="$t('Text Editor')"></r-text-editor>
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
        <r-text-editor :label="$t(`Text Editor`)"></r-text-editor>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4 text-end">
      <r-form v-model="valid">
        <r-text-editor
            :headers="['Item1', 'Item1', 'Item1', 'Item1']"
            :label="$t('Text Editor')"
        ></r-text-editor>
        <r-text-area
            v-model="info.area"
            :label="$t('Description')"
            noResize
        ></r-text-area>
        <r-switch-input v-model="info.active"></r-switch-input>
        <r-btn class="color-one px-5">Send</r-btn>
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
        <r-text-editor
          :headers="[`Item1`, `Item1`, `Item1`, `Item1`]"
          :label="$t(`Text Editor`)"
        ></r-text-editor>
        <r-text-area
          noResize
          :label="$t(`Description`)"
          v-model="info.area"
        ></r-text-area>
        <r-switch-input v-model="info.active"></r-switch-input>
        <r-btn class="color-one px-5">Send</r-btn>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "text_editor",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "uploadLink",
          type: "String",
          default: "/storage",
          description: "Upload Link",
        },
        {
          prop: "modelValue",
          type: "Object,String",
          default: "{text: '',files: []}",
          description: "Model Value ",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "Headers",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
