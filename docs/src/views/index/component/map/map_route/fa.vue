<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-map-route
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        این
        <r-btn readonly size="small"> r-map-route</r-btn>
        قابلیتی است که در
        آن نقشه‌های گوگل و غیره استفاده می‌شود تا کاربران به راحتی درک کنند که
        چه مسیری برای رسیدن به مقصد خود باید طی کنند.
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
    "modelValue": null,
    "by": "car",
    "height": "500px",
    "color": ["blue"],
    "marginTime": 1,
    "maxPoints": 3,
    "darkMode": false,
    "editable": true
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-map-route v-model="modelValue" :by="by" :height="height" :margin-Time="marginTime" :color="color" :max-Points="maxPoints" :dark-Mode="darkMode" :editable="editable" @update:model-Value="log(`update:modelValue`,$event)" ></r-map-route>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6">
      <r-map-route
          :model-value="{
          points: {
            ylppaqdg59ly: [35.69940749291485, 51.33705139160157],
            plppaqqivnmt: [35.7021955324165, 51.32731148468186],
            hlppaqw9xcqm: [35.69407509585856, 51.324142981742796],
          },
          summary: {
            name: 'میدان آزادی, فکوری, فکوری, کنارگذر لشکری',
            time: 614.7,
            distance: 4444.8,
          },
          waypoints: [
            { distance: 78.998527071, name: 'میدان آزادی' },
            { distance: 1.888385153, name: 'فکوری, فکوری' },
            { distance: 17.683733013, name: 'کنارگذر لشکری' },
          ],
        }"
      >
      </r-map-route>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  value:{
          points: {
            ylppaqdg59ly: [35.69940749291485, 51.33705139160157],
            plppaqqivnmt: [35.7021955324165, 51.32731148468186],
            hlppaqw9xcqm: [35.69407509585856, 51.324142981742796],
          },
          summary: {
            name: 'میدان آزادی, فکوری, فکوری, کنارگذر لشکری',
            time: 614.7,
            distance: 4444.8,
          },
          waypoints: [
            { distance: 78.998527071, name: 'میدان آزادی' },
            { distance: 1.888385153, name: 'فکوری, فکوری' },
            { distance: 17.683733013, name: 'کنارگذر لشکری' },
          ],
        }
 }
}"
        template='<r-map-route v-model="value"> </r-map-route>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Editable</span>
    </h1>
    <section class="pt-6">
      <r-map-route v-model="valid" editable></r-map-route>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  value:null
 }
}"
        template='<r-map-route v-model="value" editable> </r-map-route>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "map_route",
  data() {
    return {
      valid: null,
      props: [
        {
          prop: "modelValue",
          type: "Object",
          default: "null",
          description: "وقتی روی نقشه کلیک می کنید value را بر می گرداند .  ",
        },
        {
          prop: "by",
          type: "String",
          default: "car",
          description: "مشخص کردن وسیله ",
        },
        {
          prop: "height",
          type: "String",
          default: "500px",
          description: "ارتفاع",
        },
        {
          prop: "marginTime",
          type: "Number",
          default: "1",
          description: "مدت زمانی ",
        },
        {
          prop: "color",
          type: "Array",
          default: "[]",
          description: "رنگ برای مارک کردن مسیر . ",
        },
        {
          prop: "maxPoints",
          type: "Number",
          default: "3",
          description: "پایه‌های بیشینه",
        },
        {
          prop: "darkMode",
          type: "Boolean",
          default: "null",
          description: "تم تاریک",
        },
        {
          prop: "editable",
          type: "Boolean",
          default: "null",
          description: "ویرایش ",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
