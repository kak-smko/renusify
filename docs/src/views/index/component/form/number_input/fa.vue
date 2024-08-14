<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-number-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-number-input</r-btn>
        عدد ها را قبول می کند .
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
    "step": 1,
    "split": 3,
    "min": 0,
    "max": 10000,
    "btnText": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-number-input v-model="modelValue" :step="step" :split="split" :min="min" :max="max" :btn-Text="btnText" @update:model-Value="log(`update:modelValue`,$event)" ></r-number-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4" style="border: 1px #28ee0a solid">
      <r-card class="px-5 py-8 text-center">
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-number-input
              v-model="info.age"
              :label="$t('Age')"
          ></r-number-input>
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
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-number-input
            v-model="info.age"
            :label="$t(`Age`)"
          ></r-number-input>
          <r-btn class="my-4 color-success" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Min</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-text-input
              :label="$t('First Name')"
              :rules="['required']"
          ></r-text-input>
          <r-text-input
              :label="$t('Last Name')"
              :rules="['required']"
          ></r-text-input>
          <r-mask-input
              v-model="info.cart"
              :label="$t('Phone')"
              mask="NNNNN NNN NNNN"
          ></r-mask-input>
          <r-number-input
              v-model="info.ag"
              :label="$t('Age')"
              :min="10"
          ></r-number-input>
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
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-text-input
            :label="$t(`First Name`)"
            :rules="[`required`]"
          ></r-text-input>
          <r-text-input
            :label="$t(`Last Name`)"
            :rules="[`required`]"
          ></r-text-input>
          <r-mask-input
            :label="$t(`Phone`)"
            v-model="info.cart"
            mask="NNNNN NNN NNNN"
          ></r-mask-input>
          <r-number-input
            v-model="info.ag"
            :min="10"
            :label="$t(`Age`)"
          ></r-number-input>
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
      PROP / <span>Max</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-text-input
              :label="$t(' Name')"
              :rules="['required']"
          ></r-text-input>
          <r-number-input
              v-model="info.ag"
              :label="$t('Your Age')"
              :max="25"
              :min="10"
          ></r-number-input>
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
     <r-card class="px-5 py-8 text-center">
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-text-input
            :label="$t(`Name`)"
            :rules="[`required`]"
          ></r-text-input>
          <r-number-input
            v-model="info.ag"
            :min="10"
            :max="25"
            :label="$t(`Your Age`)"
          ></r-number-input>
          <r-btn class="my-4 color-one" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Step</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-text-input
              :label="$t(' Name')"
              :rules="['required']"
          ></r-text-input>
          <r-number-input
              v-model="info.ag"
              :label="$t('Step 4')"
              :step="4"
          ></r-number-input>
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

      info: {},

  }
}"
        template='
     <r-card class="px-5 py-8 text-center">
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-text-input
            :label="$t(`Name`)"
            :rules="[`required`]"
          ></r-text-input>
          <r-number-input
            v-model="info.ag"
            :step="4"
            :label="$t(`Step 4`)"
          ></r-number-input>
          <r-btn class="my-4 color-warning" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>BtnText</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-text-input
              :label="$t(' Name')"
              :rules="['required']"
          ></r-text-input>
          <r-number-input
              v-model="info.ag"
              :label="$t('Step 4')"
              :step="4"
              btnText
          ></r-number-input>
          <r-btn block class="my-4 color-two-text" rounded>Submit</r-btn>
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
        <h3>Number</h3>
        <r-form v-model="valid">
          <r-text-input
            :label="$t(`Name`)"
            :rules="[`required`]"
          ></r-text-input>
          <r-number-input
              btnText
            v-model="info.ag"
            :step="4"
            :label="$t(`Step 4`)"
          ></r-number-input>
          <r-btn rounded class="my-4 color-two-text" block>Submit</r-btn>
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
  name: "number_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "modelValue",
          type: "Number",
          default: "null",
          description: "Model Value می گیرد  ",
        },
        {
          prop: "step",
          type: "Number",
          default: "1",
          description: "افزایش مرحله ها  ",
        },
        {
          prop: "split",
          type: "Number",
          default: "0",
          description: "تکه تکه می کند",
        },
        {
          prop: "min",
          type: "Number",
          default: "undefined",
          description: "مینیمم می گیرد",
        },
        {
          prop: "max",
          type: "Number",
          default: "undefined",
          description: "ماکسیمم می گیرد",
        },
        {
          prop: "btnText",
          type: "Boolean",
          default: "null",
          description: "btn جدول را شبیه text می کند ",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
