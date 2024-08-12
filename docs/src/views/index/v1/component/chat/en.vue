<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-chat
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        This
        <r-btn readonly size="small"> r-chat</r-btn>
        component allows you to create chat rooms, join them, express your
        emotions using an emoji picker, and scroll up to load previous messages.
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
    "sendByEnter": false,
    "placeholder": "type here",
    "hideBottomBtn": false,
    "hideSend": false,
    "maxLenMsg": 200,
    "participants": {"1":{"name":"smko","img":"/"},"2":{"name":"pegi","img":"/"},},
    "messages": [{
      "type": "text",
      "content": "hi, Pegi",
      "_id": "bllfcfdedfa7egkf",
      "created_at": "2023-08-17T15:55:40.309Z",
      "user_id":"1"
    },{
      "type": "text",
      "content": "hi, smko",
      "_id": "bllfcfdedfa7egkm",
      "created_at": "2023-08-17T15:57:40.309Z",
      "user_id":"2"
    }],
    "myself": {"id":"1","name":"smko","img":"/"},
    "title": null,
    "canFile": false,
    "maxFileSize": 1048576,
    "uploadLink": "/storage/chat",
    "newMsg":{num: 0,first_id: null}
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-chat style="height:300px" :send-By-Enter="sendByEnter" :placeholder="placeholder" :hide-bottom-btn="hideBottomBtn" :hide-send="hideSend" :max-len-msg="maxLenMsg" :new-msg="newMsg" :participants="participants" :messages="messages" :myself="myself" :title="title" :can-file="canFile" :max-file-size="maxFileSize" :upload-link="uploadLink" @see="log(`see`,$event)" @msg-submit="log(`msg-submit`,$event)" ></r-chat>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "chat",
  data() {
    return {
      props: [
        {
          prop: "sendByEnter",
          type: "Boolean",
          default: "null",
          description: "Sending a message by pressing the enter key",
        },
        {
          prop: "placeholder",
          type: "String",
          default: "type here",
          description:
              "The short hint is displayed in the input field before the user enters a value",
        },
        {
          prop: "hideBottomBtn",
          type: "Boolean",
          default: "null",
          description: "hide Bottom Btn",
        },
        {
          prop: "hideSend",
          type: "Boolean",
          default: "null",
          description: "Hide Send",
        },
        {
          prop: "maxLenMsg",
          type: "Number",
          default: "200",
          description: "What is the maximum message length",
        },
        {
          prop: "newMsg",
          type: "Object",
          default: "{num: 0,first_id: null}",
          description: "New Message",
        },
        {
          prop: "participants",
          type: "Object",
          default: "undefined",
          description: "Participants",
        },
        {
          prop: "messages",
          type: "Array",
          default: "undefined",
          description: "Messages",
        },
        {
          prop: "myself",
          type: "Object",
          default: "undefined",
          description: "Your messages",
        },
        {
          prop: "title",
          type: "String",
          default: "null",
          description: "Title",
        },
        {
          prop: "canFile",
          type: "Boolean",
          default: "null",
          description: "File",
        },
        {
          prop: "maxFileSize",
          type: "Number",
          default: "1048576",
          description: "Maximum file size",
        },
        {
          prop: "uploadLink",
          type: "String",
          default: "/storage/chat",
          description: "Upload Link",
        },
      ],
      events: [
        {event: "see", description: ""},
        {event: "msg-submit", description: ""},
      ],
    };
  },
};
</script>
