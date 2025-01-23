<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-app
      </h1>
      <p class="title font-weight-light ps-4 pb-1 py-4 br-lg">
        در رنوسیفای نقطه شروع برنامه نویسی از
        <r-btn readonly size="small"> r-app</r-btn>
        است باید همه کدها را در r-app جایی گرفته باشند.
      </p>
    </div>

    <table-props
        :items="[
        {
          prop: 'id',
          type: 'String or Number',
          default: 'renusify',
          description: 'آیدی برای برنامه است.',
        },

        {
          prop: 'rtl',
          type: 'Boolean',
          default: 'undefined',
          description: 'عمل راست چین کردن سایت را برای شما انجام می دهد',
        },
      ]"
    ></table-props>
  </section>
  <br/>
  <section>
    <h1 class="font-weight-bold color-white title ps-4 pt-1 pb-1 br-sm">
      مثالی برای تغییر تم و راست چین کردن سایت
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
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
};
</script>


