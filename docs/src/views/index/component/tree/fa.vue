<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-tree
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        وقتی تعداد زیادی از داده‌های تو در تو وجود دارد، اجزای
        <r-btn readonly size="small"> r-tree</r-btn>
        بسیار کاربردی هستند.
      </p>
    </div>
    <table-props :items="props"></table-props>
    <table-events :items="events" class="mt-5"></table-events>
  </section>
  <section class="mt-10">
    <r-tree v-model="modelValue" style="height: 600px">
      <template v-slot="{ nodeKey, item }">
        <r-card class="pa-5 title-1 mx-1">{{ nodeKey }}:{{ item.name }}</r-card>
      </template>
    </r-tree>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script='data(){
	return {
		modelValue: {
			"0": {
				"name": "smko",
				"childs": {
					"1": {
						"name": "ali",
						"childs": {
							"3": {
								"name": "taher",
								"childs": {
									"4": {
										"name": "smko",
										"childs": {
											"6": {
												"name": "smko",
												"childs": {
													"7": {
														"name": "smko",
														"childs": {},
													},
													"8": {
														"name": "smko",
														"childs": {},
													}
												},
											}
										},
									},
									"5": {
										"name": "smko",
										"childs": {},
									}
								},
							}
						},
					},
					"2": {
						"name": "mohammad",
						"childs": {},
					}
				},
			}
		},
		link: null,
		searchLink: null,
		gen: "0",
		selected: null,
		rotate: false,
		expand: false,
		childsName: "childs",
		openAll: false,
		headers: {}
	}
},
methods:{
	log(name,e){
		console.log(name,e)
	}
}
'
        template='<r-tree style="height:600px" v-model="modelValue" :link="link" :searchLink="searchLink" :gen="gen" :selected="selected" :rotate="rotate" :childsName="childsName" :openAll="openAll" :headers="headers" @update:model-Value="log(`update:modelValue`,$event)" @select-node="log(`select-node`,$event)">
	<template v-slot="{nodeKey,item}">
        <r-card class="pa-5 title-1 mx-1">{{nodeKey}}:{{item.name}}</r-card>
      </template>
</r-tree>'
    ></r-code-editor>
  </section>
</template>
<script>
export default {
  name: "tree",
  data() {
    return {
      modelValue: {
        0: {
          name: "smko",
          childs: {
            1: {
              name: "ali",
              childs: {
                3: {
                  name: "taher",
                  childs: {
                    4: {
                      name: "smko",
                      childs: {
                        6: {
                          name: "smko",
                          childs: {
                            7: {
                              name: "smko",

                              childs: {},
                            },
                            8: {
                              name: "smko",

                              childs: {},
                            },
                          },
                        },
                      },
                    },
                    5: {
                      name: "smko",

                      childs: {},
                    },
                  },
                },
              },
            },
            2: {
              name: "mohammad",

              childs: {},
            },
          },
        },
      },
      props: [
        {
          prop: "modelValue",
          type: "Object",
          default: "null",
          description: "می تواند modelValue بگیرد ",
        },
        {
          prop: "link",
          type: "String",
          default: "null",
          description: "آدرسی که به Node ها می رود  ",
        },
        {
          prop: "parentNode",
          type: "String",
          default: "null",
          description: "والد Node ",
        },
        {
          prop: "sortBy",
          type: "String",
          default: "gen",
          description: "مرتب سازی ",
        },
        {
          prop: "expand",
          type: "Boolean",
          default: "false",
          description: "توسعه دادن",
        },
        {
          prop: "childsName",
          type: "String",
          default: "childs",
          description: "نام فرزندان",
        },
        {
          prop: "openAll",
          type: "Boolean",
          default: "null",
          description: "بصورت پیشفرض همه را باز می کند",
        },
        {
          prop: "componentName",
          type: "Object",
          default: "null",
          description: "نام کامپوننت",
        },
        {
          prop: "headers",
          type: "Object",
          default: "null",
          description: "هدر درخت",
        },
      ],
      events: [
        {event: "update:modelValue", description: ""},
        {event: "fire", description: ""},
        {event: "select", description: ""},
        {event: "expand", description: ""},
      ],
    };
  },
};
</script>
