<template>
  <section>
    <h1 class="display-4">Internationalization</h1>
    <p class="title mt-5">
      Renusify supports international live languages (i18n) and their numbering and date formats. For this purpose, you
      can define supported languages and their date systems. Also, you can change the application language within the
      program and switch between defined languages.
    </p>
    <p>
      For new languages, in addition to specifying the application language, you must define the format for the DateTime
      class so that the program automatically translates dates and times.
    </p>

    <r-code-editor
        :script-show="false"
        :css-show="false"
        :template-show="false"
        script='import {createApp} from "vue";
import App from "./Index.vue";
import renusify from "renusify";
import DateTime from "renusify/plugins/trans/DateTime";
DateTime.langs={
	"en": {
		first_day: 0,
		time_zone_offset: -480,//Standard timezone offset minutes.
		localizeName: "en-US",
		timeZone: "America/Los_Angeles",
		rtl: false
	},
	"fa": {
		first_day: 6,
		time_zone_offset: 210,
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
    <h2 class="display-4 my-5">Date and Time</h2>
    <p>
      You can specify how dates are displayed for different modes based on the desired language. For example, in 'short'
      request mode, the date is displayed with the year as a number, the month as a name, and the day as a number.
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
    <h3 class="display-4 my-5">Translation</h3>
    <p>
      We use the $t function for translation. This function can also accept variables and interpolate them into the
      translation.
    </p>
    <p>
      To use translation, we must first assign the keys and their corresponding values for each language to the class.
      If a requested key has no value, the key itself will be returned. Also, for keys without values, in local mode,
      the key along with the package name is sent to the server to be added to the database, allowing the user to
      perform the translation, making it available for subsequent requests.
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

    <p>To dynamically change the application language, you can do the following:</p>

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
    <h3 class="display-4 my-5">Number Formatting</h3>
    <p>For numbers in local languages, you can use the $n function.</p>

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