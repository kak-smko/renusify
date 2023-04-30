<template>
  <r-text-input
      :class="color"
      @update:modelValue="check"
      :model-value="modelValue"
      :error="error"
      :msg="msg"
      :msgShake="false"
  ></r-text-input>
</template>

<script>
export default {
  name: 'r-unique-input',
  props: {
    link: {
      type: String,
      required: true
    },

    modelValue: {
      default: null,
      type: String
    },
  },
  data() {
    return {
      item: null,
      color: null,
      msg: null,
      error: false
    }
  },
  methods: {
    check(e) {
      this.item = e
      this.error = true
      this.color = 'color-error-text'
      this.$emit('update:modelValue', this.item)
      if (this.item) {
        this.$axios.post(this.link, {
          'unique_name': this.item
        })
            .then((res) => {
              if (res.data) {
                this.color = 'color-success-text'
                this.error = false
                this.msg = null
              }
            }, (res) => {
              this.msg = this.$t(res.response.data.msg)
              this.color = 'color-error-text'
              this.error = true
            })
      } else {
        this.error = false
        this.color = ''
      }
    }
  }
}
</script>
