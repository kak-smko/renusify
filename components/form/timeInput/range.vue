<template>
  <div :class="`${$r.prefix}timepicker-range`">
    <r-input
        v-bind="$attrs"
        :active="active"
        :model-value="lazyValue[1]"
        @click.prevent="show_modal = true"
    >
      <input
          type="text"
          @focusin="active = true"
          @focusout="active = false"
          autocomplete="no"
          ref="input"
          :value="strVal"
      />
    </r-input>
    <r-modal
        class="modal-timepicker"
        v-model="show_modal"
        :closebtn="false"
        :no-overlay="noOverlay"
    >
      <div class="pt-3">
        <div class="px-2 title">
          <span>{{ $t('from', 'renusify') }}: </span>
          <span v-if="lazyValue[0]">{{ lazyValue[0] }} - </span>
          <span>{{ $t('to', 'renusify') }}: </span>
          <span v-if="lazyValue[1]">{{ lazyValue[1] }}</span>
        </div>
        <timepicker
            v-if="state==='from'"
            class="mb-2 mx-3"
            is24Hour
            :withSec="withSec"
            v-model="lazyValue[0]"
        ></timepicker>
        <timepicker
            v-if="state==='to'"
            class="mb-2 mx-3"
            is24Hour
            :withSec="withSec"
            :disableTime="disableTime"
            v-model="lazyValue[1]"
        ></timepicker>
        <r-btn
            class="color-success-text ml-7 mr-9 mb-3 mt-3"
            outlined
            @click.prevent="accept"
        >
          {{ $t('accept', 'renusify') }}
        </r-btn
        >
        <r-btn
            class="color-warning-text mr-7 ml-4 mb-3 mt-3"
            outlined
            @click.prevent="(show_modal = false), (lazyValue = []),emit()"
        >
          {{ $t('cancel', 'renusify') }}
        </r-btn
        >
      </div>
    </r-modal>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {
  name: "r-time-picker-range",
  components: {Timepicker:defineAsyncComponent(()=>import('./timepicker.vue'))},
  props: {
    withSec: Boolean,
    noOverlay: Boolean,
    modelValue: Array
  },
  emits:['update:modelValue'],
  data() {
    return {
      state: 'from',
      active: false,
      show_modal: false,
      lazyValue: this.modelValue || []
    };
  },
  watch: {
    modelValue: function () {
      this.lazyValue = this.modelValue
    }
  },
  computed: {
    strVal() {
      if (this.lazyValue.length > 0) {
        return this.lazyValue[0] + ' - ' + this.lazyValue[1]
      }
      return ''
    },
    fromH() {
      if (!this.lazyValue[0]) {
        return 0
      }
      return this.lazyValue[0].split(':')[0]
    },
    fromM() {
      if (!this.lazyValue[0]) {
        return 0
      }
      return this.lazyValue[0].split(':')[1]
    },
    fromS() {
      if (!this.lazyValue[0]) {
        return 0
      }
      return this.lazyValue[0].split(':')[2]
    }
  },
  methods: {
    disableTime(n, t, h, m) {
      if (t === 'hours24' && n < this.fromH && n > 0) {
        return true
      }

      if (t === 'mins' && h.toString() === this.fromH && (this.withSec ? n < this.fromM : n <= this.fromM)) {
        return true
      }

      if (this.withSec) {
        if (t === 'seconds' && h.toString() === this.fromH && m.toString() === this.fromM && n <= this.fromS) {
          return true
        }
      }
    },
    str2int(s) {
      if (!s) {
        return 0
      }
      return parseInt(this.$helper.replacer(s, ':', ''))
    },
    accept() {
      if (this.state === 'to') {
        if (this.lazyValue.length === 2 && this.str2int(this.lazyValue[0]) < this.str2int(this.lazyValue[1])) {
          this.state = 'from'
          this.show_modal = false
          this.emit()
        } else {
          console.error(`from:${this.str2int(this.lazyValue[0])} > to:${this.str2int(this.lazyValue[1])}`)
        }
      } else {
        this.state = 'to'
      }

    },
    emit() {
      this.$emit("update:modelValue", this.lazyValue);
    }
  }
};
</script>

<style lang="scss">
.modal-timepicker {
  .modal-mini {
    max-width: 285px !important;
  }
}
</style>
