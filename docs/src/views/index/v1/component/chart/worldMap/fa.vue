<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-chart-map
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        نقشه جهان با
        <r-btn readonly size="small">r-chart-map</r-btn>
      </p>
    </div>

    <table-props :items="items"></table-props>
  </section>
  <section>
    می توانید برای هر کشور رنگ دلخواهی انتخاب کنید.
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
  return {
    colors:{
      'US':'#43ab5f',
      'IR':'#83ac5f',
    }
  }
}"
        template="<r-chart-map :colors='colors'></r-chart-map>"
    ></r-code-editor>
  </section>
  <section>
    با heatValues می توانید یک نقشه گرمایی ایجاد کنید.
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
  return {
    maxColor:'#760101',
    minColor:'#f8c6c6',
    defaultColor:'#aaaaaa',
    disableTooltip:false,
    Western_Sahara_is_country:false,
    Crimea:'UA',
    heatValues:{
      'US':20,
      'IR':80,
    }
  }
}"
        template="<r-chart-map :heatValues='heatValues' :maxColor='maxColor' :minColor='minColor'
  :defaultColor='defaultColor' :disableTooltip='disableTooltip' :Western_Sahara_is_country='Western_Sahara_is_country'
  :Crimea='Crimea'></r-chart-map>"
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "chart",
  data() {
    return {
      items: [
        {
          prop: "colors",
          type: "Object",
          default: "{}",
          description: "color list for each country",
        },
        {
          prop: "heatValues",
          type: "Object",
          default: "{}",
          description: "heat value list for each country",
        },
        {
          prop: "maxColor",
          type: "String",
          default: "#760101",
          description: "max color for heatValues",
        },
        {
          prop: "minColor",
          type: "String",
          default: "#f8c6c6",
          description: "min color for heatValues",
        },
        {
          prop: "defaultColor",
          type: "String",
          default: "#aaaaaa",
          description: "default color for all country",
        },
        {
          prop: "Crimea",
          type: "String",
          default: "null",
          description: "Crimea is for Russia or Ukraine",
        },
        {
          prop: "Western_Sahara_is_country",
          type: "Boolean",
          default: "false",
          description: "Western Sahara is country or not",
        },
        {
          prop: "disableTooltip",
          type: "Boolean",
          default: "false",
          description: "disable tooltip on hover",
        },
      ],
    };
  },
};
</script>
