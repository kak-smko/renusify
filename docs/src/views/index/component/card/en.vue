<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-card
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-chart</r-btn>
        component is a versatile and enhanced that provides a simple interface
        for headings, text, images, icons, and more.
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
    "flat": false,
    "hover": false,
    "tile": false,
    "outlined": false,
    "isRipple": true,
    "draggable": false
}
}'
        template='<r-card :flat="flat" :hover="hover" :tile="tile" :outlined="outlined" :is-ripple="isRipple" :draggable="draggable" ></r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pa-4">
      <r-card class="pa-2 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
        ratione debitis quis est labore voluptatibus! Eaque cupiditate minima,
        at placeat totam, magni doloremque veniam neque porro libero rerum unde
        voluptatem!
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='     <r-card class="pa-2 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
        ratione debitis quis est labore voluptatibus! Eaque cupiditate minima,
        at placeat totam, magni doloremque veniam neque porro libero rerum unde
        voluptatem!
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Flat</span>
    </h1>
    <section class="d-flex h-space-between pt-12 ps-20 pe-20 text-center">
      <r-card class="color-black pa-3 ma-1" flat>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </r-card>
      <r-card class="pa-3 ma-1" flat>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </r-card>
      <r-card class="color-one pa-3 ma-1" flat>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='      <r-card flat class="color-one pa-3 ma-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Hover</span>
    </h1>
    <section
        class="d-flex h-space-between pt-12 ps-20 pe-20 text-center color-gradient-3"
    >
      <r-card class="color-black pa-3 ma-1" hover>
        <h1 class="color-one-text font-weight-bold subtitle-1 pb-2">
          Learing Renusify
        </h1>
        <p class="subtitle-2">learning basic and create project</p>
        <r-btn class="mt-6 px-2 color-white color-one-text"> start</r-btn>
      </r-card>
      <r-card class="pa-3 ma-1" hover>
        <h1 class="color-one-text font-weight-bold subtitle-1 pb-2">
          Learning Renusify
        </h1>
        <p class="subtitle-2">learning basic and create project</p>
        <r-btn class="mt-6 px-2 color-black color-one-text"> start</r-btn>
      </r-card>
      <r-card class="color-one pa-3 ma-1" hover>
        <h1 class="font-weight-bold subtitle-1 pb-2 color-white-text">
          Learning Renusify
        </h1>
        <p class="subtitle-2 color-white-text">
          learning basic and create project
        </p>
        <r-btn class="mt-6 px-2 color-white color-one-text"> start</r-btn>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='        <r-card hover class="color-one pa-3 ma-1">
        <h1 class="font-weight-bold subtitle-1 pb-2 color-white-text">
          Learning Renusify
        </h1>
        <p class="subtitle-2 color-white-text">
          learning basic and create project
        </p>
        <r-btn class="mt-6 px-2 color-white color-one-text"> start </r-btn>
      </r-card>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Outlined</span>
    </h1>
    <section
        class="d-flex h-space-between pt-12 ps-20 pe-20 text-start color-gradient-3"
    >
      <r-card class="color-black-text color-one pa-3 ma-1" outlined>
        <span class="color-white-text">OUTLINED</span>
        <h1 class="color-white-text font-weight-bold subtitle-1 py-2">
          Headline
        </h1>
        <p class="subtitle-2 color-white-text">
          learning basic and create project
        </p>
      </r-card>
      <r-card class="color-one-text pa-3 ma-1" outlined>
        <span class="color-one-text">OUTLINED</span>
        <h1 class="color-one-text font-weight-bold subtitle-1 py-2">
          Headline
        </h1>
        <p class="subtitle-2 color-one-text">
          learning basic and create project
        </p>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='         <r-card outlined class="color-one-text pa-3 ma-1">
        <span class="color-one-text">OUTLINED</span>
        <h1 class="color-one-text font-weight-bold subtitle-1 py-2">
          Headline
        </h1>
        <p class="subtitle-2 color-one-text">
          learning basic and create project
        </p>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Title</span>
    </h1>
    <section
        class="d-flex h-space-between pt-12 ps-20 pe-20 text-start color-gradient-3"
    >
      <r-card class="color-black-text pa-3 ma-1" outlined tile>
        <span class="color-black-text">TITLE AND OUTLINED</span>
        <h1 class="color-black-text font-weight-bold subtitle-1 py-2">
          Headline
        </h1>
        <p class="subtitle-2 color-black-text">
          learning basic and create project
        </p>
      </r-card>
      <r-card class="color-one-text pa-3 ma-1" outlined>
        <span class="color-one-text">ONlY OUTLINED</span>
        <h1 class="color-one-text font-weight-bold subtitle-1 py-2">
          Headline
        </h1>
        <p class="subtitle-2 color-one-text">
          learning basic and create project
        </p>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='          <r-card tile outlined class="color-black-text pa-3 ma-1">
        <span class="color-black-text">TITLE AND OUTLINED</span>
        <h1 class="color-black-text font-weight-bold subtitle-1 py-2">
          Headline
        </h1>
        <p class="subtitle-2 color-black-text">
          learning basic and create project
        </p>
      </r-card>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "card",
  data() {
    return {
      items: [
        {
          prop: "flat",
          type: "Boolean",
          default: "null",
          description: "It flattens the card",
        },
        {
          prop: "hover",
          type: "Boolean",
          default: "null",
          description: "It gives the card a hover",
        },
        {
          prop: "tile",
          type: "Boolean",
          default: "null",
          description: "Card without corners",
        },
        {
          prop: "outlined",
          type: "Boolean",
          default: "null",
          description: "Out Lined",
        },
        {
          prop: "isRipple",
          type: "Boolean",
          default: "true",
          description: " Is Ripple",
        },
        {
          prop: "draggable",
          type: "Boolean",
          default: "false",
          description: "It is draggable",
        },
      ],
    };
  },
};
</script>
