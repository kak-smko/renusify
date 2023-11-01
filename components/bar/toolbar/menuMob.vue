<template>
    <div class="toolbar-mobile" :class="{'toolbar-open':modelValue}">
        <div class="shadow" @click="close">
            <aside class="toolbar-side sheet sheet-tile pt-5">
                <div v-if="logo" class="text-center">
                <r-img :src="logo" alt="logo" :width="logoW" :height="logoH"></r-img>
                <r-divider class="my-5"></r-divider>
                    </div>
                <menu-childs :menu="menu"></menu-childs>
            </aside>
            <div @click="close" class="toolbar-close sheet sheet-tile pa-2">
                <r-icon v-html="$r.icons.close"></r-icon>
            </div>
        </div>
    </div>
</template>
<script>
import MenuChilds from "./menuChilds";

export default {
  name: 'menu-mobile',
  components: {MenuChilds},
  props: {
    logo: String,
    logoW: Number,
    logoH: Number,
    menu: Array,
    modelValue: Boolean
  },
  data() {
            return {}
        },
        methods: {
            close() {
              this.$emit('update:modelValue', false)
            }
        }
    }
</script>