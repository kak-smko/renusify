<template>
    <div :class="`${$r.prefix}button-group d-flex h-center`" v-click-outside="handleClose">
        <div class="btn-container">
            <r-btn :class="{'button-group-active':k===modelValue}"
                   @click.prevent="emit(k)" :icon="icon" text v-for="(item,k) in items" :key="k">
                <slot :item="item">
                    <r-icon v-if="icon" exact v-html="isSelect?item['icon']:item"></r-icon>
                    <span v-else>{{item}}</span>
                </slot>
            </r-btn>
        </div>
        <transition name="slide-down">
            <r-card v-if="open" class="button-group-select text-center"
            >
                <r-list :items="items[selected]['items']"
                        @update:modelValue="listInput"
                        checked>
                    <template v-slot="{item}">
                    <slot name="list" :item="item">
                        <div class="list-title">{{item['name']}}</div>
                    </slot>
                        </template>
                </r-list>

            </r-card>

        </transition>
    </div>
</template>

<script>
import clickOutside from '../../directive/clickOutSide/index'

export default {
  name: 'r-button-group',
  directives: {
    'click-outside': clickOutside
  },
  props: {
    items: [Array, Object],
    icon: {
      type: Boolean,
      default: true
    },
    isSelect: Boolean,
    exact: Boolean,
    modelValue: [Number,String]
  },
  data () {
    return {
      open: false,
      selected: null
    }
  },
  methods: {
    handleClose () {
      this.open = false
    },
    emit (k) {
      if (this.isSelect) {
        this.selected = k
        this.$emit('open', true)
        this.open = true
      } else {
        this.$emit('update:modelValue', k)
      }
    },
    listInput (e) {
      this.$emit('open', false)
      this.$emit('update:modelValue', { menu: this.selected, item: e })
      this.open = false
    }
  }
}
</script>
