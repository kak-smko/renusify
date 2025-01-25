<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-progress-line
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-progress-circle</r-btn>
        نشان دهنده پیشرفت انجام یک وظیفه است.
      </p>
    </div>
    <table-props :items="items"></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "modelValue": 60,
    "color": "color-info",
    "progressStyle": null,
    "showPercent": true,
    "outlined": false,
    "rounded": false,
    "showBackground": true,
    "size": "small"
}
}'
        template='<r-progress-line v-model="modelValue" :color="color" :progress-Style="progressStyle" :show-Percent="showPercent" :outlined="outlined" :rounded="rounded" :show-Background="showBackground" :size="size" ></r-progress-line>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">Progress Line</h1>
    <section class="d-flex h-space-around pt-6">
      <r-card class="pa-4 color-two-text" outlined>
        <p>card default</p>
        <r-progress-line color="color-two"></r-progress-line>
      </r-card>
      <r-card class="pa-4 color-warning-text" outlined>
        <p>card outlined</p>
        <r-progress-line color="color-warning" outlined></r-progress-line>
      </r-card>
      <r-card class="pa-4 color-one-text" outlined>
        <p>card rounded</p>
        <r-progress-line color="color-one" rounded></r-progress-line>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template=' <div class="d-flex h-space-around">
        <r-card outlined class="pa-4 color-two-text">
        <p>card default</p>
        <r-progress-line color="color-two"> </r-progress-line>
      </r-card>
      <r-card outlined class="pa-4 color-warning-text">
        <p>card outlined</p>
        <r-progress-line outlined color="color-warning"> </r-progress-line>
      </r-card>
      <r-card outlined class="pa-4 color-one-text">
        <p>card rounded</p>
        <r-progress-line rounded color="color-one"> </r-progress-line>
      </r-card>
        </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">Progress Line</h1>
    <section class="d-flex h-space-around pt-6">
      <r-card class="pa-4 color-two-text w-45" outlined>
        <p>default</p>
        <r-progress-line :model-value="30" color="color-two"></r-progress-line>
      </r-card>
      <r-card class="pa-4 color-one-text w-45" outlined>
        <p>showPercent</p>
        <r-progress-line :model-value="30" color="color-one" showPercent>
        </r-progress-line>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template=' <div class="d-flex h-space-around">
           <r-card outlined class="pa-4 color-two-text w-45">
        <p>default</p>
        <r-progress-line color="color-two" :model-value="30"></r-progress-line>
      </r-card>
      <r-card outlined class="pa-4 color-one-text w-45">
        <p>showPercent</p>
        <r-progress-line showPercent color="color-one" :model-value="30"> </r-progress-line>
      </r-card>
        </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">Progress Line</h1>
    <section class="pt-6">
      <r-progress-line
          :modelValue="30"
          class="my-3"
          color="color-one"
          showPercent
      ></r-progress-line>
      <r-progress-line
          :modelValue="50"
          class="my-3"
          color="color-Info"
          showPercent
      ></r-progress-line>
      <r-progress-line
          :modelValue="80"
          class="my-3"
          color="color-two"
          showPercent
      ></r-progress-line>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template=' <div >
           <r-progress-line
        showPercent
        color="color-one"
        :modelValue="30"
        class="my-3"
      ></r-progress-line>
      <r-progress-line
        showPercent
        color="color-Info"
        :modelValue="50"
        class="my-3"
      ></r-progress-line>
      <r-progress-line
        showPercent
        color="color-two"
        :modelValue="80"
        class="my-3"
      ></r-progress-line>
        </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "progress_line",
  data() {
    return {
      items: [
        {
          prop: "modelValue",
          type: "Number,String",
          default: "null",
          description: "مقدار آن را می توانید تعیین کنید ",
        },
        {prop: "color", type: "String", default: "null", description: "رنگ "},
        {
          prop: "progressStyle",
          type: "String,Object,Array",
          default: "null",
          description: "کلاس و استایل دادن به progress",
        },
        {
          prop: "showPercent",
          type: "Boolean",
          default: "null",
          description: "درصد مقدار progress را نشان می دهد",
        },
        {
          prop: "outlined",
          type: "Boolean",
          default: "null",
          description: "ارتفاع بهش می دهد . ",
        },
        {
          prop: "rounded",
          type: "Boolean",
          default: "null",
          description: " گوشه هایش گرد می شوند ",
        },
        {
          prop: "showBackground",
          type: "Boolean",
          default: "null",
          description: "رنگ پیش زمینه را نشان می دهد",
        },
        {
          prop: "size",
          type: "String",
          default: "small",
          description: "اندازه ",
        },
      ],
    };
  },
};
</script>
