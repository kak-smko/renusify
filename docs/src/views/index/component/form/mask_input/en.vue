<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-mask-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-mask-input</r-btn>
        It is used in the table for the mobile number or card number.
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
    "mask": "N N N N",
    "required": false,
    "maskedVal": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-mask-input v-model="modelValue" :mask="mask" :required="required" :masked-Val="maskedVal" @update:model-Value="log(`update:modelValue`,$event)" @complete="log(`complete`,$event)" ></r-mask-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Mask</span>
    </h1>
    <section class="pa-4" style="border: 1px #0aa6ee solid">
      <r-form v-model="valid">
        <r-text-input
            :label="$t('' + 'first Name')"
            :rules="['required']"
        ></r-text-input>
        <r-text-input
            :label="$t('Last Name')"
            :rules="['required']"
        ></r-text-input>
        <r-mask-input
            v-model="info.cart"
            :label="$t('cart')"
            mask="NNNN - NNNN - NNNN - NNNN"
        ></r-mask-input>
        <r-mask-input
            v-model="info.code"
            :label="$t('code')"
            mask="NN AA XXN NNN "
        ></r-mask-input>
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
          :label="$t(`first Name`)"
          :rules="[`required`]"
        ></r-text-input>
        <r-text-input
          :label="$t(`Last Name`)"
          :rules="[`required`]"
        ></r-text-input>
        <r-mask-input
          :label="$t(`cart`)"
          v-model="info.cart"
          mask="NNNN - NNNN - NNNN - NNNN"
        ></r-mask-input>
        <r-mask-input
          :label="$t(`code`)"
          v-model="info.code"
          mask="NN -> AA -> BB -> XX"
        ></r-mask-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4" style="border: 1px #e60aee solid">
      <r-form v-model="valid">
        <r-text-input
            :label="$t('' + 'first Name')"
            :rules="['required']"
        ></r-text-input>
        <r-text-input
            :label="$t('Last Name')"
            :rules="['required']"
        ></r-text-input>
        <r-mask-input
            v-model="info.mobile"
            :label="$t('phone')"
            mask="09NN NNN NNNN"
        ></r-mask-input>
        <r-btn :disabled="!valid" class="color-success-text my-4" outlined
        >{{ $t("send", "renusify") }}
        </r-btn>
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
        <r-text-input :label="$t(`first Name`)" :rules="[`required`]"></r-text-input>
        <r-text-input :label="$t(`Last Name`)" :rules="[`required`]"></r-text-input>
        <r-mask-input
            :label="$t(`phone`)"
            v-model="info.mobile"
            mask="09NN (NNN) NNNN"
        ></r-mask-input>
        <r-btn class="color-success-text" :disabled="!valid" outlined
        >{{ $t("send", "renusify") }}
        </r-btn>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Required</span>
    </h1>
    <section class="pa-4" style="border: 1px #0aa6ee solid">
      <r-form v-model="valid">
        <r-text-input
            :label="$t('' + 'first Name')"
            :rules="['required']"
        ></r-text-input>
        <r-text-input
            :label="$t('Last Name')"
            :rules="['required']"
        ></r-text-input>
        <r-mask-input
            v-model="info.cart"
            :label="$t('cart')"
            mask="NNNN - NNNN - NNNN - NNNN"
            required
        ></r-mask-input>
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
          :label="$t(`first Name`)"
          :rules="[`required`]"
        ></r-text-input>
        <r-text-input
          :label="$t(`Last Name`)"
          :rules="[`required`]"
        ></r-text-input>
        <r-mask-input
          :label="$t(`cart`)"
          v-model="info.cart"
          required
          mask="NNNN - NNNN - NNNN - NNNN"
        ></r-mask-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "mask_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "modelValue",
          type: "String",
          default: "null",
          description: "Model Value",
        },
        {
          prop: "mask",
          type: "String",
          default: "",
          description:
              "mask is used to place the prefix of mobile numbers by default",
        },
        {
          prop: "required",
          type: "Boolean",
          default: "false",
          description: "Indicate the compulsion with 'required",
        },
        {
          prop: "maskedVal",
          type: "Boolean",
          default: "false",
          description:
              "It returns the layout of the mobile number or desired card",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "complete", description: ""},
      ],
    };
  },
};
</script>
