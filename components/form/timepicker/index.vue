<template>
  <div :class="`${$r.prefix}timepicker`">
    <r-input
        v-bind="$attrs"
        :active="active"
        :model-value="lazyValue"
        @click.prevent="show_modal = true"
    >
      <input
          type="text"
          @focusin="active = true"
          @focusout="active = false"
          @input="emit"
          autocomplete="no"
          ref="input"
          v-model="lazyValue"
      />
    </r-input>
    <r-modal
        class="modal-timepicker"
        v-model="show_modal"
        :closebtn="false"
        :no-overlay="noOverlay"
    >
      <r-card class="pt-3">
        <timepicker
            class="mb-2 mx-3"
            :disableTime="disableTime"
            :is24-hour="is24Hour"
            :withSec="withSec"
            v-model="lazyValue"
        ></timepicker>
        <r-btn
            class="color-success-text ml-7 mr-9 mb-3 mt-3"
            outlined
            @click="show_modal = false,emit()"
        >
          {{ $t('accept', 'renusify') }}
        </r-btn
        >
        <r-btn
            class="color-warning-text mr-7 ml-4 mb-3 mt-3"
            outlined
            @click="(show_modal = false), (lazyValue = null),emit()"
        >
          {{ $t('cancel', 'renusify') }}
        </r-btn
        >
      </r-card>
    </r-modal>
  </div>
</template>

<script>
import Timepicker from "./timepicker";

export default {
  name: "r-time-picker",
  components: {Timepicker},
  props: {
    disableTime: {
      type: Function, default: () => {
        return false
      }
    },
    withSec: Boolean,
    is24Hour: {type: Boolean, default: true},
    noOverlay: Boolean,
    modelValue: String
  },
  emits:['update:modelValue'],
  data() {
    return {
      active: false,
      show_modal: false,
      lazyValue: this.modelValue
    };
  },
  watch: {
    modelValue: function () {
      this.lazyValue = this.modelValue
    }
  },
  methods: {
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
