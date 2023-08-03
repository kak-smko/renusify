<template>
  <r-select-input
      :label="$t('country','renusify')"
      v-model="country"
      v-if="!defaultCountry"
      @update:model-value="emit(true,true)"
      value="id"
      :searchLink="`https://codenus.com/api/apps/address?lang=${$r.lang}`"
      :rules="required?['required']:[]"
      :headers="{'Authorization':''}"
      :tile="tile">
  </r-select-input>
  <r-select-input :label="$t('state','renusify')"
                  v-model="state"
                  :disabled="!country"
                  :key="country&&country['id']"
                  v-if="!hideState"
                  @update:model-value="emit(false,true)"
                  :searchLink="country&&`https://codenus.com/api/apps/address/${country['id']}?lang=${$r.lang}`"
                  :rules="required?['required']:[]"
                  value="id"
                  :headers="{'Authorization':''}"
                  :tile="tile">

  </r-select-input>
  <r-select-input v-if="!hideCity"
                  v-model="city"
                  :disabled="!state"
                  :key="state&&(country['id']+'-'+state['id'])"
                  @update:model-value="emit(false,false)"
                  :label="$t('city','renusify')"
                  :searchLink="state&&`https://codenus.com/api/apps/address/${country['id']}/${state['id']}?lang=${$r.lang}`"
                  :rules="required?['required']:[]"
                  value="id"
                  :headers="{'Authorization':''}"
                  :tile="tile">

  </r-select-input>
  <r-text-input v-if="!hideZipCode" @update:model-value="emit(false,false)"
                :label="$t('zip_code','renusify')"
                v-model="zip_code"
                :tile="tile"
                :rules="required?['required']:[]"></r-text-input>
  <r-text-area v-if="!hideStreet" @update:model-value="emit(false,false)"
               :label="$t('street','renusify')"
               v-model="street"
               :tile="tile"
               :rules="required?['required']:[]"></r-text-area>
</template>
<script>

export default {
  name: 'r-address',
  inheritAttrs: false,
  props: {
    required: Boolean,
    allowCountries: Array,
    hideState: Boolean,
    hideCity: Boolean,
    hideZipCode: Boolean,
    hideStreet: Boolean,
    tile: {type: Boolean, default: undefined},
    defaultCountry: Object,
    modelValue: Object
  },
  data() {
    return {
      country: this.modelValue ? this.modelValue.country : this.defaultCountry,
      state: this.modelValue ? this.modelValue.state : null,
      city: this.modelValue ? this.modelValue.city : null,
      zip_code: this.modelValue ? this.modelValue.zip_code : null,
      street: this.modelValue ? this.modelValue.street : null
    }
  },
  watch: {
    modelValue() {
      this.country = this.modelValue ? this.modelValue.country : null
      this.state = this.modelValue ? this.modelValue.state : null
      this.city = this.modelValue ? this.modelValue.city : null
      this.zip_code = this.modelValue ? this.modelValue.zip_code : null
      this.street = this.modelValue ? this.modelValue.street : null
    }
  },
  methods: {
    emit(clearState = false, clearCity = false) {
      setTimeout(() => {
        let r = {
          country: this.country,
        }
        if (clearState) {
          this.state = null
        }
        if (!this.hideState) {
          r['state'] = this.state
        }
        if (clearCity) {
          this.city = null
        }
        if (!this.hideCity) {
          r['city'] = this.city
        }
        if (!this.hideStreet) {
          r['street'] = this.street
        }
        if (!this.hideZipCode) {
          r['zip_code'] = this.zip_code
        }
        this.$emit('update:model-value', r)
      }, 10)
    }
  }
}

</script>
