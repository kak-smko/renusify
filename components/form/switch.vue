<template>
    <r-input :class="`${$r.prefix}switch`" :modelValue="lazyValue" hide>
        <div class="switch-container" :class="{'switch-active':modelValue}">
            <div class="switch-label me-1 mt-1"
                 :class="{
                'color-primary-text':label2?modelValue:!modelValue
            }"
            >{{label}}
            </div>
            <div class="switch-holder" @click="toggle()">
                <div class="switch-line"></div>
                <div class="switch-dot"></div>
            </div>
            <div class="switch-label ms-1 mt-1"
                 :class="{
                'color-primary-text':label2?!modelValue:modelValue
            }"
                 v-if="label2">{{label2}}</div>
        </div>
    </r-input>
</template>
<script>
    import './scss/switch.scss'

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
