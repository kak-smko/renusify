<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-password-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-password-input</r-btn>
        کاراکترها در فیلد رمز عبور مخفی می‌شوند (با استفاده از ستاره‌ها نشان
        داده می‌شوند)
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
    "hideLine": false,
    "autofocus": false,
    "lowerCase": true,
    "upperCase": false,
    "specialChar": false,
    "number": false,
    "minLength": 8
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-password-input v-model="modelValue" :hide-Line="hideLine" :autofocus="autofocus" :lower-Case="lowerCase" :upper-Case="upperCase" :special-Char="specialChar" :number="number" :min-Length="minLength" @update:model-Value="log(`update:modelValue`,$event)" ></r-password-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Password</h3>
        <r-form v-model="valid">
          <r-password-input
              v-model="info.pass"
              :label="$t('Password')"
          ></r-password-input>
          <r-btn class="my-4 color-info px-20">Submit</r-btn>
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
        <h3>Password</h3>
        <r-form v-model="valid">
          <r-password-input
            v-model="info.pass"
            :label="$t(`Password`)"
          ></r-password-input>
          <r-btn class="my-4 color-info px-20">Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>LowerCase</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Password</h3>
        <r-form v-model="valid">
          <r-text-input
              :label="$t('UserName')"
              :rules="['required']"
          ></r-text-input>
          <r-password-input
              v-model="info.pas"
              :label="$t('Password')"
              lowerCase
          ></r-password-input>
          <r-number-input
              v-model="info.ag"
              :label="$t('Age')"
              btnText
          ></r-number-input>
          <r-btn block class="my-4 color-two-text" rounded>Submit</r-btn>
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
        <h3>Password</h3>
        <r-form v-model="valid">
          <r-text-input
            :label="$t(`UserName`)"
            :rules="[`required`]"
          ></r-text-input>
          <r-password-input
            lowerCase
            v-model="info.pas"
            :label="$t(`Password`)"
          ></r-password-input>
          <r-number-input
            btnText
            v-model="info.ag"
            :label="$t(`Age`)"
          ></r-number-input>
          <r-btn rounded class="my-4 color-two-text" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>UpperCase</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Password</h3>
        <r-form v-model="valid">
          <r-text-input
              :label="$t('UserName')"
              :rules="['required']"
          ></r-text-input>
          <r-password-input
              v-model="info.pas"
              :label="$t('Password')"
              upperCase
          ></r-password-input>
          <r-btn block class="my-4 color-one">Submit</r-btn>
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
        <h3>Password</h3>
        <r-form v-model="valid">
          <r-text-input
            :label="$t(`UserName`)"
            :rules="[`required`]"
          ></r-text-input>
          <r-password-input
            upperCase
            v-model="info.pas"
            :label="$t(`Password`)"
          ></r-password-input>
          <r-btn class="my-4 color-one" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>SpecialChar</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Password</h3>
        <r-form v-model="valid">
          <r-text-input
              :label="$t('UserName')"
              :rules="['required']"
          ></r-text-input>
          <r-password-input
              v-model="info.pas"
              :label="$t('Password like !@#$%^')"
              specialChar
          ></r-password-input>
          <r-btn block class="my-4 color-black">Submit</r-btn>
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
               <r-password-input
            specialChar
            v-model="info.pas"
            :label="$t(`Password like !@#$%^`)"
          ></r-password-input>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>MinLength</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center">
        <h3>Password</h3>
        <r-form v-model="valid">
          <r-text-input
              :label="$t('UserName')"
              :rules="['required']"
          ></r-text-input>
          <r-password-input
              v-model="info.pas"
              :label="$t('Password minLength = 4')"
              :minLength="4"
          ></r-password-input>
          <r-btn block class="my-4 color-black">Submit</r-btn>
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
        <h3>Password</h3>
        <r-form v-model="valid">
          <r-text-input
            :label="$t(`UserName`)"
            :rules="[`required`]"
          ></r-text-input>
          <r-password-input
            :minLength="4"
            v-model="info.pas"
            :label="$t(`Password minLength = 4`)"
          ></r-password-input>
          <r-btn class="my-4 color-black" block>Submit</r-btn>
        </r-form>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "password_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "modelValue",
          type: "String,Number",
          default: "null",
          description: "Model Value می گیرد",
        },
        {
          prop: "hideLine",
          type: "Boolean",
          default: "null",
          description: "validate را بررسی نمی کند   ",
        },
        {
          prop: "autofocus",
          type: "Boolean",
          default: "null",
          description: "خودکار",
        },
        {
          prop: "lowerCase",
          type: "Boolean",
          default: "true",
          description: "حروف کوچک",
        },
        {
          prop: "upperCase",
          type: "Boolean",
          default: "null",
          description: "حروف بزرگ",
        },
        {
          prop: "specialChar",
          type: "Boolean",
          default: "null",
          description: " کاراکترهای خاص",
        },
        {
          prop: "number",
          type: "Boolean",
          default: "null",
          description: "شماره",
        },
        {
          prop: "minLength",
          type: "Number",
          default: "8",
          description: "حداقل رمز",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
