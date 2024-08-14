<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-cam-input
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-cam-input</r-btn>
        از
        <r-btn readonly size="small"> r-input</r-btn>
        ارث می برد و تمام ویژگی های آن را به ارث می برد.
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
    "uploadLink": null,
    "width": "300",
    "height": "300",
    "audio": true,
    "video": true,
    "modelValue": null,
    "size": 3,
    "headers": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-cam-input :upload-Link="uploadLink" :width="width" :height="height" :audio="audio" :video="video" v-model="modelValue" :size="size" :headers="headers" @update:model-Value="log(`update:modelValue`,$event)" @error="log(`error`,$event)" ></r-cam-input>'
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
        <r-cam-input v-model="info.me" upload-link="/storage"></r-cam-input>
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
        <r-cam-input v-model="info.me" upload-link="/storage"></r-cam-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Height</span> /<span>Width</span>
    </h1>
    <section class="background-one pa-4">
      <r-form v-model="valid">
        <r-container>
          <r-row>
            <r-col class="col-2">
              <r-cam-input
                  v-model="info.me"
                  height="100"
                  upload-link="/storage"
                  width="100"
              ></r-cam-input>
            </r-col>
            <r-col class="col-4">
              <r-cam-input
                  v-model="info.me"
                  height="200"
                  upload-link="/storage"
                  width="200"
              ></r-cam-input>
            </r-col>
            <r-col class="col-4">
              <r-cam-input
                  v-model="info.me"
                  height="300"
                  upload-link="/storage"
                  width="300"
              ></r-cam-input>
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
        <r-container>
          <r-row>
            <r-col class="col-2">
              <r-cam-input
                v-model="info.me"
                upload-link="/storage"
                width="100"
                height="100"
              ></r-cam-input>
            </r-col>
            <r-col class="col-4">
              <r-cam-input
                v-model="info.me"
                upload-link="/storage"
                width="200"
                height="200"
              ></r-cam-input>
            </r-col>
            <r-col class="col-4">
              <r-cam-input
                v-model="info.me"
                upload-link="/storage"
                width="300"
                height="300"
              ></r-cam-input>
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
      PROP / <span>Video</span>
    </h1>
    <section class="pa-4">
      <r-form v-model="valid" class="shadow-info background-two">
        <r-cam-input
            v-model="info.me"
            :video="false"
            label="disable Video"
            upload-link="/storage"
        ></r-cam-input>
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
 <r-form v-model="valid" class="shadow-info background-two">
        <r-cam-input
          v-model="info.me"
          upload-link="/storage"
          :video="false"
        ></r-cam-input>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "cam_input",
  data() {
    return {
      valid: false,
      info: {},
      props: [
        {
          prop: "uploadLink",
          type: "String",
          default: "null",
          description: " وروردی بعنوان فیلم می تواند بگیرد.",
        },
        {
          prop: "width",
          type: "String",
          default: "300",
          description: "تنظیم عرض ",
        },
        {
          prop: "height",
          type: "String",
          default: "300",
          description: "تنظیم ارتفاع",
        },
        {
          prop: "audio",
          type: "Boolean",
          default: "true",
          description: "فعال یا غیر فعال کردن Audio",
        },
        {
          prop: "video",
          type: "Boolean",
          default: "true",
          description: "فعال یا غیر فعال کردن Video",
        },
        {
          prop: "modelValue",
          type: "Array",
          default: "null",
          description: "اگر input ها داخل فرم معتبر باشند true می شود .",
        },
        {prop: "size", type: "Number", default: "3", description: "سایز"},
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "هدر ",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "error", description: ""},
      ],
    };
  },
};
</script>
