<template>
  <r-input :class="`${$r.prefix}check-input`" :active="active"
           :model-value="lazyValue"
           inputControlClass="pe-0"
           :msg="msg"
           :error="pass===false"
           @click.prevent="handleClick">
    <div class="check-input-container v-center">
      <input :autofocus="autofocus"
             :type="type"
             @focusin="active=true"
             @focusout="active=false"
             @input="emit"
             :value="lazyValue"
             autocomplete="no"
             ref="input"
      />
      <r-btn size="small"
             :class="{'color-success-text':pass!==null && pass!==false,'color-error-text':pass===false}"
             :rounded="$attrs.tile===undefined||$attrs.tile===false"
             :loading="loading" @click.prevent="check()" class="elevation-none mx-1">
        {{ $t('check', 'renusify') }}
        <r-icon v-if="pass!==null && pass!==false" class="color-success-text" exact height="20" width="20"
                v-html="$r.icons.check"></r-icon>
        <r-icon v-if=" pass===false" class="color-error-text" height="20" width="20" v-html="$r.icons.close"></r-icon>
      </r-btn>
    </div>
  </r-input>
</template>
<script>
export default {
  name: 'r-check-input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: 'text'
    },
    link: String,
    modelValue: [String, Number],
    autofocus: Boolean,
    headers: Object
  },
emits:['update:modelValue','data'],
  data() {
    return {
      lazyValue: this.modelValue,
      msg: null,
      pass: null,
      loading: false,
      active: false
    }
  },
  watch: {
    modelValue() {
      this.msg = null
      this.pass = null
      this.$emit('data', {})
      this.lazyValue = this.modelValue
    }
  },
  methods: {
    check() {
      if (this.link) {
        this.loading = true
        this.$axios.post(this.link, {
          [this.name]: this.lazyValue
        }, {headers: this.headers}).then(({data}) => {
          this.$emit('data', data)
          this.msg = null
          this.loading = false
          this.pass = true
        }, ({response}) => {
          if (response.data.msg) {
            this.msg = this.$t(response.data.msg, 'renusify')
          }
          this.$emit('data', response.data)
          this.loading = false
          this.pass = false
        })
      }

    },
    handleClick(e) {
      this.$refs.input.focus()
    },
    emit(e) {
      this.lazyValue = e.target.value
      this.$emit('update:modelValue', this.lazyValue)
    }
  }
}

</script>
<style lang="scss">
@import "../../../style/include";

.#{$prefix}check-input {
  .check-input-container {
    display: flex;
    width: 100%;
  }
}
</style>
