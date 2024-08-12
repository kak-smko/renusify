<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-divider
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small">r-divider</r-btn>
        in their simplest form
        display a horizontal line.
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
    "inset": false,
    "vertical": false
}
}'
        template='<r-divider :inset="inset" :vertical="vertical" ></r-divider>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="d-flex h-space-between pt-12 ps-20 pe-20">
      <r-divider class="color-warning"></r-divider>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='        <r-divider class=" color-warning"></r-divider>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Inset</span>
    </h1>
    <section class="d-flex h-space-between pt-12 ps-20 pe-20">
      <div style="height: 300px; width: 1000px">
        <r-divider class="color-error my-10" inset></r-divider>
        <r-divider class="color-one py-1 my-10" inset></r-divider>
        <r-divider class="color-success py-2 my-10" inset></r-divider>
        <r-divider class="color-warning py-3 my-10" inset></r-divider>
        <r-divider class="color-two py-4 my-10" inset></r-divider>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='       <div style="height: 300px;">
        <r-divider inset class="color-error my-10"></r-divider>
        <r-divider inset class="color-one py-1 my-10"></r-divider>
        <r-divider inset class="color-success py-2 my-10"></r-divider>
        <r-divider inset class="color-warning py-3 my-10"></r-divider>
        <r-divider inset class="color-two py-4 my-10"></r-divider>
      </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Vertical</span>
    </h1>
    <section class="d-flex h-space-between pt-12 ps-20 pe-20">
      <div style="height: 200px">
        <r-divider class="color-error mx-10" vertical></r-divider>
        <r-divider class="color-one px-1 mx-10" vertical></r-divider>
        <r-divider class="color-success px-2 mx-10" vertical></r-divider>
        <r-divider class="color-warning px-3 mx-10" vertical></r-divider>
        <r-divider class="color-two px-4 mx-10" vertical></r-divider>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='        <div style="height: 200px">
        <r-divider vertical class="color-error mx-10"></r-divider>
        <r-divider vertical class="color-one px-1 mx-10"></r-divider>
        <r-divider vertical class="color-success px-2 mx-10"></r-divider>
        <r-divider vertical class="color-warning px-3 mx-10"></r-divider>
        <r-divider vertical class="color-two px-4 mx-10"></r-divider>
      </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "divider",
  data() {
    return {
      items: [
        {
          prop: "inset",
          type: "Boolean",
          default: "null",
          description:
              "The inset property is a shorthand property for r-divider ",
        },
        {
          prop: "vertical",
          type: "Boolean",
          default: "null",
          description:
              "The vertical property sets the vertical alignment of an element",
        },
      ],
    };
  },
};
</script>
