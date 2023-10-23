<template>
  <div :class="`${$r.prefix}json-input`">
    <div class="d-flex v-center">
      <r-btn v-if="!disableEditKey" class="me-1 mb-1" icon @click="modeForm=!modeForm">{}</r-btn>
      <div v-if="label">{{ label }}</div>
    </div>
    <div v-if="modeForm">
      <json-view :model-value="modelValue"
                 @update:model-value="emit"
                 :template="template"
                 :disableAdd="disableAdd"
                 :disableDel="disableDel"
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
            :label="keyLabel"
            :tile="tile"
            class="w-30 pe-1"></r-text-input>
        <div class="w-20" v-if="!valueType">
            <r-select-input v-model="info.type"
                            :tile="tile"
                            class="me-1"
                            :items="['text','number','boolean','json','array']"
                            just-value
                            disableSearch
                            @update:model-value="info.value=null"
                            firstSelect></r-select-input>
          </div>
          <r-text-input v-if="val_type==='text'"
                        :tile="tile"
                        :label="valueLabel"
                        v-model="info.value"></r-text-input>
        <r-number-input v-else-if="val_type==='number'"
                        :tile="tile"
                        :label="$t('value','renusify')" v-model="info.value"></r-number-input>
        <r-switch-input v-else-if="val_type==='boolean'"
                        :tile="tile"
                        :label="$t('value','renusify')" v-model="info.value"></r-switch-input>
        <r-btn @click.prevent="add" class="ms-1 color-success" rounded>{{ $t('add', 'renusify') }}</r-btn>
      </div>
    </div>
    <textarea v-else :class="{'state-error':error}"
              :rows="Object.keys(modelValue).length+5"
              autocapitalize="off"
              autocomplete="off"
              autocorrect="off"
              class="ltr w-full"
              spellcheck="false"
              @input="emitt"
              @keydown="setTab">{{ JSON.stringify(modelValue, null, 4) }}</textarea>
  </div>
</template>
<script>
import JsonView from "./JsonView";

export default {
  name: 'r-json',
  components: {JsonView},
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
    tile: Boolean,
    disableEditKey: Boolean,
    disableDel: Boolean
  },
  emits: ['update:model-value'],
  data() {
    return {
      modeForm: true,
      error: false,
      show: false,
      info: {},
      color: `rgb(${this.$helper.randomInt(0, 255)},${this.$helper.randomInt(0, 255)},${this.$helper.randomInt(0, 255)})`
    }
  },
  computed: {
    val_type() {
      if (this.valueType) {
        return this.valueType
      }
      return this.info.type
    },
    is_array() {
      if (this.baseArray) {
        return true
      }
      return Array.isArray(this.modelValue)
    }
  },
  methods: {
    setTab(event) {
      if (event.key === '"') {
        const end = event.target.selectionEnd;
        event.preventDefault()
        document.execCommand('insertText', false, event.key.repeat(2));
        event.target.selectionEnd = end + 1;
        return false;
      }
      if (event.key === "{") {
        const end = event.target.selectionEnd;
        event.preventDefault()
        document.execCommand('insertText', false, '{}');
        event.target.selectionEnd = end + 1;
        return false;
      }
      if (event.key === "[") {
        const end = event.target.selectionEnd;
        event.preventDefault()
        document.execCommand('insertText', false, '[]');
        event.target.selectionEnd = end + 1;
        return false;
      }
      if (event.keyCode === 9) {
        event.preventDefault()
        document.execCommand('insertText', false, ' '.repeat(4));
        return false;
      }
      if (event.keyCode === 13) {
        event.preventDefault()
        let n = event.target.value.substr(0, event.target.selectionStart).split('\n')
        n = n[n.length - 1].split('')
        let w = ''
        for (let i = 0; i < n.length; i++) {
          if (n[i] === ' ') {
            w += ' '
          } else {
            break
          }
        }

        document.execCommand('insertText', false, '\n' + w);
        return false;
      }
      return true
    },
    open() {
      if (this.template) {
        let d = this.modelValue
        if (!d) {
          d = []
        }
        d.push(Object.assign({}, {}, this.template))
        this.$emit('update:model-value', d)
      } else {
        this.show = true
      }
    },
    emitt(e) {
      try {
        this.error = false
        e = JSON.parse(e.target.value)
        this.$emit('update:model-value', e)
      } catch (er) {
        this.error = true
      }
    },
    emit(e) {
      this.$emit('update:model-value', e)
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
      this.$emit('update:model-value', d)
    }
  }
}
</script>
<style lang="scss">
@import "~renusify/style/include";

.#{$prefix}json-input {
  textarea {
    outline: none;
    border: 1px solid var(--color-border);
  }

  .state-error {
    border: 1px solid var(--color-error);
  }
}
</style>
