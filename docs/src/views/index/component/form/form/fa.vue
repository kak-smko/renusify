<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-form
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        کنترل های
        <r-btn readonly size="small"> r-form</r-btn>
        به طور خودکار برخی از استایل های سراسری را دریافت می کنند.
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
    "modelValue": false
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-form v-model="modelValue" @update:model-Value="log(`update:modelValue`,$event)" ></r-form>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>ModelValue</span>
    </h1>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
 valid:false,
  }
}"
        template='<div> {{ valid }}
	<r-form v-model="valid">
		<r-text-input :label="$t([`Write-some-thing`, [inputKey]], `renusify`)" :rules="[`required`]" >
		</r-text-input>
	</r-form>
</div> '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
 valid:false,
  }
}"
        template='
               <div>
                <r-card class="pa-4 color-one-text text-center" outlined>{{
        valid
      }}</r-card>
      <r-form v-model="valid">
        <r-text-input
          :label="$t([`Code`, [inputKey]], `renusify`)"
          :rules="[`required`]"
        ></r-text-input>
        <r-btn :disabled="!valid" class="mt-4 color-success"
          >Send</r-btn
        >
      </r-form>
               </div>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "form",
  data() {
    return {
      valid: false,
      validOne: false,
      props: [
        {
          prop: "modelValue",
          type: "Boolean",
          default: "null",
          description: "اگر input ها داخل فرم معتبر باشند true می شود . ",
        },
      ],
      events: [
        {
          event: "update:modelValue",
          description: "هنگام آبدیت متد modelValue را فراخوانی می کند .",
        },
      ],
    };
  },
};
</script>
