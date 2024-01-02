<template>
  <r-input class="mt-3" :class="{[`${this.$r.prefix}radio-input`]:true,'radio-input-readonly': readonly}"
           :modelValue="modelValue" hide labelControlClass="label-fixed">
    <div class="mt-2" v-for="(item,i) in list" :key="i"
         :class="{'d-flex v-end': true}">
            <span class="radio-input-item" :class="{
                   'br-circle':rounded,
                   'radio-input-select':current===item.value
               }" @click="emit(item)">
                   <transition name="scale">
                       <r-icon v-if="current===item.value" class="color-white-text"
                               v-html="$r.icons.check" exact></r-icon>
                   </transition>
            </span>
      <span class="ms-2" @click="emit(item)">
                {{ item[text] }}
            </span>
    </div>
  </r-input>
</template>
<script>
export default {
  name: 'r-radio-input',
  props: {
    items: {
      type: Array, default: () => {
        return []
      }
    },
    text: {type: String, default: 'title'},
    readonly: Boolean,
    rounded: Boolean,
    justValue: Boolean,
    translate: Boolean,
    modelValue: [String, Number, Object]
  },
  emits:['update:modelValue'],
  computed: {
    current() {
      if (!this.modelValue) {
        return null
      }
      return this.justValue ? this.modelValue : this.modelValue.value
    },
    list() {
      const l = this.items.length
      if (typeof this.items[0] === 'object') {
        return this.items
      }
      let r = []
      for (let i = 0; i < l; i++) {
        r.push({[this.text]: this.translate ? $t(this.items[i]) : this.items[i], 'value': this.items[i]})
      }
      return r
    }
  },
  methods: {
    emit(val) {
      if (this.readonly) {
        return
      }

      this.$emit('update:modelValue', this.justValue ? val.value : val)
    }
  }
}

</script>
<style lang="scss">
@import "../../style/include";

.#{$prefix}radio-input {
  width: 100%;
  cursor: pointer;

  .radio-input-item {
    border: 1px solid var(--color-border)
  }

  .#{$prefix}icon {
    width: 20px;
    height: 20px;
  }

  .radio-input-item {
    text-align: center;
    width: 25px;
    height: 25px;
    border-radius: map-get($borders, 'sm');
    transition: .3s all ease-in-out;
  }

  &.radio-input-readonly {
    pointer-events: none;
  }

  .radio-input-select {
    background-color: currentColor;
  }
}
</style>