<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-icon
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-icon</r-btn>
        عبارتست از مجموعه‌ای از استایل ها برای ارائه بهتر آیکون ها در برنامه ای
        که شما مورد استفاده قرار می دهید .
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
    "width": null,
    "height": null,
    "disabled": false,
    "exact": false
}
}'
        template='<r-icon v-html="$r.icons.plus" :width="width" :height="height" :disabled="disabled" :exact="exact" ></r-icon>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Width & Height</span>
    </h1>
    <section class="pt-12 ps-20 pe-20">
      <r-icon
          :height="20"
          :width="20"
          class="color-warning mx-4"
          v-html="$r.icons.plus"
      ></r-icon>
      <r-icon
          :height="40"
          :width="40"
          class="color-error mx-4"
          v-html="$r.icons.plus"
      ></r-icon>
      <r-icon
          :height="50"
          :width="50"
          class="color-success mx-4"
          v-html="$r.icons.plus"
      ></r-icon>
      <r-icon
          :height="80"
          :width="80"
          class="color-info mx-4"
          v-html="$r.icons.plus"
      ></r-icon>
      <r-icon
          :height="100"
          :width="100"
          class="color-one mx-4"
          v-html="$r.icons.plus"
      ></r-icon>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='<div>  <r-icon
        v-html="$r.icons.plus"
        :width="20"
        :height="20"
        class="color-warning mx-4"
      ></r-icon>
      <r-icon
        v-html="$r.icons.plus"
        :width="40"
        :height="40"
        class="color-error mx-4"
      ></r-icon>
      <r-icon
        v-html="$r.icons.plus"
        :width="50"
        :height="50"
        class="color-success mx-4"
      ></r-icon>
      <r-icon
        v-html="$r.icons.plus"
        :width="80"
        :height="80"
        class="color-info mx-4"
      ></r-icon>
      <r-icon
        v-html="$r.icons.plus"
        :width="100"
        :height="100"
        class="color-one mx-4"
      ></r-icon></div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Disabled</span>
    </h1>
    <section class="pt-12 ps-20 pe-20">
      <div class="color-warning ps-10">
        <r-icon
            :height="25"
            :width="25"
            disabled
            v-html="$r.icons.menu"
        ></r-icon>
        <span class="mx-3">Disable Icon</span>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='   <div class="color-warning ps-10">
        <r-icon
          v-html="$r.icons.menu"
          disabled
          :width="25"
          :height="25"
        ></r-icon>
        <span class="mx-3">Disable Icon</span>
      </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Exact</span>
    </h1>
    <section class="pt-5 px-20 d-flex h-space-around">
      <div>
        <r-btn class="color-two-text" icon>
          <r-icon exact v-html="$r.icons.arrow_right"></r-icon>
        </r-btn>
        <r-btn class="color-two-text" icon>
          <r-icon exact v-html="$r.icons.arrow_left"></r-icon>
        </r-btn>
      </div>
      <div>
        <r-btn class="color-one-text" icon>
          <r-icon v-html="$r.icons.arrow_right"></r-icon>
        </r-btn>
        <r-btn class="color-one-text" icon>
          <r-icon v-html="$r.icons.arrow_left"></r-icon>
        </r-btn>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='   <div>
        <div>
        <r-btn icon class="color-two-text">
          <r-icon v-html="$r.icons.arrow_right" exact></r-icon>
        </r-btn>
        <r-btn icon class="color-two-text">
          <r-icon v-html="$r.icons.arrow_left" exact></r-icon>
        </r-btn>
      </div>
      <div class="my-4">
        <r-btn icon class="color-one-text">
          <r-icon v-html="$r.icons.arrow_right"></r-icon>
        </r-btn>
        <r-btn icon class="color-one-text">
          <r-icon v-html="$r.icons.arrow_left"></r-icon>
        </r-btn>
      </div>
      </div>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "icon",
  data() {
    return {
      items: [
        {
          prop: "width",
          type: "String",
          default: "undefined",
          description: "عرض آیکون",
        },
        {
          prop: "height",
          type: "String",
          default: "undefined",
          description: "ارتفاع آیکون",
        },
        {
          prop: "disabled",
          type: "Boolean",
          default: "null",
          description: "آیکون را غیر فعال می کند ",
        },
        {
          prop: "exact",
          type: "Boolean",
          default: "null",
          description: "آیکون برای راست به چپ معکوس نمی شود .",
        },
      ],
    };
  },
};
</script>
