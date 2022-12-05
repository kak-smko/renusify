<template>
    <teleport :to="`.${$r.prefix}app`">
        <transition :name="animate">
            <div v-bind="$attrs" :class="classes" @click.self="close" v-if="modelValue">
                <div class="modal-container" :style="{'max-width':maxWidth,'max-height':maxHeight}" :class="{
      'modal-bottom':bottom,
      [color]:color,
      ['animate-modal-' +animate]:animate,
     'modal-full-width':fullWidth,
     'modal-full-height':fullHeight,
      'modal-mini':minWidth,
      'modal-flat':flat

    }">
                    <div class="modal-btn text-end">
                        <r-btn class="color-error-text"
                               text
                               @click.prevent="close(true)"
                               fab
                               size="small"
                               v-if="closebtn">
                            <r-icon v-html="$r.icons.close"></r-icon>
                        </r-btn>
                    </div>
                    <div class="modal-content">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script>
    import './style.scss'

    export default {
        name: 'r-modal',
        inheritAttrs: false,
        props: {
            modelValue: Boolean,
            bottom: Boolean,
            noOverlay: Boolean,
            fullWidth: Boolean,
            fullHeight: Boolean,
            maxWidth: String,
            maxHeight: String,
            minWidth: {type: Boolean, default: true},
            flat: Boolean,
            closable: Boolean,
            closebtn: {type: Boolean, default: true},
            color: String,
            animate: {
                type: String,
                default: 'slide-up'
            }

        },
        data() {
            return {
                state: null,
                run_animate: false
            }
        },
        watch: {
            modelValue: {
                // immediate: true, watch at created component
                handler: function (newVal, oldVal) {
                    if (newVal === true) {
                        document.documentElement.style.overflow = 'hidden'
                        const that = this
                        window.onpopstate = function (event) {
                            that.$emit('update:modelValue', false)
                        }
                    } else {
                        document.documentElement.style.overflow = null
                    }
                }
            }
        },
        computed: {
            classes() {
                let a = {
                    'h-end': this.bottom,
                    'modal-no-overlay': this.noOverlay,
                    'animate-modal-vibrate': this.run_animate,
                }
                a[`${this.$r.prefix}modal`]=true
                return a
            }
        },
        methods: {
            close(force = false) {
                if (this.closable || force === true) {
                    this.$emit('update:modelValue', !this.modelValue)
                } else {
                    this.run_animate = true
                    setTimeout(() => {
                        this.run_animate = false
                    }, 300)
                }
            }
        },
        beforeUnmount() {
            document.documentElement.style.overflow = null
        }
    }
</script>
