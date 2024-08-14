<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-text-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        کامپوننت
        <r-btn readonly size="small"> r-text-input</r-btn>
        یک فیلد ورودی را مشخص می کند که کاربران می توانند در آن اطلاعات متنی
        وارد کنند.
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
    "type": "text",
    "modelValue": null,
    "autofocus": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-text-input :type="type" v-model="modelValue" :autofocus="autofocus" @update:model-Value="log(`update:modelValue`,$event)" ></r-text-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Text Input</h3>
        <r-form v-model="valid">
          <r-text-input v-model="info.text" :label="$t('Text')"></r-text-input>
          <r-date-input
              v-model="info.date"
              :label="$t('Select Date')"
          ></r-date-input>
          <r-btn block class="my-4 color-success">Submit</r-btn>
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
  <r-form v-model="valid">
          <r-text-input v-model="info.text" :label="$t(`Text`)"></r-text-input>
          <r-date-input v-model="info.date" :label="$t(`Select Date`)"></r-date-input>
          <r-btn class="my-4 color-success" block>Submit</r-btn>
        </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Autofocus</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Text Input</h3>
        <r-form v-model="valid">
          <r-text-input
              v-model="info.text"
              :label="$t('Text')"
              autofocus
          ></r-text-input>
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
  <r-form v-model="valid">
          <r-text-input
            autofocus
            v-model="info.text"
            :label="$t(`Text`)"
          ></r-text-input>
          <r-btn class="my-4 color-one" block>Submit</r-btn>
        </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "text_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "type",
          type: "String",
          default: "text",
          description: "نوع تایپ",
        },
        {
          prop: "modelValue",
          type: "String,Number",
          default: "null",
          description: "Model Value می گیرد ",
        },
        {
          prop: "autofocus",
          type: "Boolean",
          default: "null",
          description: "فوکوس اتوماتیک",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
