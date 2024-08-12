<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-spacer
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-spacer</r-btn>
        فاصله خالی در یک سطر را پر
        می کند.
      </p>
    </div>
    <table-props :items="items"></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template="<r-container>
  <r-row>
    <r-col class='col-2 color-warning'>2</r-col>
    <r-spacer >spacer</r-spacer>
    <r-col class='col-4 color-info'>4</r-col>
  </r-row>
</r-container>"
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "spacer",
  data() {
    return {
      items: [],
    };
  },
};
</script>
