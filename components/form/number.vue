<template>
  <div :class="`${$r.prefix}add-btn`">
    <r-input v-bind="$attrs"
             :modelValue="modelValue"
             :active="active"
             inputControlClass="v-center"
    >
      <r-btn @click.prevent="minus" class="minus" icon :text="btnText">
        <r-icon v-html="$r.icons.minus"></r-icon>
      </r-btn>
      <input @input="emit"
             class="text-center"
             @focusin="active=true"
             @focusout="active=false"
             ref="input"
             type="number"
             autocomplete="no"
             v-model.number="number"
      />
      <r-btn @click.prevent="plus" class="plus" icon :text="btnText">
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
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    btnText: Boolean
  },
  data() {
    return {
      number: this.modelValue,
      active: false
    }
  },
  watch: {
    'modelValue': function (newVal) {
      setTimeout(() => {
        this.number = newVal
      })
    }
  },
  methods: {
    emit() {
      if (this.number === '' || this.number === null) {
        this.number = undefined
        this.$emit('update:modelValue', d)
        return
      }
      let d = this.number
      if (this.max !== undefined && d > this.max) {
        d = this.max
      }
      if (this.min !== undefined && d < this.min) {
        d = this.min
      }
      const n = ((1 / this.step) + '').length - 1
      this.number = parseFloat(d.toFixed(n))
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
  },
}
</script>

<style lang="scss">
@import "../../style/include";

.#{$prefix}add-btn {
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

  .#{$prefix}input-container:not(.input-focused) {
    .label:not(.label-active) {
      @include ltr() {
        margin-left: 24px;
      }
      @include rtl() {
        margin-right: 24px;
      }
    }
  }

  .input-tile {
    .#{$prefix}btn {
      border-radius: 4px;
    }
  }
}

</style>
