<template>
  <r-input :class="`${$r.prefix}group-input`"
           :model-value="modelValue"
           hide>
    <div class="w-full">
      <span v-if="label" class="color-primary-text">{{ label }}</span>
      <div class="group-holder" v-for="(item,i) in modelValue" :key="i">
        <div class="group-slot">
          <slot :item="item" :index="i" :disableDel="disDel">
            <div v-if="template" class="d-flex flex-wrap pt-5 v-start">
              <template v-for="(v,k) in item" :key="i+'-'+k">
                <component :is="template[k]['type']" v-if="template[k]&&template[k]['type']" v-model="item[k]"
                           :label="t(k)"
                           class="flex-grow-0 me-1" v-bind="template[k]['props']"></component>
              </template>
            </div>
        </slot>
      </div>
        <div class="group-action">
          <r-btn icon text>
            <r-icon v-html="$r.icons.chevron_up" :class="{'icon-disabled':i===0}" @click.prevent="up(i)"></r-icon>
          </r-btn>
          <r-btn icon text>
            <r-icon v-html="$r.icons.chevron_down" :class="{'icon-disabled':i===modelValue.length-1}"
                    @click.prevent="down(i)"></r-icon>
          </r-btn>
          <r-btn v-if="!disableItems.includes(item[itemKey])" icon text @click.prevent="del(i)">
            <r-icon v-html="$r.icons.delete" class="color-error-text"></r-icon>
          </r-btn>
        </div>
      </div>
      <div class="mt-5" :class="addBtnClass">
        <transition name="scale">
          <r-btn v-if="show_add" class="color-success" icon @click.prevent="add">
            <r-icon v-html="$r.icons.plus" class="color-white-text"></r-icon>
          </r-btn>
        </transition>
      </div>
    </div>
  </r-input>
</template>
<script>
export default {
  name: 'rGroupInput',
  props: {
    label: String,
    itemKey: String,
    modelValue: Array,
    size: Number,
    disableAdd: Boolean,
    translate: Boolean,
    template: Object,
    addBtnClass: {'type': String, default: 'text-center'}
  },
  emits:['update:modelValue','add','delete'],
  data() {
    return {
      disabledDel: {}
    }
  },
  computed: {
    disableItems() {
      return Object.keys(this.disabledDel)
    },
    show_add() {
      if (this.disableAdd) {
        return false
      }
      const l = this.$helper.ifHas(this.modelValue, 0, 'length')
      return !(this.size && l >= this.size);
    }
  },
  methods: {
    t(k) {
      if (this.translate) {
        return this.$t(k)
      }
      return k
    },
    disDel(value) {
      this.disabledDel[value] = true
    },
    add() {
      if (this.show_add) {
        let a = this.modelValue || []
        let b = {}
        if (this.template) {
          for (let k in this.template) {
            let d = this.template[k]['default'] !== undefined ? this.template[k]['default'] : null
            if (typeof d === 'object') {
              d = this.$helper.clearProxy(d)
            }
            b[k] = d
          }
        }
        a.push(b)
        this.$emit('add', true)
        this.$emit('update:modelValue', a)
      }
    },
    del(i) {
      let a = this.modelValue || []
      a.splice(i, 1)
      this.$emit('delete', i)
      this.$emit('update:modelValue', a)
    },
    up(i) {
      if (i === 0) {
        return
      }
      let a = this.modelValue || []
      a = this.array_move(a, i, i - 1)
      this.$emit('update:modelValue', a)
    },
    down(i) {
      if (i === this.modelValue.length - 1) {
        return
      }
      let a = this.modelValue || []
      a = this.array_move(a, i, i + 1)
      this.$emit('update:modelValue', a)
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
