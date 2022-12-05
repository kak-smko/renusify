<template>
  <r-row class="h-center">
    <r-col class="col-12 overflow-auto" >
      <div :class="`color-${type}`"
           class="mb-2 br-md"
           :key="i"
           v-for="(item,i) in items">
        <r-container>
          <r-row>
            <r-col class="col-auto">
               {{$t(i)}}:
            </r-col>
            <r-col>
              <div v-for="(er,k) in item" :key="k">
                {{$t(er)}}
              </div>
            </r-col>
          </r-row>
        </r-container>
    </div>
    </r-col>
  </r-row>
</template>

<script>
export default {
  name: 'message',
  props: {
    items: {
      required: true,
      type: [Array, Object]
    },
    type: {
      default: 'error',
      type: String
    }
  }
}
</script>
