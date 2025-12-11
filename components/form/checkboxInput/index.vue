<template>
  <r-input :class="{
        [`${$r.prefix}checkbox`]:true,
        'checkbox-readonly': this.readonly,
    }" :modelValue="lazyValue" hide>
    <template v-slot="{isRequired}">
      <div class="d-flex v-end">
            <span class="checkbox-input" :class="{
                [size]:true,
                   'br-circle':rounded,
                   'checkbox-select':modelValue
               }" @click.prevent="toggle">
                   <transition name="scale">
                       <r-icon v-if="modelValue"
                               class="color-white-text"
                               v-html="$r.icons.check" exact></r-icon>
                   </transition>
            </span>
        <span class="ms-2 checkbox-label" @click.prevent="toggle">
                <span class="color-error-text" v-if="isRequired">*</span>
          <!-- Slot for custom label.-->
          <slot name="label">{{ label }}</slot>
            </span>
      </div>
    </template>
  </r-input>
</template>
<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
  /**
   * Label text for the component
   * @type {String}
   */
  label: String,

  /**
   * Makes the component read-only
   * @type {Boolean}
   */
  readonly: Boolean,

  /**
   * Applies rounded corners to the component
   * @type {Boolean}
   */
  rounded: Boolean,

  /**
   * The model value for the component (v-model)
   * @type {Boolean}
   */
  modelValue: Boolean,

  /**
   * Size of the component
   * @type {String}
   * @default 'default'
   * @values xs, sm, md, lg, xl, xxl
   */
  size: {
    type: String,
    default: 'md',
    validator: (value) => {
      return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(value)
    }
  },
})

const emit = defineEmits([
  /**
   * Emitted when the model value changes
   * @param {Boolean} value - The new value
   */
  'update:modelValue'
])

const lazyValue = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  lazyValue.value = newValue
})

/**
 * Toggles the component's value
 */
const toggle = () => {
  if (props.readonly) {
    return
  }

  lazyValue.value = !lazyValue.value
  emit('update:modelValue', lazyValue.value)
}
</script>
<style lang="scss">
@use "sass:map";
@use "../../../style" as *;

.#{$prefix}checkbox {
  width: 100%;
  cursor: pointer;

  .checkbox-label {
    color: var(--color-on-sheet);
  }

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
    border-radius: map.get($borders, 'sm');
    transition: .3s all ease-in-out;

    &.xs {
      width: 17px;
      height: 17px;

      svg {
        width: 12px;
        height: 12px;
      }
    }

    &.sm {
      width: 20px;
      height: 20px;

      svg {
        width: 15px;
        height: 15px;
      }
    }

    &.md {
      width: 22px;
      height: 22px;

      svg {
        width: 17px;
        height: 17px;
      }
    }

    &.lg {
      width: 25px;
      height: 25px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &.xl {
      width: 30px;
      height: 30px;

      svg {
        width: 25px;
        height: 25px;
      }
    }

    &.xxl {
      width: 40px;
      height: 40px;

      svg {
        width: 35px;
        height: 35px;
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