<template>
  <div
      :class="{
        [`${$r.prefix}input-container`]:true,
        [c_color]:c_color&&!isDisabled&&!hasError,
        'color-error-text':hasError&&genMessages.length>0,
        'hide-detail':c_hide,
        'input-focused':active,
        'input-disabled':isDisabled,
        'input-ltr':c_ltr
         }"
  >
    <div ref="input" :class="[c_inputControlClass,{'input-tile':c_tile,'ps-8':preIcon}]" class="input-control">
      <label :for="computedId" class="label"
             v-if="label"
             :class="[c_labelControlClass,
                   {'label-active':labelActive,
                   'ms-5':((preIcon&&!labelActive&&!active))
                   }]"
      >
        <span class="color-error-text" v-if="isRequired">*</span> {{ label }}
      </label>
      <r-icon class="pre-icon" v-if="preIcon" v-html="preIcon" @click.prevent.stop="$emit('pre-icon',true)"></r-icon>
      <slot :isRequired="isRequired" :uid="uid"></slot>
      <r-icon class="after-icon" v-if="icon" v-html="icon" @click.prevent.stop="$emit('icon',true)"></r-icon>
    </div>
    <div class="massage"
         :class="{
            'massage-active':genMessages.length>0,
        }">
      <div :class="{'animation-shake-3':c_msgShake}">{{ genMessages.join(',') }}</div>

    </div>
  </div>
</template>
<script>

export default {
  name: 'r-input',
  inject: {
    'form': {
      default: false
    }
  },
  props: {
    id: String,
    icon: String,
    preIcon: String,
    msg: String,
    labelControlClass: [String, Object, Array],
    inputControlClass: [String, Object, Array],
    color: String,
    label: String,
    modelValue: [String, Boolean, Number, Array, Object],
    active: Boolean,
    hide: {type: Boolean, default: undefined},
    tile: {type: Boolean, default: undefined},
    disabled: Boolean,
    readonly: Boolean,
    error: Boolean,
    ltr: {type: Boolean, default: undefined},
    msgShake: {type: Boolean, default: undefined},
    rules: {
      type: [Array, Function],
      default: () => []
    },
    validateOnBlur: {type: Boolean, default: undefined}
  },
  emits:['pre-icon','icon','update:modelValue'],
  data() {
    return {
      uid: 'input_' + this.$helper.uniqueId(),
      lazyValue: this.modelValue,
      focused: false,
      errorBucket: [],
      hasColor: false,
      hasFocused: false,
      hasInput: false,
      isFocused: false,
      isResetting: false,
      valid: false
    }
  },
  beforeMount() {
    this.validate()
  },
  mounted() {
    let inp = this.$refs.input.querySelector('input')
    if (inp) {
      inp.setAttribute('id', this.uid)
    }
  },
  created() {
    this.form && this.form.register(this)
  },
  beforeUnmount() {
    this.form && this.form.unregister(this)
  },
  computed: {
    computedId() {
      return this.id || this.uid
    },
    isRequired() {
      return this.rules ? (this.rules.indexOf('required') > -1) : false
    },
    isDisabled() {
      return this.disabled || this.readonly
    },
    hasError() {
      if (this.error) {
        return true
      }
      return this.errorBucket.length > 0
    },
    genMessages() {
      let m = []
      if (this.msg) {
        m = [this.msg]
      }
      return this.hasMessages ? this.validations : m
    },
    hasMessages() {
      return this.validationTarget.length > 0
    },
    shouldValidate() {
      if (this.isResetting) return false
      return this.c_validateOnBlur ? this.hasFocused && !this.isFocused : this.hasInput || this.hasFocused
    },
    validations() {
      return this.validationTarget.slice(0, 1)
    },
    validationTarget() {
      if (this.shouldValidate) {
        return this.errorBucket
      } else return []
    },
    labelActive() {
      return (this.lazyValue !== undefined && this.lazyValue !== '' && this.lazyValue !== null)
    },
    c_labelControlClass() {
      if (this.labelControlClass === undefined && this.$r.inputs.labelControlClass) {
        return this.$r.inputs.labelControlClass
      }
      return this.labelControlClass
    },
    c_inputControlClass() {
      if (this.inputControlClass === undefined && this.$r.inputs.inputControlClass) {
        return this.$r.inputs.inputControlClass
      }
      return this.inputControlClass
    },
    c_color() {
      if (this.color === undefined && this.$r.inputs.color) {
        return this.$r.inputs.color
      }
      return this.color || 'color-one-text'
    },
    c_hide() {
      if (this.hide === undefined && this.$r.inputs.hide) {
        return this.$r.inputs.hide
      }
      return this.hide
    },
    c_tile() {
      if (this.tile === undefined && this.$r.inputs.tile) {
        return this.$r.inputs.tile
      }
      return this.tile
    },
    c_ltr() {
      if (this.ltr === undefined && this.$r.inputs.ltr) {
        return this.$r.inputs.ltr
      }
      return this.ltr
    },
    c_msgShake() {
      if (this.msgShake === undefined && this.$r.inputs.msgShake) {
        return this.$r.inputs.msgShake
      }
      return this.msgShake === undefined ? true : this.msgShake
    },
    c_validateOnBlur() {
      if (this.validateOnBlur === undefined && this.$r.inputs.validateOnBlur) {
        return this.$r.inputs.validateOnBlur
      }
      return this.validateOnBlur
    }
  },
  watch: {
    rules: {
      handler(newVal, oldVal) {
        if (this.deepEqual(newVal, oldVal)) return
        this.validate()
      },

      deep: true
    },

    isFocused(val) {
      // Should not check validation
      // if disabled
      if (!val && !this.isDisabled) {
        this.hasFocused = true
        this.c_validateOnBlur && this.validate()
      }
    },

    isResetting() {
      setTimeout(() => {
        this.hasInput = false
        this.hasFocused = false
        this.isResetting = false
        this.validate()
      }, 0)
    },

    modelValue(val) {
      this.hasInput = true
      this.lazyValue = val
      this.validate()
    },
    active(val) {
      this.focused = val
    }

  },
  methods: {
    deepEqual(a, b) {
      if (a === b) return true

      if (a instanceof Date && b instanceof Date) {
        // If the values are Date, they were convert to timestamp with getTime and compare it
        if (a.getTime() !== b.getTime()) return false
      }

      if (a !== Object(a) || b !== Object(b)) {
        // If the values aren't objects, they were already checked for equality
        return false
      }

      const props = Object.keys(a)

      if (props.length !== Object.keys(b).length) {
        // Different number of props, don't bother to check
        return false
      }

      return props.every(p => this.deepEqual(a[p], b[p]))
    },

    reset() {
      this.isResetting = true
      this.$emit('update:modelValue', null)
    },

    resetValidation() {
      this.isResetting = true
    },

    validate(force = false, value) {
      const errorBucket = []
      value = value || this.modelValue
      if (force) this.hasInput = this.hasFocused = true
      const rules = this.$v(this.rules)
      for (let index = 0; index < rules.length; index++) {
        const rule = rules[index]
        const valid = typeof rule === 'function' ? rule(value) : rule

        if (typeof valid === 'string') {
          errorBucket.push(valid)
        } else if (typeof valid !== 'boolean') {
          console.log(`Rules should return a string or boolean, received '${typeof valid}' instead` + this)
        }
      }

      this.errorBucket = errorBucket
      this.valid = errorBucket.length === 0
      return this.valid
    }

  }

}

</script>
<style lang="scss">
@import '../../style/include';


.#{$prefix}input-container {
  position: relative;
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  line-height: 24px;
  font-size: 1rem;
  letter-spacing: normal;
  margin-top: 20px;

  &.input-ltr {
    input, textarea {
      direction: ltr;
    }
  }

    &:not(.input-disabled) {
      input,
      textarea, .label, .#{$prefix}icon, .#{$prefix}btn {
        color: var(--color-text-primary)
      }
    }

    input::placeholder,
    textarea::placeholder {
      color: var(--color-disabled)
    }

    &.input-disabled {
      * {
        color: var(--color-disabled)
      }
    }

    .input-control {
      border: solid 1px var(--color-border)
    }

  &.input-disabled {
    pointer-events: none;
  }

  input {
    max-height: 32px
  }

  input,
  textarea {
    flex: 1 1 auto;
    line-height: 20px;
    padding: 8px 0 8px;
    max-width: 100%;
    min-width: 0px;
    width: 100%;
    outline: none;
    position: relative;

    &[type=text ]::-ms-clear {
      display: none
    }

    &:invalid {
      box-shadow: none
    }

    &:focus,
    &:active {
      outline: none
    }
  }

  .input-control {
    display: flex;
    flex-direction: column;
    height: 40px;
    flex-grow: 1;
    flex-wrap: wrap;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    .after-icon {
      position: absolute;
      cursor: pointer;
      @include ltr() {
        right: 5px;
      }
      @include rtl() {
        left: 5px;
      }

    }
    .pre-icon {
      position: absolute;
      cursor: pointer;
      @include ltr() {
        left: 5px;
      }
      @include rtl() {
        right: 5px;
      }

    }

    &:not(.input-tile) {
      padding: 0 16px;
      border-radius: map-get($borders, 'xl');
    }

    &.input-tile {
      padding: 0 8px;
      border-radius: map-get($borders, 'sm');
    }
  }

  &.hide-detail {

    > .input-control {
      border: unset !important;
      height: auto;
      padding: 0;
    }
  }

  .label {
    white-space: nowrap;
    position: absolute;
    z-index: 0;
    top: 8px;
    transition: $primary-transition;

    @include ltr() {
      left: 15px;
      transform-origin: top left;
    }

    @include rtl() {
      right: 15px;
      transform-origin: top right;
    }
  }

  :not(.input-tile) {
    .label-active {
      @include ltr() {
        transform: translateY(-27px) translateX(5px) scale(.9);
      }
      @include rtl() {
        transform: translateY(-27px) translateX(-5px) scale(.9);
      }
      transition: $primary-transition
    }
  }

  .label-fixed {
    transform: none !important;
    top: -20px !important;
    @include ltr() {
      left: 0 !important;
    }
    @include rtl() {
      right: 0 !important;
    }
  }

  .input-tile {
    .label-active {
      @include ltr() {
        transform: translateY(-27px) translateX(-8px) scale(.9);
      }
      @include rtl() {
        transform: translateY(-27px) translateX(8px) scale(.9);
      }
      transition: $primary-transition
    }
  }

  &.input-focused {
    .input-control {
      border: solid 1px currentColor;
    }

    .#{$prefix}icon, .#{$prefix}btn {
      color: currentColor !important;
    }

    :not(.input-tile) {
      .label {
        color: currentColor !important;
        @include ltr() {
          transform: translateY(-27px) translateX(5px) scale(.9);
        }
        @include rtl() {
          transform: translateY(-27px) translateX(-5px) scale(.9);
        }
        transition: $primary-transition
      }
    }

    .input-tile {
      .label {
        color: currentColor !important;
        @include ltr() {
          transform: translateY(-27px) translateX(-8px) scale(.9);
        }
        @include rtl() {
          transform: translateY(-27px) translateX(8px) scale(.9);
        }
        transition: $primary-transition
      }
    }
  }

  .massage {
    display: none;
    margin-left: 10px;

    &-active {
      display: block;
    }
  }


  &.color-error-text {
    .label {
      color: currentColor;
    }

    .input-control {
      border: solid 1px currentColor;
    }
  }

  &.#{$prefix}text-area {
    .input-control {
      height: auto;

      &:not(.input-tile) {
        border-radius: map-get($borders, 'xl');
      }
    }

  }
}


</style>