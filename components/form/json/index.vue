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
              class="w-30"
              :label="$t('key','renusify')"></r-text-input>
          <div class="w-20">
            <r-select v-model="info.type"
                      :tile="tile"
                      class="mx-1"
                      :items="['text','number','boolean','json','array']"
                      just-value
                      @update:model-value="info.value=null"
                      firstSelect></r-select>
          </div>
          <r-text-input v-if="info.type==='text'"
                        :tile="tile"
                        :label="$t('value','renusify')"
                        v-model="info.value"></r-text-input>
          <r-number v-else-if="info.type==='number'"
                    :tile="tile"
                    :label="$t('value','renusify')" v-model="info.value"></r-number>
          <r-switch v-else-if="info.type==='boolean'"
                    :tile="tile"
                    :label="$t('value','renusify')" v-model="info.value"></r-switch>
          <r-btn @click.prevent="add" class="ms-1">{{ $t('add', 'renusify') }}</r-btn>
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
    modelValue: {
      type: Object, Array
    },
    keyWidth: {
      type: String,
      default: '140px'
    },
    template: Object,
    baseArray: Boolean,
    disableAdd: Boolean,
    tile: Boolean,
    disableEditKey: Boolean,
    disableDel: Boolean
  },
  data() {
    return {
      show: false,
      info: {},
      color: `rgb(${this.$helper.randomInt(0, 255)},${this.$helper.randomInt(0, 255)},${this.$helper.randomInt(0, 255)})`
    }
  },
  computed: {
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