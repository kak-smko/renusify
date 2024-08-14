<template>
  <section>
    <div class="color-white">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-confirm
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-3 br-lg">
        A
        <r-btn readonly size="small">r-confirm</r-btn>
        box is often used if
        you want the user to verify or accept something.
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
      Hard asks the user for a code, and if he enters the code correctly, the
      confirmation box will be activated Otherwise, it will be inactive
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
          description: "A heading text",
        },
        {
          prop: "text",
          type: "String",
          default: "null",
          description: "A content area for displaying text",
        },
        {
          prop: "cancelText",
          type: "String",
          default: "null",
          description: "r-confirm component cancel text",
        },
        {
          prop: "confirmText",
          type: "String",
          default: "null",
          description: "r-confirm component confirm text",
        },
        {
          prop: "modelValue",
          type: "Boolean",
          default: "null",
          description: "modelValue default false",
        },
        {
          prop: "hard",
          type: "Boolean",
          default: "null",
          description:
              "r-confirm component You must enter a code so that the confirmation button appears for you.",
        },
      ],
      events: [
        {
          event: "accept",
          description: "Click the confirm button to delete a function",
        },
        {event: "cancel", description: ""},
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
