<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-color-input
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
    "modelValue": null,
    "format": "rgba"
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-color-input v-model="modelValue" :format="format" @update:model-value="log(`update:model-value`,$event)" @close="log(`close`,$event)" ></r-color-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <div class="d-flex h-space-around">
          <r-color-input
              v-model="info.color"
              :label="$t('chose-color-item 1')"
              class="pa-3"
          ></r-color-input>
          <r-color-input
              v-model="info.colorr"
              :label="$t('chose-color-item 2')"
              class="pa-3 mx-2"
          ></r-color-input>
          <r-color-input
              v-model="info.col"
              :label="$t('chose-color-item 3')"
              class="pa-3"
          ></r-color-input>
        </div>
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
        <div class="d-flex h-space-around">
          <r-color-input
            class="pa-3"
            v-model="info.color"
            :label="$t(`chose-color-item 1`)"
          ></r-color-input>
          <r-color-input
            class="pa-3 mx-2"
            v-model="info.colorr"
            :label="$t(`chose-color-item 2`)"
          ></r-color-input>
          <r-color-input
            class="pa-3"
            v-model="info.col"
            :label="$t(`chose-color-item 3`)"
          ></r-color-input>
        </div>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "color_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "modelValue",
          type: "String",
          default: "null",
          description: "اگر input ها داخل فرم معتبر باشند true می شود .",
        },
        {
          prop: "format",
          type: "String",
          default: "rgba",
          description: "فرمت ",
        },
      ],
      events: [
        {event: "update:model-value", description: ""},
        {event: "close", description: ""},
      ],
    };
  },
};
</script>
