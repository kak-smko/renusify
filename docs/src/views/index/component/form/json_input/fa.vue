<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-json-input
      </h1>
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
    "keyLabel": "key",
    "valueLabel": "value",
    "modelValue": null,
    "valueType": null,
    "template": null,
    "baseArray": false,
    "disableAdd": false,
    "tile": false,
    "disableEditKey": false,
    "disableDel": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-json-input :label="label" :key-Label="keyLabel" :value-Label="valueLabel" v-model="modelValue" :value-Type="valueType" :template="template" :base-Array="baseArray" :disable-Add="disableAdd" :tile="tile" :disable-Edit-Key="disableEditKey" :disable-Del="disableDel" @update:model-Value="log(`update:modelValue`,$event)" ></r-json-input>'
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
          <r-json-input v-model="info.j"></r-json-input>
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
          <r-json-input v-model="info.j"></r-json-input>
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
      PROP / <span>Template</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center card-hover">
        <h3 class="color-one-text">Text Input</h3>
        <r-form v-model="valid">
          <r-json-input
              v-model="info.j"
              :template="{ name: '', lname: '', age: 10 }"
          ></r-json-input>
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
          <r-json-input
            :template="{ name: ``, lname: ``, age: 10 }"
            v-model="info.j"
          ></r-json-input>
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
      PROP / <span>BaseArray</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center card-hover">
        <h3 class="color-one-text">Text Input</h3>
        <r-form v-model="valid">
          <r-json-input
              v-model="info.j"
              :template="{ name: '', lname: '', age: 10 }"
              baseArray
          ></r-json-input>
          <r-btn block class="my-4 color-one-text">Submit</r-btn>
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
          <r-json-input
            baseArray
            :template="{ name: ``, lname: ``, age: 10 }"
            v-model="info.j"
          ></r-json-input>
          <r-btn class="my-4 color-one-text" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>DisableAdd</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center card-hover">
        <h3 class="color-one-text">Text Input</h3>
        <r-form v-model="valid">
          <r-json-input v-model="info.j" disableAdd></r-json-input>
          <r-btn block class="my-4 color-one-text">Submit</r-btn>
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
          <r-json-input disableAdd v-model="info.j"></r-json-input>
          <r-btn class="my-4 color-one-text" block>Submit</r-btn>
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
  name: "json_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "label",
          type: "String",
          default: "null",
          description: "label می گیرد",
        },
        {
          prop: "keyLabel",
          type: "String",
          default: "key",
          description: "label کلید می گیرد",
        },
        {
          prop: "valueLabel",
          type: "String",
          default: "value",
          description: "label می تواند مقدار بگیرد",
        },
        {
          prop: "modelValue",
          type: "Object",
          default: "undefined",
          description: "modelValue می گیرد",
        },

        {
          prop: "valueType",
          type: "String",
          default: "undefined",
          description: " مقدار تایپ",
        },
        {
          prop: "template",
          type: "Object",
          default: "null",
          description: "قالب می گیرد",
        },
        {
          prop: "baseArray",
          type: "Boolean",
          default: "null",
          description: "مقدار پایه می گیرد",
        },
        {
          prop: "translate",
          type: "Boolean",
          default: "false",
          description: "ترجمه کلیدها",
        },
        {
          prop: "disableAdd",
          type: "Boolean",
          default: "null",
          description: "اضافه شدن را غیر فعال می کند",
        },
        {
          prop: "tile",
          type: "Boolean",
          default: "null",
          description: "tile کردن فرم  ",
        },
        {
          prop: "disableEditKey",
          type: "Boolean",
          default: "null",
          description: "غیرفعال کردن ویرایش کلید",
        },
        {
          prop: "disableDel",
          type: "Boolean",
          default: "null",
          description: "غیرفعال کردن حذف کردن",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
