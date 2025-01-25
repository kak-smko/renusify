<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">r-col</h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small">r-col</r-btn>
        is a content holder that must be a direct child of
        <r-btn readonly size="small">r-row</r-btn>
        .
      </p>
    </div>

    <table-props :items="items"></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {}
}"
        template="<r-col ></r-col>"
    ></r-code-editor>
  </section>
  <section class="pa-3 color-white">
    <section>
      <r-container>
        <r-row class="ps-10 text-center">
          <r-col class="col-12 color-warning">Renusify</r-col>
          <r-col class="col-3 color-success my-2 mx-6">Python</r-col>
          <r-col class="col-3 color-one my-2 mx-6">JavaScript</r-col>
          <r-col class="col-3 color-black color-one-text my-2 mx-6">C++</r-col>
          <r-col class="col-6 color-error">Php</r-col>
          <r-col class="col-6 color-gradient-one-45">Java</r-col>
        </r-row>
      </r-container>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='    <r-container>
        <r-row class="ps-10 text-center">
          <r-col class="col-12 color-gradient-one-45 ">Renusify</r-col>
          <r-col class="col-3 color-error  my-2 mx-6">Python</r-col>
          <r-col class="col-3 color-one my-2 mx-6">JavaScript</r-col>
          <r-col class="col-3 color-black color-one-text my-2 mx-6">C++</r-col>
          <r-col class="col-6 color-success">Php</r-col>
          <r-col class="col-6 color-warning">Java</r-col>
        </r-row>
      </r-container>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "col",
  data() {
    return {
      items: [],
    };
  },
};
</script>
