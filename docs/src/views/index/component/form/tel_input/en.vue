<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-tel-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        A component
        <r-btn readonly size="small"> r-tel-input</r-btn>
        telephone input field .
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
    "modelValue": null,
    "defaultCountry": "",
    "tile": false,
    "required": false,
    "readonly": false,
    "select": true
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-tel-input :label="label" v-model="modelValue" :default-Country="defaultCountry" :tile="tile" :required="required" :readonly="readonly" :select="select" @update:model-Value="log(`update:modelValue`,$event)" ></r-tel-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
    <section class="pa-4" style="border: 1px #0aa6ee solid">
      <r-form v-model="valid">
        <r-tel-input :label="$t('tel')"></r-tel-input>
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
        <r-tel-input :label="$t(`tel`)"></r-tel-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Tile</span>
    </h1>
    <section class="pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('Title')" tile></r-text-input>
        <r-text-input :label="$t('Description')" tile></r-text-input>
        <r-tel-input :label="$t('tel')" tile></r-tel-input>
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
        <r-text-input tile :label="$t(`Title`)"></r-text-input>
        <r-text-input tile :label="$t(`Description`)"></r-text-input>
        <r-tel-input tile :label="$t(`tel`)"></r-tel-input>
        <r-switch-input  v-model="info.active"></r-switch-input>
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
    <section class="pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('Title')" readonly tile></r-text-input>
        <r-tel-input :label="$t('tel')" readonly tile></r-tel-input>
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
        <r-text-input readonly tile :label="$t(`Title`)"></r-text-input>
        <r-tel-input readonly tile :label="$t(`tel`)"></r-tel-input>
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
  name: "tel_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "label",
          type: "String",
          default: "undefined",
          description: "Label can have",
        },
        {
          prop: "modelValue",
          type: "String",
          default: "undefined",
          description: "Model Value",
        },
        {
          prop: "defaultCountry",
          type: "String",
          default: "",
          description: "Default Country",
        },
        {
          prop: "tile",
          type: "Boolean",
          default: "undefined",
          description: "without corners",
        },
        {
          prop: "required",
          type: "Boolean",
          default: "null",
          description: "Indicate the compulsion with required",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "Text field are for collecting",
        },
        {
          prop: "select",
          type: "Boolean",
          default: "false",
          description: "Select",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
