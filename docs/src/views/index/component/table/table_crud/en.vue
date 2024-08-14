<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-table-crud
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">CRUD Table</p>
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
    "link": null,
    "query": null,
    "responsive": true,
    "disableAdd": false,
    "advanceSearch": true,
    "disableDelete": false,
    "disableUpdate": false,
    "mcud": null,
    "headers": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-table-crud :link="link" :actions="actions" :cast="cast" :per-Page="perPage" :query="query" :responsive="responsive" :disable-Add="disableAdd" :advance-Search="advanceSearch" :disable-Delete="disableDelete" :disable-Update="disableUpdate" :mcud="mcud" :headers="headers" @actions="log(`actions`,$event)" ></r-table-crud>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <section>
      <r-table-crud class="pt-3" link="admin/..."></r-table-crud>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                     <r-table-crud link="admin/..." class="pt-3"></r-table-crud>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Cast</span>
    </h1>
    <section>
      <r-table-crud
          :cast="{ user: 'name' }"
          class="background-two pt-3"
          link="admin/offs"
      >
      </r-table-crud>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                      <r-table-crud
        link="admin/offs"
        :cast="{ user: `name` }"
        class="background-two pt-3"
      >
      </r-table-crud>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>DisableAdd</span>
    </h1>
    <section>
      <r-table-crud class="pt-3" disableAdd link="admin/offs"></r-table-crud>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                   <r-table-crud link="admin/offs" class="pt-3" disableAdd>
      </r-table-crud>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>AdvanceSearch</span>
    </h1>
    <section>
      <r-table-crud advanceSearch class="pt-3" disableAdd link="admin/offs">
      </r-table-crud>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
              <r-table-crud advanceSearch disableAdd link="admin/offs" class="pt-3">
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "table_crud",
  data() {
    return {
      props: [
        {
          prop: "link",
          type: "String",
          default: "undefined",
          description: "Link",
        },
        {
          prop: "actions",
          type: "Array",
          default: "[]",
          description: "Indicates the activity on items",
        },
        {
          prop: "cast",
          type: "Object",
          default: "[]",
          description: "Restricting User",
        },
        {
          prop: "perPage",
          type: "Object",
          default: "{name: '10',value: 10}",
          description: "Number of items per page ",
        },
        {
          prop: "query",
          type: "Object",
          default: "null",
          description: "Can you send an empty query for that",
        },
        {
          prop: "responsive",
          type: "Boolean",
          default: "true",
          description: "Responsive",
        },
        {
          prop: "disableAdd",
          type: "Boolean",
          default: "null",
          description: "Disable Add",
        },
        {
          prop: "advanceSearch",
          type: "Boolean",
          default: "true",
          description:
              "Advanced search creates the fields itself based on the categories",
        },
        {
          prop: "disableDelete",
          type: "Boolean",
          default: "null",
          description: "Disable Delete",
        },
        {
          prop: "disableUpdate",
          type: "Boolean",
          default: "null",
          description: "Disable Update",
        },
        {
          prop: "mcud",
          type: "String",
          default: "null",
          description:
              "It takes a link address. It allows you to perform specific operations simultaneously for multiple tables",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "Headers",
        },
      ],
      events: [{event: "actions", description: ""}],
    };
  },
};
</script>
