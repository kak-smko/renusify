<template>
  <r-input :active="active"
           v-model="lazyValue"
           @click.stop="handleClick()"
           @update:model-value="emit"
           :class="[`${$r.prefix}text-area`,{'no-resize':noResize}]"
  >
    <template v-slot="{uid}">
      <textarea @focusin="active=true"
                @focusout="active=false"
                @input="$emit('update:modelValue', lazyValue)"
                ref="input"
                :rows="rows"
                autocomplete="no"
                v-model="lazyValue"
                :id="uid"
      ></textarea>
    </template>
  </r-input>
</template>
<script>

export default {
  name: 'r-text-area',
  props: {
    noResize: Boolean,
    modelValue: [String, Number],
    rows: {
      type: String,
      default: '7'
    }
  },
emits:['update:modelValue'],
  data() {
    return {
      lazyValue: this.modelValue,
      active: false
    }
  },
  watch: {
    modelValue() {
      this.lazyValue = this.modelValue
    }
  },
  methods: {
    handleClick() {
      this.$refs.input.focus()
    },
    emit() {
      this.$emit('update:modelValue', this.lazyValue)
    }
  }
}

</script>
<style lang="scss">
@use "../../../style/variables/base";

.#{base.$prefix}text-area {
  .no-resize {
    resize: none;
  }
}
</style>