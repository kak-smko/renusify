<template>
  <section>
    <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
      r-code-editor
    </h1>
    <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
      شبیه ساز تمپلت vue است و امکان اجرای کدها را به صورت آنی به ما می دهد.
    </p>
    <table-props :items="items"></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
  return{
    runnable:true,
    templateShow:true,
    scriptShow:true,
    cssShow:true,
    html:`<r-btn>test</r-btn>`,
    js:"",
    css:""
  }
}'
        template='<r-code-editor :runnable="runnable" :templateShow="templateShow" :scriptShow="scriptShow"
  :cssShow="cssShow" v-model:template="html" v-model:script="js" v-model:css="css"></r-code-editor>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "code_editor",
  data() {
    return {
      items: [
        {
          prop: "template",
          type: "String",
          default: "null",
          description: "کدهای html",
        },
        {
          prop: "script",
          type: "String",
          default: "null",
          description: "کدهای جاوااسکریپت",
        },
        {
          prop: "css",
          type: "String",
          default: "null",
          description: "کدهای css",
        },
        {
          prop: "templateShow",
          type: "Boolean",
          default: "true",
          description: "نمایش قالب template",
        },
        {
          prop: "scriptShow",
          type: "Boolean",
          default: "true",
          description: "نمایش قالب script",
        },
        {
          prop: "cssShow",
          type: "Boolean",
          default: "true",
          description: "نمایش قالب style",
        },
        {
          prop: "runnable",
          type: "Boolean",
          default: "null",
          description: "قابلیت اجرا",
        },
      ],
    };
  },
};
</script>
