<template>
  <r-input :class="{
        [`${this.$r.prefix}checkbox`]:true,
        'checkbox-readonly': this.readonly,
    }" :modelValue="lazyValue" hide>
    <template v-slot="{isRequired}">
      <div class="d-flex v-end">
            <span class="checkbox-input" :class="{
                [size]:true,
                   'br-circle':rounded,
                   'checkbox-select':modelValue
               }" @click.prevent="emit">
                   <transition name="scale">
                       <r-icon v-if="modelValue"
                               class="color-white-text"
                               v-html="$r.icons.check" exact></r-icon>
                   </transition>
            </span>
        <span class="ms-2" @click.prevent="emit">
                <span class="color-error-text" v-if="isRequired">*</span>
          <slot name="label">{{ label }}</slot>
            </span>
      </div>
    </template>
  </r-input>
</template>
<script>
export default {
  name: 'r-checkbox',
  props: {
    label: String,
    readonly: Boolean,
    rounded: Boolean,
    modelValue: Boolean,
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['x-small', 'small', 'default', 'large', 'x-large'].indexOf(value) !== -1
      }
    },
  },
emits:['update:modelValue'],
  data() {
    return {
      lazyValue: this.modelValue
    }
  },
  watch: {
    modelValue() {
      this.lazyValue = this.modelValue
    }
  },
  methods: {
    emit() {
      if (this.readonly) {
        return
      }

      this.lazyValue = (!this.lazyValue) ? !this.lazyValue : false
      this.$emit('update:modelValue', this.lazyValue)
    }
  }
}

</script>
<style lang="scss">
@import "../../../style/include";

.#{$prefix}checkbox {
  width: 100%;
  cursor: pointer;

  .checkbox-input {
    border: 1px solid var(--color-on-sheet-low)
  }

  .#{$prefix}icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkbox-input {
    text-align: center;
    border-radius: map-get($borders, 'sm');
    transition: .3s all ease-in-out;

    &.x-small {
      width: 17px;
      height: 17px;

      svg {
        width: 12px;
        height: 12px;
      }
    }

    &.small {
      width: 20px;
      height: 20px;

      svg {
        width: 15px;
        height: 15px;
      }
    }

    &.default {
      width: 22px;
      height: 22px;

      svg {
        width: 17px;
        height: 17px;
      }
    }

    &.large {
      width: 25px;
      height: 25px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &.x-large {
      width: 30px;
      height: 30px;

      svg {
        width: 25px;
        height: 25px;
      }
    }
  }

  &.checkbox-readonly {
    pointer-events: none;
  }

  .checkbox-select {
    background-color: currentColor;
    border: 0;
  }
}
</style>