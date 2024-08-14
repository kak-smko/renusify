<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-input</r-btn>
        component gives you a baseline to create your own custom inputs.
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
    "id": null,
    "icon": null,
    "preIcon": null,
    "msg": null,
    "labelControlClass": null,
    "inputControlClass": null,
    "color": null,
    "label": null,
    "modelValue": null,
    "active": false,
    "hide": false,
    "tile": false,
    "disabled": false,
    "readonly": false,
    "error": false,
    "ltr": false,
    "msgShake": false,
    "validateOnBlur": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-input :id="id" :icon="icon" :pre-Icon="preIcon" :msg="msg" :label-Control-Class="labelControlClass" :input-Control-Class="inputControlClass" :color="color" :label="label" v-model="modelValue" :active="active" :hide="hide" :tile="tile" :disabled="disabled" :readonly="readonly" :error="error" :ltr="ltr" :msg-Shake="msgShake" :rules="rules" :validate-On-Blur="validateOnBlur" @pre-icon="log(`pre-icon`,$event)" @icon="log(`icon`,$event)" @update:model-Value="log(`update:modelValue`,$event)" ></r-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Upload Link</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-container class="sheet">
          <r-row>
            <r-col class="col-12 ltr">
              <r-text-input
                  :label="$t('link', 'renusify')"
                  :rules="['required']"
              ></r-text-input>
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

  }
}"
        template='
 <r-form v-model="valid">
        <r-container class="sheet">
          <r-row>
            <r-col class="col-12 ltr">
              <r-text-input
                :label="$t(`link`, `renusify`)"
                :rules="[`required`]"
              ></r-text-input>
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
      PROP / <span>Icon</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-container class="sheet">
          <r-row>
            <r-col class="col-12">
              <r-text-input
                  :icon="$r.icons.eye"
                  :label="$t('name')"
                  :rules="['required']"
              ></r-text-input>
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

  }
}"
        template='
  <r-form v-model="valid">
        <r-container class="sheet">
          <r-row>
            <r-col class="col-12">
              <r-text-input
                :label="$t(`name`)"
                :icon="$r.icons.eye"
                :rules="[`required`]"
              ></r-text-input>
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
      PROP / <span>PreIcon</span>
    </h1>
    <section class="background-one pa-4">
      {{ info }}
      <r-form v-model="valid">
        <r-container class="sheet">
          <r-row>
            <r-col class="col-12">
              <r-text-input
                  v-model="info.name"
                  :label="$t('name')"
                  :preIcon="$r.icons.eye"
                  :rules="['required']"
                  @pre-icon="info = {}"
              ></r-text-input>
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
 <div>
    {{ info }}
      <r-form v-model="valid">
        <r-container class="sheet">
          <r-row>
            <r-col class="col-12">
              <r-text-input
                :label="$t(`name`)"
                v-model="info.name"
                :icon="$r.icons.eye"
                :rules="[`required`]"
                @pre-icon="info = {}"
              ></r-text-input>
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
 </div>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-container class="sheet">
          <r-row>
            <r-col class="col-12">
              <r-text-input
                  v-model="info.name"
                  :label="$t('Password')"
                  :preIcon="$r.icons.eye"
                  :rules="['required']"
                  :type="pass"
                  @pre-icon="pass = 'text'"
              ></r-text-input>
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
                :label="$t(`Password`)"
                :type="pass"
                v-model="info.name"
                :preIcon="$r.icons.eye"
                :rules="[`required`]"
                @pre-icon="pass = `text`"
              ></r-text-input>
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
      PROP / <span>Msg</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-text-input
            v-model="info.name"
            :label="$t('Password')"
            :rules="['required']"
            :type="pass"
            msg="Your Password"
        ></r-text-input>
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
          :label="$t(`Password`)"
          :type="pass"
          v-model="info.name"
          :rules="[`required`]"
          msg="Your Password"
        ></r-text-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Color</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-text-input
            v-model="info.name"
            :label="$t('Password')"
            :rules="['required']"
            :type="pass"
            color="color-info-text"
            msg="Your Password"
        ></r-text-input>
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
          :label="$t(`Password`)"
          :type="pass"
          v-model="info.name"
          msg="Your Password"
          color="color-info-text"
        ></r-text-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "input",
  data() {
    return {
      props: [
        {
          prop: "id",
          type: "String",
          default: "null",
          description: "It can get an ID.",
        },
        {
          prop: "icon",
          type: "String",
          default: "null",
          description: "get an Icon",
        },
        {
          prop: "preIcon",
          type: "String",
          default: "null",
          description: "get an PreIcon",
        },
        {
          prop: "msg",
          type: "String",
          default: "null",
          description: "get an Message",
        },
        {
          prop: "labelControlClass",
          type: "String,Object,Array",
          default: "null",
          description: "A class is being added to Label.",
        },
        {
          prop: "inputControlClass",
          type: "String,Object,Array",
          default: "null",
          description: "A class is being added to Input.",
        },
        {
          prop: "color",
          type: "String",
          default: "null",
          description: "Color can have.",
        },
        {
          prop: "label",
          type: "String",
          default: "null",
          description: "Label can have",
        },
        {
          prop: "modelValue",
          type: "String,Boolean,Number,Array,Object",
          default: "null",
          description: "Like modelValue",
        },
        {
          prop: "active",
          type: "Boolean",
          default: "null",
          description: "Active can have to being active",
        },
        {
          prop: "hide",
          type: "Boolean",
          default: "undefined",
          description: "It takes hide, can disable details",
        },
        {
          prop: "tile",
          type: "Boolean",
          default: "undefined",
          description: "Tiles the labels",
        },
        {
          prop: "disabled",
          type: "Boolean",
          default: "null",
          description: "We can disabled it.",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "We can readonly it.",
        },
        {
          prop: "error",
          type: "Boolean",
          default: "null",
          description: "We can Error the descriptions.",
        },
        {
          prop: "ltr",
          type: "Boolean",
          default: "undefined",
          description: " left to right",
        },
        {
          prop: "msgShake",
          type: "Boolean",
          default: "undefined",
          description:
              "Should the error messages be displayed with shake or not?",
        },
        {
          prop: "rules",
          type: "Array,Function",
          default: "() => []",
          description: "Rules",
        },
        {
          prop: "validateOnBlur",
          type: "Boolean",
          default: "undefined",
          description: "When clicked inside the box, validate it.",
        },
      ],
      events: [
        {event: "pre-icon", description: ""},
        {event: "icon", description: ""},
        {event: "update:modelValue", description: ""},
      ],
    };
  },
};
</script>
