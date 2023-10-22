<template>
  <div :class="`${$r.prefix}json-view d-flex v-end flex-wrap`"
       v-for="(value,key) in modelValue"
       :key="key">
    <div class="d-flex v-center me-1">
      <r-btn v-if="!disableDel" icon class="color-error-text" text @click="del(key)">
        <r-icon v-html="$r.icons.delete"></r-icon>
      </r-btn>
      <div v-if="typeof value==='object'">{{ key }}</div>
    </div>
    <div v-if="typeof value==='object'" class="flex-grow-1 w-full ps-10">
      <r-json-input :tile="tile"
                    :model-value="value"
                    @update:model-value="emit(key,$event)"
                    :disableAdd="disableAdd||template!==undefined"
                    :disableDel="disableDel||template!==undefined"
                    disableEditKey
      ></r-json-input>
    </div>
    <div v-else class="mb-1 flex-grow-1">
      <r-text-input v-if="typeof value==='string'"
                    :tile="tile"
                    :label="!is_array?key:''"
                    :model-value="value" @update:model-value="emit(key,$event)"></r-text-input>
      <r-number-input v-else-if="typeof value==='number'"
                      :tile="tile"
                      :label="!is_array?key:''"
                      :model-value="value" @update:model-value="emit(key,$event)"></r-number-input>
      <r-switch-input v-else-if="typeof value==='boolean'"
                      :tile="tile"
                      :label="!is_array?key:''"
                      :model-value="value" @update:model-value="emit(key,$event)"></r-switch-input>

    </div>

  </div>
</template>
<script>
export default {
  name: 'jsonView',
  props: {
    modelValue: Object,
    template: Object,
    disableAdd: Boolean,
    disableDel: Boolean,
    tile: Boolean
  },
  emits: ['update:model-value'],
  data() {
    return {
      time_id: null
    }
  },
  computed: {
    is_array() {
      return Array.isArray(this.modelValue)
    }
  },
  methods: {
    del(key) {
      let o = this.modelValue
      if (this.is_array) {
        o.splice(key, 1)
      } else {
        delete o[key]
      }
      this.$emit('update:model-value', o)
    },
    emit(k, v) {
      let d = this.modelValue
      d[k] = v
      this.$emit('update:model-value', d)
    }
  }
}
</script>
<style lang="scss">
@import "~renusify/style/include";

.#{$prefix}json-view {
  @include rtl() {
    border-right: 1px solid var(--color-border);
  }
  @include ltr() {
    border-left: 1px solid var(--color-border);
  }
}
</style>
