<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        r-confirm
      </h1>
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
    "title": null,
    "text": null,
    "cancelText": null,
    "confirmText": null,
    "modelValue": false,
    "hard": false
}
},
methods:{
 log(name,e){
  console.log(name,e);
  this.modelValue=false
 }
}'
        template='<r-btn @click="modelValue=true">confirm</r-btn><r-confirm :title="title" :text="text" :cancel-Text="cancelText" :confirm-Text="confirmText" v-model="modelValue" :hard="hard" @accept="log(`accept`,$event)" @cancel="log(`cancel`,$event)" ></r-confirm>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="d-flex h-space-between pt-12 ps-20 pe-20">
      <r-card class="py-4 px-6 text-center">
        <h3 class="pb-3">Confirm</h3>
        <span class="subtitle-1"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          debitis eaque eligendi ex in iste numquam perferendis qui similique,
          suscipit.</span
        >
        <div class="d-flex h-space-around mt-3">
          <r-btn
              class="color-success-text"
              outlined
              rounded
              @click="changeKey = true"
          >Confirm
          </r-btn>
          <r-btn
              class="color-error-text"
              outlined
              rounded
              @click="changeKey = true"
          >Delete
          </r-btn>
        </div>
        <r-confirm
            v-model="changeKey"
            @accept="del"
            @cancel="cancel"
        ></r-confirm>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
   changeKey: false,
  }
},  methods: {
    del() {
      console.log("del");
      this.changeKey = false;
    },
    cancel() {
      console.log("cancel");
      this.changeKey = false;
    },
  },'
        template='    <r-card class="py-4 px-6 text-center">
        <h3 class="pb-3">Confirm</h3>
        <span class="subtitle-1"
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
          debitis eaque eligendi ex in iste numquam perferendis qui similique,
          suscipit.</span
        >
        <div class="d-flex h-space-around mt-3">
          <r-btn
            class="color-success-text"
            outlined
            rounded
            @click="changeKey = true"
            >Confirm</r-btn
          >
          <r-btn
            class="color-error-text"
            outlined
            rounded
            @click="changeKey = true"
            >Delete</r-btn
          >
        </div>
        <r-confirm
          v-model="changeKey"
          @accept="del"
          @cancel="cancel"
        ></r-confirm>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Hard</span>
    </h1>
    <p>
      از کاربر کدی می خواهد که اگر کد را درست وارد کند باکس تایید فعال می شود در
      غیر اینصورت غیر فعال خواهد بود
    </p>
    <section class="d-flex h-space-between pt-12 ps-20 pe-20">
      <r-card class="py-4 px-6 text-center">
        <h3 class="pb-3">Confirm</h3>
        <span class="subtitle-1"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span
        >
        <div class="d-flex h-space-around mt-3">
          <r-btn
              class="color-success-text"
              outlined
              rounded
              @click="changeKey = true"
          >Confirm
          </r-btn>
          <r-btn
              class="color-error-text"
              outlined
              rounded
              @click="changeKey = true"
          >Delete
          </r-btn>
        </div>
        <r-confirm
            v-model="changeKey"
            hard
            @accept="del"
            @cancel="cancel"
        ></r-confirm>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
   changeKey: false,
  }
},  methods: {
    del() {
      console.log("del");
      this.changeKey = false;
    },
    cancel() {
      console.log("cancel");
      this.changeKey = false;
    },
  },'
        template='     <r-card class="py-4 px-6 text-center">
        <h3 class="pb-3">Confirm</h3>
        <span class="subtitle-1"
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span
        >
        <div class="d-flex h-space-around mt-3">
          <r-btn
            class="color-success-text"
            outlined
            rounded
            @click="changeKey = true"
            >Confirm
          </r-btn>
          <r-btn
            class="color-error-text"
            outlined
            rounded
            @click="changeKey = true"
            >Delete
          </r-btn>
        </div>
        <r-confirm
          v-model="changeKey"
          @accept="del"
          @cancel="cancel"
          hard
        ></r-confirm>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>title</span>
    </h1>
    <section class="d-flex h-space-between pt-12 ps-20 pe-20">
      <r-card class="py-4 px-6 text-center">
        <h3 class="pb-3">Are you sure</h3>
        <span class="subtitle-1"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span
        >
        <div class="d-flex h-space-around mt-3">
          <r-btn
              class="color-success-text"
              outlined
              rounded
              @click="changeKey = true"
          >Confrim
          </r-btn>
          <r-btn
              class="color-error-text"
              outlined
              rounded
              @click="changeKey = true"
          >Delete
          </r-btn>
        </div>
        <r-confirm
            v-model="changeKey"
            title="Are you sure?"
            @accept="del"
            @cancel="cancel"
        ></r-confirm>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
   changeKey: false,
  }
},  methods: {
    del() {
      console.log("del");
      this.changeKey = false;
    },
    cancel() {
      console.log("cancel");
      this.changeKey = false;
    },
  },'
        template='    <r-card class="py-4 px-6 text-center">
        <h3 class="pb-3">Are you sure</h3>
        <span class="subtitle-1"
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span
        >
        <div class="d-flex h-space-around mt-3">
          <r-btn
            class="color-success-text"
            outlined
            rounded
            @click="changeKey = true"
            >Confrim
          </r-btn>
          <r-btn
            class="color-error-text"
            outlined
            rounded
            @click="changeKey = true"
            >Delete
          </r-btn>
        </div>
        <r-confirm
          v-model="changeKey"
          @accept="del"
          @cancel="cancel"
          title="Are you sure?"
        ></r-confirm>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>text</span>
    </h1>
    <section class="d-flex h-space-between pt-4 ps-20 pe-20">
      <r-card class="py-4 px-6 text-center">
        <h3 class="pb-3">Are you sure</h3>
        <span class="subtitle-1">Are you sure, item will be remove?</span>
        <div class="d-flex h-space-around mt-3">
          <r-btn
              class="color-success-text"
              outlined
              rounded
              @click="changeKey = true"
          >Confrim
          </r-btn>
          <r-btn
              class="color-error-text"
              outlined
              rounded
              @click="changeKey = true"
          >Delete
          </r-btn>
        </div>
        <r-confirm
            v-model="changeKey"
            text="Are you sure, item will be remove?"
            title="Are you sure?"
            @accept="del"
            @cancel="cancel"
        ></r-confirm>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
   changeKey: false,
  }
},  methods: {
    del() {
      console.log("del");
      this.changeKey = false;
    },
    cancel() {
      console.log("cancel");
      this.changeKey = false;
    },
  },'
        template='     <r-card class="py-4 px-6 text-center">
        <h3 class="pb-3">Are you sure</h3>
        <span class="subtitle-1">Are you sure, item will be remove?</span>
        <div class="d-flex h-space-around mt-3">
          <r-btn
            class="color-success-text"
            outlined
            rounded
            @click="changeKey = true"
            >Confrim
          </r-btn>
          <r-btn
            class="color-error-text"
            outlined
            rounded
            @click="changeKey = true"
            >Delete
          </r-btn>
        </div>
        <r-confirm
          v-model="changeKey"
          @accept="del"
          @cancel="cancel"
          title="Are you sure?"
          text="Are you sure, item will be remove?"
        ></r-confirm>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "confirm",
  data() {
    return {
      changeKey: false,
      props: [
        {
          prop: "title",
          type: "String",
          default: "null",
          description: "متن عنوان کادر",
        },
        {
          prop: "text",
          type: "String",
          default: "null",
          description: "نمایش متن ",
        },
        {
          prop: "cancelText",
          type: "String",
          default: "null",
          description: "متن cancel",
        },
        {
          prop: "confirmText",
          type: "String",
          default: "null",
          description: "متن confirm",
        },
        {
          prop: "modelValue",
          type: "Boolean",
          default: "null",
          description: "modelValue پیشفرض غیرفعال است . ",
        },
        {
          prop: "hard",
          type: "Boolean",
          default: "null",
          description: "یک کد را باید وارد کنید تا دکمه تایید ظاهر شود . ",
        },
      ],
      events: [
        {
          event: "accept",
          description: "برای حذف یک تابع روی دکمه تایید کلیک کنید.",
        },
        {event: "cancel", description: "دکمه  cancel فراخوانی شود "},
      ],
    };
  },
  methods: {
    del() {
      console.log("del");
      this.changeKey = false;
    },
    cancel() {
      console.log("cancel");
      this.changeKey = false;
    },
  },
};
</script>
