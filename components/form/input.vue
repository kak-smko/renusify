<template>
  <div
      :class="{
        [`${$r.prefix}input-container`]:true,
        [color]:color&&!isDisabled,
        'color-error-text':hasError&&genMessages.length>0,
        'hide-detail':hide,
        'input-focused':active,
        'input-disabled':isDisabled,
        'input-ltr':ltr
         }"
  >
    <div ref="input" :class="[inputControlClass,{'input-tile':tile,'ps-8':preIcon}]" class="input-control">
      <label :for="computedId" class="label"
             v-if="label"
             :class="[labelControlClass,
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
      <div :class="{'animation-shake-3':msgShake}">{{ genMessages[0] }}</div>

    </div>
  </div>
</template>
<script>
import './scss/input.scss'

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
    color: {type: String, default: 'color-one-text'},
    label: String,
    modelValue: [String, Boolean, Number, Array, Object],
    active: Boolean,
    hide: Boolean,
    tile: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    error: Boolean,
    ltr: Boolean,
    msgShake: {type: Boolean, default: true},
    rules: {
      type: [Array, Function],
      default: () => []
    },
    validateOnBlur: Boolean
  },

  data() {
    return {
      uid: 'input_' + this.$helper.uniqueId(),
      lazyValue: this.modelValue,
      focused: false,
      errorBucket: this.error || [],
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
      if (this.msg) {
        return [this.msg]
      }
      return this.hasMessages ? this.validations : []
    },
    hasMessages() {
      return this.validationTarget.length > 0
    },

    shouldValidate() {
      if (this.isResetting) return false
      return this.validateOnBlur ? this.hasFocused && !this.isFocused : this.hasInput || this.hasFocused
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
        this.validateOnBlur && this.validate()
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
