<template>
    <div :class="classes">
      <div
          class="list-item h-space-between"
          :class="{'list-item-active color-one-text':$helper.searchArray(list,text,item_value[text])!==false}"
          :key="item_key"
          @click.prevent="handle(item_value)"
          v-for="(item_value,item_key) in genItems"
          v-ripple
      >
        <slot :item="item_value">
          <div class="list-title">{{ item_value[text] }}</div>
          <transition name="fade">
            <r-icon class="pe-1"
                    exact
                        v-html="$r.icons.check"
                        v-if="(checked&&$helper.searchArray(list,text,item_value[text])!==false)"
                ></r-icon>
              </transition>
            </slot>
        </div>
    </div>
</template>

<script>
import './style.scss'
import Ripple from '../../directive/ripple/index'

export default {
      name: 'r-list',
      directives: {ripple: Ripple},
      props: {
        disabled: Boolean,
        multiple: Boolean,
        min: {type: Number, default: 0},
        text: {type: String, default: 'name'},
        value: {type: String, default: 'value'},
        flat: Boolean,
        rounded: Boolean,
        subheader: Boolean,
        checked: Boolean,
        filter: String,
        items: Array,
        modelValue: {type: [Array, Object]}
      },
      emits:['update:modelValue'],
        computed: {
            list() {
                if (this.modelValue) {
                    return this.modelValue
                }
                return []
            },
            classes() {
              let c = `${this.$r.prefix}list sheet sheet-tile`
                if (this.disabled) {
                    c += ' list-disabled'
                }
                if (this.flat) {
                    c += ' list-flat'
                }

                if (this.rounded) {
                    c += ' list-rounded'
                }

                if (this.subheader) {
                    c += ' list-subheader'
                }
                return c
            },
            genItems() {
                const res = []
                if (this.items) {
                    const lng=this.items.length
                    for (let i = 0; i < lng; i++) {
                        if (typeof this.items[i] === 'object') {
                            res[i] = this.items[i]
                        } else {
                            res[i] = {name: this.items[i].toString(), value: this.items[i]}
                        }
                    }
                }
                if (this.filter) {
                    const re = new RegExp(this.filter, 'gi')
                    return res.filter(function (el) {
                        if (el.name && el.name.match(re)) {
                            return el
                        }
                    })
                }
                return res
            }
        },
        methods: {
            handle(item) {
              if (this.disabled) {
                return
              }
              let val = this.list

              const index = this.$helper.searchArray(val, this.text, item[this.text])

              if (index !== false) {
                if (val.length > this.min) {
                  val.splice(index, 1)
                }
              } else {
                if (!this.multiple) {
                  val = []
                    }

                    val.push(item)
                }

                this.$emit('update:modelValue', this.multiple?val:val[0])
            }
        }

    }
</script>
