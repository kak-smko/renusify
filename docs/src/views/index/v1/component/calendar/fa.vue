<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-calendar
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        کامپوننت
        <r-btn readonly size="small"> r-calendar</r-btn>
        برای نمایش اطلاعات به صورت روزانه، هفتگی یا ماهانه مورد استفاده قرار می
        گیرد.
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
    "lang": null,
    "readonly": false,
    "showHeaders": true,
    "isDateDisabled": () => {return false},
    "year": null,
    "month": null
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-calendar :lang="lang" :readonly="readonly" :show-Headers="showHeaders" :is-Date-Disabled="isDateDisabled" :year="year" :month="month" @change="log(`change`,$event)" @select="log(`select`,$event)" ></r-calendar>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section>
      <r-calendar></r-calendar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template="<r-calendar> </r-calendar>"
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section>
      <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
        EVENT / <span>SELECT</span>
      </h1>
      <div>
        <p class="title ps-4 pt-1 pb-1 br-sm">
          تاریخ و ساعت را دقیق به شما نشان می دهد.
        </p>
        <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
          {{ d }}
        </h1>
      </div>
      <r-calendar @select="d = $event"></r-calendar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  d:null
  }
}"
        template='
           <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
          {{ d }}
        </h1>
      <r-calendar @select="d = $event"></r-calendar>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section>
      <p class="title ps-4 pt-1 pb-1 br-sm">
        تاریخ و ساعت کلیک شده را به شما نشان می دهد.
      </p>
      <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
        {{ $d(new Date(d)) }}
      </h1>
      <r-calendar @select="d = $event"></r-calendar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  d:null
  }
}"
        template='
             <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
        {{ $d(new Date(d)) }}
      </h1>
      <r-calendar @select="d = $event"></r-calendar>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section>
      <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
        EVENT / <span>CHANGE</span>
      </h1>
      <p class="subtitle-2 ps-4 pt-1 pb-1 br-sm">
        زمانی که کاربر بخواهد ماه را با کلیک های راست و چپ عوض کند فراخوانی می
        شود و اطلاعات جدید را به کاربر می دهد.
      </p>
      <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
        {{ m }}
      </h1>
      <r-calendar @change="m = $event"></r-calendar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
    d:null
  }
}"
        template='
      {{d}}
      <r-calendar @change="d = $event"></r-calendar>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section>
      <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
        PROP / <span>ShowHeaders</span>
      </h1>
      <p class="title ps-4 pt-1 pb-1 br-sm">هدر تقویت غیر فعال می شود.</p>

      <r-calendar :showHeaders="false"></r-calendar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template=' <r-calendar :showHeaders="false"></r-calendar>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section>
      <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
        PROP / <span>Year or Month</span>
      </h1>
      <p class="title ps-4 pt-1 pb-1 br-sm">
        تقویم مستقیم به آن سال یا ماه می رود .
      </p>
      <r-calendar :month="6" :year="2020"></r-calendar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<r-calendar :year="2020" :month="6"></r-calendar>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section>
      <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
        PROP / <span>Readonly</span>
      </h1>
      <p class="title ps-4 pt-1 pb-1 br-sm">
        حق کلیک کردن را از کاربر می گیرید.
      </p>
      <r-calendar readonly></r-calendar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template="<r-calendar readonly></r-calendar>"
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section>
      <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
        PROP / <span>IsDateDisabled</span>
      </h1>
      <p class="subtitle-1 ps-4 pt-1 pb-1 br-sm">
        غیرفعال کردن روزهای خاصی از هفته را برای کاربر انجام می دهد.
      </p>
      {{ $d(new Date(d)) }}
      <r-calendar :isDateDisabled="disable" @select="d = $event"></r-calendar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="
  methods: {
    disable(data) {
      if (data.getDay() !== 1) {
        return false;
      }
      return true;
    },
  }
"
        template=' <r-calendar :isDateDisabled="disable"></r-calendar>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "calendar",
  data() {
    return {
      d: null,
      m: null,
      props: [
        {
          prop: "lang",
          type: "String",
          default: "undefined",
          description: "زبان ",
        },
        {
          prop: "readonly",
          type: "Boolean",
          default: "null",
          description: "فقط خواندنی",
        },
        {
          prop: "showHeaders",
          type: "Boolean",
          default: "true",
          description: "نمایش دادن سربرگ ها",
        },
        {
          prop: "isDateDisabled",
          type: "Function",
          default: "() => false",
          description: "غیرفعال کردن تاریخ خاصی",
        },
        {prop: "year", type: "Number", default: "null", description: "سال"},
        {prop: "month", type: "Number", default: "null", description: "ماه"},
      ],
      events: [
        {event: "change", description: ""},
        {event: "select", description: ""},
      ],
    };
  },
  methods: {
    disable(data) {
      if (data.getDay() !== 1) {
        return false;
      }
      return true;
    },
  },
};
</script>
