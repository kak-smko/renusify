<template>
  <div class="h-center">
    <template v-for="(item,i) in items"
              :key="i">
      <slot :item="item" :k="i">
        <div :class="`color-${type}`"
             class="mb-2 br-md">
          <r-container>
            <r-row>
              <r-col class="col-auto">
                {{ $t(i) }}:
              </r-col>
              <r-col>
                <div v-for="(er,k) in item" :key="k">
                  {{ $t(er) }}
                </div>
              </r-col>
            </r-row>
          </r-container>
        </div>
      </slot>
    </template>
  </div>
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
