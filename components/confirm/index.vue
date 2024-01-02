<template>
  <r-modal :closebtn="false" :model-value="modelValue">
    <r-card>
      <r-container class="container-fluid">
        <r-row>
          <r-col class="col-12 text-center">
             <h2 class="title-1">
               {{ title || $t('confirm_title', 'renusify') }}
             </h2>
            <r-divider class="my-3 color-warning"></r-divider>
          </r-col>
          <r-col class="col-12">
            {{text||$t('confirm_body','renusify')}}
          </r-col>
          <r-col class="col-12 mb-2 pt-0" v-if="hard">
            <r-form v-model="valid">
              <r-text-input :label="$t(['confirm_code',[inputKey]],'renusify')"
                            :rules="['required','match:'+inputKey]"
                            v-model.number="inputVal"></r-text-input>
            </r-form>
          </r-col>
        </r-row>
        <r-row class="h-end no-gutters">
          <r-btn :loading="this.loading"
                 @click.stop="cancel"
                 class="color-error-text mx-1"
                 outlined
                 rounded
                 v-if="!this.loading">
            {{cancelText||$t('cancel','renusify')}}
          </r-btn>
          <r-btn :disabled="hard&&!valid"
                 :loading="this.loading"
                 @click.stop="confirm"
                 class="color-success-text"
                 outlined
                 rounded>{{confirmText||$t('accept','renusify')}}
          </r-btn>
        </r-row>
      </r-container>
    </r-card>
  </r-modal>
</template>

<script>
export default {
  name: 'r-confirm',
  props: {
    title: String,
    text: String,
    cancelText: String,
    confirmText: String,
    modelValue: Boolean,
    hard: Boolean
  },
  emits:['accept','cancel'],
  data () {
    return {
      valid: false,
      inputVal: null,
      inputKey: null,
      loading: false
    }
  },
  watch: {
    modelValue: function () {
      this.resetState()
    }
  },
  methods: {
    resetState () {
      this.inputKey = this.$helper.randomInt(10, 99)
      this.inputVal = null
      this.loading = false
    },
    confirm () {
      if (this.hard && (this.inputKey !== this.inputVal)) {
        this.cancel()
      } else {
        this.loading = true
        this.$emit('accept')
      }
    },
    cancel () {
      this.loading = true
      this.$emit('cancel')
    }
  }
}
</script>
