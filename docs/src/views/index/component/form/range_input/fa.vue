<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-range-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-range-input</r-btn>
        کنترل برای وارد کردن یک عدد که مقدار دقیق آن اهمیت ندارد.
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
    "modelValue": 0,
    "min": 0,
    "max": 100,
    "color": "color-one",
    "step": 1,
    "tooltipAlways": false,
    "disabled": false,
    "isRange": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-range-input v-model="modelValue" :min="min" :max="max" :color="color" :step="step" :tooltip-Always="tooltipAlways" :disabled="disabled" :is-Range="isRange" @update:model-Value="log(`update:modelValue`,$event)" ></r-range-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4" style="border: 1px #28ee0a solid">
      <r-card class="px-5 py-8 text-center">
        <h3>Custom <span class="color-one-text">Range</span></h3>
        <r-form v-model="valid">
          <r-range-input v-model="info.range" class="px-20"></r-range-input>
          <r-range-input v-model="info.range" class="px-15"></r-range-input>
          <r-range-input v-model="info.range" class="px-10"></r-range-input>
          <r-range-input v-model="info.range" class="px-5"></r-range-input>
          <r-range-input v-model="info.range"></r-range-input>
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
          <r-range-input v-model="info.range" class="px-20"></r-range-input>
          <r-range-input v-model="info.range" class="px-15"></r-range-input>
          <r-range-input v-model="info.range" class="px-10"></r-range-input>
          <r-range-input v-model="info.range" class="px-5"></r-range-input>
          <r-range-input v-model="info.range"></r-range-input>
        </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>TooltipAlways</span>
    </h1>
    <section class="pa-4" style="border: 1px #0d9df6 dashed">
      <r-card class="px-5 py-8 text-center">
        <h3>Custom <span class="color-one-text">Range</span></h3>
        <r-form v-model="valid">
          <r-range-input
              v-model="info.rang"
              :label="$t('range')"
              tooltipAlways
          ></r-range-input>
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
        <h3>Custom <span class="color-one-text">Range</span></h3>
        <r-form v-model="valid">
          <r-range-input
              tooltipAlways
            v-model="info.rang"
            :label="$t(`range`)"
          ></r-range-input>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Step</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Custom <span class="color-one-text">Range</span></h3>
        <r-form v-model="valid">
          <r-range-input
              v-model="info.rang"
              :label="$t('range')"
              :step="5"
              tooltipAlways
          ></r-range-input>
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
        <h3>range</h3>
        <r-form v-model="valid">
          <r-range-input
            v-model="info.age"
            :label="$t(`Age`)"
            :step="5"
            tooltipAlways
          ></r-range-input>
          <r-btn class="my-4 color-success" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Disabled</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Custom <span class="color-one-text">Range</span></h3>
        <r-form v-model="valid">
          <r-range-input
              v-model="info.ran"
              disabled
              tooltipAlways
          ></r-range-input>
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
        <h3>Custom <span class="color-one-text">Range</span></h3>
        <r-form v-model="valid">
          <r-range-input
            disabled
            tooltipAlways
            v-model="info.ran"
          ></r-range-input>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>IsRange</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Custom <span class="color-one-text">Range</span></h3>
        <r-form v-model="valid">
          <r-range-input
              v-model="info.ran"
              isRange
              tooltipAlways
          ></r-range-input>
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
        <h3>Custom <span class="color-one-text">Range</span></h3>
        <r-form v-model="valid">
          <r-range-input
            isRange
            tooltipAlways
            v-model="info.ran"
          ></r-range-input>
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
  name: "range_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "modelValue",
          type: "Number,Array",
          default: "undefined",
          description: "Model Value می گیرد  ",
        },
        {
          prop: "min",
          type: "Number",
          default: "0",
          description: "مینیمم می گیرد",
        },
        {
          prop: "max",
          type: "Number",
          default: "100",
          description: "ماکسیمم می گیرد",
        },
        {
          prop: "color",
          type: "String",
          default: "color-one",
          description: "رنگ ",
        },
        {
          prop: "step",
          type: "Number",
          default: "1",
          description: "افزایش مرحله ها",
        },
        {
          prop: "tooltipAlways",
          type: "Boolean",
          default: "null",
          description: "درصد را نشان می دهد",
        },
        {
          prop: "disabled",
          type: "Boolean",
          default: "null",
          description: "غیر فعال می کند",
        },
        {
          prop: "isRange",
          type: "Boolean",
          default: "null",
          description: "برای محدود کردن",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
