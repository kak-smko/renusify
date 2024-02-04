<template>
  <r-input class="mt-5" :model-value="modelValue" hide labelControlClass="label-active"
           :class="`${$r.prefix}color-picker`">
    <div :style="{'background-color':modelValue||'#ffffff'}" class="shower" @click.prevent="open=true"></div>
    <r-modal v-model="open" :closebtn="false" class="color-picker-modal" closable maxWidth="260px">
      <picker :color="modelValue" @changeColor="emit"></picker>
      <div class="d-flex h-space-between">
        <r-btn class="color-success flex-grow-1 me-1" outlined @click.prevent="close()">
          <r-icon v-html="$r.icons.check" exact></r-icon>
        </r-btn>
        <r-btn class=" color-error flex-grow-1 ms-1" exact outlined @click.prevent="clear()">
          <r-icon v-html="$r.icons.delete"></r-icon>
        </r-btn>
      </div>
    </r-modal>
  </r-input>
</template>
<script>
import {defineAsyncComponent} from 'vue'

export default {
  name: 'r-color-picker',
  components: {Picker:defineAsyncComponent(()=>import('./picker.vue'))},
  props: {
    modelValue: String,
    format: {type: String, default: 'rgba'}
  },
  emits: ['update:modelValue', 'close'],
  data() {
    return {
      open: false
    }
  },
  methods: {
    clear() {
      this.open = false
      this.$emit('update:modelValue', null)
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
      this.$emit('update:modelValue', r)
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

  .color-picker-modal {
    background-color: var(--color-sheet-container-high);
    color: var(--color-on-sheet);
  }
}
</style>
