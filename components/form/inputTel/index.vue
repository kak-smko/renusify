<template>
    <div :class="`${$r.prefix}input-tel`">
        <r-modal
                v-model="open"
        >
            <r-card class="pa-2">
                <r-text-input
                        :label="$t('search','renusify')"
                        v-model="search"
                ></r-text-input>
                <r-list :items="countries" :filter="search" @update:model-value="choose">
                    <template v-slot="{item}">
                        <div
                                :class="item.iso2.toLowerCase()"
                                class="iti-flag"></div>
                        <div class="list-title">{{item.name}}</div>
                        <r-spacer></r-spacer>
                        <span class="ltr">+{{ item.dialCode }}</span>
                    </template>
                </r-list>
            </r-card>
        </r-modal>
        <r-btn class="btn-country ltr mx-1"
               :rounded="!tile" :disabled="!select" @click.stop="toggleDropdown" outlined>
            <div :class="activeCountry.iso2.toLowerCase()" class="iti-flag"></div>
            <span class="country-code pa-1"> +{{ activeCountry.dialCode }} </span>
            <span class="dropdown-arrow">{{ open ? "▲" : "▼" }}</span>
        </r-btn>
      <r-text-input class="input-phone" :label="label?label:$t('phone','renusify')"
                    @update:model-value="emit"
                    :tile="tile"
                    :rules="[required&&'required']"
                    v-model="tel.phone"
      >
      </r-text-input>

    </div>
</template>

<script>
    import allCountries from './assets/all-countries.js'

    export default {
        name: 'inputTel',
        props: {
            label: {
                type: String
            },
            modelValue: {
                type: Object,
                default: () => {
                    return {
                        'phone': '',
                        'country_code': ''
                    }
                }
            },
            defaultCountry: {
                // Default country code, ie: 'AU'
                // Will override the current country of user
                type: String,
                default: ''
            },
            tile: Boolean,
            required: Boolean,
            select: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                tel: this.modelValue,
                search: '',
                countries: [],
                activeCountry: {iso2: 'US', dialCode: '1'},
                open: false
            }
        },
        mounted() {
            this.initializeCountry()
            this.countries = allCountries
        },
        created() {
            if (this.modelValue) {
                this.activeCountry.dialCode = this.modelValue.country_code
            }
        },
        methods: {
            initializeCountry() {
                /**
                 * 1. Use default country if passed from parent
                 */
                if (this.defaultCountry) {
                    const defaultCountry = this.findCountry(this.defaultCountry)
                    if (defaultCountry) {
                        this.activeCountry = defaultCountry
                        return
                    }
                }
                /**
                 * 2. Check if fetching country based on user's IP is allowed, set it as the default country
                 */
                fetch('http://ip-api.com/json/', {
                    method: 'get'
                }).then((response) => {
                    const that = this
                    response.json().then(function (data) {
                        that.activeCountry = that.findCountry(data.countryCode) || that.activeCountry
                    })
                }).catch((error) => {
                    return Promise.reject(error)
                })
            },
            /**
             * Get the list of countries from the list of iso2 code
             */
            getCountries(list = []) {
                return list
                    .map(countryCode => this.findCountry(countryCode))
                    .filter(Boolean)
            },
            findCountry(iso = '') {
                return allCountries.find(country => country.iso2 === iso)
            },

            choose(country) {
                this.activeCountry = country
                this.emit()
                this.reset()
            },
            reset() {
                this.search = ''
                this.countries = allCountries
                this.open = false
            },

            emit(e) {
                this.tel.country_code = this.activeCountry.dialCode
                if (this.tel.phone.startsWith('0')) {
                    setTimeout(() => {
                        this.tel.phone = this.tel.phone.substr(1, this.tel.phone.length)
                        this.$emit('update:modelValue', this.tel)
                    }, 1)
                } else {
                    this.$emit('update:modelValue', this.tel)

                }

            },
            toggleDropdown() {
                this.open = !this.open
            },
            clickedOutside() {
                this.open = false
            }
        }
    }
</script>

<style src="./assets/sprite.css"></style>
<style lang="scss">
    @import "../../../style/include";

    .#{$prefix}input-tel {
        display: flex;
        align-items: baseline;
        direction: ltr;

        .btn-country {
            width: 120px;
            @include light() {
                border-color: var(--color-border-light)
            }
            @include dark() {
                border-color: var(--color-border-dark)
            }
        }

        .input-phone {
            width: calc(100% - 120px);
        }
    }
</style>