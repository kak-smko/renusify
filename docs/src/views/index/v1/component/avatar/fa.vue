<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-avatar
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        کامپوننت
        <r-btn readonly size="small"> r-avatar</r-btn>
        به طور معمول برای نمایش عکس‌های پروفایل دایره‌ای کاربر استفاده می‌شود.
        این کامپوننت به شما امکان می‌دهد تصاویر و آیکون‌های را به صورت پویا
        اندازه بدهید و شعاع حاشیه یک چهره را اضافه کنید.
      </p>
    </div>
    <table-props :items="items"></table-props>
    <table-events :items="events" class="mt-5"></table-events>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "size": 48,
    "elevation": "none",
    "editable": null,
    "flat": false,
    "tile": false,
    "headers": null
}
}'
        template='<r-avatar :size="size" :elevation="elevation" :editable="editable" :flat="flat" :tile="tile" :headers="headers" ></r-avatar>'
    >
    </r-code-editor>
  </section>
  <br/>
  <section class="pa-3 text-center">
    <r-avatar></r-avatar>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor runnable template="<r-avatar></r-avatar>"></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Size</span>
    </h1>
    <section class="d-flex h-space-between pt-12 ps-20 pe-20">
      <r-avatar class="color-info-text" size="82">
        <span>82</span>
      </r-avatar>
      <r-avatar class="color-primary-text" size="65">
        <span>65</span>
      </r-avatar>
      <r-avatar class="color-success-text" size="50">
        <span>50</span>
      </r-avatar>
      <r-avatar class="color-error-text" size="38">
        <span>38</span>
      </r-avatar>
    </section>
  </section>
  <p class="caption">Press run Button</p>
  <section>
    <r-code-editor
        runnable
        script='data(){
 return {
    "size": 82,
   }
}'
        template='<r-avatar size="82" class="color-info-text">
  <span>82</span>
</r-avatar>'
    >
    </r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Elevation</span>
    </h1>
    <section class="pa-3 text-center">
      <r-avatar elevation="lg"></r-avatar>
    </section>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor runnable template='<r-avatar elevation="lg"></r-avatar>'>
    </r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Flat</span>
    </h1>
    <section class="pa-3 text-center">
      <r-avatar flat></r-avatar>
    </section>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor runnable template="<r-avatar flat></r-avatar>">
    </r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Editable</span>
    </h1>
    <section class="text-center">
      <r-avatar editable="/" size="70"></r-avatar>
    </section>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<div class="text-center">
  <r-avatar size="70" editable="https://www.codenus.com/img/image1"></r-avatar>
</div>'
    >
    </r-code-editor>
  </section>
  <br/><br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-10 br-sm">
      PROP / <span>Tile</span>
    </h1>
    <section class="d-flex h-space-between ps-20 pe-20">
      <r-avatar class="color-one" size="90" tile>
        <span>90</span>
      </r-avatar>
      <r-avatar class="color-gradient-three-90" size="70" tile>
        <span>70</span>
      </r-avatar>
      <r-avatar class="color-three" size="50" tile>
        <span>50</span>
      </r-avatar>
      <r-avatar class="color-success" size="30" tile>
        <span>30</span>
      </r-avatar>
    </section>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template=' <r-avatar tile size="90" class="color-one">
          <span>90</span>
</r-avatar>'
    ></r-code-editor>
  </section>
  <br/><br/>
</template>
<script>
export default {
  name: "avatar",
  data() {
    return {
      events: [],
      items: [
        {
          prop: "size",
          type: "Number,String",
          default: "48",
          description: "اندازه",
        },
        {
          prop: "elevation",
          type: "String",
          default: "none",
          description: " یک ارتفاع پایه را ارائه می‌دهد",
        },
        {
          prop: "editable",
          type: "String",
          default: "undefined",
          description: "قابلیت ویرایش",
        },
        {
          prop: "flat",
          type: "Boolean",
          default: "null",
          description: "تخت می کند ",
        },
        {
          prop: "tile",
          type: "Boolean",
          default: "null",
          description: " بدون گوشه می کند ",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "سربرگ ",
        },
      ],
    };
  },
};
</script>
