<template>
    <r-input class="mt-5" :model-value="modelValue" hide labelControlClass="label-active" :class="`${$r.prefix}color-picker`">
        <div @click="open=true" class="shower" :style="{'background-color':modelValue||'#DD0FB2'}"></div>
        <r-modal v-model="open" maxWidth="260px" :closebtn="false" closable>
            <picker :color="modelValue" @changeColor="emit"></picker>
            <r-btn @click="close" block>{{ $t('close', 'renusify') }}</r-btn>
        </r-modal>
    </r-input>
</template>
<script>
    import Picker from "./picker";
    export default {
        name: 'r-color-picker',
        components: {Picker},
        props: {
            modelValue: String,
            format:{type:String,default:'rgba'}
        },
        data() {
            return {
                open:false
            }
        },
        methods: {
          close() {
            this.open = false
            this.$emit('close', true)
          },
          emit(e) {
            let r = e.hex
            if (this.format === 'rgba') {
              r = e.rgba
            }
            this.$emit('update:model-value', r)
          }
        }

    }
</script>
<style lang="scss">
    @import "../../../style/include";

    .#{$prefix}color-picker {
.shower{
    width: 100%;
    height: 30px;
    cursor: pointer;
}
    }
</style>