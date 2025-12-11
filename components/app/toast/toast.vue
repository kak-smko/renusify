<template>
  <div :class="`${$r.prefix}toast`">
    <transition name="slide-up">
      <div class="toast-content br-sm elevation-md" :class="'color-'+type" v-if="modelValue">
          <span class="title-1">
            <slot></slot>
          </span>
          <r-spacer></r-spacer>
        <r-btn :class="{
                'color-info-text':type==='warning',
                'color-warning-text':type!=='warning'
            }" class="title-1 font-weight-bold" text v-if="action" @click.prevent="action(this)">{{ actionName }}
        </r-btn>
            <r-btn @click.prevent="close()"
                   icon
                   text
                   v-if="closable">
              <r-icon v-html="$r.icons.close"></r-icon>
            </r-btn>
        </div>
    </transition>
  </div>

</template>

<script setup>
import {ref, watch, inject} from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: function (value) {
      return ['info', 'warning', 'error', 'success'].indexOf(value) !== -1
    }
  },
  modelValue: Boolean,
  closable: Boolean,
  action: Function,
  actionName: String,
  time: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['update:modelValue'])

const setTimeout_id = ref(null)
const $r = inject('renusify').$r

// Methods
const delay = () => {
  if (props.time !== -1) {
    clearTimeout(setTimeout_id.value)
    setTimeout_id.value = setTimeout(() => {
      close()
    }, props.time)
  }
}

const close = () => {
  emit('update:modelValue', false)
}

// Watchers
watch(() => props.modelValue, (nVal) => {
  if (nVal === true) {
    delay()
  }
})
</script>

<style lang="scss">
@use "sass:map";
@use "../../../style" as *;

.#{$prefix}toast {
  max-width: 500px;
  width: 95vw;
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: map.get($z-index, 'veryImportant');

  .toast-content {
    padding: 15px;
    display: flex;
    align-items: center;
  }
}
</style>