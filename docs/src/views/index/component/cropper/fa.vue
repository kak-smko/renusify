<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-cropper
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        برش هر نوع عکسی به نسبت دلخواه
        <r-btn readonly size="small">r-cropper</r-btn>
      </p>
    </div>

    <table-props :items="items"></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
    wPH: 3/2,
    maxWidth: 400,
    showCropped: true,
    getBlob: false,
    selectImg: true
 }
}"
        template="<r-cropper :wPH='wPH' :maxWidth='maxWidth' :showCropped='showCropped'
  :getBlob='getBlob' :selectImg='selectImg'></r-cropper>"
    ></r-code-editor>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
    wPH: 3/2,
    imgSrc: '/test.jpg',
    maxWidth: 400,
    showCropped: true,
    getBlob: true
 }
}"
        template="<r-cropper :wPH='wPH' :imgSrc='imgSrc' :maxWidth='maxWidth' :showCropped='showCropped'
  :getBlob='getBlob'></r-cropper>"
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "cropper",
  data() {
    return {
      emits: ["cropped", "original"],
      items: [
        {
          prop: "selectImg",
          type: "Boolean",
          default: "true",
          description: "کاربر بتونه عکس انتخاب کنه",
        },
        {
          prop: "getBlob",
          type: "Boolean",
          default: "false",
          description: "مقدار blob عکس را بر گرداند",
        },
        {
          prop: "showCropped",
          type: "Boolean",
          default: "false",
          description: "عکس برش زده نشون داده بشه",
        },
        {
          prop: "maxWidth",
          type: "Number",
          default: null,
          description: "حداکثر عرض عکس",
        },
        {
          prop: "imgSrc",
          type: "String, Blob",
          default: null,
          description: "منبع عکس برای برش",
        },
        {
          prop: "wPH",
          type: "Number, String, Array",
          default: 1,
          description: "نسبت عرض به ارتفاع",
        },
      ],
    };
  },
};
</script>
