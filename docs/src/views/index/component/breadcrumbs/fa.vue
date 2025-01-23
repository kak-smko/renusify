<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-breadcrumbs
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-breadcrumbs</r-btn>
        یک کمک ناوبری برای صفحات است. بردکرامب یک لینک کوتاه می باشد که در اغلب
        وب سایت ها در قسسمت پایین و بالای صفحات و مخصوصا وب سایت فروشگاه ها وجود
        داردکه مهم ترین وظیفه اش این است که به شما نشان دهد در کجای سایت قرار
        دارید .
      </p>
    </div>
    <p class="mt-5 title"></p>
    <table-props
        :items="[
        {
          prop: 'items',
          type: 'Array',
          default: '[]',
          description: 'لیست منوها',
        },
        {
          prop: 'sheet',
          type: 'Boolean',
          default: 'true',
          description: 'کلاس شیت را غیرفعال می کند.',
        },
        {
          prop: 'divider',
          type: 'String',
          default: '$r.icons.chevron_right',
          description: 'جداکننده منوها',
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
    <p class="caption">دکمه Run را فشار دهید</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "items":[{ name: "لینک 1" }, { name: "لینک 2" }, { name: "لینک 3" }],
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
  <br/>
  <br/>
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

