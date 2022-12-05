<template>
  <component :class="`${$r.prefix}btn ${classes} size-${size}`"
             v-bind="att"
               :is="route.tag"
             v-ripple>
      <span class="btn-content">
        <slot></slot>

          <span class="label d-flex v-center h-center px-1 overflow-hidden" :class="labelClass" v-if="label">
              <transition name="counter-up" mode="out-in">
                  <span :key="label">
                  {{label}}
                      </span>
              </transition>
          </span>

      </span>
    <span class="btn-loader" v-if="loading">
        <r-progress-circular :size="(size==='x-small')?'15':'23'" indeterminate width="2"></r-progress-circular></span>
  </component>
</template>

<script>
import './style.scss'
import { roots } from '../../tools/rootable'
import Ripple from '../../directive/ripple/index'
export default {
  name: 'r-btn',
  mixins: [roots],
  directives: { ripple: Ripple },
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['x-small', 'small', 'default', 'large', 'x-large'].indexOf(value) !== -1
      }
    },
    label: [String,Number],
    labelClass: [String,Array,Object],
    block: Boolean,
    depressed: Boolean,
    outlined: Boolean,
    rounded: Boolean,
    icon: Boolean,
    fab: Boolean,
    text: Boolean,
    tile: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    loading: Boolean
  },
  computed: {
      att(){
                let res={}
                if(this.href){
                    res['href']=this.route.data.attrs.href
                }

                if(this.target){
                    res['rel']='noreferrer'
                    res['target']=this.route.data.attrs.target
                }
                if(this.to){
                    res['to']=this.route.data.props.to
                }
                return res
            },
    classes () {
      let c = ''
      if (!this.depressed && !this.text && !this.outlined && !this.disabled) {
        c += 'btn-contained'
      }
      if (this.loading) {
        c += ' btn-loading'
      }
      if (this.block) {
        c += ' btn-block'
      }
      if (this.outlined) {
        c += ' btn-outlined'
      }
      if (this.text) {
        c += ' btn-text'
      }
      if (this.tile) {
        c += ' btn-tile'
      }
      if (this.disabled) {
        c += ' btn-disabled'
        c += ' disabled-text'
      }
      if (this.readonly) {
        c += ' btn-readonly'
      }
      if (this.rounded) {
        c += ' btn-rounded'
      }
      if (this.icon) {
        c += ' btn-round'
        c += ' btn-icon'
      }
      if (this.fab) {
        c += ' btn-round'
        c += ' btn-fab'
      }
      return c
    }
  }
}
</script>
