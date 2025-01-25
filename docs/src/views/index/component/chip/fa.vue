<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">r-chip</h1>
      <p class="font-weight-light color-black-text ps-4 py-1 mb-1 br-lg">
        کامپوننت
        <r-btn readonly size="small">r-chip</r-btn>
        برای انتقال اطلاعات کوچک استفاده می شود. این کامپوننت توسط گروه
        <r-btn readonly size="small">r-chip</r-btn>
        برای گزینه های پیشرفته مورد استفاده قرار می گیرد.
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
    "modelValue": false,
    "size": "default",
    "selectable": false,
    "close": false,
    "disabled": false,
    "label": false,
    "outlined": false,
    "text": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-chip v-model="modelValue" :size="size" :selectable="selectable" :close="close" :disabled="disabled" :label="label" :outlined="outlined" :text="text" @update:model-Value="log(`update:modelValue`,$event)" @close="log(`close`,$event)" >test</r-chip>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-chip class="color-one">Design</r-chip>
      <r-chip class="color-info">Renusify</r-chip>
      <r-chip class="color-error">GitHub</r-chip>
      <r-chip>Web</r-chip>
      <r-chip disabled>Blog</r-chip>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='         <r-chip class="color-info-text">Renusify</r-chip>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip">Checking the Correct</r-chip>
        <p>{{ changeChip }}</p>
      </r-card>
      <r-card class="pa-3 text-center">
        <p>{{ ddChip }}</p>
        <r-chip v-model="ddChip">Checking the Correct</r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
   changeChip: false,
  }
}"
        template='    <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip" class="color-white-text"
          >Checking the Correct
        </r-chip>
        <p>{{ changeChip }}</p>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Size</span>
    </h1>
    <section class="d-flex h-space-around">
      <r-chip class="color-one-text" size="x-large">X-large</r-chip>
      <r-chip class="color-info-text" size="large">Large</r-chip>
      <r-chip class="color-red-text" size="default">Default</r-chip>
      <r-chip class="color-two-text" size="small">Small</r-chip>
      <r-chip class="color-white-text" size="x-small">X-small</r-chip>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='    <r-chip size="small" class="color-two-text">Small</r-chip>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Selectable</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip" class="color-white-text" selectable
        >mouse cursor when you move it
        </r-chip>
      </r-card>
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="ddChip" class="color-black-text">Chip Default</r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
   changeChip: false,
  }
}"
        template='      <r-card class="pa-3 text-center" outlined>
        <r-chip selectable v-model="changeChip" class="color-white-text"
          >mouse cursor when you move it
        </r-chip>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Close</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip" class="color-white-text" close
        >add a button to make it close
        </r-chip>
      </r-card>
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="ddChip" class="color-black-text">Chip Default</r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
   changeChip: false,
  }
}"
        template='      <r-card class="pa-3 text-center" outlined>
        <r-chip selectable v-model="changeChip" class="color-white-text"
          >mouse cursor when you move it
        </r-chip>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Disabled</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip" class="color-two-text" disabled
        >add a button to make it close
        </r-chip>
      </r-card>
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="ddChip" class="color-white-text"
        >Chip Disabled
        </r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
   changeChip: false,
  }
}"
        template='    <r-card class="pa-3 text-center" outlined>
        <r-chip disabled v-model="changeChip" class="color-two-text"
          >add a button to make it close
        </r-chip>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Label</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-chip class="color-one" label>Color-one</r-chip>
      <r-chip class="color-info" label>Color-info</r-chip>
      <r-chip class="color-success" label>Color-success</r-chip>
      <r-chip class="color-two" label>Color-two</r-chip>
      <r-chip class="color-black color-white-text" label>Color-black</r-chip>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='      <r-chip label class="color-success">Color-success</r-chip>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Text</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="px-10 py-4 color-info">
        <r-chip class="color-white-text font-weight-bold" text>
          used to display the Chip
        </r-chip>
      </r-card>
      <r-card class="px-10 py-4 color-success">
        <r-chip class="color-white-text font-weight-bold" label>
          Default Chip
        </r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='        <r-card class="px-10 py-4 color-info">
        <r-chip text class="color-white-text font-weight-bold">
          used to display the Chip</r-chip
        >
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "chip",
  data() {
    return {
      changeChip: false,
      ddChip: false,
      props: [
        {
          prop: "modelValue",
          type: "Boolean",
          default: "false",
          description: "قرار دادن تیک درست یا نادرست در chip. ",
        },
        {
          prop: "size",
          type: "String",
          default: "default",
          description:
              "chip می‌تواند اندازه‌های مختلفی از بسیار کوچک تا بسیار بزرگ داشته باشد",
        },
        {
          prop: "selectable",
          type: "Boolean",
          default: "null",
          description: "باعث تغییر نشانگر ماوس می شود .",
        },
        {
          prop: "close",
          type: "Boolean",
          default: "null",
          description:
              "دکمه close  در بالای chip با نماد (x) اضافه می شود که می توان روی آن کلیک کنید. ",
        },
        {
          prop: "disabled",
          type: "Boolean",
          default: "null",
          description: "برای غیرفعال کردن chip مورد استفاده قرار می گیرد.",
        },
        {
          prop: "label",
          type: "Boolean",
          default: "null",
          description: "حاشیه های chip را مربعی می کند .",
        },
        {
          prop: "outlined",
          type: "Boolean",
          default: "null",
          description: "حاشیه ای به chip میدهد",
        },
        {
          prop: "text",
          type: "Boolean",
          default: "null",
          description: "پراپی برای نمایش متن در chip است. ",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "close", description: ""},
      ],
    };
  },
};
</script>
