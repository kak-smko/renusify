<template>
  <div :class="`${$r.prefix}json`">
    <div v-if="label">{{ label }}</div>
    <div class="d-flex">
      <div class="display-5"
           :class="{
                'mt-5':Object.values(modelValue||[]).length>0,
            'mt-2':Object.values(modelValue||[]).length===0
            }"
           :style="{'color':color}">{{ !is_array ? '{' : '[' }}
      </div>
      <div>
        <json-view :model-value="modelValue"
                   @update:model-value="emit"
                   :template="template"
                   :disableEditKey="disableEditKey"
                   :disableAdd="disableAdd"
                   :disableDel="disableDel"
                   :tile="tile"
                   :keyWidth="keyWidth"
                   :valueWidth="valueWidth"
        ></json-view>
        <div v-if="!show &&!disableAdd" class="text-end mb-3">
          <r-btn
              @click.prevent="open"
              class="mt-2"
              size="small"
              icon>
            <r-icon v-html="$r.icons.plus"></r-icon>
          </r-btn>
        </div>
        <div v-else-if="show" class="d-flex v-baseline">
          <r-text-input
              v-if="!is_array"
              v-model="info.key"
              :tile="tile"
              class="w-30 pe-1"
              :label="keyLabel"></r-text-input>
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
      <div class="display-5 d-flex v-end pb-2" :style="{'color':color}" :class="{
                'mt-5':Object.values(modelValue||[]).length>0,
            'mt-2':Object.values(modelValue||[]).length===0
            }">{{ !is_array ? '}' : ']' }}
      </div>
    </div>
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
    keyWidth: {
      type: String,
      default: '140px'
    },
    valueWidth: {
      type: String,
      default: '300px'
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
  emits:['update:modelValue'],
  data() {
    return {
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
