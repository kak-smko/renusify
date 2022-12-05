<template>
    <div :class="$r.prefix+'password'" >
        <r-input v-bind="$attrs"
                 :active="active"
                 :model-value="modelValue"
                 @click.prevent="handleClick"
                 :error="errorState"
                 :preIcon="show?$r.icons.eye_off:$r.icons.eye"
                 ltr
                 @preIcon="show=!show"
        >
            <input :autofocus="autofocus"
                   :type="show?'text':'password'"
                   class="pb-0"
                   @focusin="active=true"
                   @focusout="active=false"
                   @input="emit"
                   autocomplete="no"
                   ref="input"
                   v-model="lazyValue"
            />
        </r-input>
        <template v-if="!hideLine">
        <div :class="{'color-success-text':hasLength,'color-error-text':!hasLength}">
            <r-icon v-if="hasLength" exact v-html="$r.icons.check"></r-icon>
            <r-icon v-else v-html="$r.icons.close"></r-icon>
            {{$t(['min_length_password',[minLength]])}}
        </div>
        <div v-if="lowerCase" :class="{'color-success-text':hasLowerCase,'color-error-text':!hasLowerCase}">
            <r-icon v-if="hasLowerCase" exact v-html="$r.icons.check"></r-icon>
            <r-icon v-else v-html="$r.icons.close"></r-icon>
            {{$t('lower_case_password')}}
        </div>
        <div v-if="number" :class="{'color-success-text':hasNumber,'color-error-text':!hasNumber}">
            <r-icon v-if="hasNumber" exact v-html="$r.icons.check"></r-icon>
            <r-icon v-else v-html="$r.icons.close"></r-icon>
            {{$t('number_password')}}
        </div>
        <div v-if="upperCase" :class="{'color-success-text':hasUpperCase,'color-error-text':!hasUpperCase}">
            <r-icon v-if="hasUpperCase" exact v-html="$r.icons.check"></r-icon>
            <r-icon v-else v-html="$r.icons.close"></r-icon>
            {{$t('upper_case_password')}}
        </div>
        <div v-if="specialChar" :class="{'color-success-text':hasSpecialChar,'color-error-text':!hasSpecialChar}">
            <r-icon v-if="hasSpecialChar" exact v-html="$r.icons.check"></r-icon>
            <r-icon v-else v-html="$r.icons.close"></r-icon>
            {{$t('special_char_password')}}
        </div>
            </template>
    </div>
</template>
<script>
    export default {
        name: 'r-password',
        props: {
            modelValue: [String, Number],
            hideLine: Boolean,
            autofocus: Boolean,
            lowerCase: {type:Boolean,default:true},
            upperCase: Boolean,
            specialChar: Boolean,
            number: Boolean,
            minLength: {type:Number,default:8},
        },

        data() {
            return {
                lazyValue: this.modelValue,
                show: false,
                active: false,
                p: 0,
                errorState: false
            }
        },
        computed: {
            hasLength(){
                if(!this.lazyValue){
                    return false
                }
                return this.lazyValue.length>=this.minLength
            },
            hasUpperCase(){
                return new RegExp("^(?=.*[A-Z])").test(this.lazyValue)
            },
            hasNumber(){
                return new RegExp("^(?=.*[0-9])").test(this.lazyValue)
            },
            hasLowerCase(){
                return new RegExp("^(?=.*[a-z])").test(this.lazyValue)
            },
            hasSpecialChar(){
                return new RegExp("^(?=.*[!@#\$%\^&\*])").test(this.lazyValue)
            }
        },

        methods: {
            check() {
                if (!this.hasLength) {
                    this.errorState = true
                }
                if (this.lowerCase&&!this.hasLowerCase) {
                    this.errorState = true
                }
                if (this.number&&!this.hasNumber) {
                    this.errorState = true
                }
                if (this.upperCase&&!this.hasUpperCase) {
                    this.errorState = true
                }
                if (this.specialChar&&!this.hasSpecialChar) {
                    this.errorState = true
                }

            },
            handleClick(e) {
                this.$refs.input.focus()
            },
            emit() {
                this.$emit('update:modelValue', this.lazyValue)
                this.errorState = false
                this.msg = null
                if (this.lazyValue&& !this.hideLine) {
                    this.check()
                }
            }
        }
    }

</script>