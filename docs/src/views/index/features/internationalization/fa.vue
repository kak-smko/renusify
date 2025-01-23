<template>
  <section>
    <h1 class="display-4">بین المللی</h1>
    <p class="title mt-5">
      رنوسیفای از زبان های زنده بین المللی (i18n) و واحدهای شمارش و تاریخ آن ها
      پشتیبانی می کند. برای این منظور می توان زبان های قابل پشتیبانی و سیستم
      تاریخ آن ها را تعریف کرد. همچنین در داخل برنامه می توان زبان برنامه را عوض
      کرد و بین زبان های تعریف شده جابجا شد.
    </p>
    <p>
      برای زبان های جدید علاوه بر مشخص کردن زبان برنامه می بایست برای کلاس
      DateTime فرمت را مشخص کرد تا برنامه به صورت خودکار تاریخ و زمان را ترجمه
      کند.
    </p>

    <r-code-editor
        :script-show="false"
        :style-show="false"
        :template-show="false"
        script='import {createApp} from "vue";
import App from "./Index.vue";
import renusify from "renusify";
import DateTime from "renusify/plugins/trans/DateTime";
DateTime.langs={
	"en": {
		first_day: 0,
		time_zone_offset: -480,//Standard timezone offset minutes.
		daylight_saving_time: true,
		localizeName: "en-US",
		timeZone: "America/Los_Angeles",
		rtl: false
	},
	"fa": {
		first_day: 6,
		time_zone_offset: 210,
		daylight_saving_time: false,
		localizeName: "fa-IR",
		timeZone: "Asia/Tehran",
		calendar: "persian",
		rtl: true
	},
}
 window.app = createApp(App) .use(renusify,{
	lang: "fa"
}) .mount("#app");
'
    >
    </r-code-editor>
  </section>
  <section>
    <h2 class="display-4 my-5">تاریخ و زمان</h2>
    <p>
      می توان نحوه نمایش تاریخ برای مدل های مختلف را بر اساس زبان مورد نظر مشخص
      کرد. مثلا در حالت درخواست short تاریخ بر اساس سال به صورت عدد و ماه به
      صورت نام و روز به صورت عدد نمایش داده می شود.
    </p>

    <r-code-editor
        runnable
        template='<div class="ltr">
  <div>date: {{new Date()}}</div>
  <div>narrow: {{$d(new Date(),"narrow")}}</div>
  <div>day: {{$d(new Date(),"day")}}</div>
  <div>month: {{$d(new Date(),"month")}}</div>
  <div>year: {{$d(new Date(),"year")}}</div>
  <div>short: {{$d(new Date(),"short")}}</div>
  <div>medium: {{$d(new Date(),"medium")}}</div>
  <div>long: {{$d(new Date(),"long")}}</div>
</div>'
    >
    </r-code-editor>
  </section>
  <section>
    <h3 class="display-4 my-5">ترجمه</h3>
    <p>
      برای ترجمه از تابع t$ استفاده می کنیم. همچنین این تابع می تواند متغیر
      بگیرد و در ترجمه جاگذاری کند.
    </p>
    <p>
      برای استفاده از ترجمه در ابتدا باید کلیدها و مقدارهای مربوط به هر زبان را
      به کلاس ارجاع دهیم و اگر کلید درخواستی مقداری نداشته باشد خود کلید
      برگردانده می شود. همچنین برای کلیدهایی که مقدار ندارند در حالت لوکال کلید
      با نام پکیج به سمت سرور ارسال می گردد تا به دیتابیس اضافه شود و کاربر
      ترجمه مربوط به آن را انجام دهد و در درخواست های بعدی در دسترس باشد.
    </p>

    <r-code-editor
        runnable
        script="name:'test',
created(){
  this.$translate.add('name','codenus');
  this.$translate.add('from_to_manage','From {0} to {1} of {2}');
}"
        template="<div>
  <div>{{$t('name')}}</div>
  <div>{{$t(['from_to_manage',[0,5,20]])}}</div>
</div>"
    >
    </r-code-editor>

    <p>برای تغییر زبان برنامه به صورت داینامیک می توان به صورت زیر عمل کرد</p>

    <r-code-editor
        runnable
        script='data() {
	return {
		key:1,
		langList: [{
			name: "english",value: "en",rtl: false
		},{
			name: "فارسی",value: "fa",rtl: true
		}
		]
	};
},
methods: {
	changeLang(item) {
	 if(item){
		this.$r.lang = item.value;
		this.$r.rtl = item.rtl;
		this.$storage.set("lang",item.value);
		this.$storage.set("rtl",item.rtl);
		this.switchLang(item.value);
		}
	},
	switchLang(lang) {
		if (this.$translate.messages.lang) {
			this.$translate.local = lang;
		}
		else {
			this.loadLocaleMessage(lang);
		}
	},
	loadLocaleMessage(locale) {
		const msgs = {
			"fa": {
				"id": "شناسه",
				"name": "نام"
			},
			"en": {
				"id": "ID",
				"name": "Name"
			}
		};
		this.$translate.local = locale;
		this.$translate.setMessages(msgs[locale],locale);
		this.key++;
	}
}'
        template='<div>
	<r-select-input label="lang" :items="langList" @update:model-value="changeLang" >
	</r-select-input>
	<div :key="key"> {{$t("id")}} {{$t("name")}}
	</div>
</div>'
    >
    </r-code-editor>
  </section>
  <section>
    <h3 class="display-4 my-5">واحد شمارش</h3>
    <p>برای اعداد در زبان های محلی می توان از تابع n$ استفاده کرد.</p>

    <r-code-editor
        runnable
        template="<div class='ltr'>
	<div> {{$n(7)}}</div>
	<div> {{$n(6000000)}}</div>
	<div> {{$n(50000000000)}}</div>
</div>"
    >
    </r-code-editor>
  </section>
</template>

<script>
export default {
  name: "internationalization",
  data() {
    return {};
  },
};
</script>

