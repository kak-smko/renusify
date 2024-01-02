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

<script>
import './style.scss'

export default {
  name: 'r-toast',
  props: {
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
  },
  emits:['update:modelValue'],
  data(){
    return{
      setTimeout_id:null
    }
  },
  methods: {
    delay () {
      if (this.time !== -1) {
        clearTimeout(this.setTimeout_id)
        this.setTimeout_id=setTimeout(() => {
          this.close()
        }, this.time)
      }
    },
    close () {
      this.$emit('update:modelValue', false)
    }
  },
  watch: {
    modelValue (nVal) {
      if (nVal === true) {
        this.delay()
      }
    }
  }
}
</script>
