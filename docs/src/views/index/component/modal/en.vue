<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-modal
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The
        <r-btn readonly size="small"> r-modal</r-btn>
        component is actually the component that displays the desired
        information inside a box as a popup without refreshing the page when
        clicking on a button or link.
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
    "modelValue": false,
    "routeHistory": "modal1",
    "bottom": false,
    "noOverlay": false,
    "fullWidth": false,
    "fullHeight": false,
    "maxWidth": null,
    "maxHeight": null,
    "minWidth": true,
    "flat": false,
    "closable": false,
    "closebtn": true,
    "color": null,
    "animate": "scale"
}
},
methods:{
 log(name,e){
  console.log(name,e)
 }
}'
        template='<r-btn @click="modelValue=true">open modal
</r-btn>
<r-modal v-model="modelValue" :routeHistory="routeHistory" :bottom="bottom" :no-Overlay="noOverlay" :full-Width="fullWidth" :full-Height="fullHeight" :max-Width="maxWidth" :max-Height="maxHeight" :min-Width="minWidth" :flat="flat" :closable="closable" :closebtn="closebtn" :color="color" :animate="animate" @update:model-Value="log(`update:modelValue`,$event)" >
  <r-card class="pa-10 text-center">
    <h1>modal title</h1>
    <p class="mt-5">modal body</>
  </r-card>
</r-modal>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6 text-center">
      <r-btn outlined @click="show = true">Click Me</r-btn>
      <r-modal v-model="show">
        <r-container class="background-one">
          <r-row>
            <r-col class="col-12 text-center">
              <h2 class="display-5">login</h2>
              <r-divider class="my-3 color-warning"></r-divider>
            </r-col>
            <r-col class="col-12">
              {{ text || $t("body", "renusify") }}
            </r-col>
          </r-row>
        </r-container>
      </r-modal>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  show: false,
  }
}"
        template='
       <div>  <r-btn @click="show = true" outlined>Click Me</r-btn>
      <r-modal v-model="show">
        <r-container class="background-one">
          <r-row>
            <r-col class="col-12 text-center">
              <h2 class="display-5">login</h2>
              <r-divider class="my-3 color-warning"></r-divider>
            </r-col>
            <r-col class="col-12">
              {{ text || $t("body", "renusify") }}
            </r-col>
          </r-row>
        </r-container>
      </r-modal> </div>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6 text-center">
      <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
        PROP / <span>Bottom</span>
      </h1>
      <r-btn outlined @click="showBot = true">Click Me</r-btn>
      <r-modal v-model="showBot" bottom>
        <r-card>
          <r-container>
            <r-row class="text-center">
              <r-col class="col-10">
                <h1 class="color-info pa-2">login</h1>
                <r-divider class="my-3 color-warning"></r-divider>
                <r-form v-model="valid" class="px-4 pb-4">
                  <r-text-input
                      :label="$t('FirstName', 'renusify')"
                      :rules="['required']"
                  ></r-text-input>
                  <r-text-input
                      :label="$t('lastName', 'renusify')"
                      :rules="['required']"
                  ></r-text-input>
                </r-form>
              </r-col>
            </r-row>
          </r-container>
        </r-card>
      </r-modal>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  showBot: false,
  }
}"
        template='
       <div>
           <r-btn @click="showBot = true" outlined>Click Me</r-btn>
      <r-modal v-model="showBot" bottom>
      <r-card>
        <r-container>
          <r-row class="text-center">
            <r-col class="col-10">
              <r-card>
                <h1 class="color-info pa-2">login</h1>
                <r-divider class="my-3 color-warning"></r-divider>
                <r-form v-model="valid" class="px-4 pb-4">
                  <r-text-input
                    :label="$t(`FirstName`, `renusify`)"
                    :rules="[`required`]"
                  ></r-text-input>
                  <r-text-input
                    :label="$t(`lastName`, `renusify`)"
                    :rules="[`required`]"
                  ></r-text-input>
                </r-form>
              </r-card>
            </r-col>
          </r-row>
        </r-container>
        </r-card>
      </r-modal>
              </div>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6">
      <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
        PROP / <span>NoOverlay</span>
      </h1>
      <r-btn outlined @click="showOver = true">Click</r-btn>
      <r-modal v-model="showOver" noOverlay>
        <r-card class="font-italic px-4 py-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias eius
          id impedit incidunt nisi perspiciatis sunt. Asperiores culpa
          doloribus, dolorum incidunt iure maxime, nulla quibusdam sequi
          voluptate voluptates voluptatibus.
        </r-card>
      </r-modal>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  showOver: false,
  }
}"
        template='
       <div>
            <r-btn @click="showOver = true" outlined>Click</r-btn>
      <r-modal v-model="showOver" noOverlay>
        <r-card class="font-italic px-4 py-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias eius
          id impedit incidunt nisi perspiciatis sunt. Asperiores culpa
          doloribus, dolorum incidunt iure maxime, nulla quibusdam sequi
          voluptate voluptates voluptatibus.
        </r-card>
      </r-modal>
              </div>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6">
      <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
        PROP / <span>FullWidth</span> / <span>FullHeight</span>
      </h1>
      <r-btn outlined @click="show2 = true">Click</r-btn>
      <r-modal v-model="show2" fullHeight fullWidth>
        <r-card class="h-full">
          <r-container class="background-one">
            <r-row>
              <r-col class="col-12 text-center">
                <h2 class="display-5">login</h2>
                <r-divider class="my-3 color-warning"></r-divider>
              </r-col>
              <r-col class="col-12">
                {{ text || $t("body", "renusify") }}
              </r-col>
            </r-row>
          </r-container>
        </r-card>
      </r-modal>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  show: false,
  }
}"
        template='
       <div><r-btn @click="show = true" outlined>Click</r-btn>
      <r-modal v-model="show" fullHeight fullWidth>
      <r-card class="h-full">
        <r-container class="background-one">
          <r-row>
            <r-col class="col-12 text-center">
              <h2 class="display-5">login</h2>
              <r-divider class="my-3 color-warning"></r-divider>
            </r-col>
            <r-col class="col-12">
              {{ text || $t("body", "renusify") }}
            </r-col>
          </r-row>
        </r-container>
        </r-card>
      </r-modal>
              </div>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6">
      <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
        PROP / <span>Bottom</span>
      </h1>
      <r-btn outlined @click="showCard = true">Click Me</r-btn>
      <r-modal v-model="showCard" color="background-one">
        <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
          Select Country
        </h1>
        <section class="d-flex h-space-between pt-3 px-20">
          <r-card class="px-6 py-4">
            <r-list
                :items="[
                { name: 'Egypt' },
                { name: 'Austrian Empire ' },
                { name: 'Japan' },
                { name: 'Mexico' },
                { name: 'Iran' },
                { name: 'France' },
              ]"
                multiple
            >
            </r-list>
          </r-card>
        </section>
      </r-modal>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  showCard: false,
  }
}"
        template='
       <div>
            <r-btn @click="showCard = true" outlined>Click Me</r-btn>
      <r-modal v-model="showCard" color="background-one">
        <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
          Select Country
        </h1>
        <section class="d-flex h-space-between pt-3 px-20">
          <r-card class="px-6 py-4">
            <r-list
              :items="[
                { name: `Egypt` },
                { name: `Austrian Empire ` },
                { name: `Japan` },
                { name: `Mexico` },
                { name: `Iran` },
                { name: `France` },
              ]"
              multiple
            >
            </r-list>
          </r-card>
        </section>
      </r-modal>
              </div>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "modal",
  data() {
    return {
      show: false,
      showBot: false,
      showOver: false,
      showCard: false,
      props: [
        {
          prop: "modelValue",
          type: "Boolean",
          default: "null",
          description: "",
        },
        {
          prop: "bottom",
          type: "Boolean",
          default: "null",
          description: "The model is placed at the bottom of the page ",
        },
        {
          prop: "noOverlay",
          type: "Boolean",
          default: "null",
          description: "It creates a murky situation.",
        },
        {
          prop: "routeHistory",
          type: "String",
          default: "null",
          description: "use route history for show modal",
        },
        {
          prop: "fullWidth",
          type: "Boolean",
          default: "null",
          description: "Full Width",
        },
        {
          prop: "fullHeight",
          type: "Boolean",
          default: "null",
          description: "Full Height",
        },
        {
          prop: "maxWidth",
          type: "String",
          default: "null",
          description: "Max Width",
        },
        {
          prop: "maxHeight",
          type: "String",
          default: "null",
          description: "Max Height",
        },
        {
          prop: "minWidth",
          type: "Boolean",
          default: "true",
          description: "Min Width",
        },
        {
          prop: "flat",
          type: "Boolean",
          default: "null",
          description: "The frame is being made flat.",
        },
        {
          prop: "closable",
          type: "Boolean",
          default: "null",
          description: "Click anywhere on the page to close it.",
        },
        {
          prop: "closebtn",
          type: "Boolean",
          default: "true",
          description: "The close button can be disabled.",
        },
        {
          prop: "color",
          type: "String",
          default: "null",
          description: "Color",
        },
        {
          prop: "animate",
          type: "String",
          default: "scale",
          description: "Open and closed model",
        },
      ],
      events: [{event: "update:modelValue", description: ""}],
    };
  },
};
</script>
