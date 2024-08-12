<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-breadcrumbs
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-breadcrumbs</r-btn>
        is a navigation aid for web pages. Breadcrumb is a short link that is
        commonly found at the top or bottom of web pages, especially in
        e-commerce websites. Its main purpose is to indicate your location
        within the website.
      </p>
    </div>

    <table-props
        :items="[
        {
          prop: 'items',
          type: 'Array',
          default: '[]',
          description: 'Menu List',
        },
        {
          prop: 'sheet',
          type: 'Boolean',
          default: 'true',
          description: 'Disabling the sheet class',
        },
        {
          prop: 'divider',
          type: 'String',
          default: '$r.icons.chevron_right',
          description: 'Menu Separator',
        },
      ]"
    >
    </table-props>
    <table-events :items="events" class="mt-5"></table-events>
  </section>
  <section class="mt-10">
    <r-breadcrumbs
        :items="[{ name: ' link1' }, { name: 'link2' }, { name: 'link3' }]"
        @click="log('click', $event)"
    ></r-breadcrumbs>
  </section>
  <section class="mt-10">
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "items":[{ name: "link1" }, { name: "link2" }, { name: "link3" }],
    "sheet": true,
    "divider": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-breadcrumbs :sheet="sheet" :divider="divider" :items="items" @click="log(`click`,$event)" ></r-breadcrumbs>'
    ></r-code-editor>
  </section>
</template>

<script>
import TableProps from "@/components/tableProps";

export default {
  name: "breadcrumbs",
  components: {TableProps},
  data() {
    return {
      events: [{event: "click", description: ""}],
    };
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
