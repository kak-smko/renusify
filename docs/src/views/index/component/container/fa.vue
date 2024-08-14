<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-container
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small">r-container</r-btn>
        این امکان را فراهم می کند که محتویات سایت شما را در مرکز و به صورت افقی
        قرار دهید.
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
    "fullWidth": false,
    "fill": false
}
}'
        template='<r-container :full-Width="fullWidth" :fill="fill" ></r-container>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>FullWidth</span>
    </h1>
    <section class="d-flex h-space-between">
      <r-container :full-Width="fullWidth" class="background-one">
        <div>
          <p class="title pa-4 color-white color-black-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            accusantium assumenda atque commodi culpa cumque debitis harum illum
            incidunt ipsum labore numquam odit, officia quam quisquam quo sed
            sunt tempora tenetur, voluptatibus! Eius nisi nobis provident
            suscipit voluptatum! Ad cumque deserunt expedita ipsum ratione vel
            voluptatem. A adipisci amet dicta doloribus, eligendi ipsum magni
            nihil nisi odit quis, similique sint? Assumenda dolorem eligendi
            illo magni temporibus. Beatae, corporis deserunt eius eos fugit ipsa
            maiores non porro quisquam quo reprehenderit sapiente ullam veniam.
            Aperiam dignissimos ea excepturi, facere illum itaque iure
            repellendus sequi sit? Adipisci animi at eius, eligendi maiores
            perspiciatis?
          </p>
        </div>
      </r-container>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='      <r-container class="background-one" :full-Width="fullWidth">
        <div>
          <p class="title pa-4 color-white color-black-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad
            dignissimos fugit hic pariatur quisquam sequi suscipit velit vitae
            voluptatibus. Asperiores nemo neque optio totam vero. Amet nemo
            saepe voluptas.
          </p>
        </div>
      </r-container>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Fill</span>
    </h1>
    <section>
      <r-container :fill="fill" class="background-two">
        <div>
          <p class="title color-white pa-3 color-black-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad
            dignissimos fugit hic pariatur quisquam sequi suscipit velit vitae
            voluptatibus. Asperiores nemo neque optio totam vero. Amet nemo
            saepe voluptas.
          </p>
        </div>
      </r-container>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='  <r-container class="background-two" :fill="fill">
        <div>
          <p class="title color-white pa-3 color-black-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad
            dignissimos fugit hic pariatur quisquam sequi suscipit velit vitae
            voluptatibus. Asperiores nemo neque optio totam vero. Amet nemo
            saepe voluptas.
          </p>
        </div>
      </r-container>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "container",
  data() {
    return {
      items: [
        {
          prop: "fullWidth",
          type: "Boolean",
          default: "null",
          description: "تمام عرض",
        },
        {
          prop: "fill",
          type: "Boolean",
          default: "null",
          description: "پر کردن تمام صفحه ( ۱۰۰٪ عرض و ۱۰۰٪ ارتفاع)",
        },
      ],
    };
  },
};
</script>
