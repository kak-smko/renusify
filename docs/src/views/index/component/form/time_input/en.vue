<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-time-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-time-input</r-btn>
        component specifies an input field where users can enter time inputs.
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
    "disableTime": (time,show,hour,min,sec)=>{
      if(show==="hours24" && time>13){
        return true
      }
      return false
    },
    "withSec": true,
    "is24Hour": true,
    "noOverlay": false,
    "modelValue": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-time-input :disable-Time="disableTime" :with-Sec="withSec" :is-24-Hour="is24Hour" :no-Overlay="noOverlay" v-model="modelValue" @update:model-Value="log(`update:modelValue`,$event)" ></r-time-input>'
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
        <h3 class="color-info-text">Text Input</h3>
        <r-form v-model="valid">
          <r-time-input
              v-model="info.time"
              :label="$t('Time')"
              :withSec="100"
          ></r-time-input>
          <r-text-input v-model="info.text" :label="$t('Text')"></r-text-input>
          <r-date-input :label="$t('Select Date')"></r-date-input>
          <r-btn block class="my-4 color-info">Submit</r-btn>
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
  name: "time_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "disableTime",
          type: "Function",
          default: "() => {return false;}",
          description: "Disable Time",
        },
        {
          prop: "withSec",
          type: "Boolean",
          default: "null",
          description: "With Second",
        },
        {
          prop: "is24Hour",
          type: "Boolean",
          default: "true",
          description: "is 24 Hour",
        },
        {
          prop: "noOverlay",
          type: "Boolean",
          default: "null",
          description: "The background makes it dim",
        },
        {
          prop: "modelValue",
          type: "String",
          default: "null",
          description: "Model Value",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
