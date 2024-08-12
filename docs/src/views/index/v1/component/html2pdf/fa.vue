<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-html2pdf
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-html2pdf</r-btn>
        هر صفحه و یا المان HTML را به یک فایل PDF قابل چاپ تبدیل می کند.
      </p>
    </div>
    <table-props :items="props"></table-props>
    <table-events :items="events" class="mt-5"></table-events>
  </section>
  <section class="mt-10">
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "enableDownload": true,
    "enableLinks": true,
    "previewModal": false,
    "filename": "1692260878768",
    "pdfQuality": 2,
    "pdfFormat": "a4",
    "pdfOrientation": "portrait",
    "pdfContentWidth": "800px",
    "htmlToPdfOptions": null,
    "pageBreakAuto": null,
    "toInlineCss": false,
    "avoidClass": null,
    "beforeClass": null,
    "afterClass": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 },
 save() {
      this.$refs.html2pdf_aid.buildPdf();
    }
}'
        template='<r-html2pdf ref="html2pdf_aid" :enable-Download="enableDownload" :enable-Links="enableLinks" :preview-Modal="previewModal" :filename="filename" :pdf-Quality="pdfQuality" :pdf-Format="pdfFormat" :pdf-Orientation="pdfOrientation" :pdf-Content-Width="pdfContentWidth" :html-To-Pdf-Options="htmlToPdfOptions" :page-Break-Auto="pageBreakAuto" :to-Inline-Css="toInlineCss" :avoid-Class="avoidClass" :before-Class="beforeClass" :after-Class="afterClass" @progress="log(`progress`,$event)" @has-downloaded="log(`has-downloaded`,$event)" @before-download="log(`before-download`,$event)" >
        <h1>title</h1>
        <p class="color-error pa-5"> this is test</p>
      </r-html2pdf>
      <r-btn @click="save">save</r-btn>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">html2pdf</h1>
    <r-divider></r-divider>
    <section>
      <div class="pa-4">
        <r-html2pdf
            ref="html2pdf_aid"
            :enableDownload="true"
            :pdf-quality="2"
            avoid-class=".item-print"
            filename="aid"
            pdf-content-width="208mm"
            pdf-orientation="portrait"
            toInlineCss
            @progress="onProgress($event)"
        >
          <div class="my-2">
            <h4 class="pb-4">title</h4>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </span>
          </div>
        </r-html2pdf>
        <r-btn class="color-success" @click="save">Pdf</r-btn>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
},
 methods: {
    save() {
      this.$refs.html2pdf_aid.buildPdf();
    },
  },
"
        template='  <div class="pa-4 text-center">
        <r-btn class="color-info" @click="save">Pdf</r-btn>
        <r-html2pdf
          :enableDownload="true"
          filename="aid"
          :pdf-quality="2"
          pdf-orientation="portrait"
          pdf-content-width="208mm"
          avoid-class=".item-print"
          toInlineCss
          ref="html2pdf_aid"
        >
          <div class="text-center pa-4">
            <h4 class="pb-4">title</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
              dolorum quibusdam repudiandae ut voluptates.
            </p>
          </div>
        </r-html2pdf>
      </div>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "html2pdf",
  data() {
    return {
      props: [
        {
          prop: "enableDownload",
          type: "Boolean",
          default: "true",
          description: "دانلود کردن را فعال کنید",
        },
        {
          prop: "enableLinks",
          type: "Boolean",
          default: "true",
          description: "لینک دادن را فعال کنید",
        },
        {
          prop: "previewModal",
          type: "Boolean",
          default: "false",
          description: "پیش نمایش Modal",
        },
        {
          prop: "filename",
          type: "String",
          default: "1692260878768",
          description: "نام فایل",
        },
        {
          prop: "pdfQuality",
          type: "Number",
          default: "2",
          description: "کیفیت pdf",
        },
        {
          prop: "pdfFormat",
          type: "undefined",
          default: "a4",
          description: "اندازه فرمت pdf",
        },
        {
          prop: "pdfOrientation",
          type: "String",
          default: "portrait",
          description: "جهت نمایش Pdf",
        },
        {
          prop: "pdfContentWidth",
          type: "undefined",
          default: "800px",
          description: "جهت گیری pdf",
        },
        {
          prop: "htmlToPdfOptions",
          type: "Object",
          default: "undefined",
          description: "گزینه های تبدیل HTML به PDF",
        },
        {
          prop: "pageBreakAuto",
          type: "Number",
          default: "null",
          description: "باز شدن صفحه جدید بصورت خودکار",
        },
        {
          prop: "toInlineCss",
          type: "Boolean",
          default: "null",
          description: " CSS درون خطی",
        },
        {
          prop: "avoidClass",
          type: "String",
          default: "null",
          description: "اجتناب از کلاس ",
        },
        {
          prop: "beforeClass",
          type: "String",
          default: "null",
          description: "کلاسهای پیشین",
        },
        {
          prop: "afterClass",
          type: "String",
          default: "null",
          description: "کلاسهای پسین",
        },
      ],
      events: [
        {event: "progress", description: ""},
        {event: "has-downloaded", description: ""},
        {event: "before-download", description: ""},
      ],
    };
  },
  methods: {
    onProgress(progress) {
      this.progress = progress;

      console.log(`PDF generation progress: ${progress}%`);
    },
    save() {
      this.$refs.html2pdf_aid.buildPdf();
    },
  },
};
</script>
