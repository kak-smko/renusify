<template>
  <div ref="uploader" class="image-card  br-md">
    <div class="file-holder text-center">
      <div v-if="file || modelValue" class="image-canvas">
        <r-btn class="image-close color-white" icon size="xs">
          <r-icon @click.prevent="fileDelete()" class="color-error-text" v-html="$r.icons.delete"></r-icon>
        </r-btn>
        <r-progress-circle
            :indeterminate="false"
            :model-value="uploadPercentage"
            :width="2"
            class="image-progress"
            size="50"
        >
          {{ `% ${uploadPercentage}` }}
        </r-progress-circle>
        <r-btn :href="fileLink" class="image-copy color-white" icon size="xs" target="_blank">
          <r-icon class="color-black-text" v-html="$r.icons.eye"></r-icon>
        </r-btn>
        <img v-if="isImg" :class="`image ${imageStatus} `" :src="getUrl(file)">
        <r-icon v-else
                class="file" width="100" height="100" v-html="$r.icons.file"
                :class="{'color-one-text':uploadPercentage===100}"
        ></r-icon>
      </div>
      <div class="file-meta pa-1" v-if="meta && uploadPercentage===100">
        <r-text-input
            v-for="(m,k) in meta"
            :key="k"
            v-model="metaList[m]"
            :label="$t(m,'renusify')"
            :rules="metaRequired?['required']:[]"
            @update:model-value="emitFileLink"
        ></r-text-input>
      </div>
    </div>

    <r-icon
        v-if="showAdd"
        class="pick-icon cursor-pointer d-flex h-center v-center color-one-text"
        height="100"
        width="100"
        v-html="$r.icons.plus"
        @click.prevent.stop="pickFile"
    ></r-icon>
    <input
        v-if="showFile"
        ref="fileInput"
        :accept="accept"
        style="display: none"
        type="file"
        @change="addFile"
    >
    <r-modal v-model="showCrop" max-width="300px" no-close-btn>
      <r-cropper
          v-if="wPH && file"
          :img-src="file"
          :select-img="false"
          :w-p-h="wPH || 1"
          get-blob
          show-cropped
          @cropped="handleCropped"
      ></r-cropper>
    </r-modal>
  </div>
</template>

<script setup>
import {ref, computed, watch, onMounted, nextTick, inject} from 'vue'

const props = defineProps({
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
  metaRequired: Boolean,
  headers: Object
})

const emit = defineEmits(['file-link', 'select', 'delete', 'update:modelValue'])

// Refs
const uploader = ref(null)
const fileInput = ref(null)
const showAdd = ref(true)
const showFile = ref(true)
const showCrop = ref(false)
const metaList = ref({})
const imageStatus = ref('inProgress')
const fileLink = ref('')
const file = ref(null)
const file_type = ref(null)
const uploadPercentage = ref(0)
const $axios = inject('axios')
let CancelTokenSource = null

// Computed properties
const isImg = computed(() => {
  if (!fileLink.value) return false
  const p = fileLink.value.split('.')
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff']
  const extension = p[p.length - 1].toLowerCase()
  return imageExtensions.includes(extension)
})

// Methods
const createCancelToken = () => {
  if ($axios?.CancelToken) {
    CancelTokenSource = $axios.CancelToken.source()
  }
}

const addFile = () => {
  if (!fileInput.value?.files?.[0]) return

  createCancelToken()
  file.value = fileInput.value.files[0]
  file_type.value = file.value.type

  const imgs = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff']

  if (props.wPH === undefined || !imgs.includes(file_type.value)) {
    checkSave()
  } else {
    showCrop.value = true
  }

  showAdd.value = false
}

const pickFile = () => {
  fileInput.value?.click()
}

const fileDelete = async () => {
  if (CancelTokenSource) {
    CancelTokenSource.cancel()
  }

  try {
    await deleteImage()
    showFile.value = false
    await nextTick(() => {
      showFile.value = true
    })

    file.value = null
    metaList.value = {}
    uploadPercentage.value = 0
    showAdd.value = true

    emit('delete', true)
    emit('file-link', null)
  } catch (error) {
    console.error('Delete error:', error)
  }
}

const checkSave = () => {
  if (!file.value) return

  // Check file size
  if (props.maxFileSize && file.value.size > props.maxFileSize) {
    if (CancelTokenSource) {
      CancelTokenSource.cancel()
    }
    console.error('max file size must be:', props.maxFileSize)
    console.error('current file size is:', file.value.size)

    // Using $toast via window or global property
    if (window.$toast || inject('$toast')) {
      const toast = window.$toast || inject('$toast')
      const t = window.$t || inject('$t')
      toast(t(['max_allow_size', [props.maxFileSize / 1024]], 'renusify'))
    }
    return
  }

  const imgs = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff']

  // Check image aspect ratio if needed
  if (props.wPH !== undefined && imgs.includes(file_type.value)) {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file.value)

    // Calculate allowed aspect ratios
    const allowedWPH = calculateAllowedWPH(props.wPH)

    img.onload = function () {
      const currentWPH = parseFloat((this.width / this.height).toFixed(4))

      if (!allowedWPH.includes(currentWPH)) {
        if (CancelTokenSource) {
          CancelTokenSource.cancel()
        }

        // Using $toast via window or global property
        if (window.$toast || inject('$toast')) {
          const toast = window.$toast || inject('$toast')
          const t = window.$t || inject('$t')
          toast(t(['image_w_p_h', [props.wPH]], 'renusify'))
        }

        console.error('width per height must be:', props.wPH, allowedWPH)
        console.error('current width per height is:', currentWPH)
      }

      URL.revokeObjectURL(objectUrl)
      saveImage()
    }

    img.src = objectUrl
    return
  }

  saveImage()
}

const calculateAllowedWPH = (wphInput) => {
  const wphArray = []

  if (Array.isArray(wphInput)) {
    wphInput.forEach((item) => {
      const strItem = item.toString()
      if (strItem.includes('/')) {
        const parts = strItem.split('/')
        if (parts.length === 2) {
          wphArray.push(parseFloat(parts[0]) / parseFloat(parts[1]))
        } else {
          wphArray.push(parseFloat(strItem))
        }
      } else {
        wphArray.push(parseFloat(strItem))
      }
    })
  } else {
    const strItem = wphInput.toString()
    if (strItem.includes('/')) {
      const parts = strItem.split('/')
      if (parts.length === 2) {
        wphArray.push(parseFloat((parseFloat(parts[0]) / parseFloat(parts[1])).toFixed(4)))
      } else {
        wphArray.push(parseFloat(strItem))
      }
    } else {
      wphArray.push(parseFloat(strItem))
    }
  }

  return wphArray
}

const saveImage = async () => {
  if (!file.value) return

  imageStatus.value = 'inProgress'

  const formData = new FormData()
  formData.append('file', file.value, file.value.name)

  let headers = props.headers || {}
  headers['Content-Type'] = 'multipart/form-data'

  let link = props.uploadLink
  if (props.maxFileSize) {
    const separator = link.includes('?') ? '&' : '?'
    link += `${separator}max_size=${props.maxFileSize}`
  }

  try {
    const response = await $axios.post(link, formData, {
      headers,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          uploadPercentage.value = Math.min(
              parseInt(Math.floor((progressEvent.loaded * 100) / progressEvent.total)),
              98
          )
        }
      },
      cancelToken: CancelTokenSource?.token
    })

    fileLink.value = response.data.link
    uploadPercentage.value = 100
    emitFileLink()
    imageStatus.value = 'finished'
  } catch (error) {
    imageStatus.value = 'fails'
    uploadPercentage.value = 0
    console.error('Upload error:', error)
  }
}

const deleteImage = async () => {
  if (!fileLink.value) return

  try {
    const response = await $axios.delete(props.uploadLink, {
      data: {link: fileLink.value},
      headers: props.headers
    })
    return response
  } catch (error) {
    console.error('Delete request error:', error)
    throw error
  }
}

const handleCropped = (croppedFile) => {
  file.value = croppedFile
  showCrop.value = false
  checkSave()
}

const setValue = (value) => {
  if (value) {
    const fixUrl = window.$helper?.fix_url || ((url) => url)
    fileLink.value = props.meta ? fixUrl(value['url']) : fixUrl(value)
    metaList.value = props.meta ? value['meta'] : {}
    showAdd.value = false
    imageStatus.value = 'finished'
    uploadPercentage.value = 100
    emitFileLink()
  }
}

const getUrl = (value) => {
  if (props.modelValue) {
    return fileLink.value
  } else if (value) {
    return URL.createObjectURL(value)
  }
  return ''
}

const emitFileLink = () => {
  if (props.meta) {
    emit('file-link', {'url': fileLink.value, 'meta': metaList.value})
  } else {
    emit('file-link', fileLink.value)
  }
  emit('select', true)
}

// Watch for modelValue changes
watch(() => props.modelValue, (newVal) => {
  setValue(newVal)
}, {immediate: true})

// Initialize
onMounted(() => {
  createCancelToken()
})

// Expose methods if needed
defineExpose({
  fileDelete,
  pickFile
})
</script>