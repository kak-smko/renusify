<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-progress-circle
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-progress-circle</r-btn>
        نشان دهنده پیشرفت انجام یک وظیفه بصورت دایره است
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
    "indeterminate": true,
    "showPercent": false,
    "rotate": 0,
    "size": "60",
    "width": 4,
    "modelValue": 0
}
}'
        template='<r-progress-circle :indeterminate="indeterminate" :show-Percent="showPercent" :rotate="rotate" :size="size" :width="width" v-model="modelValue" ></r-progress-circle>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Size</span>
    </h1>
    <section class="d-flex h-space-around pt-6 ps-20 pe-20">
      <r-progress-circle :model-value="80" class="color-warning-text" size="80">
        80%
      </r-progress-circle>
      <r-progress-circle :model-value="60" class="color-info-text" size="60">
        60%
      </r-progress-circle>
      <r-progress-circle :model-value="40" class="color-success-text" size="40">
        40%
      </r-progress-circle>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template=' <div class="d-flex h-space-around">
         <r-progress-circle size="80" :model-value="80" class="color-warning-text">
        80%</r-progress-circle
      >
      <r-progress-circle size="60" :model-value="60" class="color-info-text">
        60%</r-progress-circle
      >
      <r-progress-circle size="40" :model-value="40" class="color-success-text">
        40%</r-progress-circle
      >
        </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Indeterminate</span>
    </h1>
    <section class="d-flex h-space-around pt-6 ps-20 pe-20">
      <r-progress-circle class="color-warning-text" indeterminate size="80">
      </r-progress-circle>
      <r-progress-circle class="color-info-text" indeterminate size="60">
      </r-progress-circle>
      <r-progress-circle class="color-success-text" indeterminate size="40">
      </r-progress-circle>
      <r-progress-circle indeterminate></r-progress-circle>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template=' <div class="d-flex h-space-around">
         <r-progress-circle indeterminate size="80" class="color-warning-text">
      </r-progress-circle>
      <r-progress-circle indeterminate size="60" class="color-info-text">
      </r-progress-circle>
      <r-progress-circle indeterminate size="40" class="color-success-text">
      </r-progress-circle>
      <r-progress-circle indeterminate> </r-progress-circle>
        </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>ShowPercent</span>
    </h1>
    <section class="d-flex h-space-around pt-6 ps-20 pe-20">
      <r-progress-circle
          :model-value="80"
          class="color-warning-text"
          indeterminate
          showPercent
          size="80"
      >
      </r-progress-circle>
      <r-progress-circle
          :model-value="60"
          class="color-info-text"
          showPercent
          size="60"
      >
      </r-progress-circle>
      <r-progress-circle
          :model-value="40"
          class="color-success-text"
          showPercent
          size="40"
      >
      </r-progress-circle>
      <r-progress-circle :model-value="0" indeterminate showPercent>
      </r-progress-circle>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template=' <div class="d-flex h-space-around">
         <r-progress-circle
        showPercent
        indeterminate
        size="80"
        :model-value="80"
        class="color-warning-text"
        >
      </r-progress-circle>
      <r-progress-circle showPercent size="60" :model-value="60" class="color-info-text">
      </r-progress-circle>
      <r-progress-circle showPercent size="40" :model-value="40" class="color-success-text">
      </r-progress-circle>
      <r-progress-circle indeterminate showPercent :model-value="0"> </r-progress-circle>
        </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "progress_circle",
  data() {
    return {
      items: [
        {
          prop: "indeterminate",
          type: "Boolean",
          default: "null",
          description: "بصورت نا مشخص در حال چرخش است ",
        },
        {
          prop: "showPercent",
          type: "Boolean",
          default: "null",
          description: "درصد مقدار progress را نشان می دهد",
        },
        {
          prop: "rotate",
          type: "Number,String",
          default: "0",
          description: "چرخ زدن progress را مشخص می کند ",
        },
        {
          prop: "size",
          type: "Number,String",
          default: "32",
          description: "اندازه ",
        },
        {
          prop: "width",
          type: "Number,String",
          default: "4",
          description: "عرض",
        },
        {
          prop: "modelValue",
          type: "Number,String",
          default: "0",
          description: "مقدار آن را می توانید تعیین کنید ",
        },
      ],
    };
  },
};
</script>
