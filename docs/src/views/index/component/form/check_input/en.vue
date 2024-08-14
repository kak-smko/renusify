<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-check-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        It reviews the validity of discount codes.
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
    "name": "text",
    "link": null,
    "modelValue": null,
    "autofocus": false,
    "headers": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-check-input :type="type" :name="name" :link="link" v-model="modelValue" :autofocus="autofocus" :headers="headers" @update:model-Value="log(`update:modelValue`,$event)" @data="log(`data`,$event)" ></r-check-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Link</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-container class="sheet">
          <r-row>
            <r-col class="col-12">
              <r-text-input
                  :label="$t('name')"
                  :rules="['required']"
              ></r-text-input>
              <r-check-input
                  v-model="info.off"
                  :label="$t('off-name')"
                  link="/home/off"
              ></r-check-input>
            </r-col>
          </r-row>
          <r-row class="h-end">
            <r-col class="col-auto">
              <r-btn
                  class="color-error-text"
                  outlined
                  @click.prevent="show = false"
              >{{ $t("cancel", "renusify") }}
              </r-btn>
            </r-col>
            <r-col class="col-auto">
              <r-btn :disabled="!valid" class="color-success-text" outlined
              >{{ $t("send", "renusify") }}
              </r-btn>
            </r-col>
          </r-row>
        </r-container>
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
        <r-container class="sheet">
          <r-row>
            <r-col class="col-12">
              <r-text-input
                :label="$t("name")"
                :rules="["required"]"
              ></r-text-input>
              <r-check-input
                :label="$t("off-name")"
                v-model="info.off"
                link="/home/off"
              ></r-check-input>
            </r-col>
          </r-row>
          <r-row class="h-end">
            <r-col class="col-auto">
              <r-btn
                class="color-error-text"
                outlined
                @click.prevent="show = false"
                >{{ $t("cancel", "renusify") }}
              </r-btn>
            </r-col>
            <r-col class="col-auto">
              <r-btn class="color-success-text" :disabled="!valid" outlined
                >{{ $t("send", "renusify") }}
              </r-btn>
            </r-col>
          </r-row>
        </r-container>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Name</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('name')" :rules="['required']"></r-text-input>
        <r-check-input
            v-model="info.off"
            :label="$t('off-name')"
            link="/home/off"
            name="code"
        ></r-check-input>
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
        <r-text-input
            :label="$t("name")"
            :rules="["required"]"
        ></r-text-input>
        <r-check-input
            :label="$t("off-name")"
            v-model="info.off"
            link="/home/off"
            name="code"
        ></r-check-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "check_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "type",
          type: "String",
          default: "text",
          description: "Data Type",
        },
        {
          prop: "name",
          type: "String",
          default: "text",
          description:
              "You can change the name, but by default it is in TXT format.",
        },
        {
          prop: "link",
          type: "String",
          default: "null",
          description: "The link should go to conduct the examination",
        },
        {
          prop: "modelValue",
          type: "String,Number",
          default: "null",
          description: "If the inputs are valid in the form, it becomes true.",
        },
        {
          prop: "autofocus",
          type: "Boolean",
          default: "null",
          description: "Auto Focus",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "Header",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "data", description: ""},
      ],
    };
  },
};
</script>
