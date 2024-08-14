<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-time-range-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-time-range-input</r-btn>
        component specifies an input field where users can restrict limit a
        time.
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
    "withSec": false,
    "noOverlay": false,
    "modelValue": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-time-range-input :with-Sec="withSec" :no-Overlay="noOverlay" v-model="modelValue" @update:model-Value="log(`update:modelValue`,$event)" ></r-time-range-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center card-hover">
        <h3 class="color-one-text">Text Input</h3>
        <r-form v-model="valid">
          <r-time-range-input :label="$t('Range')"></r-time-range-input>
          <r-text-input v-model="info.text" :label="$t('Text')"></r-text-input>
          <r-date-input :label="$t('Select Date')"></r-date-input>
          <r-btn block class="my-4 color-one">Submit</r-btn>
        </r-form>
      </r-card>
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
 <r-card class="px-5 py-8 text-center card-hover">
        <h3 class="color-one-text">Text Input</h3>
       <r-form v-model="valid">
          <r-time-input
            :withSec="100"
            v-model="info.time"
            :label="$t(`Time`)"
          ></r-time-input>
          <r-text-input v-model="info.text" :label="$t(`Text`)"></r-text-input>
          <r-date-input :label="$t(`Select Date`)"></r-date-input>
          <r-btn class="my-4 color-info" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "time_range_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "withSec",
          type: "Boolean",
          default: "null",
          description: "With Second",
        },
        {
          prop: "noOverlay",
          type: "Boolean",
          default: "null",
          description: "The background makes it dim",
        },
        {
          prop: "modelValue",
          type: "Array",
          default: "null",
          description: "Model Value",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
