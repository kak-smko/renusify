<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-list
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-list</r-btn>
        property specifies the type of list item marker.
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
    "disabled": false,
    "multiple": false,
    "min": 0,
    "text": "name",
    "value": "value",
    "flat": false,
    "rounded": false,
    "subheader": false,
    "checked": false,
    "filter": null,
    "items": [
            { name: `one`, value: 1, family: `first` },
            { name: `two`, value: 2, family: `second` },
            { name: `three`, value: 3, family: `third` },
          ],
    "modelValue": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-list :disabled="disabled" :multiple="multiple" :min="min" :text="text" :value="value" :flat="flat" :rounded="rounded" :subheader="subheader" :checked="checked" :filter="filter" :items="items" v-model="modelValue" @update:model-Value="log(`update:modelValue`,$event)" ></r-list>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">List</h1>
    <section class="d-flex h-space-between pt-3 px-20">
      <r-card class="pa-4">
        <r-list
            v-model="valid"
            :items="[
            { name: 'one', value: 1, family: 'first' },
            { name: 'two', value: 2, family: 'second' },
            { name: 'three', value: 3, family: 'third' },
          ]"
        >
          <template v-slot="{ item }">
            {{ item }}
          </template>
        </r-list>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
return {
}
}"
        template='   <r-card class="pa-4">
        <r-list
          v-model="valid"
          :items="[
            { name: `one`, value: 1, family: `first` },
            { name: `two`, value: 2, family: `second` },
            { name: `three`, value: 3, family: `third` },
          ]"
        >
          <template v-slot="{ item }">
            {{ item }}
          </template>
        </r-list>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Multiple</span>
    </h1>
    <section class="d-flex h-space-between pt-3 px-20">
      <r-card class="pa-4" outlined>
        <div>{{ valid }}</div>
        <r-list
            v-model="valid"
            :items="[
            { name: 'one', value: 1, family: 'first' },
            { name: 'two', value: 2, family: 'second' },
            { name: 'three', value: 3, family: 'third' },
          ]"
            multiple
        >
        </r-list>
        <r-btn class="color-one-text" readonly>
          <span>
            Click
            <r-icon v-html="$r.icons.arrow_up"></r-icon>
          </span>
        </r-btn>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){

return {
 valid: null,
}
}"
        template='    <r-card class="pa-4" outlined>
        <div>{{ valid }}</div>
        <r-list
          v-model="valid"
          :items="[
            { name: `one`, value: 1, family: `first` },
            { name: `two`, value: 2, family: `second` },
            { name: `three`, value: 3, family: `third` },
          ]"
          multiple
        >
        </r-list>
        <r-btn readonly class="color-one-text">
          <span>
            Click
            <r-icon v-html="$r.icons.arrow_up"></r-icon>
          </span>
        </r-btn>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Subheader</span>
    </h1>
    <section class="pt-3">
      <r-card class="pa-4" outlined>
        <div class="subtitle-1">{{ valid }}</div>
        <r-list
            v-model="valid"
            :items="[
            {
              name: 'Item 1',
              value: 1,
            },
            {
              name: 'Item 2',
              value: 2,
            },
            {
              name: 'Item 3',
              value: 3,
            },
            {
              name: 'Item 4',
              value: 4,
            },
            {
              name: 'Item 5',
              value: 5,
            },
          ]"
            class="text-start"
            subheader
        >
        </r-list>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){

return {
 valid: null,
}
}"
        template='   <r-card class="pa-4" outlined>
        <div class="subtitle-1">{{ valid }}</div>
        <r-list
          class="text-start"
          v-model="valid"
          :items="[
            {
              name: `Item 1`,
              value: 1
            },
            {
              name: `Item 2`,
              value: 2
            },
            {
              name: `Item 3`,
              value: 3
            },
            {
              name: `Item 4`,
              value: 4
            },
            {
              name: `Item 5`,
              value: 5
            },
          ]"
          subheader
        >
        </r-list>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Disabled</span>
    </h1>
    <section class="pt-3 text-center">
      <r-card class="pa-4" outlined>
        <r-list
            v-model="valid"
            :items="[
            { name: 'Recent', icon: $r.icons.edit, to: { path: '/' } },
            {
              name: 'Home',
              icon: $r.icons.edit,
              to: {
                path: '/',
              },
            },
            { name: 'Favorites', icon: $r.icons.edit, to: { path: '/' } },
          ]"
            class="text-start"
            disabled
        >
        </r-list>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){

return {
 valid: null,
}
}"
        template='     <r-card class="pa-4" outlined>
        <r-list
          class="text-start"
          disabled
          v-model="valid"
          :items="[
            { name: `Recent` },
            {
              name: `Home`
              },
            { name: `Favorites` }
          ]"
        >
        </r-list>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Checked</span>
    </h1>
    <section class="pt-3 text-center">
      <r-card class="pa-4" outlined>
        <div class="color-one color-white-text px-2 py-1">Recipe</div>
        <r-list
            v-model="valid"
            :items="[
            { name: 'pepper', value: 1 },
            { name: 'tomato', value: 2 },
            { name: 'oil', value: 3 },
            { name: 'salt', value: 4 },
            { name: 'cheese', value: 5 },
          ]"
            checked
            class="text-start"
            multiple
        >
        </r-list>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){

return {
 valid: null,
}
}"
        template='      <r-card class="pa-4" outlined>
        <div class="color-one color-white-text px-2 py-1">Recipe</div>
        <r-list
          checked
          multiple
          class="text-start"
          v-model="valid"
          :items="[
            { name: `pepper`,value:1 },
            { name: `tomato`,value:2 },
            { name: `oil`,value:3 },
            { name: `salt`,value:4 },
            { name: `cheese`,value:5 },
          ]"
        >
        </r-list>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Rounded</span>
    </h1>
    <section class="pt-3 px-20 text-center">
      <r-card class="pa-4 text-center" outlined>
        <div class="color-one-text px-2 py-1">Group</div>
        <r-divider class="color-one"></r-divider>
        <r-list
            v-model="valid"
            :items="[
            { name: `pepper`, value: 1 },
            { name: `tomato`, value: 2 },
            { name: `oil`, value: 3 },
            { name: `salt`, value: 4 },
            { name: `cheese`, value: 5 },
          ]"
            multiple
            rounded
        >
        </r-list>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
  return {
    valid: null,
  }
}"
        template='      <r-card class="pa-4 text-center" outlined>
        <div class="color-one-text px-2 py-1">Group</div>
        <r-divider class="color-one"></r-divider>
        <r-list
          rounded
          multiple
          v-model="valid"
          :items="[
            { name: `pepper`,value:1 },
            { name: `tomato`,value:2 },
            { name: `oil`,value:3 },
            { name: `salt`,value:4 },
            { name: `cheese`,value:5 },
          ]"
        >
        </r-list>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "list",
  data() {
    return {
      props: [
        {
          prop: "disabled",
          type: "Boolean",
          default: "null",
          description: "Disable",
        },
        {
          prop: "multiple",
          type: "Boolean",
          default: "null",
          description: "The multiple attribute is a boolean attribute",
        },
        {
          prop: "min",
          type: "Number",
          default: "0",
          description: "Minimum allowable",
        },
        {
          prop: "text",
          type: "String",
          default: "name",
          description: "Text List ",
        },
        {
          prop: "value",
          type: "String",
          default: "value",
          description: "value",
        },
        {
          prop: "flat",
          type: "Boolean",
          default: "null",
          description:
              "he flat class removes all border radius from an element",
        },
        {
          prop: "rounded",
          type: "Boolean",
          default: "null",
          description: "You can create circles with the rounded.",
        },
        {
          prop: "subheader",
          type: "Boolean",
          default: "null",
          description:
              "Puts lists under headings in three-column format side by side",
        },
        {
          prop: "checked",
          type: "Boolean",
          default: "null",
          description: "When clicked, it will be checked.",
        },
        {
          prop: "filter",
          type: "String",
          default: "null",
          description: "Filtering the list.",
        },
        {
          prop: "items",
          type: "Array",
          default: "null",
          description: "The item you enter as a list.",
        },
        {
          prop: "modelValue",
          type: "Array,Object",
          default: "undefined",
          description: "If the inputs are valid in the form, it becomes true.",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
