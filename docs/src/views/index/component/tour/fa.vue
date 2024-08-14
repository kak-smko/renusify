<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-tour
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-tour</r-btn>
        یک تور راهنما می سازد , برای آموزش کار کردن با اپ ها قابل استفاده است .
      </p>
    </div>
    <table-props :items="items"></table-props>
  </section>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>AbortOnNotFound</span>
    </h1>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
               <div>
        <div class="header1 py-4">header1</div>
        <div class="header2 py-4">header2</div>
        <r-tour
          abort-on-not-found
          ref="tour"
          :steps="[
            { msg: `Item One is on`, key: `.header1` },
            { msg: `Item Two `, key: `.header2` },
          ]"
        ></r-tour>
      </div>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>ChackCode</span>
    </h1>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="
  methods: {
    chackCode(e) {
      console.log(e);
      this.$refs.tour.next();
    },
  }
"
        template='
               <div>
        <div class="header1 py-4">header1</div>
        <div class="header2 py-4">header2</div>
        <div>
          <r-btn id="one" @click="chackCode(`click btn`)">Click</r-btn>
        </div>
        <r-tour
          abort-on-not-found
          ref="tour"
          :steps="[
            { msg: `Item One is on`, key: `.header1` },
            {
              msg: `this is Btn`,
              key: `#one`,
              options: {
                clickable: true,
                disable_next: true,
              },
            },
            { msg: `Item Two `, key: `.header2` },
          ]"
        ></r-tour>
      </div>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "tour",
  data() {
    return {
      items: [
        {
          prop: "steps",
          type: "Array",
          default: "[]",
          description: "مرحله های مدنظ",
        },
        {
          prop: "canFinish",
          type: "Boolean",
          default: "null",
          description:
              "قبل رسیدن به یک مرحله خاصی کاربر بتواند دکمه پایان را بزند",
        },
        {
          prop: "abortOnNotFound",
          type: "Boolean",
          default: "null",
          description: "اگر یکی از مرحله ها را پیدا نکرد abort شود یا نه ",
        },
        {
          prop: "delay",
          type: "Number",
          default: "2000",
          description: "زمان تاخیر",
        },
      ],
    };
  },
  methods: {
    chackCode(e) {
      console.log(e);
      this.$refs.tour.next();
    },
  },
};
</script>
