<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-unique-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-unique-input</r-btn>
        component is an input field that can take unique inputs.
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
    "link": null,
    "modelValue": null,
    "headers": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-unique-input :link="link" v-model="modelValue" :headers="headers" @update:model-Value="log(`update:modelValue`,$event)" ></r-unique-input>'
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
        <h3 class="color-one-text">Unique Input</h3>
        <r-form v-model="valid">
          <r-unique-input
              v-model="info.uniq"
              :label="$t('unique')"
          ></r-unique-input>
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
          <r-unique-input
            :label="$t(`unique`)"
            v-model="info.uniq"
          ></r-unique-input>
        </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "unique_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "link",
          type: "String",
          default: "undefined",
          description: "Link",
        },
        {
          prop: "modelValue",
          type: "String",
          default: "null",
          description: "Model Value",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "Headers",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
