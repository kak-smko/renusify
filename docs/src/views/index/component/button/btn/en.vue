<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-btn
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        To achieve button styles, we use the
        <r-btn readonly size="small"> r-btn</r-btn>
        component
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
    "tag": "span",
    "size": "default",
    "label": null,
    "labelClass": null,
    "block": false,
    "depressed": false,
    "outlined": false,
    "rounded": false,
    "icon": false,
    "fab": false,
    "text": false,
    "tile": false,
    "disabled": false,
    "readonly": false,
    "loading": false
}
}'
        template='<r-btn :tag="tag" :size="size" :label="label" :label-class="labelClass" :block="block" :depressed="depressed" :outlined="outlined" :rounded="rounded" :icon="icon" :fab="fab" :text="text" :tile="tile" :disabled="disabled" :readonly="readonly" :loading="loading" >T</r-btn>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4">
      <r-card class="px-5 py-4 text-center card-hover">
        <r-btn class="my-4 mx-1 color-info">Primary</r-btn>
        <r-btn class="my-4 mx-1 color-grey-base">Secondary</r-btn>
        <r-btn class="my-4 mx-1 color-success">Success</r-btn>
        <r-btn class="my-4 mx-1 color-warning">Warning</r-btn>
        <r-btn class="my-4 mx-1 color-one">Info</r-btn>
        <r-btn class="my-4 mx-1 color-error">Danger</r-btn>
        <r-btn class="my-4 mx-1 color-black">Dark</r-btn>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
 <r-card class="px-5 py-4 text-center card-hover">
        <r-btn class="my-4 mx-1 color-info">Primary</r-btn>
        <r-btn class="my-4 mx-1 color-grey-base">Secondary</r-btn>
        <r-btn class="my-4 mx-1 color-success">Success</r-btn>
        <r-btn class="my-4 mx-1 color-warning">Warning</r-btn>
        <r-btn class="my-4 mx-1 color-one">Info</r-btn>
        <r-btn class="my-4 mx-1 color-error">Danger</r-btn>
        <r-btn class="my-4 mx-1 color-black">Dark</r-btn>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Size</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-4 text-center card-hover">
        <r-btn class="my-4 mx-1 color-info" size="x-large">Primary</r-btn>
        <r-btn class="my-4 mx-1 color-grey-base" size="large">Secondary</r-btn>
        <r-btn class="my-4 mx-1 color-success">Success</r-btn>
        <r-btn class="my-4 mx-1 color-warning" size="small">Warning</r-btn>
        <r-btn class="my-4 mx-1 color-one" size="x-small">Info</r-btn>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
 <r-card class="px-5 py-4 text-center card-hover">
        <r-btn size="x-large" class="my-4 mx-1 color-info">Primary</r-btn>
        <r-btn size="large" class="my-4 mx-1 color-grey-base">Secondary</r-btn>
        <r-btn class="my-4 mx-1 color-success">Success</r-btn>
        <r-btn size="small" class="my-4 mx-1 color-warning">Warning</r-btn>
        <r-btn size="x-small" class="my-4 mx-1 color-one">Info</r-btn>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Block</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-4 text-center card-hover">
        <r-btn block class="my-4 mx-1 color-info" size="x-large">Primary</r-btn>
        <r-btn block class="my-4 mx-1 color-two" size="large">Secondary</r-btn>
        <r-btn block class="my-4 mx-1 color-success">Success</r-btn>
        <r-btn block class="my-4 mx-1 color-warning" size="small"
        >Warning
        </r-btn>
        <r-btn block class="my-4 mx-1 color-one" size="x-small">Info</r-btn>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
<r-card class="px-5 py-4 text-center card-hover">
        <r-btn size="x-large" class="my-4 mx-1 color-info" block>Primary</r-btn>
        <r-btn size="large" class="my-4 mx-1 color-two" block>Secondary</r-btn>
        <r-btn class="my-4 mx-1 color-success" block>Success</r-btn>
        <r-btn size="small" class="my-4 mx-1 color-warning" block
          >Warning</r-btn
        >
        <r-btn size="x-small" class="my-4 mx-1 color-one" block>Info</r-btn>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Outlined</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-4 text-center card-hover">
        <r-btn class="my-4 mx-1 color-info-text" outlined>Primary</r-btn>
        <r-btn class="my-4 mx-1 color-grey-base-text" outlined>Secondary</r-btn>
        <r-btn class="my-4 mx-1 color-success-text" outlined>Success</r-btn>
        <r-btn class="my-4 mx-1 color-warning-text" outlined>Warning</r-btn>
        <r-btn class="my-4 mx-1 color-one-text" outlined>Info</r-btn>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
<r-card class="px-5 py-4 text-center card-hover">
        <r-btn class="my-4 mx-1 color-info-text" outlined>Primary</r-btn>
        <r-btn class="my-4 mx-1 color-grey-base-text" outlined>Secondary</r-btn>
        <r-btn class="my-4 mx-1 color-success-text" outlined>Success</r-btn>
        <r-btn class="my-4 mx-1 color-warning-text" outlined>Warning</r-btn>
        <r-btn class="my-4 mx-1 color-one-text" outlined>Info</r-btn>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Rounded</span> / <span>Tile</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center card-hover">
        <r-btn block class="my-4 color-success" rounded>Button rounded</r-btn>
        <r-btn block class="my-4 color-warning">Button default</r-btn>
        <r-btn block class="my-4 color-one" tile>Button tile</r-btn>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
 <r-card class="px-5 py-8 text-center card-hover">
        <r-btn rounded class="my-4 color-success" block>Button rounded</r-btn>
        <r-btn class="my-4 color-warning" block>Button default</r-btn>
        <r-btn tile class="my-4 color-one" block>Button tile</r-btn>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "btn",
  data() {
    return {
      items: [
        {prop: "tag", type: "String", default: "span", description: "Tag"},
        {
          prop: "size",
          type: "String",
          default: "default",
          description: "Size",
        },
        {
          prop: "label",
          type: "String,Number",
          default: "null",
          description: "It takes a label",
        },
        {
          prop: "labelClass",
          type: "String,Array,Object",
          default: "null",
          description: "Class for label",
        },
        {
          prop: "block",
          type: "Boolean",
          default: "null",
          description: "It covers the whole screen",
        },
        {
          prop: "depressed",
          type: "Boolean",
          default: "null",
          description: "Depressed",
        },
        {
          prop: "outlined",
          type: "Boolean",
          default: "null",
          description: "A line is drawn around the button",
        },
        {
          prop: "rounded",
          type: "Boolean",
          default: "null",
          description: "Rounding Btn",
        },
        {prop: "icon", type: "Boolean", default: "null", description: "Icon"},
        {
          prop: "fab",
          type: "Boolean",
          default: "null",
          description: "Floating action button ",
        },
        {
          prop: "text",
          type: "Boolean",
          default: "null",
          description: "Disabling the click functionality",
        },
        {
          prop: "tile",
          type: "Boolean",
          default: "null",
          description: "without corners",
        },
        {
          prop: "disabled",
          type: "Boolean",
          default: "null",
          description: "Disabled",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "Readonly",
        },
        {
          prop: "loading",
          type: "Boolean",
          default: "null",
          description: "Loading",
        },
      ],
    };
  },
};
</script>
