<template>
  <r-input
      :class="[`${$r.prefix}cam-input`]"
      :model-value="files.length > 0 ? files : null"
      label-active
  >
    <div>
      <!-- Slot for custom video holder display. Provides items scoped prop -->
      <slot name="holder" :items="modelValue">
        <span class="video-holder" v-for="(vid, i) in modelValue" :key="i">
          <video
              :src="'/' + vid"
              :width="width"
              :height="height"
              controls
          ></video>
          <r-btn icon @click.prevent="dlt(vid)">
            <r-icon v-html="$r.icons.delete" class="color-error-text"></r-icon>
          </r-btn>
        </span>
      </slot>

      <div
          v-if="files.length<size"
          class="self-view"
          :class="{
            'video-started':
              started || (uploadPercentage > 0 && uploadPercentage < 100),
          }"
      >
        <video
            muted
            ref="selfView"
            autoplay
            playsinline
            :width="width"
            :height="height"
            v-if="video"
        ></video>
        <canvas
            v-else
            ref="visualizer"
            class="viewer-visualizer"
            :width="width"
            :height="height"
        ></canvas>
        <!-- Slot for custom control buttons. Provides uploadPercentage, cancelFile, start, stop, started scoped props -->
        <slot name="control"
              :uploadPercentage="uploadPercentage"
              :cancelFile="cancelFile"
              :start="start"
              :stop="stop"
              :started="started">
          <div class="control-btn">
            <r-btn
                v-if="uploadPercentage > 0 && uploadPercentage < 100"
                class="color-error br-lg color-white-text"
                @click.prevent="cancelFile"
            >
              <span>%{{ uploadPercentage }}</span>
              <span style="width: 20px" v-html="$r.icons.delete"></span>
            </r-btn>
            <template v-else>
              <r-btn v-if="!started" icon @click.prevent="start">
                <r-icon exact>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 16 16"
                  >
                    <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="m4.25 3l1.166-.624l8 5.333v1.248l-8 5.334l-1.166-.624V3zm1.5 1.401v7.864l5.898-3.932L5.75 4.401z"
                        clip-rule="evenodd"
                    />
                  </svg>
                </r-icon>
              </r-btn>
              <r-btn v-else class="color-error-text" icon @click.prevent="stop">
                <r-icon>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 512 512"
                  >
                    <path
                        fill="currentColor"
                        d="M200 48H72a24.028 24.028 0 0 0-24 24v368a24.028 24.028 0 0 0 24 24h128a24.028 24.028 0 0 0 24-24V72a24.028 24.028 0 0 0-24-24Zm-8 384H80V80h112ZM440 48H312a24.028 24.028 0 0 0-24 24v368a24.028 24.028 0 0 0 24 24h128a24.028 24.028 0 0 0 24-24V72a24.028 24.028 0 0 0-24-24Zm-8 384H320V80h112Z"
                    />
                  </svg>
                </r-icon>
              </r-btn>
            </template>
          </div>
        </slot>
      </div>

    </div>
  </r-input>
</template>

<script setup>
import {ref, watch, inject, onUnmounted} from 'vue'

const props = defineProps({
  /**
   * API endpoint URL for uploading recorded videos
   * @type {String}
   */
  uploadLink: String,

  /**
   * Width of the camera view/video element
   * @type {String|Number}
   * @default "300"
   */
  width: {
    type: [String, Number],
    default: "300",
  },

  /**
   * Height of the camera view/video element
   * @type {String|Number}
   * @default "300"
   */
  height: {
    type: [String, Number],
    default: "300",
  },

  /**
   * Enable audio recording
   * @type {Boolean}
   * @default true
   */
  audio: {
    type: Boolean,
    default: true,
  },

  /**
   * Enable video recording
   * @type {Boolean}
   * @default true
   */
  video: {
    type: Boolean,
    default: true,
  },

  /**
   * Array of uploaded video URLs
   * @type {Array}
   */
  modelValue: Array,

  /**
   * Maximum number of videos allowed to record
   * @type {Number}
   * @default 3
   */
  size: {
    default: 3,
    type: Number,
  },

  /**
   * Additional headers for upload/delete requests
   * @type {Object}
   */
  headers: Object
})

const emit = defineEmits([
  /**
   * Emitted when the list of uploaded videos changes
   * @param {Array} videos - Array of video URLs
   */
  'update:modelValue',

  /**
   * Emitted when an error occurs during recording, upload, or delete
   * @param {String|Object} error - Error message or error object
   */
  'error'
])

const $axios = inject('axios')

const started = ref(false)
const type = ref(null)
const stream = ref(null)
const mediaRecorder = ref(null)
const recordedBlobs = ref([])
const uploadPercentage = ref(0)
const CancelTokenSource = ref(null)
const files = ref(props.modelValue || [])

const visualizer = ref(null)
const selfView = ref(null)

watch(() => props.modelValue, (newValue) => {
  files.value = newValue || []
})

/**
 * Creates audio visualizer when video is disabled
 */
const visualize = () => {
  if (!stream.value) return

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  const analyser = audioCtx.createAnalyser()
  const source = audioCtx.createMediaStreamSource(stream.value)
  source.connect(analyser)

  analyser.fftSize = 2048
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyser.getByteTimeDomainData(dataArray)

  const canvas = visualizer.value
  if (!canvas) return

  canvas.width = parseInt(props.width)
  canvas.height = parseInt(props.height)
  const canvasCtx = canvas.getContext("2d")
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

  const barHeight = 5
  const barWidth = 4
  const barSpacing = 10
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  const radius = cy / 2
  const maxBarNum = Math.floor(
      (radius * 2 * Math.PI) / (barWidth + barSpacing)
  )

  const freqJump = Math.floor(dataArray.length / maxBarNum)
  let colors = []
  for (let i = 0; i < maxBarNum; i++) {
    colors.push(getRandomColor())
  }

  const draw = () => {
    if (!started.value) {
      return
    }
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(draw)
    analyser.getByteTimeDomainData(dataArray)

    for (let i = 0; i < maxBarNum; i++) {
      const amplitude = 128 - dataArray[i * freqJump]
      const alfa = (i * 2 * Math.PI) / maxBarNum
      const beta = ((3 * 45 - barWidth) * Math.PI) / 180
      const x = 0
      const y = radius
      const w = barWidth
      const h = Math.min(Math.max(barHeight, amplitude), radius / 2)
      canvasCtx.save()
      canvasCtx.translate(cx, cy)
      canvasCtx.rotate(alfa - beta)
      canvasCtx.fillStyle = colors[i]
      canvasCtx.fillRect(x, y, w, h)
      canvasCtx.restore()
    }
  }
  draw()
}

/**
 * Generates a random color for visualizer bars
 * @returns {String} Random hex color
 */
const getRandomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

/**
 * Starts media recording
 * @param {MediaStream} stream - Media stream to record
 */
const startRecording = (stream) => {
  recordedBlobs.value = []

  try {
    mediaRecorder.value = new MediaRecorder(stream)
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e)
    return
  }

  mediaRecorder.value.onstop = () => {
    console.log("Recorder stopped")
    download()
  }

  mediaRecorder.value.ondataavailable = handleDataAvailable
  mediaRecorder.value.start()
  console.log("MediaRecorder started")
}

/**
 * Handles data available event from media recorder
 * @param {BlobEvent} event - Data available event
 */
const handleDataAvailable = (event) => {
  if (event.data && event.data.size > 0) {
    type.value = event.data.type
    recordedBlobs.value.push(event.data)
  }
}

/**
 * Uploads recorded video to server
 */
const download = async () => {
  if (!props.uploadLink || !$axios) {
    console.error("Upload link or axios not available")
    return
  }

  CancelTokenSource.value = $axios.CancelToken.source()
  const blob = new Blob(recordedBlobs.value, {type: type.value})
  let fileData = new FormData()
  fileData.append("file", blob, "user.webm")

  let headers = props.headers ? {...props.headers} : {}
  headers['Content-Type'] = 'multipart/form-data'

  try {
    const response = await $axios.post(props.uploadLink, fileData, {
      headers: headers,
      onUploadProgress: (progressEvent) => {
        uploadPercentage.value = Math.min(
            parseInt(
                Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            ),
            98
        )
      },
      cancelToken: CancelTokenSource.value.token,
    })

    uploadPercentage.value = 100
    files.value.push(response.data.link)
    emitFiles()
  } catch (err) {
    uploadPercentage.value = 0
    if (err.response) {
      emit('error', err.response.data)
    } else {
      emit('error', err)
    }
  }
}

/**
 * Emits updated files array to parent
 */
const emitFiles = () => {
  emit("update:modelValue", files.value)
}

/**
 * Initializes camera and starts recording
 */
const run = async () => {
  try {
    uploadPercentage.value = 0
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: props.audio,
      video: props.video
          ? {width: parseInt(props.width), height: parseInt(props.height)}
          : false,
    })

    if (selfView.value) {
      selfView.value.srcObject = mediaStream
    }

    if (!props.video) {
      stream.value = mediaStream
      visualize()
    }

    startRecording(mediaStream)
  } catch (err) {
    started.value = false
    console.error("startChat: " + err)
    emit('error', err.message || err)
  }
}

/**
 * Starts the recording process
 */
const start = () => {
  if (files.value.length >= props.size) {
    return
  }
  started.value = true
  run()
}

/**
 * Stops recording and cleans up media resources
 */
const stop = () => {
  started.value = false

  if (selfView.value?.srcObject) {
    selfView.value.srcObject.getTracks().forEach(track => track.stop())
    selfView.value.srcObject = null
  } else if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }

  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
    mediaRecorder.value = null
  }
}

/**
 * Cancels current file upload
 */
const cancelFile = () => {
  if (CancelTokenSource.value) {
    CancelTokenSource.value.cancel()
  }
  uploadPercentage.value = 0
}

/**
 * Deletes an uploaded video
 * @param {String} link - Video URL to delete
 */
const dlt = async (link) => {
  if (!props.uploadLink || !$axios) return

  const i = files.value.indexOf(link)
  try {
    await $axios.delete(props.uploadLink, {
      data: {link: link},
      headers: props.headers
    })
    files.value.splice(i, 1)
    emitFiles()
  } catch (error) {
    console.error("Error deleting file:", error)
    emit('error', error.response?.data || error.message || error)
  }
}

onUnmounted(() => {
  stop()
  cancelFile()
})
</script>

<style lang="scss">
@use "../../../style" as *;

.#{$prefix}cam-input {
  .input-control {
    height: auto;
    width: auto;
  }

  .self-view {
    position: relative;
    display: inline-block;

    .control-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &.video-started {
      .control-btn {
        top: 10px;
        left: 10px;
      }
    }
  }

  .video-holder {
    position: relative;
    display: inline-block;

    .btn-icon {
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }
}
</style>
