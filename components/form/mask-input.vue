<template>
    <r-input :error="error?true:false" :rules="required?['required']:[]" :msg="error?error:undefined" :modelValue="lazyVal" :active="active" class="ltr">
        <input
                v-model="lazyVal"
                @complete="onComplete"
                @accept="onAccept"
                @backspace="onBackspace"
                autocomplete="no"
                @paste.prevent="onPaste"
                @focusin="active=true"
                @focusout="active=false"
                v-mask="mask"
        />

    </r-input>
</template>

<script>
    import Mask from '../../directive/mask'

    export default {
        name: 'r-mask-input',
        directives: {
            mask: Mask
        },
        props: {
            modelValue: String,
            mask: {
                default: '',
                type: String
            },
            required: {
                default: false,
                type: Boolean
            },
            maskedVal: {
                default: false,
                type: Boolean
            },
        },
        data() {
            return {
                lazyVal: this.modelValue?this.build_mask(this.modelValue, this.mask):null,
                active: false,
                complete: false
            }
        },
        watch: {
            modelValue: function () {
                this.lazyVal = this.build_mask(this.modelValue, this.mask)
            }
        },
        computed: {
            error() {
                if (this.required && !this.complete) {
                    return this.lazyVal!==null?this.$t('required_error','renusify'):false
                } else {
                    return false
                }
            }
        },
        methods: {
            onPaste(e) {
                this.lazyVal = this.build_mask(e.clipboardData.getData('Text')
                    .replace('\r','')
                    .replace('\n','')
                    .trim()
                    , this.mask)
            },
            build_mask(data, mask) {
                if (this.maskedVal || typeof data !== 'string' || data === '') {
                    return data
                }
                let n = 0;
                let dataOutput = '';
                const lng=mask.length
                for (let i = 0; i <lng; i++) {
                    const dataChar = data.charAt(n);
                    const maskChar = mask.charAt(i);
                    switch (maskChar) {
                        case 'N':
                            if (/[0-9]/.test(dataChar)) {
                                dataOutput += dataChar;

                            }
                            n++
                            break;
                        case 'A':
                            if (/[a-z]/i.test(dataChar)) {
                                dataOutput += dataChar;
                            }
                            n++
                            break;
                        case 'B':
                            if (/[a-z0-9]/i.test(dataChar)) {
                                dataOutput += dataChar;
                            }
                            n++
                            break;
                        case 'X':
                            dataOutput += dataChar;
                            n++
                            break;
                        default:
                            dataOutput += maskChar;
                            break;
                    }
                }
                return dataOutput
            },
            onAccept(event) {
                const e = event.detail
                this.complete = false
                if (!this.maskedVal) {
                    this.emit(e.unMasked)
                } else {
                    this.emit(e.masked)
                }

            },
            onBackspace(event) {
                this.complete = false
            },
            onComplete(event) {
                const e = event.detail
                this.complete = true
                if (!this.maskedVal) {
                    this.emit(e.unMasked)
                } else {
                    this.emit(e.masked)
                }
            },

            emit(val) {
                this.$emit('update:modelValue', val)

                this.$emit('complete', this.complete)
            }

        }
    }
</script>
