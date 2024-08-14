<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-radio-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-rating-input</r-btn>
        به کاربر اجازه
        می‌دهند تا تنها تعداد محدودی انتخاب را انجام دهند
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
    "text": "title",
    "readonly": false,
    "rounded": false,
    "justValue": false,
    "translate": false,
    "modelValue": null,
    "items":["one","two","three"]
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-radio-input :items="items" :text="text" :readonly="readonly" :rounded="rounded" :just-Value="justValue" :translate="translate" v-model="modelValue" @update:model-Value="log(`update:modelValue`,$event)" ></r-radio-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4">
      <r-card class="px-5 py-3 text-center">
        <h3 class="color-one-text">Transport</h3>
        <r-divider class="color-one my-3"></r-divider>
        <r-form v-model="valid" class="d-flex h-space-between">
          <r-radio-input
              v-model="info.transport"
              :items="['Plane', 'Car', 'Boat', 'Taxi', 'motorbike']"
          ></r-radio-input>
          <r-radio-input
              v-model="info.trans"
              :items="['Plane', 'Car', 'Boat', 'Taxi', 'motorbike']"
              class="font-italic"
          ></r-radio-input>
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
          <r-card class="px-5 py-3 text-center">
        <h3 class="color-one-text">Transport</h3>
        <r-divider class="color-one my-3"></r-divider>
        <r-form v-model="valid" class="d-flex h-space-between">
          <r-radio-input
            v-model="info.transport"
            :items="[`Plane`, `Car`, `Boat`, `Taxi`, `motorbike`]"
          ></r-radio-input>
          <r-radio-input
            class="font-italic"
            v-model="info.trans"
            :items="[`Plane`, `Car`, `Boat`, `Taxi`, `motorbike`]"
          ></r-radio-input>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Rounded</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-3 text-center">
        <h3 class="color-success-text">Transport</h3>
        <r-divider class="color-success my-3"></r-divider>
        <r-form v-model="valid" class="d-flex h-space-between">
          <r-radio-input
              v-model="info.transport"
              :items="['Plane', 'Car', 'Boat', 'Taxi', 'motorbike']"
              class="color-success-text"
              rounded
          ></r-radio-input>
          <r-radio-input
              v-model="info.trans"
              :items="['Plane', 'Car', 'Boat', 'Taxi', 'motorbike']"
              class="font-italic"
          ></r-radio-input>
          <r-radio-input
              v-model="info.transs"
              :items="['Plane', 'Car', 'Boat', 'Taxi', 'motorbike']"
              class="color-warning-text"
              rounded
          ></r-radio-input>
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
          <r-card class="px-5 py-3 text-center">
        <h3 class="color-success-text">Transport</h3>
        <r-divider class="color-success my-3"></r-divider>
        <r-form v-model="valid" class="d-flex h-space-between">
          <r-radio-input
            class="color-success-text"
            rounded
            v-model="info.transport"
            :items="[`Plane`, `Car`, `Boat`, `Taxi`, `motorbike`]"
          ></r-radio-input>
          <r-radio-input
            class="font-italic"
            v-model="info.trans"
            :items="[`Plane`, `Car`, `Boat`, `Taxi`, `motorbike`]"
          ></r-radio-input>
          <r-radio-input
            class="color-warning-text"
            rounded
            v-model="info.transs"
            :items="[`Plane`, `Car`, `Boat`, `Taxi`, `motorbike`]"
          ></r-radio-input>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>readonly</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-3 text-center">
        <h3 class="color-success-text">Transport</h3>
        <r-divider class="color-success my-3"></r-divider>
        <r-form v-model="valid" class="d-flex h-space-between">
          <r-radio-input
              v-model="info.transport"
              :items="['Plane', 'Car', 'Boat', 'Taxi', 'motorbike']"
              class="color-success-text"
              readonly
              rounded
          ></r-radio-input>
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
    <r-card class="px-5 py-3 text-center">
        <h3 class="color-success-text">Transport</h3>
        <r-divider class="color-success my-3"></r-divider>
        <r-form v-model="valid" class="d-flex h-space-between">
          <r-radio-input
            class="color-success-text"
            rounded
            readonly
            v-model="info.transport"
            :items="[`Plane`, `Car`, `Boat`, `Taxi`, `motorbike`]"
          ></r-radio-input>
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
  name: "radio_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "items",
          type: "Array",
          default: "[]",
          description: "آیتم های رادیو",
        },
        {
          prop: "text",
          type: "String",
          default: "title",
          description: "متن مدنظر",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "فقط می تواند بخواند",
        },
        {
          prop: "rounded",
          type: "Boolean",
          default: "null",
          description: "با rounded دایره می شود",
        },
        {
          prop: "justValue",
          type: "Boolean",
          default: "null",
          description: "فقط مقدار value را بر می گرداند ",
        },
        {
          prop: "translate",
          type: "Boolean",
          default: "null",
          description: "اتوماتیک title را ترجمه می کند ",
        },
        {
          prop: "modelValue",
          type: "String,Number,Object",
          default: "null",
          description: "Model Value می گیرد",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
