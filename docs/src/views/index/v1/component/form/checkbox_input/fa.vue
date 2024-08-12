<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-checkbox-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        مولفه
        <r-btn readonly size="small"> r-checkbox-input</r-btn>
        این امکان را در اختیار کاربران قرار می دهد که بین دو مقدار متمایز انتخاب
        کنند.
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
    "readonly": false,
    "rounded": false,
    "modelValue": false,
    "size": "default"
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-checkbox-input :label="label" :readonly="readonly" :rounded="rounded" v-model="modelValue" :size="size" @update:model-Value="log(`update:modelValue`,$event)" ></r-checkbox-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Rounded</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('name')" :rules="['required']"></r-text-input>
        <div class="d-flex h-space-around my-4">
          <r-checkbox-input v-model="info.acceptt" rounded></r-checkbox-input>
          <r-checkbox-input v-model="info.exactt"></r-checkbox-input>
          <r-checkbox-input v-model="info.accept" rounded></r-checkbox-input>
          <r-checkbox-input v-model="info.exact"></r-checkbox-input>
        </div>
        <r-btn :disabled="!valid">Send</r-btn>
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
        <r-text-input :label="$t(`name`)" :rules="[`required`]"></r-text-input>
        <div class="d-flex h-space-around my-4">
          <r-checkbox-input rounded v-model="info.acceptt"></r-checkbox-input>
          <r-checkbox-input v-model="info.exactt"></r-checkbox-input>
          <r-checkbox-input rounded v-model="info.accept"></r-checkbox-input>
          <r-checkbox-input v-model="info.exact"></r-checkbox-input>
        </div>
        <r-btn :disabled="!valid">Send</r-btn>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Label</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('name')" :rules="['required']"></r-text-input>
        <div class="d-flex my-4">
          <r-checkbox-input
              v-model="info.accept1"
              class="color-success-text"
              label="Green"
              rounded
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.exact1"
              class="color-warning-text"
              label="Orange"
              rounded
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.accept"
              class="color-black-text"
              label="Black"
              rounded
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.exact"
              class="color-info-text"
              label="Blue"
              rounded
          ></r-checkbox-input>
        </div>
        <r-btn :disabled="!valid">Send</r-btn>
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
        <r-text-input :label="$t(`name`)" :rules="[`required`]"></r-text-input>
        <div class="d-flex my-4">
          <r-checkbox-input
            label="Green"
            rounded
            v-model="info.accept1"
            class="color-success-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="Orange"
            rounded
            v-model="info.exact1"
            class="color-warning-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="Black"
            rounded
            v-model="info.accept"
            class="color-black-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="Blue"
            rounded
            v-model="info.exact"
            class="color-info-text"
          ></r-checkbox-input>
        </div>
        <r-btn :disabled="!valid">Send</r-btn>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Readonly</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('name')" :rules="['required']"></r-text-input>
        <div class="d-flex my-4">
          <r-checkbox-input
              v-model="info.accept1"
              class="color-success-text"
              label="read only"
              readonly
              rounded
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.exact1"
              class="color-warning-text"
              label="Default"
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.accept"
              class="color-black-text"
              label="read only"
              readonly
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.exact"
              class="color-info-text"
              label="Default"
              rounded
          ></r-checkbox-input>
        </div>
        <r-btn :disabled="!valid">Send</r-btn>
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
        <r-text-input :label="$t(`name`)" :rules="[`required`]"></r-text-input>
        <div class="d-flex my-4">
          <r-checkbox-input
            label="read only"
            readonly
            rounded
            v-model="info.accept1"
            class="color-success-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="Default"
            v-model="info.exact1"
            class="color-warning-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="read only"
            readonly
            v-model="info.accept"
            class="color-black-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="Default"
            rounded
            v-model="info.exact"
            class="color-info-text"
          ></r-checkbox-input>
        </div>
        <r-btn :disabled="!valid">Send</r-btn>
      </r-form>
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
        <div class="d-flex my-4">
          <r-checkbox-input
              v-model="info.accept2"
              class="color-one-text"
              label="x-small"
              size="x-small"
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.accept1"
              class="color-success-text"
              label="small"
              size="small"
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.exact1"
              class="color-warning-text"
              label="Default"
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.accept"
              class="color-black-text"
              label="large"
              size="large"
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.exact"
              class="color-info-text"
              label="x-large"
              size="x-large"
          ></r-checkbox-input>
        </div>
        <r-divider class="color-warning"></r-divider>
        <div class="d-flex my-4">
          <r-checkbox-input
              v-model="info.accept2"
              class="color-one-text"
              label="x-small"
              rounded
              size="x-small"
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.accept1"
              class="color-success-text"
              label="small"
              rounded
              size="small"
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.exact1"
              class="color-warning-text"
              label="Default"
              rounded
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.accept"
              class="color-black-text"
              label="large"
              rounded
              size="large"
          ></r-checkbox-input>
          <r-checkbox-input
              v-model="info.exact"
              class="color-info-text"
              label="x-large"
              rounded
              size="x-large"
          ></r-checkbox-input>
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
        <div class="d-flex my-4">
          <r-checkbox-input
            label="x-small"
            size="x-small"
            v-model="info.accept2"
            class="color-one-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="small"
            size="small"
            v-model="info.accept1"
            class="color-success-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="Default"
            v-model="info.exact1"
            class="color-warning-text"
          ></r-checkbox-input>
          <r-checkbox-input
            size="large"
            label="large"
            v-model="info.accept"
            class="color-black-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="x-large"
            size="x-large"
            v-model="info.exact"
            class="color-info-text"
          ></r-checkbox-input>
        </div>
        <r-divider class="color-warning"></r-divider>
        <div class="d-flex my-4">
          <r-checkbox-input
            label="x-small"
            size="x-small"
            rounded
            v-model="info.accept2"
            class="color-one-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="small"
            size="small"
            rounded
            v-model="info.accept1"
            class="color-success-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="Default"
            rounded
            v-model="info.exact1"
            class="color-warning-text"
          ></r-checkbox-input>
          <r-checkbox-input
            size="large"
            label="large"
            rounded
            v-model="info.accept"
            class="color-black-text"
          ></r-checkbox-input>
          <r-checkbox-input
            label="x-large"
            size="x-large"
            rounded
            v-model="info.exact"
            class="color-info-text"
          ></r-checkbox-input>
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
  name: "checkbox_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "label",
          type: "String",
          default: "null",
          description: "یک Label می گیرد .",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "فیلد متن برای جمع آوری است .",
        },
        {
          prop: "rounded",
          type: "Boolean",
          default: "null",
          description: " با rounded دایره می شود .",
        },
        {
          prop: "modelValue",
          type: "Boolean",
          default: "null",
          description: "اگر input ها داخل فرم معتبر باشند true می شود .",
        },
        {
          prop: "size",
          type: "String",
          default: "default",
          description: "سایز ",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
