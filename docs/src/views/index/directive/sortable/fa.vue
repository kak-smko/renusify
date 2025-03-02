<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        v-sortable
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        این تابع لیستی از المان ها را مرتب می کند.
      </p>
    </div>
    <table-props :items="items"></table-props>
  </section>
  <br/>
  <section>
    <h2 class="font-weight-bold color-white title ps-4 pt-1 pb-1 br-sm">
      یک مثال که می توانید آن را تغییر دهید!
    </h2>
  </section>
  <section>
    <p class="caption">دکمه Run را بزنید</p>
    <r-code-editor
        runnable
        script='data(){
 return {
    "items": [{"name":"one"},{"name":"two"},{"name":"three"},{"name":"four"},{"name":"five"},]
    }
},
methods:{
  end(e){
    console.log(e)
  }
}'
        template='
<div v-sortable={grab:".grab-item",end:end}>
<div v-for="(item,i) in items" :key=i class="pa-3">
<r-btn class="grab-item me-2">grab</r-btn>
{{item.name}}</div>
</div>'
    >
    </r-code-editor>
  </section>
  <br/>

</template>
<script>
export default {
  name: "app",
  data() {
    return {
      items: [
        {
          prop: "items",
          type: "Array or Unset",
          description: "If set return sorted items else return sorted index number",
        },
        {
          prop: "start",
          type: "Function",
          description:
              "If set run in start drag",
        },
        {
          prop: "end",
          type: "Function",
          description:
              "If set run in end drag",
        }, {
          prop: "grab",
          type: "Function",
          description:
              "querySelector path for grab element",
        },
      ],
    };
  },
};
</script>
