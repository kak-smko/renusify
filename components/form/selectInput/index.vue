<template>
  <div :class="`${this.$r.prefix}select-container`" ref="select" v-click-outside="closeList">
    <r-input :active="active"
             v-bind="$attrs"
             :readonly="readonly"
             :modelValue="$helper.ifHas(chips,null,0,value)"
             @click.prevent="handleClick()">
      <div class="select-wrap v-center"
           :class="{
        'h-center':disableSearch,
        'flex-nowrap':!multiple
      }">
        <r-chip
            v-for="(item,key) in chips"
            :key="key"
            :class="{'px-0':!multiple}"
            :close="multiple&&!textChip"
            :text="textChip || !multiple"
            class="my-0 ms-0"
            selectable
            @update:modelValue="handleChip($event,key)">
          {{ item ? item[text] : '' }}
        </r-chip>
        <span>
        <input :type="type"
               v-if="!disableSearch"
               @focusin="focusInput(true)"
               @focusout="focusInput(false)"
               @keydown.enter="add"
               autocomplete="no"
               class="select-input"
               :readonly="readonly"
               ref="input"
               :value="inputVal"
               @input="e => inputVal = e.target.value"
        />
          </span>
      </div>
      <r-progress-line v-if="loading" color="color-two"></r-progress-line>
    </r-input>
    <r-card class="card-select" :class="{
            'card-select-active':genItems.length>0 && openList,
            'to-top':openToTop
        }"
            :style="{
                    width:$refs.select&&$refs.select.getBoundingClientRect().width+'px'
                }"
    >
      <r-list :filter="!searchLink?(inputVal&&inputVal.trim()):''"
              :items="genItems"
              :multiple="multiple"
              :modelValue="chips"
              :text="text"
              :value="value"
              @update:modelValue="listInput"
              checked>
        <template v-slot="props">
          <slot :item="props.item">
            <div class="list-title">
              {{ props.item[text] }}
            </div>
          </slot>
          <transition name="fade">
            <r-icon class="pe-1" exact
                    v-html="$r.icons.check"
                    v-if="$helper.searchArray(props.list,text,props.item[text])!==false"
            ></r-icon>
          </transition>
        </template>
      </r-list>
    </r-card>
  </div>
</template>
<script>

export default {
  name: 'r-select',
  inheritAttrs: false,
  props: {
    searchLink: String,
    type: {
      type: String,
      default: 'text'
    },
    text: {
      type: String,
      default: 'name'
    },
    value: {
      type: String,
      default: 'value'
    },
    disableSearch: Boolean,
    readonly: Boolean,
    textChip: Boolean,
    items: Array,
    modelValue: [String, Number, Array, Object],
    tags: Boolean,
    multiple: Boolean,
    justValue: Boolean,
    openToTop: Boolean,
    translate: Boolean,
    firstSelect: Boolean,
    headers: Object
  },
  emits: ['update:modelValue', 'del'],
  data() {
    return {
      apiData: [],
      loading: false,
      active: false,
      openList: false,
      inputVal: null,
      chips: []
    }
  },
  mounted() {
    this.chips = this.getValue()
    if (this.firstSelect & this.chips.length === 0) {
      this.chips.push(this.genItems[0])
      this.emitVal()
    }
    if (this.searchLink) {
      this.get()
    }
  },
  computed: {
    genItems() {
      let res = []
      if (this.apiData.length > 0) {
        res = this.apiData
      }

      if (this.items) {
        res = Object.assign([], this.items)
      }

      if (typeof res[0] !== 'object') {
        for (let i in res) {
          if (this.$helper.hasKey(res, i)) {
            let v = {}
            v[this.text] = res[i].toString()
            v[this.value] = res[i]
            res[i] = v
          }
        }
      }
      if (this.translate) {
        for (let i in res) {
          if (this.$helper.hasKey(res, i)) {
            res[i][this.text] = this.$t(res[i][this.text])
          }
        }
      }
      return res
    }
  },
  watch: {
    'inputVal': function (newVal) {
      if (this.searchLink) {
        if (newVal && newVal.length > 0) {
          this.get()
        }
      }
    },
    'modelValue': function (n) {
      this.chips = this.getValue()
    }
  },
  methods: {
    get() {
      this.loading = true
      return this.$axios.get(this.searchLink, {
        params: {
          s: (this.inputVal === null ? '' : this.inputVal)
        },
        headers: this.headers
      }).then(({data}) => {
        this.apiData = data
        this.loading = false
      }, () => {
        this.loading = false
      })
    },
    getValue() {
      if (!this.searchLink && !this.tags && this.modelValue !== undefined && this.modelValue !== null) {
        if (typeof this.modelValue === 'string' || typeof this.modelValue === 'number') {
          const index = this.$helper.searchArray(this.genItems, this.value, this.modelValue)
          if (index === false) {
            this.$emit('update:modelValue', null)
            return []
          }
        } else if (this.$helper.isArray(this.modelValue)) {
          this.modelValue.forEach((item) => {
            if (typeof item === 'string' || typeof item === 'number') {
              const index = this.$helper.searchArray(this.genItems, this.value, item)
              if (index === false) {
                this.$emit('update:modelValue', null)
                return []
              }
            } else {
              const index = this.$helper.searchArray(this.genItems, this.value, item[this.value])
              if (index === false) {
                this.$emit('update:modelValue', null)
                return []
              }
            }
          })
        } else {
          const index = this.$helper.searchArray(this.genItems, this.value, this.modelValue[this.value])
          if (index === false) {
            this.$emit('update:modelValue', null)
            return []
          }
        }
      }
      if (this.modelValue !== undefined && this.modelValue !== null) {
        if (this.$helper.ifHas(this.modelValue, false, this.text)) {
          return [this.modelValue]
        } else if (typeof this.modelValue === 'string' || typeof this.modelValue === 'number') {
          const index = this.$helper.searchArray(this.genItems, this.value, this.modelValue)
          if (index !== false) {
            return [this.genItems[index]]
          }
          return [{
            [this.text]: this.modelValue.toString(), [this.value]: this.modelValue
          }]
        } else if (typeof this.modelValue[0] === 'string' || typeof this.modelValue[0] === 'number') {
          let res = []
          const lng = this.modelValue.length
          for (let i = 0; i < lng; i++) {
            const index = this.$helper.searchArray(this.genItems, this.value, this.modelValue[i])
            if (index !== false) {
              res.push(this.genItems[index])
            } else {
              res.push({[this.text]: this.modelValue[i].toString(), [this.value]: this.modelValue[i]})
            }
          }
          return res
        } else {
          return this.modelValue
        }
      }
      this.$emit('update:modelValue', null)
      return []
    },
    handleChip(e, key) {
      if (e === false) {
        this.$emit('del', [key, this.chips[key]])
        this.chips.splice(key, 1)
        this.emitVal()
      } else {
        this.handleClick()
      }
    },
    handleClick() {
      if (this.$refs.input) {
        this.$refs.input.focus()
        this.$refs.select.scrollIntoView({
          block: "start",
          behavior: "smooth"
        })
      } else {
        this.focusInput(true)
      }
    },
    add() {
      if (this.inputVal) {
        let val = {[this.text]: this.inputVal.toString(), [this.value]: this.inputVal}
        if (!this.multiple) {
          this.chips = []
        }
        if (!this.tags) {
          const exist = this.$helper.searchArray(this.genItems, this.text, val[this.text])
          if (exist !== false) {
            this.chips.push(val)
          }
        } else {
          this.chips.push(val)
        }
        this.inputVal = null

        this.emitVal()
      }
    },
    emitVal() {
      this.chips = this.$helper.uniqArray(this.chips)

      let val = this.chips
      if (this.justValue) {
        val = []
        for (let i in this.chips) {
          if (this.$helper.hasKey(this.chips, i)) {
            val.push(this.chips[i][this.value])
          }
        }
      }
      if (!this.multiple) {
        val = val[0]
        if (val) {
          this.closeList()
        }
      }
      if (val === undefined) {
        val = null
      }

      this.$emit('update:modelValue', val)

    },
    focusInput(val) {
      if (this.readonly) {
        return
      }
      this.active = val

      if (val === true) {
        this.openList = true
      }
      setTimeout(() => {
        this.add()
      }, 200)
    },
    listInput(e) {
      this.inputVal = null
      if (e) {
        this.chips = this.multiple ? e : [e]

      } else {
        this.chips = []
      }

      this.emitVal()
    },
    closeList() {
      this.active = false
      this.openList = false

    }
  }
}

</script>
<style lang="scss">
@import "../../../style/include";

$min-height: 40px;
.#{$prefix}select-container {
  position: relative;
  scroll-margin: $min-height;

  .input-control {
    min-height: $min-height;
    height: auto;
    flex-direction: row;
    align-items: center;
    display: flex;
    flex: 1 1;
    flex-wrap: wrap;
    line-height: 24px;
    max-width: 100%;
    min-width: 0;
  }

  .select-wrap {
    max-width: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
  }

  input {
    flex: 1 1;
    margin-top: 0;
    min-width: 140px;
    position: relative;
  }

  .#{$prefix}chip {
    flex: 0 1 auto;
    margin: 4px;
  }

  .card-select {
    max-height: 0;
    overflow: auto;
    opacity: .5;
    transition: all .3s $primary-transition;
    position: absolute;
    left: 0;
    z-index: map_get($z-index, 'default');
  }

  .to-top {
    bottom: $min-height+2px;
  }

  .card-select-active {
    transition: all 0.3s $primary-transition;
    max-height: 300px;
    opacity: 1;
  }
}

</style>
