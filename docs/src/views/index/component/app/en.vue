<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-app
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        In Renusify the starting point of the programming is indicated by the
        <r-btn readonly size="small"> r-app</r-btn>
        component. All the code should be placed within it.
      </p>
    </div>
    <table-props :items="items"></table-props>
  </section>
  <br/>
  <section>
    <h1 class="font-weight-bold color-white title ps-4 pt-1 pb-1 br-sm">
      An example for changing the theme !
    </h1>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "rtl": false
    }
}'
        template='<r-app :rtl="rtl">
  <div class="color-one">Hello World!</div>
</r-app>'
    >
    </r-code-editor>
  </section>
  <br/>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      items: [
        {
          prop: "id",
          type: "String,Number",
          default: "renusify",
          description: "The ID stands for Identifier in programming. ",
        },
        {
          prop: "rtl",
          type: "Boolean",
          default: "undefined",
          description:
              "I will perform the action of right-aligning the website for you",
        },
      ],
    };
  },
};
</script>
