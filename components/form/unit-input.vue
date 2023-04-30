<template>
  <r-input :class="`${$r.prefix}unit-input`" :active="active"
           :model-value="lazyValue"
           @click.prevent="handleClick">
    <input :autofocus="autofocus"
           :type="type"
           @focusin="active=true"
           @focusout="active=false"
           @input="emit"
           autocomplete="no"
           ref="input"
           v-model="lazyValue"
           :readonly="disableInput"
           :class="{'input-shadow':disableInput}"
           class="me-1"
    />
    <div class="select-unit" :class="{'input-shadow':disableUnit}">
      <r-select-input :readonly="disableUnit" :items="units" v-model="unit"
                      @update:model-value="emit" hide justValue :translate="translate"
                      class="mt-0"
                      firstSelect></r-select-input>
    </div>
  </r-input>
</template>
<script>
export default {
  name: 'r-unit-input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    units: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Object, default: () => {
        return {
          value: null,
          unit: null
        }
      }
    },
    disableInput: Boolean,
    disableUnit: Boolean,
    autofocus: Boolean,
    translate: Boolean
  },

  data() {
    return {
      lazyValue: this.modelValue.value,
      active: false,
      unit: this.modelValue.unit
    }
  },
  watch: {
    modelValue() {
      this.lazyValue = this.modelValue.value
      this.unit = this.modelValue.unit
    }
  },
  methods: {
    handleClick(e) {
      this.$refs.input.focus()
    },
    emit() {
      this.$emit('update:modelValue', {value: this.lazyValue, unit: this.unit})
    }
  }
}

</script>
<style lang="scss">
@import "../../style/include";

.#{$prefix}unit-input {
  .input-shadow, .input-shadow * {
    color: var(--color-text-disabled) !important
  }

  input {
    width: calc(65% - 4px);
  }


  --c-unit: var(--color-border);


  .select-unit {
    width: calc(35% + 16px);
    overflow-x: clip;

    * {
      font-size: map-metro-get($headings, 'overline', 'size') !important;
    }

    .input-control {
      border-radius: 0;
      @include rtl() {
        border-right: 1px solid var(--c-unit) !important;
      }

      @include ltr() {
        border-left: 1px solid var(--c-unit) !important;
      }
    }


    .card-select {
      border-top-right-radius: 0;
      border-top-left-radius: 0;

    }
  }
}
</style>