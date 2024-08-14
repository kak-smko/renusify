<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-group-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        همزمان چند جدول با هم به فرم اضافه می شوند
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
    "itemKey": null,
    "modelValue": null,
    "size": null,
    "disableAdd": false,
    "translate": false,
    "template": { name: {type:`r-text-input`,props:{rules:[`required`]}}, age: {type:`r-number-input`}, male: {type:`r-switch-input`}},
    "addBtnClass": "text-center"
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-group-input :label="label" :item-Key="itemKey" v-model="modelValue" :size="size" :disable-Add="disableAdd" :translate="translate" :template="template" :add-Btn-Class="addBtnClass" @update:model-Value="log(`update:modelValue`,$event)" @add="log(`add`,$event)" @delete="log(`delete`,$event)" ></r-group-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
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
        <r-check-input v-model="info.off" link="/home/off"></r-check-input>
        <r-group-input v-model="info.group">
          <template v-slot={item}>
            <r-row>
              <r-col class="col-6">
                  <r-text-input v-model="item.name" label="name"></r-text-input>
              </r-col>
              <r-col class="col-6">
                  <r-text-input v-model="item.family" label="family"></r-text-input>
              </r-col>
            </r-row>
          </template>
        </r-group-input>
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
    <section class="text-end pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('name')" :rules="['required']"></r-text-input>
        <r-group-input v-model="info.groupLabel">
          <template v-slot="{ item }">
            <r-row>
              <r-col class="col-6">
                <r-text-input v-model="item.name"></r-text-input>
              </r-col>
              <r-col class="col-6">
                <r-number-input v-model="item.age"></r-number-input>
              </r-col>
            </r-row>
          </template>
        </r-group-input>
        <r-btn :disabled="!valid" class="color-success-text" outlined
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
        <r-text-input :label="$t(`name`)" :rules="[`required`]"></r-text-input>
        <r-group-input v-model="info.groupLabel">
          <template v-slot="{ item }">
            <r-row>
              <r-col class="col-6">
                <r-text-input v-model="item.name"></r-text-input>
              </r-col>
              <r-col class="col-6">
                <r-number-input v-model="item.age"></r-number-input>
              </r-col>
            </r-row>
          </template>
        </r-group-input>
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
      PROP / <span>Size</span>
    </h1>
    <section class="text-end pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('name')" :rules="['required']"></r-text-input>
        <r-group-input v-model="info.groupLabel" :size="3">
          <template v-slot="{ item }">
            <r-row>
              <r-col class="col-6">
                <r-text-input v-model="item.name"></r-text-input>
              </r-col>
              <r-col class="col-6">
                <r-number-input v-model="item.age"></r-number-input>
              </r-col>
            </r-row>
          </template>
        </r-group-input>
        <r-btn :disabled="!valid" class="color-success-text" outlined
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
        <r-text-input :label="$t(`name`)" :rules="[`required`]"></r-text-input>
        <r-group-input v-model="info.groupLabel" :size="3">
          <template v-slot="{ item }">
            <r-row>
              <r-col class="col-6">
                <r-text-input v-model="item.name"></r-text-input>
              </r-col>
              <r-col class="col-6">
                <r-number-input v-model="item.age"></r-number-input>
              </r-col>
            </r-row>
          </template>
        </r-group-input>
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
      PROP / <span>Template</span>
    </h1>
    <section class="text-end pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('name')" :rules="['required']"></r-text-input>
        <r-group-input
            v-model="info.groupLabel"
            :template="{
            name: { type: 'r-text-input' },
            age: { type: 'r-number-input' },
            male: { type: 'r-switch-input' },
          }"
        ></r-group-input>
        <r-btn :disabled="!valid" class="color-success-text" outlined
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
        <r-text-input :label="$t(`name`)" :rules="[`required`]"></r-text-input>
        <r-group-input v-model="info.groupLabel" :size="3">
          <template v-slot="{ item }">
            <r-row>
              <r-col class="col-6">
                <r-text-input v-model="item.name"></r-text-input>
              </r-col>
              <r-col class="col-6">
                <r-number-input v-model="item.age"></r-number-input>
              </r-col>
            </r-row>
          </template>
        </r-group-input>
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
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">Default</h1>
    <section class="text-end pa-4">
      <r-form v-model="valid">
        <r-text-input :label="$t('name')" :rules="['required']"></r-text-input>
        <r-group-input
            v-model="info.group2"
            :size="4"
            :template="{
            name: { type: 'r-text-input', props: { rules: ['required'] } },
            age: { type: 'r-number-input' },
            male: { type: 'r-switch-input' },
          }"
        >
        </r-group-input>
        <r-btn :disabled="!valid" class="color-success-text" outlined
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
        <r-text-input :label="$t(`name`)" :rules="[`required`]"></r-text-input>
        <r-group-input
          v-model="info.group2"
          :template="{ name: {type:`r-text-input`,props:{rules:[`required`]}},
            age: {type:`r-number-input`}, male: {type:`r-switch-input`}}"
          :size="4"
        >
        </r-group-input>
        <r-btn class="color-success-text" :disabled="!valid" outlined
          >{{ $t("send", "renusify") }}
        </r-btn>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>

<script>
export default {
  name: "group_input",
  data() {
    return {
      valid: false,

      info: {},
      props: [
        {
          prop: "label",
          type: "String",
          default: "null",
          description: "label می تواند بگیرد",
        },
        {
          prop: "itemKey",
          type: "String",
          default: "null",
          description: "کلید آیتم ",
        },
        {
          prop: "modelValue",
          type: "Array",
          default: "null",
          description: "Model Value می گیرد ",
        },
        {
          prop: "size",
          type: "Number",
          default: "null",
          description: "محدود کردن سایز",
        },
        {
          prop: "disableAdd",
          type: "Boolean",
          default: "null",
          description: "اضافه شدن را غیر فعال می کند ",
        },
        {
          prop: "translate",
          type: "Boolean",
          default: "null",
          description: "ترجمه شود یا نه",
        },
        {
          prop: "template",
          type: "Object",
          default: "null",
          description: "قالب می گیرد",
        },
        {
          prop: "addBtnClass",
          type: "String",
          default: "text-center",
          description: "به Btn کلاس های اضافه شود",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "add", description: ""},
        {event: "delete", description: ""},
      ],
    };
  },
};
</script>
