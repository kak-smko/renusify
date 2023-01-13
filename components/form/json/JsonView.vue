<template>
    <div :class="`${$r.prefix}json-view d-flex v-baseline flex-wrap`"
         v-for="(value,key) in modelValue"
         :key="key">
      <div class="key d-flex v-baseline me-1" :style="{'max-width': keyWidth}">
        <r-btn v-if="!disableDel" icon class="color-error-text" text @click="del(key)">
          <r-icon v-html="$r.icons.delete"></r-icon>
        </r-btn>
        <template v-if="!is_array">
          <r-text-input :tile="tile" :readonly="disableEditKey" :model-value="key"
                        @update:model-value="emitkey(key,$event)"></r-text-input>
          :
        </template>
      </div>
      <div v-if="typeof value==='object'" class="flex-grow-1 w-full ps-10">
        <r-json :tile="tile"
                :model-value="value"
                @update:model-value="emit(key,$event)"
                :disableAdd="disableAdd||template!==undefined"
                :disableDel="disableDel||template!==undefined"
                :disableEditKey="disableEditKey"
                :keyWidth="keyWidth"
                :valueWidth="valueWidth"
        ></r-json>
      </div>
      <div v-else class="mb-1" :style="{'max-width': valueWidth}">
        <r-text-input v-if="typeof value==='string'"
                      :tile="tile"
                      :model-value="value" @update:model-value="emit(key,$event)"></r-text-input>
        <r-number v-else-if="typeof value==='number'"
                  :tile="tile"
                  :model-value="value" @update:model-value="emit(key,$event)"></r-number>
        <r-switch v-else-if="typeof value==='boolean'"
                  :tile="tile"
                  :model-value="value" @update:model-value="emit(key,$event)"></r-switch>

      </div>

    </div>
</template>
<script>
    export default {
        name: 'jsonView',
        props: {
          modelValue: Object,
          template: Object,
          disableEditKey: Boolean,
          disableAdd: Boolean,
          disableDel: Boolean,
          tile: Boolean,
          keyWidth: {
            type: String,
            default: '140px'
          }, valueWidth: {
            type: String,
            default: '300px'
          }
        },
        data() {
            return {
                time_id: null
            }
        },
        computed:{
            is_array(){
              return Array.isArray(this.modelValue)
          }
        },
        methods: {
            del(key) {
                let o = this.modelValue
                if (this.is_array) {
                    o.splice(key, 1)
                } else {
                    delete o[key]
                }
                this.$emit('update:model-value', o)
            },
            emitkey(oldKey, newKey) {
                clearTimeout(this.time_id)
                let o = this.modelValue
                let n = {};

                Object.keys(o).forEach(key => {
                    if (key === oldKey) {
                        let newPair = {[newKey]: o[oldKey]};
                        n = {...n, ...newPair}
                    } else {
                        n = {...n, [key]: o[key]}
                    }
                });
                this.time_id = setTimeout(() => {
                    this.$emit('update:model-value', n)
                }, 1000)
            },
            emit(k, v) {
                let d = this.modelValue
                d[k] = v
                this.$emit('update:model-value', d)
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../style/include";

</style>
