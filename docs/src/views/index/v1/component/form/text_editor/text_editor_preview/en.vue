<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-text-editor-preview
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        Web pages can be modified using professional
        <r-btn readonly size="small"> r-text-editor-preview</r-btn>
        editors
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
    "text": "<div class=\"text-center color-one pa-5\">this is test</div>"
}
}'
        template='<r-text-editor-preview :text="text" ></r-text-editor-preview>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4">
      <r-form v-model="valid">
        <r-text-editor v-model="info"></r-text-editor>
        <r-text-editor-preview :text="info.text"></r-text-editor-preview>
      </r-form>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
      valid: false,
      info: null
  }
}"
        template='
   <r-form v-model="valid">
        <r-text-editor v-model="info"> </r-text-editor>
        <r-text-editor-preview
          v-if="info"
          :text="info.text"
        ></r-text-editor-preview>
      </r-form>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "text_editor_preview",
  data() {
    return {
      valid: false,
      info: {},
      items: [
        {prop: "text", type: "String", default: "null", description: "Text"},
      ],
    };
  },
};
</script>
