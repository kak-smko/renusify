<template>
  <div
      :class="avatarClasses"
      :style="avatarStyle"
  >
    <div :key="k" :class="contentClasses">
      <!-- Default slot for avatar content.
       @example <r-img src="/storage/img/avatar.jpg" width="80" height="80"></r-img>-->
      <slot></slot>
    </div>

    <r-btn
        v-if="editable"
        :loading="loading"
        class="avatar-edit-button color-info"
        icon
        @click.prevent.stop="pickFile"
    >
      <r-icon v-html="$r.icons.edit"></r-icon>
    </r-btn>

    <input
        v-if="editable"
        ref="file"
        accept="image/*"
        class="d-none"
        type="file"
        @change="addFile()"
    >
  </div>
</template>

<script setup>
import {ref, computed, inject} from 'vue'

const props = defineProps({
  /**
   * Size of the avatar in pixels
   * @type {Number|String}
   * @default 48
   */
  size: {
    type: [Number, String],
    default: 48
  },
  /**
   * Elevation level for the avatar shadow
   * @type {String}
   * @default 'sm'
   */
  elevation: {
    type: String,
    default: 'sm'
  },
  /**
   * API endpoint URL for uploading avatar images when editable
   * @type {String}
   */
  editable: {
    type: String
  },
  /**
   * Removes elevation/shadow from avatar
   * @type {Boolean}
   */
  flat: Boolean,
  /**
   * Removes border radius making corners square
   * @type {Boolean}
   */
  tile: Boolean,
  /**
   * Additional headers for the image upload request
   * @type {Object}
   */
  headers: Object
})

// Reactive data
const k = ref(0)
const files = ref([])
const loading = ref(false)
const CancelTokenSource = ref(null)
const file = ref(null)

// Inject dependencies
const $r = inject('renusify').$r
const $axios = inject('axios')

// Computed properties
const avatarClasses = computed(() => [
  `${$r.prefix}avatar`,
  'd-inline-flex',
  'h-center',
  'v-center'
])

const contentClasses = computed(() => [
  'avatar-content',
  'd-flex',
  'h-center',
  'v-center',
  {
    'br-circle': !props.tile,
    'br-none': props.tile,
    [`elevation-${props.elevation}`]: !props.flat
  }
])

const avatarStyle = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`
}))

// Methods
/**
 * Triggers file picker dialog
 */
const pickFile = () => {
  file.value.click()
}

/**
 * Handles file selection and initiates upload
 */
const addFile = () => {
  files.value = file.value.files
  if (files.value.length > 0) {
    saveImage()
  }
}

const uploadPercentage = ref(0)
/**
 * Uploads selected image to the specified endpoint
 */
const saveImage = () => {
  loading.value = true
  uploadPercentage.value = 0
  const fileData = new FormData()
  fileData.append('file', files.value[0])

  const headers = {
    'Content-Type': 'multipart/form-data',
    ...props.headers
  }

  CancelTokenSource.value = $axios.CancelToken.source()

  $axios.post(props.editable, fileData, {
    headers,
    onUploadProgress: (progressEvent) => {
      uploadPercentage.value = Math.min(
          parseInt(Math.floor((progressEvent.loaded * 100) / progressEvent.total)),
          98
      )
    },
    cancelToken: CancelTokenSource.value.token
  })
      .then(() => {
        loading.value = false
        k.value += 1
      })
      .catch(() => {
        loading.value = false
      })
}
</script>

<style lang="scss">
@use "../../style" as *;

.#{$prefix}avatar {
  position: relative;
  border-radius: inherit;

  .avatar-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--color-sheet);

    :deep(img),
    :deep(svg) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .avatar-edit-button {
    position: absolute !important;
    bottom: -8px;
    right: -8px;
    border-radius: 50% !important;
    width: 32px !important;
    height: 32px !important;
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  }

  &:hover .avatar-edit-button {
    opacity: 1;
    transform: scale(1);
  }

  &:hover .avatar-content {
    transform: scale(1.05);
    box-shadow: var(--box-shadow, rgba(0, 0, 0, 0.1)) 0 0.5rem 1rem;
  }
}
</style>