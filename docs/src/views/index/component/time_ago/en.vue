<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-time-ago
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-time-ago</r-btn>
        is useful for stylistically displaying chronological information
      </p>
    </div>

    <table-props :items="items"></table-props>
  </section>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "time": new Date(),
    "noTrans": true,
    "liveTime": 2000,
    "live": true
}
}'
        template='<r-time-ago :time="time" :no-Trans="noTrans" :live-Time="liveTime" :live="live" ></r-time-ago>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "time": new Date().getTime()-60*60*24*1000,
    "noTrans": true,
    "liveTime": 2000,
    "live": false
}
}'
        template='<r-time-ago :time="time" :no-Trans="noTrans" :live-Time="liveTime" :live="live" ></r-time-ago>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "time": new Date().getTime()+10*60*60*24*1000,
    "noTrans": true,
    "liveTime": 2000,
    "live": false
}
}'
        template='<r-time-ago :time="time" :no-Trans="noTrans" :live-Time="liveTime" :live="live" ></r-time-ago>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "time_ago",
  data() {
    return {
      items: [
        {
          prop: "time",
          type: "undefined",
          default: "undefined",
          description: "Time",
        },
        {
          prop: "noTrans",
          type: "Boolean",
          default: "false",
          description: "It does not translate",
        },
        {
          prop: "liveTime",
          type: "Number",
          default: "5000",
          description: "You see the passage of seconds in real time",
        },
        {prop: "live", type: "Boolean", default: "null", description: "Live"},
      ],
    };
  },
};
</script>
