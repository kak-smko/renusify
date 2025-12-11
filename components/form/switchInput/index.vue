<template>
  <r-input :class="`${$r.prefix}switch`" :modelValue="lazyValue" hide>
    <div class="switch-container" :class="{'switch-active':modelValue}">
      <div class="switch-label me-1"
      >{{ label }}
      </div>
      <div class="switch-holder" @click.prevent="toggle()">
        <div class="switch-line"></div>
        <div class="switch-dot"></div>
      </div>
      <div class="switch-label ms-1"
           v-if="label2">{{ label2 }}
      </div>
    </div>
  </r-input>
</template>
<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
  /**
   * Primary label for the switch
   * @type {String}
   */
  label: String,
  /**
   * Secondary label for the switch (optional)
   * @type {String}
   */
  label2: String,
  /**
   * The switch's model value
   * @type {Boolean|String}
   */
  modelValue: {
    type: [Boolean, String]
  }
})

const emit = defineEmits([
  /**
   * Emitted when the switch value changes
   * @param {Boolean|String} value - The updated switch value
   */
  'update:modelValue',
  /**
   * Emitted when the switch is toggled
   * @param {Boolean|String} value - The new switch state
   */
  'change'
])

// Reactive data
const lazyValue = ref(props.modelValue || false)

// Watchers
watch(() => props.modelValue, (newValue) => {
  lazyValue.value = newValue
})

// Methods
/**
 * Toggles the switch state and emits events
 */
const toggle = () => {
  const newValue = !lazyValue.value
  lazyValue.value = newValue
  emit('change', newValue)
  emit('update:modelValue', newValue)
}
</script>
<style lang="scss">
@use "sass:map";
@use "../../../style" as *;

.#{$prefix}switch {
  .switch-label {
    color: var(--color-on-sheet);
  }

  .switch-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
  }

  .switch-holder {
    width: 45px;
    height: 13px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .switch-line {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: var(--color-border);
  }

  .switch-dot {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #cdcbcb;
    transition: .3s map.get($transition, 'fast-in-fast-out');
    @include rtl() {
      right: 0;
    }
    @include ltr() {
      left: 0;
    }
  }

  .switch-active {
    .switch-line {
      background-color: currentColor;
      opacity: 0.5;
    }

    .switch-dot {
      background-color: currentColor;
      @include rtl() {
        right: 25px;
      }
      @include ltr() {
        left: 25px;
      }
    }
  }

}
</style>