<template>
    <component v-bind="att"
               :is="isClickable?route.tag:'div'"
               v-ripple="isClickable&&isRipple">
        <slot></slot>
    </component>
</template>

<script>
import {roots} from '../../tools/rootable';
import './style.scss';

export default {
  name: 'r-card',
  mixins: [roots],
  props: {
    flat: Boolean,
    hover: Boolean,
    tile: Boolean,
    outlined: Boolean,
    isRipple: {
      type: Boolean,
      default: true
            },
            draggable:{
                type:Boolean,
                default:false
            }
        },
        computed: {
            att(){
                let res={'class':this.genClass}
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
            genClass() {
                let c = this.$r.prefix+'card';
                if (this.flat) {
                    c += ' card-flat';
                }else{
                  c += ' card-sheet';
                }
                if (this.hover) {
                    c += ' card-hover';
                }
                if (this.outlined) {
                    c += ' card-outlined';
                }
                if (this.tile) {
                  c += ' card-tile';
                }
                if (this.isClickable) {
                    c += ' card-link';
                }
                return c;
            },
        },

    };
</script>
