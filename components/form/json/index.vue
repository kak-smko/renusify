<template>
  <div :class="[`${$r.prefix}json-input`,{'input-tile':c_tile}]">
    <div class="d-flex v-center">
      <r-btn v-if="!disableEditKey" class="me-1 mb-1" icon @click.prevent="modeForm=!modeForm">{}</r-btn>
      <div v-if="label">{{ label }}</div>
    </div>
    <div v-if="modeForm">
      <json-view :model-value="modelValue"
                 @update:model-value="emit"
                 :template="template"
                 :disableAdd="disableAdd"
                 :disableDel="disableDel"
                 :translate="translate"
                 :tile="tile"
      ></json-view>
      <r-btn
          v-if="!show &&!disableAdd"
          class="my-3 ms-1"
          icon
          size="small"
          @click.prevent="open">
        <r-icon v-html="$r.icons.plus"></r-icon>
      </r-btn>
      <div v-else-if="show" class="d-flex v-baseline">
        <r-text-input
            v-if="!is_array"
            v-model="info.key"
            :label="keyLabel||$t('key','renusify')"
            :tile="tile"
            class="w-30 pe-1"></r-text-input>
        <div class="w-20" v-if="!valueType">
          <r-select-input v-model="info.type"
                          :items="['text','number','boolean','json','array']"
                          :tile="tile"
                          :translate="translate"
                          class="me-1"
                          disableSearch
                          firstSelect
                          just-value
                          @update:model-value="info.value=null"></r-select-input>
        </div>
        <r-text-input v-if="info.type==='text'"
                      :tile="tile"
                      :label="valueLabel||$t('value','renusify')"
                      v-model="info.value"></r-text-input>
        <r-number-input v-else-if="info.type==='number'"
                        :tile="tile"
                        v-model="info.value" :label="valueLabel||$t('value','renusify')"></r-number-input>
        <r-switch-input v-else-if="info.type==='boolean'"
                        :tile="tile"
                        v-model="info.value" :label="valueLabel||$t('value','renusify')"></r-switch-input>
        <r-btn @click.prevent="add" class="ms-1 color-success" rounded>{{ $t('add', 'renusify') }}</r-btn>
      </div>
    </div>
    <div v-else :class="{'state-error':error}" class="json-highlight ltr">
      <textarea
          v-model="lazyValue"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          class="ltr w-full"
          spellcheck="false"
          :rows="modelValue?Object.keys(modelValue).length+5:5"
          @keydown="setTab"
      ></textarea>
      <div class="text-preview" v-html="build"></div>
    </div>
  </div>
</template>
<script>
import JsonView from "./JsonView";
import mixin from 'renusify/components/codeEditor/mixin'

export default {
  name: 'r-json',
  components: {JsonView},
  mixins: [mixin],
  props: {
    label: String,
    keyLabel: {type: String, default: 'key'},
    valueLabel: {type: String, default: 'value'},
    modelValue: {
      type: Object, Array
    },
    valueType: {
      type: String,
      validator: function (value) {
        return ['text', 'number', 'boolean'].indexOf(value) !== -1
      }
    },
    template: Object,
    baseArray: Boolean,
    disableAdd: Boolean,
    tile: {type: Boolean, default: undefined},
    disableEditKey: Boolean,
    disableDel: Boolean,
    translate: Boolean
  },
  emits: ['update:modelValue'],
  data() {
    return {
      lazyValue: '',
      modeForm: true,
      error: false,
      show: false,
      info: {}
    }
  },
  watch: {
    modeForm: function () {
      this.lazyValue = JSON.stringify(this.modelValue || {}, null, 4)
    },
    modelValue: function () {
      try {
        this.error = false
        if (JSON.stringify(JSON.parse(this.lazyValue)) !== JSON.stringify(this.modelValue)) {
          this.lazyValue = JSON.stringify(this.modelValue || {}, null, 4)
        }
      } catch (er) {
        this.error = true
      }

    },
    lazyValue: function () {
      try {
        this.error = false
        this.$emit('update:modelValue', JSON.parse(this.lazyValue))
      } catch (er) {
        this.error = true
      }
    },
  },
  computed: {
    c_tile() {
      if (this.tile === undefined && this.$r.inputs.tile) {
        return this.$r.inputs.tile
      }
      return this.tile
    },
    build() {
      if (!this.lazyValue) {
        return "";
      }
      let res = this.lazyValue
      res = this.re_quote(res);
      res = this.re_words(res, [true, false, null]);
      res = this.re_number(res);
      res = this.re_special(res, /([{},:\[\]])/g, 'color-orange');
      return res;
    },
    is_array() {
      if (this.baseArray) {
        return true
      }
      return Array.isArray(this.modelValue)
    }
  },
  methods: {
    open() {
      if (this.template) {
        let d = this.modelValue
        if (!d) {
          d = []
        }
        d.push(Object.assign({}, {}, this.template))
        this.$emit('update:modelValue', d)
      } else {
        if (this.valueType) {
          this.info.type = this.valueType
        }
        this.show = true
      }
    },

    emit(e) {
      this.$emit('update:modelValue', e)
    },
    add() {
      let d = this.modelValue
      if (!d) {
        if (this.baseArray) {
          d = []
        } else {
          d = {}
        }
      }
      if (this.info.type === 'json') {
        if (this.is_array) {
          d.push({})
        } else {
          d[this.info.key] = {}
        }
      } else if (this.info.type === 'array') {
        if (this.is_array) {
          d.push([])
        } else {
          d[this.info.key] = []
        }
      } else {
        if (this.is_array) {
          d.push(this.info.value)
        } else {
          d[this.info.key] = this.info.value
        }
      }
      this.show = false
      this.info = {}
      this.$emit('update:modelValue', d)
    }
  }
}
</script>
<style lang="scss">
@import "~renusify/style/include";

.#{$prefix}json-input {
  background: var(--color-sheet-container);
  padding: 5px;

  &.input-tile {
    border-radius: map-get($borders, 'sm');
  }

  &:not(.input-tile) {
    border-radius: map-get($borders, 'xl');
  }

  .input-control {
    background: var(--color-sheet-container-low);
  }

  textarea {
    outline: none;
    border: 1px solid var(--color-sheet-low);
  }

  .state-error {
    border: 1px solid var(--color-error);
  }

  .json-highlight {
    position: relative;
    margin: -12px 0;

    .text-preview {
      white-space: pre-wrap;
      word-break: keep-all;
      overflow-wrap: break-word;
      min-height: 40px;
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 20px;
      margin: 0;
      border: 0;
      padding: 12px;
    }

    textarea {
      &::selection {
        background-color: var(--color-one);
        -webkit-text-fill-color: var(--color-one-text);
        color: var(--color-one-text);
      }

      padding: 12px;
      margin: 0;
      border: 0;
      font-size: 14px;
      letter-spacing: 2px;
      line-height: 20px;
      -webkit-font-smoothing: antialiased;
      -webkit-text-fill-color: transparent;
      outline: none;
      width: 100%;
      height: 100%;
      min-height: 40px;
      white-space: pre-wrap;
      word-break: keep-all;
      overflow-wrap: break-word;
      position: absolute;
      top: 0;
      left: 0;
      resize: none;
      overflow: hidden;
    }

    .color-orange {
      color: var(--color-error);
    }

    .color-green {
      color: var(--color-success);
    }


    .color-blue {
      color: var(--color-info);
    }
  }
}
</style>
