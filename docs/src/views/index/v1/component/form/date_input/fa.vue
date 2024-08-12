<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-date-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-date-input</r-btn>
        مولفه‌ای که به کاربران امکان انتخاب تاریخ یا یک بازه تاریخی را می‌دهد.
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
    "lang": null,
    "readonly": false,
    "withTime": true
}
},
methods:{
  isDateDisabled(date){
      if(date.getDay()===3){
        return true;
      }
      return false
    },
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-date-input v-model="modelValue" :lang="lang" :readonly="readonly" :with-Time="withTime" :is-Date-Disabled="isDateDisabled"></r-date-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
    <section class="pa-4" style="border: 1px #0aa6ee solid">
      <r-card class="px-5 py-8 text-center">
        <h3>Datepicker Demo</h3>
        <r-form v-model="valid">
          <r-date-input
              v-model="info.start"
              :label="$t('Select Date')"
          ></r-date-input>
          <r-date-input
              v-model="info.end"
              :label="$t('Select Date Range')"
          ></r-date-input>
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
       <r-card class="px-5 py-8 text-center">
        <h3>Datepicker Demo</h3>
        <r-form v-model="valid">
          <r-date-input :label="$t(`Select Date`)" v-model="info.start"></r-date-input>
          <r-date-input :label="$t(`Select Date Range`)" v-model="info.end"></r-date-input>
          <r-btn class="my-4 color-info" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Readonly</span>
    </h1>
    <section class="pa-4" style="border: 1px #28ee0a solid">
      <r-card class="px-5 py-8 text-center">
        <h3>Datepicker Demo</h3>
        <r-form v-model="valid">
          <r-date-input
              v-model="info.start"
              :label="$t('Select Date')"
              readonly
          ></r-date-input>
          <r-date-input
              v-model="info.end"
              :label="$t('Select Date Range')"
              readonly
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
  <r-card class="px-5 py-8 text-center">
        <h3>Datepicker Demo</h3>
        <r-form v-model="valid">
          <r-date-input :label="$t(`Select Date`)" v-model="info.start"></r-date-input>
          <r-date-input :label="$t(`Select Date Range`)" v-model="info.end"></r-date-input>
          <r-btn class="my-4 color-info" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>IsDateDisabled</span>
    </h1>
    <section class="pa-4" style="border: 1px #ee710a solid">
      <r-card class="px-5 py-8 text-center">
        <h3>Datepicker Demo</h3>
        <r-form v-model="valid">
          <r-date-input
              v-model="info.start"
              :isDateDisabled="isDateDisabled"
              :label="$t('Select Date')"
          ></r-date-input>
          <r-date-input
              v-model="info.end"
              :isDateDisabled="isDateDisabled"
              :label="$t('Select Date Range')"
          ></r-date-input>
          <r-btn block class="my-4 color-warning">Submit</r-btn>
        </r-form>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
      valid: false,
      info: {}
  }
},
methods:{
  isDateDisabled(date){
        if(date.getDay()===3){
          return true;
        }
        return false
      }
}"
        template='
 <r-card class="px-5 py-8 text-center">
        <h3>Datepicker Demo</h3>
        <r-form v-model="valid">
          <r-date-input
            :isDateDisabled="isDateDisabled"
            :label="$t(`Select Date`)"
          ></r-date-input>
          <r-date-input
            isDateDisabled
            :label="$t(`Select Date Range`)"
          ></r-date-input>
          <r-btn class="my-4 color-warning" block>Submit</r-btn>
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
  name: "date_input",
  data() {
    return {
      valid: false,
      isDateDisabled: (date) => {
        if (date.getDay() === 2) {
          return true;
        }
        return false;
      },
      info: {},
      props: [
        {
          prop: "modelValue",
          type: "String",
          default: "undefined",
          description: "اگر input ها داخل فرم معتبر باشند true می شود .",
        },
        {
          prop: "lang",
          type: "String",
          default: "undefined",
          description: "زبان ",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "فیلد متن برای جمع آوری است .",
        },
        {
          prop: "withTime",
          type: "Boolean",
          default: "null",
          description: "زمان ",
        },
        {
          prop: "isDateDisabled",
          type: "Function",
          default: "() => false",
          description: " غیرفعال کردن تاریخ ",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
