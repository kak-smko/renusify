<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-switch-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-switch-input</r-btn>
        component provides users the ability to choose between two distinct
        values.
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
    "label": null,
    "label2": null,
    "readonly": false,
    "modelValue": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-switch-input :label="label" :label2="label2" :readonly="readonly" v-model="modelValue" @update:model-Value="log(`update:modelValue`,$event)" @change="log(`change`,$event)" ></r-switch-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4">
      <r-form v-model="valid">
        <r-switch-input v-model="info.active"></r-switch-input>
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
        <r-switch-input v-model="info.active"></r-switch-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Readonly</span>
    </h1>
    <section class="pa-4" style="border: 1px #0aa6ee solid">
      <r-form v-model="valid">
        <r-text-input :label="$t('Title')"></r-text-input>
        <r-text-input :label="$t('Description')"></r-text-input>
        <r-switch-input v-model="info.active" readonly></r-switch-input>
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
        <r-text-input :label="$t(`Title`)"></r-text-input>
        <r-text-input :label="$t(`Description`)"></r-text-input>
        <r-switch-input readonly v-model="info.active"></r-switch-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "switch_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "label",
          type: "String",
          default: "null",
          description: "Label can have",
        },
        {
          prop: "label2",
          type: "String",
          default: "null",
          description: "Label2 can have",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "Text field are for collecting",
        },
        {
          prop: "modelValue",
          type: "Boolean,String",
          default: "undefined",
          description: "Model Value",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "change", description: ""},
      ],
    };
  },
};
</script>
