<template>
  <r-input class="mt-5" :model-value="modelValue" hide labelControlClass="label-active"
           :class="`${$r.prefix}color-picker`">
    <div @click="open=true" class="shower" :style="{'background-color':modelValue||'#ffffff'}"></div>
    <r-modal v-model="open" maxWidth="260px" :closebtn="false" closable>
      <picker :color="modelValue" @changeColor="emit"></picker>
      <div class="d-flex h-space-between">
        <r-btn class="color-success flex-grow-1 me-1" @click.prevent="close()">
          <r-icon v-html="$r.icons.check" exact></r-icon>
        </r-btn>
        <r-btn class=" color-error flex-grow-1 ms-1" @click.prevent="clear()" exact>
          <r-icon v-html="$r.icons.delete"></r-icon>
        </r-btn>
      </div>
    </r-modal>
  </r-input>
</template>
<script>
import Picker from "./picker";

export default {
  name: 'r-color-picker',
  components: {Picker},
  props: {
    modelValue: String,
    format: {type: String, default: 'rgba'}
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    clear() {
      this.open = false
      this.$emit('update:model-value', null)
      this.$emit('close', true)
    },
    close() {
      this.open = false
      this.$emit('close', true)
    },
    emit(e) {
      let r = e.hex
      if (this.format === 'rgba') {
        r = e.rgba
      }
      this.$emit('update:model-value', r)
    }
  }

}
</script>
<style lang="scss">
@import "../../../style/include";

.#{$prefix}color-picker {
  .shower {
    width: 100%;
    height: 30px;
    cursor: pointer;
    border: 1px solid black;
  }
}
</style>
