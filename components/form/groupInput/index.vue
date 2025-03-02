<template>
  <r-input :class="`${$r.prefix}group-input`"
           :model-value="modelValue"
           hide>
    <div class="w-full">
      <span v-if="label" class="group-input-label">{{ label }}</span>
      <div :key="key" v-sortable="{grab:'.grab-btn-group-input',end:end}">
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
          <r-btn icon text class="grab-btn-group-input">
            <r-icon v-html="$r.icons.drag"></r-icon>
          </r-btn>
          <r-btn v-if="!disableItems.includes(itemKey?item[itemKey]:'')" icon text @click.prevent="del(i)">
            <r-icon v-html="$r.icons.delete" class="color-error-text"></r-icon>
          </r-btn>
        </div>
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
      key: 0,
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
    end(e) {
      let a = []
      for (let i = 0; i < e.length; i++) {
        a.push(this.modelValue[parseInt(e[i])])
      }
      this.$emit('update:modelValue', a)
      this.key++
    },
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
  }
}
</script>
<style lang="scss">
@use "../../../style/variables/base";
@use "../../../style/mixins";

.#{base.$prefix}group-input {
  .group-input-label {
    color: var(--color-on-sheet);
  }
  .group-holder {
    position: relative;

    .group-action {
      position: absolute;
      top: 0;
      @include mixins.ltr() {
        right: 0;
      }
      @include mixins.rtl() {
        left: 0;
      }
    }
  }
}
</style>
