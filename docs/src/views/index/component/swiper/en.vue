<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-swiper
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        By using the
        <r-btn readonly size="small"> r-swiper</r-btn>
        component, you can create a professional swiper
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
    "items": [{ name: `One` },
          { name: `Two` },
          { name: `Three` },
          { name: `Four` },
          { name: `Five` },
          { name: `Six` },
          { name: `Seven` },
          { name: `Eight` },
          { name: `Nine` },
          { name: `Ten` }],
    "widthItem": null,
    "dots": true,
    "numShow": 5
}
}'
        template='<r-swiper :items="items" :width-Item="widthItem" :dots="dots" :num-Show="numShow" >
      <template v-slot="{item}">
        <r-card class="d-flex h-center v-center ma-2" style="height:200px">{{item.name}}</r-card>
      </template>
      </r-swiper>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>WidthItem</span>
    </h1>
    <section>
      <r-swiper
          :items="[
          { name: 'One' },
          { name: 'Two' },
          { name: 'Three' },
          { name: 'Four' },
          { name: 'Five' },
          { name: 'Six' },
          { name: 'Seven' },
          { name: 'Eight' },
          { name: 'Nine' },
          { name: 'Ten' },
        ]"
          :widthItem="200"
      >
        <template v-slot="{ item }">
          <r-card
              class="pa-2 pt-20 text-center font-weight-black color-one-text ma-2"
              style="height: 200px"
          >
            {{ item.name }}
          </r-card>
        </template>
      </r-swiper>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                 <r-swiper
        :items="[
          { name: `One` },
          { name: `Two` },
          { name: `Three` },
          { name: `Four` },
          { name: `Five` },
          { name: `Six` },
          { name: `Seven` },
          { name: `Eight` },
          { name: `Nine` },
          { name: `Ten` },
        ]"
        :widthItem="200"
        class="background-two"
      >
        <template v-slot="{ item }">
          <r-card
            class="pa-2 pt-20 text-center font-weight-black color-one-text ma-2"
            style="height: 200px"
          >
            {{ item.name }}
          </r-card>
        </template>
      </r-swiper>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Dots</span>
    </h1>
    <section>
      <r-swiper
          :items="[
          { name: 'One' },
          { name: 'Two' },
          { name: 'Three' },
          { name: 'Four' },
          { name: 'Five' },
          { name: 'Six' },
          { name: 'Seven' },
          { name: 'Eight' },
          { name: 'Nine' },
          { name: 'Ten' },
        ]"
          :widthItem="200"
          dots
      >
        <template v-slot="{ item }">
          <r-card
              class="pa-2 pt-20 text-center font-weight-black color-one-text ma-2"
              style="height: 200px"
          >
            {{ item.name }}
          </r-card>
        </template>
      </r-swiper>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                  <r-swiper
        dots
        :items="[
          { name: `One` },
          { name: `Two` },
          { name: `Three` },
          { name: `Four` },
          { name: `Five` },
          { name: `Six` },
          { name: `Seven` },
          { name: `Eight` },
          { name: `Nine` },
          { name: `Ten` },
        ]"
        :widthItem="200"
        class="color-one"
      >
        <template v-slot="{ item }">
          <r-card
            class="pa-2 pt-20 text-center font-weight-black color-one-text ma-2"
            style="height: 200px"
          >
            {{ item.name }}
          </r-card>
        </template>
      </r-swiper>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>NumShow</span>
    </h1>
    <section>
      <r-swiper
          :items="[
          { name: 'One' },
          { name: 'Two' },
          { name: 'Three' },
          { name: 'Four' },
          { name: 'Five' },
          { name: 'Six' },
          { name: 'Seven' },
          { name: 'Eight' },
          { name: 'Nine' },
          { name: 'Ten' },
        ]"
          :numShow="5"
          class="color-warning pt-3"
          dots
      >
        <template v-slot="{ item }">
          <div
              class="background-one pt-20 text-center font-weight-black color-one-text mx-2"
              style="height: 200px"
          >
            {{ item.name }}
          </div>
        </template>
      </r-swiper>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                    <r-swiper
        dots
        :items="[
          { name: `One` },
          { name: `Two` },
          { name: `Three` },
          { name: `Four` },
          { name: `Five` },
          { name: `Six` },
          { name: `Seven` },
          { name: `Eight` },
          { name: `Nine` },
          { name: `Ten` },
        ]"
        :numShow="5"
        class="color-warning pt-3"
      >
        <template v-slot="{ item }">
          <div
            class="background-one pt-20 text-center font-weight-black color-one-text mx-2"
            style="height: 200px"
          >
            {{ item.name }}
          </div>
        </template>
      </r-swiper>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "swiper",
  data() {
    return {
      items: [
        {
          prop: "items",
          type: "Array",
          default: "null",
          description: "ّItems",
        },
        {
          prop: "widthItem",
          type: "Number",
          default: "null",
          description: "Setting the width based on items",
        },
        {
          prop: "dots",
          type: "Boolean",
          default: "null",
          description: "Add Dots",
        },
        {
          prop: "numShow",
          type: "Number,Object",
          default: "null",
          description: "Determining the width by measuring",
        },
      ],
    };
  },
};
</script>
