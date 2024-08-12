<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-map
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        با استفاده از نقشه‌های تصویری
        <r-btn readonly size="small"> r-map</r-btn>
        شما می توانید محل‌های کلیک‌پذیر را بر روی یک تصویر ایجاد کنید.
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
    "center": [35.69940749291485, 51.33705139160157],
    "height": "500px",
    "zoom": 13,
    "searchBox": true,
    "zoomControl": true,
    "layerControl": true,
    "meLocation": true,
    "disableMove": false,
    "darkMode": false,
    "markers": []
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-map v-model="modelValue" :height="height" :zoom="zoom" :center="center" :markers="markers" :search-Box="searchBox" :zoom-Control="zoomControl" :layer-Control="layerControl" :me-Location="meLocation" :disable-Move="disableMove" :dark-Mode="darkMode" @update:model-Value="log(`update:model-value`,$event)" @leaflet="log(`leaflet`,$event)" @map="log(`map`,$event)" ></r-map>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6">
      <r-map></r-map>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template="         <r-map> </r-map>"
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Search Box</span>
    </h1>
    <section class="pt-6">
      <r-map searchBox></r-map>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template="    <r-map searchBox> </r-map>"
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Markers</span>
    </h1>
    <section class="pt-6">
      <r-map :markers="[{ loc: [35.69940749291485, 51.33705139160157] }]">
      </r-map>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='  <r-map :markers="[{ loc: [35.69940749291485, 51.33705139160157] }]">
      </r-map>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Popup</span>
    </h1>
    <section class="pt-6">
      <r-map
          :markers="[
          {
            loc: [35.69940749291485, 51.33705139160157],
            popup: 'mark',
            open_popup: true,
          },
        ]"
      >
      </r-map>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='  <r-map
        :markers="[
          {
            loc: [35.69940749291485, 51.33705139160157],
            popup: `mark`,
            open_popup: true,
          },
        ]"
      >
      </r-map> '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Tooltip</span>
    </h1>
    <section class="pt-6">
      <r-map
          :markers="[
          {
            loc: [35.69940749291485, 51.33705139160157],
            tooltip: 'tooltip',
          },
        ]"
      >
      </r-map>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='   <r-map
        :markers="[
          {
            loc: [35.69940749291485, 51.33705139160157],
            tooltip: `tooltip`,
          },
        ]"
      >
      </r-map> '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "fmap",
  data() {
    return {
      props: [
        {
          prop: "modelValue",
          type: "Array",
          default: "null",
          description: "وقتی روی نقشه کلیک می کنید value را بر می گرداند . ",
        },
        {
          prop: "height",
          type: "String",
          default: "500px",
          description: "ارتفاع",
        },
        {
          prop: "zoom",
          type: "Number",
          default: "13",
          description: "میزان زوم ",
        },
        {
          prop: "center",
          type: "Array",
          default: "[35.69940749291485, 51.33705139160157]",
          description: "در مرکز قرار گیرد ",
        },
        {
          prop: "markers",
          type: "Array",
          default: "[]",
          description: "نشان گذاری کردن ",
        },
        {
          prop: "searchBox",
          type: "Boolean",
          default: "null",
          description: "دسترسی سرچ کردن ",
        },
        {
          prop: "zoomControl",
          type: "Boolean",
          default: "true",
          description: "کنترل زوم",
        },
        {
          prop: "layerControl",
          type: "Boolean",
          default: "true",
          description:
              "Layer Control می‌توان بصورت دقیق لایه‌هایی که در یک نقشه ایجاد شده اند را مدیریت و کنترل کرد.",
        },
        {
          prop: "meLocation",
          type: "Boolean",
          default: "true",
          description: "لوکیشن فعلی شما",
        },
        {
          prop: "disableMove",
          type: "Boolean",
          default: "false",
          description: "غیرفعال کردن حرکت ",
        },
        {
          prop: "darkMode",
          type: "Boolean",
          default: "null",
          description: "تم تاریک",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "leaflet", description: ""},
        {event: "map", description: ""},
      ],
    };
  },
};
</script>
