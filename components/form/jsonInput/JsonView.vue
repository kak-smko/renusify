<template>
  <div :class="`${$r.prefix}json-view d-flex v-end flex-wrap`"
       v-for="(value,key) in modelValue"
       :key="key">
    <div class="d-flex v-center me-1">
      <r-btn v-if="!disableDel" class="color-error-text" icon text @click.prevent="del(key)">
        <r-icon v-html="$r.icons.delete"></r-icon>
      </r-btn>
      <div v-if="typeof value==='object'">{{ t(key) }}</div>
    </div>
    <div v-if="typeof value==='object'" class="flex-grow-1 w-full ps-10">
      <r-json-input :tile="tile"
                    :model-value="value"
                    @update:model-value="emit(key,$event)"
                    :disableAdd="disableAdd||template!==undefined"
                    :disableDel="disableDel||template!==undefined"
                    :translate="translate"
                    disableEditKey
      ></r-json-input>
    </div>
    <div v-else class="mb-1 flex-grow-1">
      <r-text-input v-if="typeof value==='string'"
                    :tile="tile"
                    :label="!is_array?t(key):''"
                    :model-value="value" @update:model-value="emit(key,$event)"></r-text-input>
      <r-number-input v-else-if="typeof value==='number'"
                      :tile="tile"
                      :label="!is_array?t(key):''"
                      :model-value="value" @update:model-value="emit(key,$event)"></r-number-input>
      <r-switch-input v-else-if="typeof value==='boolean'"
                      :tile="tile"
                      :label="!is_array?t(key):''"
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
    tile: Boolean,
    translate: Boolean
  },
  emits: ['update:modelValue'],
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
    t(key) {
      if (this.translate) {
        return this.$t(key)
      }
      return key
    },
    del(key) {
      let o = this.modelValue
      if (this.is_array) {
        o.splice(key, 1)
      } else {
        delete o[key]
      }
      this.$emit('update:modelValue', o)
    },
    emit(k, v) {
      let d = this.modelValue
      d[k] = v
      this.$emit('update:modelValue', d)
    }
  }
}
</script>
<style lang="scss">
@use "../../../style/variables/base";
@use "../../../style/mixins";

.#{base.$prefix}json-view {
  @include mixins.rtl() {
    border-right: 1px solid var(--color-sheet-low);
  }
  @include mixins.ltr() {
    border-left: 1px solid var(--color-sheet-low);
  }
}
</style>
