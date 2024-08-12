<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-html2pdf-page-break
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The page always breaks after the
        <r-btn readonly size="small"> r-html2pdf-page-break</r-btn>
        element and
        redirects to another page.
      </p>
    </div>

    <table-props :items="items"></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {}
}"
        template="<r-html2pdf-page-break ></r-html2pdf-page-break>"
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "html2pdf_page_break",
  data() {
    return {
      items: [],
    };
  },
};
</script>
