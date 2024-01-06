<template>
    <r-input :class="`${$r.prefix}switch`" :modelValue="lazyValue" hide>
        <div class="switch-container" :class="{'switch-active':modelValue}">
            <div class="switch-label me-1 mt-1"
            >{{label}}
            </div>
            <div class="switch-holder" @click.prevent="toggle()">
              <div class="switch-line"></div>
              <div class="switch-dot"></div>
            </div>
            <div class="switch-label ms-1 mt-1"
                 v-if="label2">{{label2}}</div>
        </div>
    </r-input>
</template>
<script>

    export default {
        name: 'r-switch',
        props: {
            label: String,
            label2: String,
            readonly: Boolean,
            modelValue: {
                type: [Boolean, String]
            }
        },
emits:['update:modelValue','change'],
        data() {
            return {
                lazyValue: this.modelValue || false

            }
        },
        watch: {
            modelValue() {
                this.lazyValue = this.modelValue
            }
        },
        methods: {
            toggle() {
                if (!this.readonly) {
                    if (this.lazyValue === true) {
                        this.lazyValue = false
                        this.$emit('change', true)
                        this.$emit('update:modelValue', false)
                    } else {
                        this.lazyValue = true
                        this.$emit('change', true)
                        this.$emit('update:modelValue', true)
                    }
                }
            }
        }
    }

</script>
<style lang="scss">
@import "renusify/style/_include.scss";

.#{$prefix}switch {

  .switch-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
  }

  .switch-holder {
    width: 45px;
    height: 13px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .switch-line {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: var(--color-sheet-container);
  }

  .switch-dot {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #cdcbcb;
    transition: .3s map_get($transition,'fast-in-fast-out');
    @include rtl() {
      right: 0;
    }
    @include ltr() {
      left: 0;
    }
  }

  .switch-active {
    .switch-line {
      background-color: currentColor;
      opacity: 0.5;
    }

    .switch-dot {
      background-color: currentColor;
      @include rtl() {
        right: 25px;
      }
      @include ltr() {
        left: 25px;
      }
    }
  }

}
</style>