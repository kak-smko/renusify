<template>
    <div :class="{
        [$r.prefix+'app']:true,
                    'app-rtl': isRtl,
                    'app-ltr': !isRtl,
                    'app-dark': isDark,
                    'app-light': !isDark
                }" :id="id">
        <div class="app-wrap" :style="{'min-height':$r.breakpoint.height+'px'}">
          <slot></slot>
        </div>
        <r-toast></r-toast>
        <r-notify v-if="notify" :left="notifyLeft" :top="notifyTop">
            <template #content="props">
                <slot name="notify" :item="props"></slot>
            </template>
        </r-notify>
    </div>
</template>

<script>
import './style.scss'
import RToast from './toast/index.vue'
import RNotify from './notify/index.vue'

export default {
  name: 'r-app',
  components: {RToast, RNotify},
  props: {
    id: {
      type: [String, Number],
      default: 'renusify'
    },
    notify: Boolean,
            notifyLeft: Boolean,
            notifyTop: Boolean,
            rtl: {type:Boolean,default: undefined},
            dark: {type:Boolean,default: undefined}
        },
        computed:{
          isRtl(){
              if(this.rtl!==undefined){
                  return this.rtl
              }
              return this.$r.rtl
            },
            isDark(){
              if(this.dark!==undefined){
                  return this.dark
              }
              return this.$r.dark
            }
        }
    }
</script>
