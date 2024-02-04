<template>
  <r-input :class="[`${$r.prefix}file-uploader`]"
           :model-value="filesLinks.length>0?filesLinks:null"
           hide
           :label="labelFile"
           v-bind="attrs"
           labelControlClass="label-fixed">
    <r-row no-gutters>
      <template :key="meta?file['url']:file" v-for="(file,n) in filesLinks">
        <single class="ma-1"
                :accept="accept"
                :meta="meta"
                :metaRequired="metaRequired"
                :uploadLink="uploadLink"
                :modelValue="file"
                :w-p-h="wPH"
                :maxFileSize="maxFileSize"
                @select="$emit('add', true)"
                @file-link="setLink(n,$event)"
        ></single>
      </template>
      <single :key="'add-'+keyAdd" v-if="filesLinks.length<size" class="ma-1"
              :accept="accept"
              :meta="meta"
              :metaRequired="metaRequired"
              :w-p-h="wPH"
              :maxFileSize="maxFileSize"
              :uploadLink="uploadLink"
              :modelValue="null"
              @select="$emit('add', true)"
              @file-link="setLink(filesLinks.length,$event)"
      ></single>
    </r-row>
  </r-input>
</template>

<script>
import {defineAsyncComponent} from 'vue'

export default {
  name: 'r-file-uploader',
  inheritAttrs: false,
  props: {
    uploadLink: {
      type: String,
      required: true
    },
    accept: {
      default: '*',
      type: String
    },
    size: {
      default: 3,
      type: Number
    },
    wPH: [Number, String, Array],
    maxFileSize: Number,
    modelValue: {
      default: () => {
        return []
      },
      type: Array
    },
    meta: Array,
    metaRequired: {type: Boolean, default: true}
  },
  emits:['update:modelValue','add'],
  components: {
    single:defineAsyncComponent(()=>import('./single.vue'))
  },
  data() {
    return {
      keyAdd: 0,
      filesLinks: [],
    }
  },
  created() {
    this.setValue()
  },
  watch: {
    'modelValue': function () {
      this.setValue()
    }
  },
  computed: {
    attrs() {
      let l = {}
      for (let k in this.$attrs) {
        if (k !== 'label') {
          l[k] = this.$attrs[k]
        }
      }
      return l
    },
    labelFile() {
      let l = this.$attrs.label || ''
      if (this.maxFileSize) {
        l += ' (' + this.$t(['max_allow_size', [this.maxFileSize / 1024]], 'renusify') + ')'
      }
      if (this.wPH) {
        l += ' (' + this.$t(['image_w_p_h', [this.wPH]], 'renusify') + ')'
      }
      return l
    }
  },
  methods: {
    setValue() {
      if (this.modelValue) {
        this.filesLinks = this.modelValue
      }
    },
    setLink(n, $event) {
      this.filesLinks[n] = $event
      let clean = this.$helper.cleanArray(this.filesLinks)
      this.filesLinks = clean
      this.$emit('update:modelValue', clean)
      this.keyAdd++
    }
  }
}
</script>

<style lang="scss">
@import "../../../style/include";
</style>
