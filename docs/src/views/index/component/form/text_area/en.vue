<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-text-area
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        A multi-line text input control
        <r-btn readonly size="small"> r-text-area</r-btn>
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
    "noResize": false,
    "modelValue": null,
    "rows": "7"
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-text-area :no-Resize="noResize" v-model="modelValue" :rows="rows" @update:model-Value="log(`update:modelValue`,$event)" ></r-text-area>'
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
        <r-text-input :label="$t('Title')" tile></r-text-input>
        <r-text-area
            v-model="info.area"
            :label="$t('Description')"
        ></r-text-area>
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
        <r-text-area
          :label="$t(`Description`)"
          v-model="info.area"
        ></r-text-area>
        <r-switch-input v-model="info.active"></r-switch-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>NoResize</span>
    </h1>
    <section class="pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('Title')"></r-text-input>
        <r-text-area
            v-model="info.area"
            :label="$t('Description')"
            noResize
        ></r-text-area>
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
        <r-text-input :label="$t(`Title`)"></r-text-input>
        <r-text-area
          noResize
          :label="$t(`Description`)"
          v-model="info.area"
        ></r-text-area>
        <r-switch-input v-model="info.active"></r-switch-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Rows</span>
    </h1>
    <section class="pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('Title')"></r-text-input>
        <r-text-area
            v-model="info.area"
            :label="$t(' Rows = 4')"
            rows="4"
        ></r-text-area>
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
        <r-text-input :label="$t(`Title`)"></r-text-input>
        <r-text-area
          rows="4"
          label="Rows = 4"
          v-model="info.area"
        ></r-text-area>
        <r-switch-input v-model="info.active"></r-switch-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "text_area",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "noResize",
          type: "Boolean",
          default: "null",
          description: "No Resize",
        },
        {
          prop: "modelValue",
          type: "String,Number",
          default: "null",
          description: "Model Value",
        },
        {
          prop: "rows",
          type: "String",
          default: "7",
          description: "The rows can be decreased or increased",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
