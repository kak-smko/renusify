<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        کامپوننت
        <r-btn readonly size="small"> r-input</r-btn>
        به شما یک input می‌دهد تا بتوانید ورودی‌های خود را وارد کنید.
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
        template='<r-input :id="id" :icon="icon" :pre-Icon="preIcon" :msg="msg" :label-ControlClass="labelControlClass" :input-ControlClass="inputControlClass" :color="color" :label="label" v-model="modelValue" :active="active" :hide="hide" :tile="tile" :disabled="disabled" :readonly="readonly" :error="error" :ltr="ltr" :msg-Shake="msgShake" :rules="rules" :validate-On-Blur="validateOnBlur" @pre-icon="log(`pre-icon`,$event)" @icon="log(`icon`,$event)" @update:model-Value="log(`update:modelValue`,$event)" ></r-input>'
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
      valid: false,

      info: {},
      props: [
        {
          prop: "id",
          type: "String",
          default: "null",
          description: "آیدی می گیرد",
        },
        {
          prop: "icon",
          type: "String",
          default: "null",
          description: "آیکون می گیرد",
        },
        {
          prop: "preIcon",
          type: "String",
          default: "null",
          description: " آیکون پیشین می گیرد",
        },
        {
          prop: "msg",
          type: "String",
          default: "null",
          description: "پیغام می گیرد",
        },
        {
          prop: "labelControlClass",
          type: "String,Object,Array",
          default: "null",
          description: "کلاسی به label اضافه می شود .",
        },
        {
          prop: "inputControlClass",
          type: "String,Object,Array",
          default: "null",
          description: "کلاسی به Input اضافه می شود ",
        },
        {
          prop: "color",
          type: "String",
          default: "null",
          description: "رنگ می تواند بگیرد",
        },
        {
          prop: "label",
          type: "String",
          default: "null",
          description: "label می تواند بگیرد",
        },
        {
          prop: "modelValue",
          type: "String,Boolean,Number,Array,Object",
          default: "null",
          description: "مثل modelValue است .",
        },
        {
          prop: "active",
          type: "Boolean",
          default: "null",
          description: "active می تواند بگیرد که فعال باشد .",
        },
        {
          prop: "hide",
          type: "Boolean",
          default: "undefined",
          description: "hide می تواند بگیرد که جزئیات غیرفعال می شوند .",
        },
        {
          prop: "tile",
          type: "Boolean",
          default: "undefined",
          description: "label ها را tile می کند ",
        },
        {
          prop: "disabled",
          type: "Boolean",
          default: "null",
          description: "disabled می توانیم بدهیم",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "readonly می توانیم بدهیم",
        },
        {
          prop: "error",
          type: "Boolean",
          default: "null",
          description: "توضیحات را می توانیم Error کنیم ",
        },
        {
          prop: "ltr",
          type: "Boolean",
          default: "undefined",
          description: "راست به چپ کردن",
        },
        {
          prop: "msgShake",
          type: "Boolean",
          default: "undefined",
          description: "پیغام خطاها لرزش داشته باشد یا نه . ",
        },
        {
          prop: "rules",
          type: "Array,Function",
          default: "() => []",
          description: "قواعد",
        },
        {
          prop: "validateOnBlur",
          type: "Boolean",
          default: "undefined",
          description: "وقتیکه داخل کادر کلیک شد valid انجام شود . ",
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
