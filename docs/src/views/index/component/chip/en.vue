<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">r-chip</h1>

      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small">r-chip</r-btn>
        component is used to convey small pieces of information. This component
        is used by the
        <r-btn readonly size="small">r-chip</r-btn>
        for advanced selection options.
      </p>
    </div>
    <table-props :items="props"></table-props>
    <table-events :items="events" class="mt-5"></table-events>
  </section>
  <section class="mt-10">
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "modelValue": false,
    "size": "default",
    "selectable": false,
    "close": false,
    "disabled": false,
    "label": false,
    "outlined": false,
    "text": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-chip v-model="modelValue" :size="size" :selectable="selectable" :close="close" :disabled="disabled" :label="label" :outlined="outlined" :text="text" @update:model-Value="log(`update:modelValue`,$event)" @close="log(`close`,$event)" ></r-chip>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-chip class="color-one-text">Design</r-chip>
      <r-chip class="color-info-text">Renusify</r-chip>
      <r-chip class="color-red-text">GitHub</r-chip>
      <r-chip class="color-two-text">Web</r-chip>
      <r-chip class="color-white-text">Blog</r-chip>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='         <r-chip class="color-info-text">Renusify</r-chip>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip" class="color-one-text"
        >Checking the Correct
        </r-chip>
        <p class="color-one-text">{{ changeChip }}</p>
      </r-card>
      <r-card class="pa-3 text-center">
        <p class="color-two-text">{{ ddChip }}</p>
        <r-chip v-model="ddChip" class="color-two-text"
        >Checking the Correct
        </r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
   changeChip: false,
  }
}"
        template='    <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip" class="color-white-text"
          >Checking the Correct
        </r-chip>
        <p>{{ changeChip }}</p>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Size</span>
    </h1>
    <section class="d-flex h-space-around">
      <r-chip class="color-one-text" size="x-large">X-large</r-chip>
      <r-chip class="color-info-text" size="large">Large</r-chip>
      <r-chip class="color-red-text" size="default">Default</r-chip>
      <r-chip class="color-two-text" size="small">Small</r-chip>
      <r-chip class="color-white-text" size="x-small">X-small</r-chip>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='    <r-chip size="small" class="color-two-text">Small</r-chip>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Selectable</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip" class="color-white-text" selectable
        >mouse cursor when you move it
        </r-chip>
      </r-card>
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="ddChip" class="color-black-text">Chip Default</r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
   changeChip: false,
  }
}"
        template='      <r-card class="pa-3 text-center" outlined>
        <r-chip selectable v-model="changeChip" class="color-white-text"
          >mouse cursor when you move it
        </r-chip>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Close</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip" class="color-white-text" close
        >add a button to make it close
        </r-chip>
      </r-card>
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="ddChip" class="color-black-text">Chip Default</r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
   changeChip: false,
  }
}"
        template='      <r-card class="pa-3 text-center" outlined>
        <r-chip selectable v-model="changeChip" class="color-white-text"
          >mouse cursor when you move it
        </r-chip>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Disabled</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="changeChip" class="color-two-text" disabled
        >add a button to make it close
        </r-chip>
      </r-card>
      <r-card class="pa-3 text-center" outlined>
        <r-chip v-model="ddChip" class="color-white-text"
        >Chip Disabled
        </r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
   changeChip: false,
  }
}"
        template='<r-card class="pa-3 text-center" outlined>
        <r-chip disabled v-model="changeChip" class="color-two-text"
          >add a button to make it close
        </r-chip>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Label</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-chip class="color-one" label>Color-one</r-chip>
      <r-chip class="color-info" label>Color-info</r-chip>
      <r-chip class="color-success" label>Color-success</r-chip>
      <r-chip class="color-two" label>Color-two</r-chip>
      <r-chip class="color-black color-white-text" label>Color-black</r-chip>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='      <r-chip label class="color-success">Color-success</r-chip>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Text</span>
    </h1>
    <section class="d-flex h-space-around pt-12 ps-20 pe-20">
      <r-card class="px-10 py-4 color-info">
        <r-chip class="color-white-text font-weight-bold" text>
          used to display the Chip
        </r-chip>
      </r-card>
      <r-card class="px-10 py-4 color-success">
        <r-chip class="color-white-text font-weight-bold" label>
          Default Chip
        </r-chip>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='        <r-card class="px-10 py-4 color-info">
        <r-chip text class="color-white-text font-weight-bold">
          used to display the Chip</r-chip
        >
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "chip",
  data() {
    return {
      props: [
        {
          prop: "modelValue",
          type: "Boolean",
          default: "false",
          description: "Checking the correct or incorrect boxes in a chip.",
        },
        {
          prop: "size",
          type: "String",
          default: "default",
          description:
              "r-chip component can have various sizes from x-small to x-large.",
        },
        {
          prop: "selectable",
          type: "Boolean",
          default: "null",
          description: "the mouse cursor when you move it.",
        },
        {
          prop: "close",
          type: "Boolean",
          default: "null",
          description: "r-chip component add a button to make it close.",
        },
        {
          prop: "disabled",
          type: "Boolean",
          default: "null",
          description:
              "You can easily disable all input components in a r-chip by setting the disabled prop.",
        },
        {
          prop: "label",
          type: "Boolean",
          default: "null",
          description: "r-chip component a field with placeholder label.",
        },
        {
          prop: "outlined",
          type: "Boolean",
          default: "null",
          description:
              "A chip with the variant prop set to outlined has zero elevation.",
        },
        {
          prop: "text",
          type: "Boolean",
          default: "null",
          description: "component used to display the Chip’s text.",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "close", description: ""},
      ],
    };
  },
};
</script>
