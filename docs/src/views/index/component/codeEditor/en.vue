<template>
  <section>
    <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
      r-code-editor
    </h1>
    <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
      The vue template emulator allows us to run the codes instantly.
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
      emits: ["update:template", "update:script", "update:css"],
      items: [
        {
          prop: "template",
          type: "String",
          default: "null",
          description: "value for template",
        },
        {
          prop: "script",
          type: "String",
          default: "null",
          description: "value for script",
        },
        {
          prop: "css",
          type: "String",
          default: "null",
          description: "value for css",
        },
        {
          prop: "templateShow",
          type: "Boolean",
          default: "true",
          description: "Show Template section",
        },
        {
          prop: "scriptShow",
          type: "Boolean",
          default: "true",
          description: "Show Script section",
        },
        {
          prop: "cssShow",
          type: "Boolean",
          default: "true",
          description: "Show Style section",
        },
        {
          prop: "runnable",
          type: "Boolean",
          default: "null",
          description: "Executable capability",
        },
      ],
    };
  },
};
</script>
