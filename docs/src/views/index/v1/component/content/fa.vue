<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-content
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> Renusify</r-btn>
        دارای یک ظاهر طراحی استاندارد است.
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
    "belowHeader": "50px",
    "flipped": false,
    "moved": false
}
}'
        template='<r-content :below-Header="belowHeader" :flipped="flipped" :moved="moved">
  <div style="height:600px;background-color:red"></div>
</r-content>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "content",
  data() {
    return {
      items: [
        {
          prop: "belowHeader",
          type: "String",
          default: "null",
          description: "مقدار فاصله از بالا",
        },
        {
          prop: "flipped",
          type: "Boolean",
          default: "null",
          description: "معکوس کردن",
        },
        {
          prop: "moved",
          type: "Boolean",
          default: "null",
          description: "حرکت دادن",
        },
      ],
    };
  },
};
</script>
