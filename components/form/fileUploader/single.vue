<template>
  <div ref="uploader" class="image-card elevation-lg br-md">
    <div class="file-holder text-center">
      <div class="image-canvas" v-if="file||modelValue">
        <r-btn icon class="image-close color-white">
          <r-icon @click.prevent="fileDelete()" class="color-error-text" v-html="$r.icons.delete"></r-icon>
        </r-btn>
        <r-progress-circular
            :indeterminate=false
            :modelValue="uploadPercentage"
            :width="2"
            class="image-progress"
            size="50"
        >
          {{ `% ${uploadPercentage}` }}
        </r-progress-circular>
        <r-btn @click.prevent="$helper.copy(fileLink)" class="image-copy" icon>
          <r-icon v-html="$r.icons.copy"></r-icon>
        </r-btn>
        <img v-if="isImg()" :class="`image ${imageStatus} `" :src="getUrl(file)">
        <r-icon v-else
                class="file" width="100" height="100" v-html="$r.icons.file"
                :class="{'color-one-text':uploadPercentage===100}"
        ></r-icon>
      </div>
      <div class="file-meta pa-1" v-if="meta && uploadPercentage===100">
        <r-text-input :label="$t(m,'renusify')" v-model="metaList[m]" @update:model-value="emit"
                      v-for="(m,k) in meta" :key="k"
                      :rules="metaRequired?['required']:[]"></r-text-input>
      </div>
    </div>
    <r-icon @click.prevent.stop="pickFile"
            class="cursor-pointer w-full h-full d-flex h-center v-center color-one-text" width="100" height="100"
            v-html="$r.icons.plus"
            v-if="showAdd"></r-icon>
    <input :accept="accept"
           @change="addFile()"
           ref="file"
           style="display: none"
           type="file"
           v-if="showFile"
    >
  </div>
</template>

<script>
import file from "./file";

export default {
  name: 'inputFile',
  mixins: [file],
  props: {
    accept: {
      default: '*',
      type: String
    },
    wPH: [Number, String, Array],
    maxFileSize: Number,
    uploadLink: {
      type: String,
      required: true
    },
    modelValue: {
      default: null,
      type: [String, Object]
    },
    meta: {
      type: Array,
      default: null
    },
    metaRequired: Boolean
  },
  data() {
    return {
      showAdd: true,
      showFile: true,
      metaList: {}
    }
  },
  created() {
    this.setValue()
  },
  methods: {
    setValue() {
      if (this.modelValue) {
        this.fileLink = this.meta ? this.modelValue['url'] : this.modelValue
        this.metaList = this.meta ? this.modelValue['meta'] : {}
        this.showAdd = false
        this.imageStatus = 'finished'
        this.uploadPercentage = 100
        this.emit()
      }
    },
    getUrl(value) {
      if (this.modelValue) {
        return '/' + this.fileLink
      } else {
        return URL.createObjectURL(value)
      }
    },
    isImg() {
      let is = false
      let image = this.accept.split('/')
      is = image[0] === 'image'
      if (!is) {
        const p = this.fileLink.split('.')
        is = ['jpg', 'jpeg', 'png', 'gif'].includes(p[p.length - 1])
      }
      return is
    },
    emit() {
      if (this.meta) {
        this.$emit('file-link', {'url': this.fileLink, 'meta': this.metaList})
      } else {
        this.$emit('file-link', this.fileLink)
      }
      this.$emit('select', true)
    }

  }
}
</script>

<style lang="scss">
@import "../../../style/include";

.#{$prefix}file-uploader {
  .image-card {
    position: relative;
    width: auto;
    min-width: 150px;
    min-height: 200px;

    background-color: white;


    .file-meta {
      width: 250px;
    }

    .fails {
      -webkit-filter: grayscale(100%);
      filter: grayscale(100%);
    }

    .inProgress {
      -webkit-filter: blur(2px);
      filter: blur(2px);
    }

    .finished {
      -webkit-filter: blur(0px);
      filter: blur(0px);
    }

    .file {
      left: 0;
      right: 0;
      position: absolute;
      top: 0;
      bottom: 0;
    }

    .image {
      width: auto;
      min-width: 150px;
      height: 200px;
      z-index: -2;
      opacity: 0.8;
    }

    .icon-100 {
      width: 100px;
      height: 100px;
    }

    .image-canvas {
      width: auto;
      min-width: 150px;
      height: 200px;
      position: relative;
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    }

    .image-close {
      cursor: pointer;
      position: absolute;
      left: 5px;
      top: 5px;
      z-index: 1;
    }

    .image-progress {
      z-index: 1;
      position: absolute;
      right: 5px;
      top: 5px;
      color: white;
    }

    .image-copy {
      z-index: 1;
      position: absolute;
      left: 5px;
      bottom: 5px;
    }
  }
}
</style>
