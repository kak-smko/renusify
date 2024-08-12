<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">r-row</h1>
      <p class="font-weight-light color-black-text ps-4 py-1 mb-1 br-lg">
        جزء فرعی که برای ایجاد ردیف ها استفاده می شود.
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
    "dense": false,
    "noGutters": false
}
}'
        template='<r-row :dense="dense" :no-Gutters="noGutters" ></r-row>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section>
      <r-container>
        <r-row class="background-two">
          <r-col class="col-4 color-info">Info</r-col>
          <r-col class="col-4 color-success">Success</r-col>
          <r-col class="col-4 color-black">Black</r-col>
          <r-col class="col-4 color-error">Error</r-col>
          <r-col class="col-4 color-gradient-one-45">Gradient</r-col>
          <r-col class="col-4 color-one">One</r-col>
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
        template='   <r-container>
        <r-row class="background-two">
          <r-col class="col-4 color-info">Info</r-col>
          <r-col class="col-4 color-success">Success</r-col>
          <r-col class="col-4 color-black">Black</r-col>
          <r-col class="col-4 color-error">Error</r-col>
           <r-col class="col-4 color-gradient-one-45">Gradient</r-col>
          <r-col class="col-4 color-one">One</r-col>
        </r-row>
      </r-container>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Dense</span>
    </h1>
    <section>
      <r-container>
        <r-row class="background-two" dense>
          <r-col class="col-4 color-warning">ONE</r-col>
          <r-col class="col-4 color-two">TWO</r-col>
          <r-col class="col-4 color-info">THREE</r-col>
          <r-col class="col-4 color-error">FOUR</r-col>
          <r-col class="col-4 color-success">FIVE</r-col>
          <r-col class="col-4 color-black">SIX</r-col>
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
        template='   <r-container>
        <r-row dense class="background-two">
          <r-col class="col-4 color-warning">ONE</r-col>
          <r-col class="col-4 color-two">TWO</r-col>
          <r-col class="col-4 color-info">THREE</r-col>
          <r-col class="col-4 color-error">FOUR</r-col>
          <r-col class="col-4 color-success">FIVE</r-col>
          <r-col class="col-4 color-black">SIX</r-col>
        </r-row>
      </r-container>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>NoGutters</span>
    </h1>
    <section>
      <r-container>
        <r-row :noGutters="md" class="background-two">
          <r-col class="col-4 color-one"></r-col>
          <r-col class="col-4 color-two"></r-col>
          <r-col class="col-4 color-info"></r-col>
          <r-col class="col-2 color-gradient-one"></r-col>
          <r-col class="col-4 color-success"></r-col>
          <r-col class="col-6 color-black"></r-col>
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
        template='     <r-container>
        <r-row :noGutters="md" class="background-two">
          <r-col class="col-4 color-one"></r-col>
          <r-col class="col-4 color-two"></r-col>
          <r-col class="col-4 color-info"></r-col>
          <r-col class="col-2 color-gradient-one"></r-col>
          <r-col class="col-4 color-success"></r-col>
          <r-col class="col-6 color-black"></r-col>
        </r-row>
      </r-container>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "row",
  data() {
    return {
      items: [
        {
          prop: "dense",
          type: "Boolean",
          default: "null",
          description: "فشرده کردن ردیف ها",
        },
        {
          prop: "noGutters",
          type: "Boolean",
          default: "null",
          description: "از noGutters برای جدا کردن ردیف استفاده می شود .",
        },
      ],
    };
  },
};
</script>
