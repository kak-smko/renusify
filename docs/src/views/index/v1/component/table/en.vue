<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-table
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        The simpler of the table components is
        <r-btn readonly size="small"> r-table</r-btn>
        , a basic wrapper component
        for the HTML Table element.
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
    "transition": "table-row",
    "keyItem": null,
    "thin": false,
    "responsive": false,
    "translate": false,
    "editable": true,
    "stripped": true,
    "borderd": false,
    "sortable": {
      id:true,
      name:true,
      age:false,
      skill:"vuejs"
    },
    "fixedHeader": false,
    "fixedFirstColumn": false,
    "headers":[
          { text: `id`, value: `id` },
          { text: `name`, value: `name` },
          { text: `lastname`, value: `lastname` },
          { text: `age`, value: `age` },
          { text: `skill`, value: `skill` },
        ],
    "items":[
          { id: 1, name: `Smko`, lastname: `Bzd`, age: 29 ,skill:{vuejs:20,python:25}},
          { id: 2, name: `Noah`, lastname: `Ava`, age: 23 ,skill:{vuejs:18,python:32}},
          { id: 3, name: `James`, lastname: `Barr`, age: 18 ,skill:{vuejs:45,python:25}},
          { id: 4, name: `William`, lastname: `Emma`, age: 30 ,skill:{vuejs:30,python:50}},
          { id: 5, name: `Liam`, lastname: `Emma`, age: 53 ,skill:{vuejs:15,python:20}},
        ]
}
}'
        template='<r-table :transition="transition" :key-Item="keyItem" :thin="thin" :responsive="responsive" :translate="translate" :editable="editable" :stripped="stripped" :borderd="borderd" :sortable="sortable" :fixed-Header="fixedHeader" :fixed-First-Column="fixedFirstColumn" :headers="headers" :items="items" ></r-table>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Headers</span>
    </h1>
    <section>
      <r-table
          :headers="[
          { text: 'id', value: 'id' },
          { text: 'name', value: 'name' },
          { text: 'lastname', value: 'lastname' },
          { text: 'age', value: 'age' },
        ]"
          class="pt-3"
      >
      </r-table>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                 <r-table
        class="pt-3"
        :headers="[
          { text: `id`, value: `id` },
          { text: `name`, value: `name` },
          { text: `lastname`, value: `lastname` },
          { text: `age`, value: `age` },
        ]"

      >
      </r-table>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Items</span>
    </h1>
    <section>
      <r-table
          :headers="[
          { text: 'id', value: 'id' },
          { text: 'name', value: 'name' },
          { text: 'lastname', value: 'lastname' },
          { text: 'age', value: 'age' },
        ]"
          :items="[
          { id: 1, name: 'Smko', lastname: 'Bzd', age: 29 },
          { id: 2, name: 'Noah', lastname: 'Ava', age: 23 },
          { id: 3, name: 'James', lastname: 'Barr', age: 18 },
          { id: 4, name: 'William', lastname: 'Emma', age: 30 },
          { id: 5, name: 'Liam', lastname: 'Emma', age: 53 },
        ]"
          class="pt-3"
      >
      </r-table>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                 <r-table
        class="pt-3"
        :headers="[
          { text: `id`, value: `id` },
          { text: `name`, value: `name` },
          { text: `lastname`, value: `lastname` },
          { text: `age`, value: `age` },
        ]"
        :items="[
          { id: 1, name: `Smko`, lastname: `Bzd`, age: 29 },
          { id: 2, name: `Noah`, lastname: `Ava`, age: 23 },
          { id: 3, name: `James`, lastname: `Barr`, age: 18 },
          { id: 4, name: `William`, lastname: `Emma`, age: 30 },
          { id: 5, name: `Liam`, lastname: `Emma`, age: 53 },
        ]"
      >
      </r-table>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Thin</span>
    </h1>
    <section>
      <r-table
          :headers="[
          { text: 'id', value: 'id' },
          { text: 'name', value: 'name' },
          { text: 'lastname', value: 'lastname' },
          { text: 'age', value: 'age' },
        ]"
          :items="[
          { id: 1, name: 'Smko', lastname: 'Bzd', age: 29 },
          { id: 2, name: 'Noah', lastname: 'Ava', age: 23 },
          { id: 3, name: 'James', lastname: 'Barr', age: 18 },
          { id: 4, name: 'William', lastname: 'Emma', age: 30 },
          { id: 5, name: 'Liam', lastname: 'Emma', age: 53 },
        ]"
          class="pt-3"
          thin
      >
      </r-table>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                    <r-table
        thin
        class="pt-3"
        :headers="[
          { text: `id`, value: `id` },
          { text: `name`, value: `name` },
          { text: `lastname`, value: `lastname` },
          { text: `age`, value: `age` },
        ]"
        :items="[
          { id: 1, name: `Smko`, lastname: `Bzd`, age: 29 },
          { id: 2, name: `Noah`, lastname: `Ava`, age: 23 },
          { id: 3, name: `James`, lastname: `Barr`, age: 18 },
          { id: 4, name: `William`, lastname: `Emma`, age: 30 },
          { id: 5, name: `Liam`, lastname: `Emma`, age: 53 },
        ]"
      >
      </r-table>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Responsive</span>
    </h1>
    <section>
      <r-table
          :headers="[
          { text: 'id', value: 'id' },
          { text: 'name', value: 'name' },
          { text: 'lastname', value: 'lastname' },
          { text: 'age', value: 'age' },
          { text: 'col1 test', value: 'col1' },
          { text: 'col2 test', value: 'col2' },
          { text: 'col3 test', value: 'col3' },
          { text: 'col4 test', value: 'col4' },
          { text: 'col5 test', value: 'col5' },
          { text: 'col6 test', value: 'col6' },
          { text: 'col7 test', value: 'col7' },
          { text: 'col8 test', value: 'col8' },
        ]"
          :items="[
          {
            id: 1,
            name: 'Smko',
            lastname: 'Bzd',
            age: 29,
            col1: 'col test',
            col2: 'col test',
            col3: 'col test',
            col4: 'col test',
            col5: 'col test',
            col6: 'col test',
            col7: 'col test',
            col8: 'col test',
          },
          {
            id: 2,
            name: 'Noah',
            lastname: 'Ava',
            age: 23,
            col1: 'col test',
            col2: 'col test',
            col3: 'col test',
            col4: 'col test',
            col5: 'col test',
            col6: 'col test',
            col7: 'col test',
            col8: 'col test',
          },
          {
            id: 3,
            name: 'James',
            lastname: 'Barr',
            age: 18,
            col1: 'col test',
            col2: 'col test',
            col3: 'col test',
            col4: 'col test',
            col5: 'col test',
            col6: 'col test',
            col7: 'col test',
            col8: 'col test',
          },
          {
            id: 4,
            name: 'William',
            lastname: 'Emma',
            age: 30,
            col1: 'col test',
            col2: 'col test',
            col3: 'col test',
            col4: 'col test',
            col5: 'col test',
            col6: 'col test',
            col7: 'col test',
            col8: 'col test',
          },
          {
            id: 5,
            name: 'Liam',
            lastname: 'Emma',
            age: 53,
            col1: 'col test',
            col2: 'col test',
            col3: 'col test',
            col4: 'col test',
            col5: 'col test',
            col6: 'col test',
            col7: 'col test',
            col8: 'col test',
          },
        ]"
          class="pt-3"
          responsive
      >
      </r-table>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<r-table
        responsive
        class="pt-3"
        :headers="[
          { text: `id`, value: `id` },
          { text: `name`, value: `name` },
          { text: `lastname`, value: `lastname` },
          { text: `age`, value: `age` },
          { text: `col1 test`, value: `col1` },
          { text: `col2 test`, value: `col2` },
          { text: `col3 test`, value: `col3` },
          { text: `col4 test`, value: `col4` },
          { text: `col5 test`, value: `col5` },
          { text: `col6 test`, value: `col6` },
          { text: `col7 test`, value: `col7` },
          { text: `col8 test`, value: `col8` },
        ]"
        :items="[
          {
            id: 1,
            name: `Smko`,
            lastname: `Bzd`,
            age: 29,
            col1: `col test`,
            col2: `col test`,
            col3: `col test`,
            col4: `col test`,
            col5: `col test`,
            col6: `col test`,
            col7: `col test`,
            col8: `col test`,
          },
          {
            id: 2,
            name: `Noah`,
            lastname: `Ava`,
            age: 23,
            col1: `col test`,
            col2: `col test`,
            col3: `col test`,
            col4: `col test`,
            col5: `col test`,
            col6: `col test`,
            col7: `col test`,
            col8: `col test`,
          },
          {
            id: 3,
            name: `James`,
            lastname: `Barr`,
            age: 18,
            col1: `col test`,
            col2: `col test`,
            col3: `col test`,
            col4: `col test`,
            col5: `col test`,
            col6: `col test`,
            col7: `col test`,
            col8: `col test`,
          },
          {
            id: 4,
            name: `William`,
            lastname: `Emma`,
            age: 30,
            col1: `col test`,
            col2: `col test`,
            col3: `col test`,
            col4: `col test`,
            col5: `col test`,
            col6: `col test`,
            col7: `col test`,
            col8: `col test`,
          },
          {
            id: 5,
            name: `Liam`,
            lastname: `Emma`,
            age: 53,
            col1: `col test`,
            col2: `col test`,
            col3: `col test`,
            col4: `col test`,
            col5: `col test`,
            col6: `col test`,
            col7: `col test`,
            col8: `col test`,
          },
        ]"
      >
      </r-table>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Editable</span>
    </h1>
    <section>
      <r-table
          :headers="[
          { text: 'id', value: 'id' },
          { text: 'name', value: 'name' },
          { text: 'lastname', value: 'lastname' },
          { text: 'age', value: 'age' },
        ]"
          :items="[
          { id: 1, name: 'Smko', lastname: 'Bzd', age: 29 },
          { id: 2, name: 'Noah', lastname: 'Ava', age: 23 },
          { id: 3, name: 'James', lastname: 'Barr', age: 18 },
          { id: 4, name: 'William', lastname: 'Emma', age: 30 },
          { id: 5, name: 'Liam', lastname: 'Emma', age: 53 },
        ]"
          class="pt-3"
          editable
      >
      </r-table>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                     <r-table
        editable
        class="pt-3"
        :headers="[
          { text: `id`, value: `id` },
          { text: `name`, value: `name` },
          { text: `lastname`, value: `lastname` },
          { text: `age`, value: `age` },
        ]"
        :items="[
          { id: 1, name: `Smko`, lastname: `Bzd`, age: 29 },
          { id: 2, name: `Noah`, lastname: `Ava`, age: 23 },
          { id: 3, name: `James`, lastname: `Barr`, age: 18 },
          { id: 4, name: `William`, lastname: `Emma`, age: 30 },
          { id: 5, name: `Liam`, lastname: `Emma`, age: 53 },
        ]"
      >
      </r-table>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Stripped</span>
    </h1>
    <section>
      <r-table
          :headers="[
          { text: 'id', value: 'id' },
          { text: 'name', value: 'name' },
          { text: 'lastname', value: 'lastname' },
          { text: 'age', value: 'age' },
        ]"
          :items="[
          { id: 1, name: 'Smko', lastname: 'Bzd', age: 29 },
          { id: 2, name: 'Noah', lastname: 'Ava', age: 23 },
          { id: 3, name: 'James', lastname: 'Barr', age: 18 },
          { id: 4, name: 'William', lastname: 'Emma', age: 30 },
          { id: 5, name: 'Liam', lastname: 'Emma', age: 53 },
        ]"
          class="pt-3"
          stripped
      >
      </r-table>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='
                     <r-table stripped
        class="pt-3"
        :headers="[
          { text: `id`, value: `id` },
          { text: `name`, value: `name` },
          { text: `lastname`, value: `lastname` },
          { text: `age`, value: `age` },
        ]"
        :items="[
          { id: 1, name: `Smko`, lastname: `Bzd`, age: 29 },
          { id: 2, name: `Noah`, lastname: `Ava`, age: 23 },
          { id: 3, name: `James`, lastname: `Barr`, age: 18 },
          { id: 4, name: `William`, lastname: `Emma`, age: 30 },
          { id: 5, name: `Liam`, lastname: `Emma`, age: 53 },
        ]"
      >
      </r-table>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Borderd</span>
    </h1>
    <section>
      <r-table
          :headers="[
          { text: 'id', value: 'id' },
          { text: 'name', value: 'name' },
          { text: 'lastname', value: 'lastname' },
          { text: 'age', value: 'age' },
        ]"
          :items="[
          { id: 1, name: 'Smko', lastname: 'Bzd', age: 29 },
          { id: 2, name: 'Noah', lastname: 'Ava', age: 23 },
          { id: 3, name: 'James', lastname: 'Barr', age: 18 },
          { id: 4, name: 'William', lastname: 'Emma', age: 30 },
          { id: 5, name: 'Liam', lastname: 'Emma', age: 53 },
        ]"
          borderd
          class="pt-3"
          stripped
      >
      </r-table>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='<r-table stripped
                      borderd
        class="pt-3"
        :headers="[
          { text: `id`, value: `id` },
          { text: `name`, value: `name` },
          { text: `lastname`, value: `lastname` },
          { text: `age`, value: `age` },
        ]"
        :items="[
          { id: 1, name: `Smko`, lastname: `Bzd`, age: 29 },
          { id: 2, name: `Noah`, lastname: `Ava`, age: 23 },
          { id: 3, name: `James`, lastname: `Barr`, age: 18 },
          { id: 4, name: `William`, lastname: `Emma`, age: 30 },
          { id: 5, name: `Liam`, lastname: `Emma`, age: 53 },
        ]"
      >
      </r-table>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Sortable</span>
    </h1>
    <r-btn class="mb-6 ms-6" disabled outlined>Click for Sort</r-btn>
    <section>
      <r-table
          :headers="[
          { text: 'id', value: 'id' },
          { text: 'name', value: 'name' },
          { text: 'lastname', value: 'lastname' },
          { text: 'age', value: 'age' },
        ]"
          :items="[
          { id: 1, name: 'Smko', lastname: 'Bzd', age: 29 },
          { id: 2, name: 'Noah', lastname: 'Ava', age: 23 },
          { id: 3, name: 'James', lastname: 'Barr', age: 18 },
          { id: 4, name: 'William', lastname: 'Emma', age: 30 },
          { id: 5, name: 'Liam', lastname: 'Emma', age: 53 },
        ]"
          :sortable="{ id: true, name: true, age: true }"
          borderd
          class="pt-3"
      >
      </r-table>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        script="data(){
 return {
  }
}"
        template='<r-table :sortable="{id:true,name:true,age:true}" borderd
        class="pt-3"
        :headers="[
          { text: `id`, value: `id` },
          { text: `name`, value: `name` },
          { text: `lastname`, value: `lastname` },
          { text: `age`, value: `age` },
        ]"
        :items="[
          { id: 1, name: `Smko`, lastname: `Bzd`, age: 29 },
          { id: 2, name: `Noah`, lastname: `Ava`, age: 23 },
          { id: 3, name: `James`, lastname: `Barr`, age: 18 },
          { id: 4, name: `William`, lastname: `Emma`, age: 30 },
          { id: 5, name: `Liam`, lastname: `Emma`, age: 53 },
        ]"
      >
      </r-table>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "table",
  data() {
    return {
      items: [
        {
          prop: "transition",
          type: "String",
          default: "table-row",
          description: "The default table transition is table-row",
        },
        {
          prop: "keyItem",
          type: "String,Function",
          default: "null",
          description: "You should set the keyItem for it",
        },
        {
          prop: "thin",
          type: "Boolean",
          default: "null",
          description: "It thins  the table",
        },
        {
          prop: "responsive",
          type: "Boolean",
          default: "null",
          description: "Responsive",
        },
        {
          prop: "translate",
          type: "Boolean",
          default: "null",
          description: "Translate",
        },
        {
          prop: "editable",
          type: "Boolean",
          default: "null",
          description: "Activating or deactivating items",
        },
        {
          prop: "stripped",
          type: "Boolean",
          default: "null",
          description: "It shades one of the cells",
        },
        {
          prop: "borderd",
          type: "Boolean",
          default: "null",
          description: "Borderd",
        },
        {
          prop: "sortable",
          type: "Object",
          default: "null",
          description: "It allows sorting",
        },
        {
          prop: "fixedHeader",
          type: "Boolean",
          default: "null",
          description: "Fixes the Header",
        },
        {
          prop: "fixedFirstColumn",
          type: "Boolean",
          default: "null",
          description: "Fixes the first column",
        },
        {
          prop: "headers",
          type: "Array",
          default: "null",
          description: "It has a header with text and value.",
        },
        {
          prop: "items",
          type: "Array",
          default: "null",
          description: "Items are assigned a value based on the header",
        },
      ],
    };
  },
};
</script>
