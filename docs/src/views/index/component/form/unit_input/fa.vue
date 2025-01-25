<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-unit-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        کامپوننت
        <r-btn readonly size="small"> r-unit-input</r-btn>
        یک فیلد ورودی است , برای ورودی های واحد مورد استفاده قرار می گیرد .
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
    "units": ["grem","liter"],
    "disableInput": false,
    "disableUnit": false,
    "autofocus": false,
    "translate": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-unit-input :type="type" :units="units" v-model="modelValue" :disable-Input="disableInput" :disable-Unit="disableUnit" :autofocus="autofocus" :translate="translate" @update:model-Value="log(`update:modelValue`,$event)" ></r-unit-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Units</span>
    </h1>
    <section class="pa-4">
      <r-form v-model="valid">
        <r-unit-input :units="['grem', 'liter']"></r-unit-input>
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
        <r-unit-input :units="[`grem`, `liter`]"></r-unit-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
    <section class="pa-4">
      <r-form v-model="valid">
        <r-unit-input
            v-model="info.unit"
            :units="['grem', 'liter']"
        ></r-unit-input>
        <r-unique-input :label="$t('Title')"></r-unique-input>
        <r-text-input :label="$t('Description')"></r-text-input>
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
        <r-unit-input
          v-model="info.unit"
          :units="[`grem`, `liter`]"
        ></r-unit-input>
        <r-unique-input :label="$t(`Title`)"></r-unique-input>
        <r-text-input :label="$t(`Description`)"></r-text-input>
        <r-switch-input readonly v-model="info.active"></r-switch-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>disableUnit</span>
    </h1>
    <section class="pa-4">
      <r-form v-model="valid">
        <r-unit-input
            v-model="info.unit"
            :units="['grem', 'liter']"
            disableUnit
        ></r-unit-input>
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
        <r-unit-input
          v-model="info.unit"
          :units="[`grem`, `liter`]"
        ></r-unit-input>
        <r-unique-input :label="$t(`Title`)"></r-unique-input>
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
  name: "unit_input",
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
          prop: "units",
          type: "Array",
          default: "undefined",
          description: "واحد ",
        },
        {
          prop: "modelValue",
          type: "Object",
          default: "{value: null,unit: null}",
          description: "Model Value می گیرد ",
        },
        {
          prop: "disableInput",
          type: "Boolean",
          default: "null",
          description: "غیر فعال کردن Input",
        },
        {
          prop: "disableUnit",
          type: "Boolean",
          default: "null",
          description: "غیر فعال کردن Unit",
        },
        {
          prop: "autofocus",
          type: "Boolean",
          default: "null",
          description: "فوکوس خودکار",
        },
        {
          prop: "translate",
          type: "Boolean",
          default: "null",
          description: "ترجمه شود یا نه",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
