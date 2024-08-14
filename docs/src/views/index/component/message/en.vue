<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-message
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The component
        <r-btn readonly size="small"> r-message</r-btn>
        is commonly used for forms.
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
    "items": {
      "name":[{"text":"message one",color:"info"},{"text":"message two",color:"error"},{"text":"message three",color:"success"}],
      "username":[{"text":"message one",color:"info"},{"text":"message two",color:"warning"},{"text":"message three",color:"success"}],
      },
    "type": "error"
}
}'
        template='<r-message :items="items" :type="type" >
	<template v-slot="{item,k}">
		<div class="mb-2 br-md">
			<r-container>
				<r-row>
					<r-col class="col-auto"> {{ k }}:
					</r-col>
					<r-col>
						<div v-for="(msg,k) in item" :key="k" class="br-sm pa-3 my-2" :class="`color-${msg.color}`"> {{ msg.text }}
						</div>
					</r-col>
				</r-row>
			</r-container>
		</div>
	</template>
</r-message>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <section class="pt-6">
      <r-message
          :items="{ name: ['oops, something was not right'] }"
      ></r-message>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<r-message :items="{ name: [`oops, something was not right`]}"></r-message>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Type</span>
    </h1>
    <section class="pt-6">
      <r-card class="pa-4" outlined>
        <r-message :items="{ name: [`oops, something was not right`] }">
        </r-message>
        <r-message
            :items="{ name: [`oops, something was not right`] }"
            type="success"
        >
        </r-message>
        <r-message
            :items="{ name: [`oops, something was not right`] }"
            type="warning"
        >
        </r-message>
        <r-message
            :items="{ name: [`oops, something was not right`] }"
            type="info"
        >
        </r-message>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
        <r-card class="pa-4" outlined>
        <r-message :items="{ name: [`oops, something was not right`]}"></r-message>
        <r-message
          type="success"
          :items="{ name: [`oops, something was not right`]}"
        ></r-message>
        <r-message
          type="warning"
          :items="{ name: [`oops, something was not right`]}"
        ></r-message>
        <r-message
          type="info"
          :items="{ name: [`oops, something was not right`]}"
        ></r-message>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "message",
  data() {
    return {
      items: [
        {
          prop: "items",
          type: "Array,Object",
          default: "undefined",
          description: "Items",
        },
        {
          prop: "type",
          type: "String",
          default: "error",
          description: "The type of should be a string.",
        },
      ],
    };
  },
};
</script>
