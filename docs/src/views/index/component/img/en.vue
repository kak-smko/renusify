<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-img
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        you can add dynamic progressive images with
        <r-btn readonly size="small"> r-img</r-btn>
        provide a better user experience.
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
    "src": "/test.jpg",
    "alt": "title",
    "lazy": "create",
    "width": null,
    "height": null,
    "query": null,
    "autoSize": false,
    "hoverZoom": false,
    "hoverDark": false,
    "hoverTitle": false,
    "titleHs": false,
    "titleHc": false,
    "titleHe": false,
    "titleVs": false,
    "titleVc": false,
    "titleVe": false,
    "isSvg": false,
    "svgCache": 86400,
    "wPH": 1
}
}'
        template='<r-img :src="src" :alt="alt" :lazy="lazy" :width="width" :height="height" :query="query" :auto-Size="autoSize" :hover-Zoom="hoverZoom" :hover-Dark="hoverDark" :hover-Title="hoverTitle" :title-Hs="titleHs" :title-Hc="titleHc" :title-He="titleHe" :title-Vs="titleVs" :title-Vc="titleVc" :title-Ve="titleVe" :is-Svg="isSvg" :svg-Cache="svgCache" :w-P-H="wPH" ></r-img>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Src</span>
    </h1>
    <section class="d-flex h-space-around">
      <div
          class="color-info"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img
            :w-p-h="2 / 1"
            alt="404 page"
            class="pa-4"
            src="/test.jpg"
        ></r-img>
      </div>
      <div
          class="color-success"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img :w-p-h="2" alt="404 page" class="pa-4" src="/test.jpg"></r-img>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
  <div class="d-flex h-space-around">
  <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-info"
      >
        <r-img
          class="pa-4"
          src="/test.jpg"
          alt="404 page"
          :w-p-h="2 / 1"
        ></r-img>
      </div>
      <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-success"
      >
        <r-img
          class="pa-4"
          src="/test.jpg"
          alt="404 page"
          :w-p-h="2"
        ></r-img>
      </div>
</div>
'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Width</span>
    </h1>
    <section class="d-flex h-space-around">
      <div
          class="color-info"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img
            :width="100"
            alt="404 page"
            class="pa-4 color-one"
            src="/test.jpg"
        ></r-img>
      </div>
      <div
          class="color-success"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img
            :w-p-h="2"
            :width="150"
            alt="404 page"
            class="pa-4 color-two"
            src="/test.jpg"
        ></r-img>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
  <div class="d-flex h-space-around">
    <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-info"
      >
        <r-img
          :width="100"
          class="pa-4 color-one"
          src="/test.jpg"
          alt="404 page"
        ></r-img>
      </div>
      <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-success"
      >
        <r-img
          :width="150"
          class="pa-4 color-two"
          src="/test.jpg"
          alt="404 page"
          :w-p-h="2"
        ></r-img>
      </div>
</div>
'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Height</span>
    </h1>
    <section class="d-flex h-space-around">
      <div
          class="color-info"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img
            :height="60"
            :width="100"
            alt="404 page"
            class="pa-4 color-warning"
            src="/test.jpg"
        ></r-img>
      </div>
      <div
          class="color-success"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img
            :height="100"
            :w-p-h="2"
            :width="150"
            alt="404 page"
            class="pa-4 color-grey-base"
            src="/test.jpg"
        ></r-img>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
  <div class="d-flex h-space-around">
         <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-info"
      >
        <r-img
          :height="60"
          :width="100"
          class="pa-4 color-warning"
          src="/test.jpg"
          alt="404 page"
        ></r-img>
      </div>
      <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-success"
      >
        <r-img
          :height="100"
          :width="150"
          class="pa-4 color-grey-base"
          src="/test.jpg"
          alt="404 page"
          :w-p-h="2"
        ></r-img>
      </div>
</div>
'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>AutoSize</span>
    </h1>
    <section class="d-flex h-space-around">
      <div
          class="color-info"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img
            alt="404 page"
            autoSize
            class="color-warning br-circle"
            src="/test.jpg"
        ></r-img>
      </div>
      <div
          class="color-success"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img
            :w-p-h="2"
            alt="404 page"
            autoSize
            class="color-gradient-one br-circle"
            src="/test.jpg"
        ></r-img>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
  <div class="d-flex h-space-around">
         <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-info"
      >
        <r-img
          autoSize
          class="color-warning br-circle"
          src="/test.jpg"
          alt="404 page"
        ></r-img>
      </div>
      <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-success"
      >
        <r-img
          autoSize
          class="color-gradient-one br-circle"
          src="/test.jpg"
          alt="404 page"
          :w-p-h="2"
        ></r-img>
      </div>
</div>
'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>HoverZoom</span>
    </h1>
    <section class="d-flex h-space-around">
      <div
          class="color-info"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img
            :height="100"
            :width="100"
            alt="404 page"
            class="pa-4 color-one"
            hoverZoom
            src="/test.jpg"
        ></r-img>
      </div>
      <div
          class="color-success"
          style="width: 250px; height: 250px; border: 1px #1345c5 solid"
      >
        <r-img
            :height="150"
            :width="150"
            alt="404 page"
            class="pa-4 color-one"
            hoverZoom
            src="/test.jpg"
        ></r-img>
      </div>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
  <div class="d-flex h-space-around">
             <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-info"
      >
        <r-img
          hoverZoom
          :height="100"
          :width="100"
          class="pa-4 color-one"
          src="/test.jpg"
          alt="404 page"
        ></r-img>
      </div>
      <div
        style="width: 250px; height: 250px; border: 1px #1345c5 solid"
        class="color-success"
      >
        <r-img
          hoverZoom
          :height="150"
          :width="150"
          class="pa-4 color-one"
          src="/test.jpg"
          alt="404 page"
        ></r-img>
      </div>
</div>
'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "img",
  data() {
    return {
      items: [
        {
          prop: "src",
          type: "String",
          default: "undefined",
          description: "The source takes an image as input.",
        },
        {
          prop: "alt",
          type: "String",
          default: "undefined",
          description: "Alt ",
        },
        {
          prop: "lazy",
          type: "String",
          default: "create",
          description: "Delaying the images",
        },
        {
          prop: "width",
          type: "String,Number",
          default: "undefined",
          description: "Width Img",
        },
        {
          prop: "height",
          type: "String,Number",
          default: "undefined",
          description: "Height Img",
        },
        {
          prop: "query",
          type: "String",
          default: "null",
          description: "Can you send a query with an image",
        },
        {
          prop: "autoSize",
          type: "Boolean",
          default: "null",
          description: "It automatically adjusts the width and height.",
        },
        {
          prop: "hoverZoom",
          type: "Boolean",
          default: "null",
          description: "Zoom on Hover",
        },
        {
          prop: "hoverDark",
          type: "Boolean",
          default: "null",
          description: "Dark on Hover",
        },
        {
          prop: "hoverTitle",
          type: "Boolean",
          default: "null",
          description: "Title to Hover",
        },
        {
          prop: "titleHs",
          type: "Boolean",
          default: "null",
          description: "text-align -> start",
        },
        {
          prop: "titleHc",
          type: "Boolean",
          default: "null",
          description: "text-align -> center",
        },
        {
          prop: "titleHe",
          type: "Boolean",
          default: "null",
          description: "text-align -> end",
        },
        {
          prop: "titleVs",
          type: "Boolean",
          default: "null",
          description: "top -> 10px",
        },
        {
          prop: "titleVc",
          type: "Boolean",
          default: "null",
          description: "top -> 50%",
        },
        {
          prop: "titleVe",
          type: "Boolean",
          default: "null",
          description: "bottom -> 10px",
        },
        {
          prop: "isSvg",
          type: "Boolean",
          default: "null",
          description: "SVG is used to Img",
        },
        {
          prop: "svgCache",
          type: "Number",
          default: "86400",
          description: "Svg Cache",
        },
        {
          prop: "wPH",
          type: "Number",
          default: "null",
          description: "Determine the aspect ratio of the image",
        },
      ],
    };
  },
};
</script>
