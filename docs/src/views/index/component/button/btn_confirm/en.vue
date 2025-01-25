<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-btn-confirm
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        into English is "Button for confirming user activities.
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
            "hard": false,
            "title": null,
            "body": null,
            "cancelText": null,
            "confirmText": null
        }
        },
        methods:{
         log(name,e){
          console.log(name,e)
         }
        }'
        template='<r-btn-confirm :hard="hard" :title="title" :body="body" :cancel-text="cancelText" :confirm-text="confirmText" @click="log("click",$event)" >confirm</r-btn-confirm>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center card-hover">
        <r-btn-confirm class="color-warning">Start Confirm</r-btn-confirm>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
  <r-btn-confirm class="color-warning">Start Confirm</r-btn-confirm>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Title</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center card-hover">
        <r-btn-confirm class="color-black" title="Are you sure want to continue"
        >Start Confirm
        </r-btn-confirm>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
  <r-card class="px-5 py-8 text-center card-hover">
        <r-btn-confirm
          title="Are you sure want to continue"
          class="color-warning"
          >Start Confirm</r-btn-confirm
        >
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Body</span>
    </h1>
    <section class="pa-4">
      <r-card class="px-5 py-8 text-center card-hover">
        <r-btn-confirm
            body="Do you want delete"
            class="color-info"
            title="Are you sure want to continue"
        >Start Confirm
        </r-btn-confirm>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
      <r-card class="px-5 py-8 text-center card-hover">
        <r-btn-confirm
          title="Are you sure want to continue"
          body="Do you want delete"
          class="color-info"
          >Start Confirm</r-btn-confirm
        >
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "btn_confirm",
  data() {
    return {
      props: [
        {prop: "hard", type: "Boolean", default: "null", description: "Hard"},
        {
          prop: "title",
          type: "String",
          default: "null",
          description: "Title",
        },
        {
          prop: "body",
          type: "String",
          default: "null",
          description: "Body Btn",
        },
        {
          prop: "cancelText",
          type: "String",
          default: "null",
          description: "Cancel Text",
        },
        {
          prop: "confirmText",
          type: "String",
          default: "null",
          description: "Confirm Text",
        },
      ],
      events: [{event: "click", description: ""}],
    };
  },
  created() {
    this.$translate.add("confirm_code", "enter code: {0}");
  },
};
</script>
