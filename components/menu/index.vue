<template>
  <div :class="$r.prefix+'menu'" v-click-outside="close" ref="menu">
    <div class="d-flex h-start flex-row v-center">
      <span class="menu-label" v-if="label" @click.prevent="open">{{ label }}</span>
      <transition name="fade" mode="out-in">
        <!-- Header Navigation Menu Icons -->
        <r-btn icon text v-if="show" key="on" @click.prevent="close">
          <r-icon v-html="$r.icons.chevron_up"></r-icon>
        </r-btn>
        <r-btn icon text v-else key="off" @click.prevent="open">
          <r-icon v-html="icon||$r.icons.chevron_down"></r-icon>
        </r-btn>

      </transition>
      <div class="dropdown-menu mt-1"
           v-if="show"
           :style="{
                    'top':top+'px',
                    'left':left,
                    'right':right,
                    'opacity':opacity
                }">
        <r-card>
          <div class="dropdown-menu-item pa-2" v-for="(item,i) in list" :key="i"
               :class="{'menu-selected':selected===item[value]}"
               @click.prevent="emit(item)">
            <slot :item="item">
              {{ item }}
            </slot>
          </div>
        </r-card>
      </div>

    </div>
  </div>
</template>
<script>

export default {
  name: 'r-menu',

  props: {
    modelValue: {
      type: [String, Number, Object]
    },
    label: String,
    icon: {
      type: String
    },
    value: {
      type: String,
      default: 'value'
    },
    justValue: Boolean,
    reverse: Boolean,
    overlay: Boolean,
    items: Array
  },
  emits:['update:modelValue'],
  data() {
    return {
      show: false,
      top: null,
      left: null,
      right: null,
      opacity: 0
    }
  },
  computed: {
    list() {
      let r = []
      if (this.items) {
        this.items.forEach((item) => {
          if (typeof item === 'object') {
            r.push(item)
          } else {
            r.push({'name': item, [this.value]: item})
          }
        })
      }
      return r
    },
    selected() {
      if (!this.modelValue) {
        return null
      }
      return this.justValue ? this.modelValue : this.modelValue[this.value]
    }
  },
  methods: {
    emit(item) {
      this.$emit('update:modelValue', this.justValue ? item[this.value] : item)
      this.close()
    },
    open() {
      const elm = this.$refs.menu.getBoundingClientRect()
      this.top = -20
      if (!this.overlay) {
        this.top += elm.height
      }
      this.opacity = 0
      if (this.reverse) {
        if (!this.$r.rtl) {
          this.right = 0
        } else {
          this.left = 0
        }
      } else {
        if (!this.$r.rtl) {
          this.left = 0
        } else {
          this.right = 0
        }
      }

      this.show = true
      setTimeout(() => {
        this.top = this.top + 20
        this.opacity = 1
      }, 10)

    }, close() {
      this.top = this.top - 20
      this.opacity = 0
      setTimeout(() => {
        this.show = false
      }, 200)

    }
  }
}
</script>
<style lang="scss">
@import "../../style/include";


.#{$prefix}menu {
  position: relative;

  .menu-selected {
    position: relative;
    color: var(--color-one);

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background-color: var(--color-one);
      opacity: .1;
      width: 100%;
      height: 100%;
    }
  }

    .dropdown-menu {
      border: 1px solid var(--color-border);

      &-item:hover {
        background-color: var(--color-sheet-container-high);
      }
    }

  .menu-label {
    cursor: pointer;
  }

  .dropdown-menu {
    scroll-behavior: smooth;
    transition: all .3s ease;
    position: absolute;
    z-index: 10;
    min-width: 150px;
    max-height: 200px;
    overflow-y: auto;
    background-clip: padding-box;
    border-radius: map-get($borders, 'sm');

    &-item {
      cursor: pointer;
    }

  }
}


</style>