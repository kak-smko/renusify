<template>
  <r-input
      :class="[`${$r.prefix}file-input`]"
      :label="labelFile"
      :model-value="filesLinks.length > 0 ? filesLinks : null"
      class="label-active"
      label-active
      v-bind="attrs"
  >
    <div class="d-flex">
      <template v-for="(file, n) in filesLinks" :key="meta ? file['url'] : file">
        <single
            :accept="accept"
            :max-file-size="maxFileSize"
            :meta="meta"
            :meta-required="metaRequired"
            :model-value="file"
            :upload-link="uploadLink"
            :w-p-h="wPH"
            class="ma-1"
            @select="$emit('add', true)"
            @file-link="setLink(n, $event)"
        ></single>
      </template>
      <single
          v-if="filesLinks.length < size"
          :key="'add-' + keyAdd"
          :accept="accept"
          :max-file-size="maxFileSize"
          :meta="meta"
          :meta-required="metaRequired"
          :model-value="null"
          :upload-link="uploadLink"
          :w-p-h="wPH"
          class="ma-1"
          @select="$emit('add', true)"
          @file-link="setLink(filesLinks.length, $event)"
      ></single>
    </div>
  </r-input>
</template>

<script setup>
import {ref, computed, watch, useAttrs, inject} from 'vue'
import Single from "./single.vue";

const props = defineProps({
  /**
   * API endpoint URL for file upload
   * @type {String}
   * @required
   */
  uploadLink: {
    type: String,
    required: true
  },

  /**
   * Accepted file types (MIME types or extensions)
   * @type {String}
   * @default '*'
   */
  accept: {
    default: '*',
    type: String
  },

  /**
   * Number of files allowed to upload simultaneously
   * @type {Number}
   * @default 3
   */
  size: {
    default: 3,
    type: Number
  },

  /**
   * Width/Height requirements for images
   * @type {Number|String|Array}
   */
  wPH: [Number, String, Array],

  /**
   * Maximum file size in bytes
   * @type {Number}
   */
  maxFileSize: Number,

  /**
   * The model value for uploaded files (v-model)
   * @type {Array}
   * @default () => []
   */
  modelValue: {
    default: () => [],
    type: Array
  },

  /**
   * Additional metadata fields for files
   * @type {Array}
   */
  meta: Array,

  /**
   * Whether metadata is required for each file
   * @type {Boolean}
   * @default true
   */
  metaRequired: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  /**
   * Emitted when the uploaded files array changes
   * @param {Array} files - Array of uploaded file links/objects
   */
  'update:modelValue',

  /**
   * Emitted when a new file is added
   * @param {Object} file - The added file object
   */
  'add'
])

const {$t, $helper, $r} = inject('renusify')

const keyAdd = ref(0)
const filesLinks = ref([])

const attrs = useAttrs()

const labelFile = computed(() => {
  let label = attrs.label || ''

  if (props.maxFileSize) {
    const sizeInKB = props.maxFileSize / 1024
    label += ' (' + $t(['max_allow_size', [sizeInKB]], 'renusify') + ')'
  }

  if (props.wPH) {
    label += ' (' + $t(['image_w_p_h', [props.wPH]], 'renusify') + ')'
  }

  return label
})

/**
 * Initializes filesLinks from modelValue
 */
const setValue = () => {
  if (props.modelValue && Array.isArray(props.modelValue)) {
    filesLinks.value = props.modelValue
  }
}

/**
 * Updates files links array and emits changes
 * @param {Number} index - Index of the file to update
 * @param {Object} event - File link/object
 */
const setLink = (index, event) => {
  if (index >= filesLinks.value.length) {
    filesLinks.value.push(event)
  } else {
    filesLinks.value[index] = event
  }

  const cleaned = $helper.cleanArray(filesLinks.value)

  filesLinks.value = cleaned
  emit('update:modelValue', cleaned)
  keyAdd.value++
}

watch(() => props.modelValue, () => {
  setValue()
}, {immediate: true, deep: true})
</script>

<style lang="scss">
@use "../../../style" as *;

.#{$prefix}file-input {
  .input-control {
    height: auto;
  }

  .pick-icon {
    width: 100%;
    height: 100%;
  }

  .image-card {
    position: relative;
    width: auto;
    min-width: 150px;
    min-height: 150px;
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
      height: 150px;
      z-index: -2;
      opacity: 0.8;
      max-width: 100%;
    }

    .icon-100 {
      width: 100px;
      height: 100px;
    }

    .image-canvas {
      width: auto;
      min-width: 150px;
      height: 150px;
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