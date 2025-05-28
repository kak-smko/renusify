<template>
  <div :class="`${$r.prefix}add-btn`">
    <r-input v-bind="$attrs"
             :modelValue="modelValue"
             :active="active"
             inputControlClass="v-center"
    >
      <r-btn @click.prevent.stop="minus" class="minus" icon :text="btnText">
        <r-icon v-html="$r.icons.minus"></r-icon>
      </r-btn>
      <input @input="emit"
             class="text-center ltr"
             @focusin="active=true"
             @focusout="active=false"
             ref="input"
             :step="step"
             type="number"
             autocomplete="no"
             v-model="number"
      />
      <r-btn @click.prevent.stop="plus" class="plus" icon :text="btnText">
        <r-icon v-html="$r.icons.plus"></r-icon>
      </r-btn>
    </r-input>
  </div>

</template>

<script>
export default {
  name: 'r-number',
  inheritAttrs: false,
  props: {
    modelValue: Number,
    step: {type: Number, default: 1},
    split: {type: Number, default: 0},
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    btnText: Boolean
  },
  emits: ['update:modelValue'],
  data() {
    return {
      number: this.modelValue,
      active: false
    }
  },
  watch: {
    'modelValue': function (newVal) {
      if (newVal !== undefined) {
        this.number = newVal
      }
    }
  },
  methods: {
    emit() {
      if (this.number === '' || this.number === null) {
        this.number = undefined
        this.$emit('update:modelValue', this.number)
        return
      }
      let d = this.number
      if (this.max !== undefined && d > this.max) {
        d = this.max
      }
      if (this.min !== undefined && d < this.min) {
        this.$emit('update:modelValue', undefined)
        return
      }

      this.number = d
      this.$emit('update:modelValue', this.number)
    },
    plus() {
      let n = this.modelValue || 0
      this.number = n + this.step
      this.emit()
    },
    minus() {
      let n = this.modelValue || 0
      this.number = n - this.step
      this.emit()
    }
  }
}
</script>

<style lang="scss">
@use "sass:map";
@use "../../../style/variables/base";
@use "../../../style/mixins";


.#{base.$prefix}add-btn {
  position: relative;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    -moz-appearance: textfield;
    width: 100%;
  }

  .plus {
    position: absolute;
    right: 2px;
    top: 1px;
    z-index: 2;
    width: 36px !important;
    height: 36px !important;
  }

  .minus {
    position: absolute;
    left: 2px;
    top: 1px;
    z-index: 2;
    width: 36px !important;
    height: 36px !important;
  }

  .#{base.$prefix}input-container:not(.input-focused) {
    .label:not(.label-active) {
      @include mixins.ltr() {
        margin-left: 24px;
      }
      @include mixins.rtl() {
        margin-right: 24px;
      }
    }
  }

  .input-tile {
    .#{base.$prefix}btn {
      border-radius: map.get(base.$borders, 'sm');
    }
  }
}

</style>
