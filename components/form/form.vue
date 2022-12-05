<template>
  <form :class="`${$r.prefix}form`">
    <slot></slot>
  </form>
</template>
<script>

export default {
  name: 'r-form',
  provide () {
    return {
      form: {
        register: this.register,
        unregister: this.unregister
      }
    }
  },
  props: {
    modelValue: Boolean
  },
  data: () => ({
    inputs: [],
    watchers: [],
    errorBag: {}
  }),
  watch: {
    errorBag: {
      handler (val) {
        const errors = Object.values(val).includes(true)
        this.$emit('update:modelValue', !errors)
      },

      deep: true,
      immediate: true
    }
  },
  methods: {
    watchInput (input) {
      const watcher = input => {
        return input.$watch('hasError', val => {
          this.errorBag[input.uid] = val
        }, {
          immediate: true
        })
      }

      const watchers = {
        uid: input.uid,
        valid: () => {
        },
        shouldValidate: () => {
        }
      }

      watchers.valid = watcher(input)

      return watchers
    },

    /** @public */
    validate () {
      return this.inputs.filter(input => !input.validate(true)).length === 0
    },

    /** @public */
    reset () {
      this.inputs.forEach(input => input.reset())
    },

    /** @public */
    resetValidation () {
      this.inputs.forEach(input => input.resetValidation())
    },

    register (input) {
      this.inputs.push(input)
      this.watchers.push(this.watchInput(input))
    },

    unregister (input) {
      const found = this.inputs.find(i => i.uid === input.uid)
      if (!found) return
      const unwatch = this.watchers.find(i => i.uid === found.uid)

      if (unwatch) {
        unwatch.valid()
        unwatch.shouldValidate()
      }

      this.watchers = this.watchers.filter(i => i.uid !== found.uid)
      this.inputs = this.inputs.filter(i => i.uid !== found.uid)
      delete this.errorBag[found.uid]
    }

  }

}
</script>
