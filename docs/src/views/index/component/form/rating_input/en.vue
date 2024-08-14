<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-rating-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        Collecting user feedback through rating using the
        <r-btn readonly size="small"> r-rating-input</r-btn>
        component can be analyzed
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
    "count": 5,
    "size": "default",
    "modelValue": null,
    "readonly": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-rating-input :count="count" :size="size" v-model="modelValue" :readonly="readonly" @update:model-Value="log(`update:modelValue`,$event)" ></r-rating-input>'
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
    <section class="pa-4" style="border: 1px #28ee0a solid">
      <r-card class="px-5 py-8 text-center">
        <h3 class="color-one-text">Rating</h3>
        <r-form v-model="valid">
          <r-rating-input v-model="info.range"></r-rating-input>
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
        <h3 class="color-one-text">Rating</h3>
        <r-form v-model="valid">
          <r-rating-input v-model="info.range"></r-rating-input>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Size</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-rating-input
            v-model="info.range"
            class="mt-4"
            size="x-large"
        ></r-rating-input>
        <r-rating-input
            v-model="info.range"
            class="mt-4"
            size="large"
        ></r-rating-input>
        <r-rating-input v-model="info.range" class="mt-4"></r-rating-input>
        <r-rating-input
            v-model="info.range"
            class="mt-4"
            size="small"
        ></r-rating-input>
        <r-rating-input
            v-model="info.range"
            class="mt-4"
            size="x-small"
        ></r-rating-input>
        <r-btn :disabled="!valid" class="color-one-text mt-8" outlined
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

  }
}"
        template='
      <r-form v-model="valid">
        <r-rating-input
          class="mt-4"
          size="x-large"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input
          class="mt-4"
          size="large"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input class="mt-4" v-model="info.range"></r-rating-input>
        <r-rating-input
          class="mt-4"
          size="small"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input
          class="mt-4"
          size="x-small"
          v-model="info.range"
        ></r-rating-input>
        <r-btn class="color-one-text mt-8" :disabled="!valid" outlined
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
      PROP / <span>Count</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-rating-input
            v-model="info.range"
            :count="8"
            class="mt-4"
        ></r-rating-input>
        <r-rating-input
            v-model="info.range"
            :count="7"
            class="mt-4"
        ></r-rating-input>
        <r-rating-input
            v-model="info.range"
            :count="6"
            class="mt-4"
        ></r-rating-input>
        <r-rating-input
            v-model="info.range"
            :count="5"
            class="mt-4"
        ></r-rating-input>
        <r-rating-input
            v-model="info.range"
            :count="4"
            class="mt-4"
        ></r-rating-input>
        <r-rating-input
            v-model="info.range"
            :count="3"
            class="mt-4"
        ></r-rating-input>
        <r-rating-input
            v-model="info.range"
            :count="2"
            class="mt-4"
        ></r-rating-input>
        <r-rating-input
            v-model="info.range"
            :count="1"
            class="mt-4"
        ></r-rating-input>
      </r-form>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
    valid: false,

  }
}"
        template='
        <r-form v-model="valid">
        <r-rating-input
          class="mt-4"
          :count="8"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input
          class="mt-4"
          :count="7"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input
          class="mt-4"
          :count="6"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input
          class="mt-4"
          :count="5"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input
          class="mt-4"
          :count="4"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input
          class="mt-4"
          :count="3"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input
          class="mt-4"
          :count="2"
          v-model="info.range"
        ></r-rating-input>
        <r-rating-input
          class="mt-4"
          :count="1"
          v-model="info.range"
        ></r-rating-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "rating_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {prop: "count", type: "Number", default: "5", description: "Count"},
        {
          prop: "size",
          type: "String",
          default: "default",
          description: "Size",
        },
        {
          prop: "modelValue",
          type: "Number",
          default: "null",
          description: "Model Value ",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "Read Only",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
