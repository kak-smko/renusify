<template>
    <div :class="`${$r.prefix}group-input`">
        <label>{{label}}</label>
        <div class="group-holder" v-for="(item,i) in modelValue" :key="i">
            <div class="group-slot">
              <slot :item="item" :index="i">
                <div class="d-flex flex-wrap pt-5">
                  <template v-for="v,k in item" :key="i+'-'+k">
                    <r-text-input v-if="typeof v==='string'" class="flex-grow-0 me-1" :label="k"
                                  v-model="item[k]"></r-text-input>
                    <r-number v-else-if="typeof v==='number'" class="flex-grow-0 me-1" :label="k"
                              v-model="item[k]"></r-number>
                    <r-switch v-else-if="typeof v==='boolean'" class="flex-grow-0 me-1" :label="k"
                              v-model="item[k]"></r-switch>
                  </template>
                </div>
              </slot>
            </div>
            <div class="group-action">
                <r-btn icon text>
                    <r-icon v-html="$r.icons.chevron_up" :class="{'icon-disabled':i===0}" @click.prevent="up(i)"></r-icon>
                </r-btn>
                <r-btn icon text>
                    <r-icon v-html="$r.icons.chevron_down" :class="{'icon-disabled':i===modelValue.length-1}" @click.prevent="down(i)"></r-icon>
                </r-btn>
                <r-btn icon class="color-error-text" text @click.prevent="del(i)">
                    <r-icon v-html="$r.icons.delete"></r-icon>
                </r-btn>
            </div>
        </div>
        <div class="text-center mt-5">
            <transition name="scale">
                <r-btn v-if="show_add" class="color-success" icon @click.prevent="add">
                    <r-icon v-html="$r.icons.plus"></r-icon>
                </r-btn>
            </transition>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'rGroupInput',
        props: {
            label: String,
            modelValue: Array,
            size: Number,
          template: Object
        },
        computed: {
            show_add() {
                const l = this.$helper.ifHas(this.modelValue, 0, 'length')
                return !(this.size && l >= this.size);
            }
        },
        methods: {
            add() {
                if (this.show_add) {
                    let a = this.modelValue || []
                  a.push(this.$helper.clearProxy(this.template))
                  this.$emit('update:model-value', a)
                }

            },
            del(i) {
                let a = this.modelValue || []
                a.splice(i, 1)
                this.$emit('update:model-value', a)
            },
            up(i) {
                if(i===0){
                    return
                }
                let a = this.modelValue || []
                a = this.array_move(a, i, i-1)
                this.$emit('update:model-value', a)
            },
            down(i) {
                if(i===this.modelValue.length-1){
                    return
                }
                let a = this.modelValue || []
                a = this.array_move(a, i, i+1)
                this.$emit('update:model-value', a)
            },
            array_move(arr, old_index, new_index) {
                if (new_index >= arr.length) {
                    let k = new_index - arr.length + 1;
                    while (k--) {
                        arr.push(undefined);
                    }
                }
                arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                return arr;
            }
        }
    }
</script>
<style lang="scss">
    @import "../../style/include";

    .#{$prefix}group-input {
        .group-holder {
            position: relative;

            .group-action {
                position: absolute;
                top: 0;
                @include ltr() {
                    right: 0;
                }
                @include rtl() {
                    left: 0;
                }
            }
        }
    }
</style>