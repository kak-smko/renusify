<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-avatar
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-avatar</r-btn>
        component is commonly used to display circular user profile pictures.
        This component allows you to dynamically size and add border radius to
        images and icons.
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
    "size": 48,
    "elevation": "none",
    "editable": null,
    "flat": false,
    "tile": false,
    "headers": null
  }
}'
        template='<r-avatar :size="size" :elevation="elevation" :editable="editable" :flat="flat" :tile="tile" :headers="headers" ></r-avatar>'
    ></r-code-editor>
  </section>
  <br/>
  <section class="pa-3 text-center">
    <r-avatar></r-avatar>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "size": 82,
   }
}'
        template='
<r-avatar size="82" class="color-info-text">
  <span>82</span>
</r-avatar>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Elevation</span>
    </h1>
    <section class="pa-3 text-center">
      <r-avatar elevation="lg"></r-avatar>
    </section>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<r-avatar elevation="lg"></r-avatar>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Flat</span>
    </h1>
    <section class="pa-3 text-center">
      <r-avatar flat></r-avatar>
    </section>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template="<r-avatar flat></r-avatar>"
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Editable</span>
    </h1>
    <section class="text-center">
      <r-avatar editable="/" size="70"></r-avatar>
    </section>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<div class="text-center">
  <r-avatar size="70" editable="https://www.codenus.com/img/image1.jpg"></r-avatar>
</div>>'
    ></r-code-editor>
  </section>
  <br/><br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-10 br-sm">
      PROP / <span>Tile</span>
    </h1>
    <section class="d-flex h-space-between ps-20 pe-20">
      <r-avatar class="color-one" size="90" tile>
        <span>90</span>
      </r-avatar>
      <r-avatar class="color-gradient-three-90" size="70" tile>
        <span>70</span>
      </r-avatar>
      <r-avatar class="color-three" size="50" tile>
        <span>50</span>
      </r-avatar>
      <r-avatar class="color-success" size="30" tile>
        <span>30</span>
      </r-avatar>
    </section>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<r-avatar tile size="90" class="color-one">
  <span>90</span>
</r-avatar>'
    ></r-code-editor>
  </section>
  <br/><br/>
</template>
<script>
export default {
  name: "avatar",
  data() {
    return {
      items: [
        {
          prop: "size",
          type: "Number,String",
          default: "48",
          description: "Size",
        },
        {
          prop: "elevation",
          type: "String",
          default: "none",
          description: " provides a base height",
        },
        {
          prop: "editable",
          type: "String",
          default: "undefined",
          description: "Edit Able",
        },
        {
          prop: "flat",
          type: "Boolean",
          default: "null",
          description: "The flat  removes all border radius from an element",
        },
        {
          prop: "tile",
          type: "Boolean",
          default: "null",
          description: "It does without corners",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "Headers",
        },
      ],
    };
  },
};
</script>
