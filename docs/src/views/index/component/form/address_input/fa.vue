<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-address-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        از این
        <r-btn readonly size="small"> r-address-input</r-btn>
        برای به
        دست آوردن آدرس استفاده می‌شود.
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
    "required": false,
    "allowCountries": null,
    "hideState": false,
    "hideCity": false,
    "hideZipCode": false,
    "hideStreet": false,
    "tile": false,
    "defaultCountry": null,
    "modelValue": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-address-input :required="required" :allow-Countries="allowCountries" :hide-State="hideState" :hide-City="hideCity" :hide-Zip-Code="hideZipCode" :hide-Street="hideStreet" :tile="tile" :default-Country="defaultCountry" v-model="modelValue" @update:model-Value="log(`update:modelValue`,$event)" ></r-address-input>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Required</span>
    </h1>
    <section>
      <r-form v-model="valid">
        <r-address-input v-model="info.address" required></r-address-input>
      </r-form>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  info: {},
 valid:false,
  }
}"
        template='
                <r-form v-model="valid">
        <r-address-input required v-model="info.address"></r-address-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>HideState</span>
    </h1>
    <section>
      <r-form v-model="valid">
        <r-address-input v-model="info.address" hideState></r-address-input>
      </r-form>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  info: {},
 valid:false,
  }
}"
        template='
     <r-form v-model="valid">
        <r-address-input hideState v-model="info.address"></r-address-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Tile</span>
    </h1>
    <section class="background-two pa-4">
      <r-form v-model="valid">
        <r-address-input
            v-model="info.address"
            hideState
            tile
        ></r-address-input>
      </r-form>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  info: {},
 valid:false,
  }
}"
        template='
<r-form v-model="valid">
        <r-address-input
          tile
          hideState
          v-model="info.address"
        ></r-address-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>HideZipCode</span>
    </h1>
    <section class="background-two pa-4">
      <r-form v-model="valid">
        <r-address-input
            v-model="info.address"
            hideZipCode
            tile
        ></r-address-input>
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
        <r-address-input
          tile
          hideZipCode
          v-model="info.address"
        ></r-address-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "address_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "required",
          type: "Boolean",
          default: "null",
          description:
              "Input قبل از ارسال به سمت سرور حتما باید دارای مقدار باشد",
        },
        {
          prop: "allowCountries",
          type: "Array",
          default: "null",
          description: "اجازه دادن دسترسی به همه کشورها",
        },
        {
          prop: "hideState",
          type: "Boolean",
          default: "null",
          description: "عدم دسترسی ایالتی",
        },
        {
          prop: "hideCity",
          type: "Boolean",
          default: "null",
          description: "عدم دسترسی شهری",
        },
        {
          prop: "hideZipCode",
          type: "Boolean",
          default: "null",
          description: "عدم دسترسی براساس کد پستی",
        },
        {
          prop: "hideStreet",
          type: "Boolean",
          default: "null",
          description: "عدم دسترسی براساس خیابان  ",
        },
        {
          prop: "tile",
          type: "Boolean",
          default: "undefined",
          description: "label ها را tile می کند",
        },
        {
          prop: "defaultCountry",
          type: "Object",
          default: "null",
          description: "کشور پیشفرض ",
        },
        {
          prop: "modelValue",
          type: "Object",
          default: "null",
          description: "اگر input ها داخل فرم معتبر باشند true می شود .",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
