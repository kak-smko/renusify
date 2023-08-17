<template>
  <r-input
      :class="[`${$r.prefix}cam-input`]"
      :model-value="files.length > 0 ? files : null"
      hide
      labelControlClass="label-active"
  >
    <div>
      <slot name="holder" :items="modelValue">
        <span class="video-holder" v-for="(vid, i) in modelValue" :key="i">
          <video
              :src="'/' + vid"
              :width="width"
              :height="height"
              controls
          ></video>
          <r-btn @click="dlt(vid)" icon>
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
              <r-btn v-else class="color-error-text" icon @click="stop">
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

<script>
export default {
  name: "r-cam-input",
  props: {
    uploadLink: String,
    width: {
      type: String,
      default: "300",
    },
    height: {
      type: String,
      default: "300",
    },
    audio: {
      type: Boolean,
      default: true,
    },
    video: {
      type: Boolean,
      default: true,
    },
    modelValue: Array,
    size: {
      default: 3,
      type: Number,
    },
    headers: Object
  },
  emits:['update:modelValue','error'],
  data() {
    return {
      started: false,
      type: null,
      stream: null,
      mediaRecorder: null,
      recordedBlobs: [],
      uploadPercentage: 0,
      CancelTokenSource: null,
      files: this.modelValue || [],
    };
  },
  methods: {
    visualize() {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(this.stream);
      source.connect(analyser);

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);
      const canvas = this.$refs.visualizer;
      canvas.width = this.width;
      canvas.height = this.height;
      const canvasCtx = canvas.getContext("2d");
      canvasCtx.clearRect(0, 0, this.width, this.height);
      const that = this;

      const barHeight = 5;
      const barWidth = 4;
      const barSpacing = 10;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = cy / 2;
      const maxBarNum = Math.floor(
          (radius * 2 * Math.PI) / (barWidth + barSpacing)
      );

      const freqJump = Math.floor(dataArray.length / maxBarNum);
      let colors = [];
      for (let i = 0; i < maxBarNum; i++) {
        colors.push(that.getRandomColor());
      }
      const draw2 = function () {
        if (!that.started) {
          return;
        }
        canvasCtx.clearRect(0, 0, that.width, that.height);
        requestAnimationFrame(draw2);
        analyser.getByteTimeDomainData(dataArray);

        for (let i = 0; i < maxBarNum; i++) {
          const amplitude = 128 - dataArray[i * freqJump];
          const alfa = (i * 2 * Math.PI) / maxBarNum;
          const beta = ((3 * 45 - barWidth) * Math.PI) / 180;
          const x = 0;
          const y = radius;
          const w = barWidth;
          const h = Math.min(Math.max(barHeight, amplitude), radius / 2);
          canvasCtx.save();
          canvasCtx.translate(cx, cy);
          canvasCtx.rotate(alfa - beta);
          canvasCtx.fillStyle = colors[i];
          canvasCtx.fillRect(x, y, w, h);
          canvasCtx.restore();
        }
      };
      draw2();
    },
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    startRecording(stream) {
      this.recordedBlobs = [];

      try {
        this.mediaRecorder = new MediaRecorder(stream);
      } catch (e) {
        console.error("Exception while creating MediaRecorder:", e);
        return;
      }

      this.mediaRecorder.onstop = () => {
        console.log("Recorder stopped");
        this.download();
      };
      this.mediaRecorder.ondataavailable = this.handleDataAvailable;
      this.mediaRecorder.start();
      console.log("MediaRecorder started");
    },
    handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        this.type = event.data.type;
        this.recordedBlobs.push(event.data);
      }
    },
    download() {
      this.CancelTokenSource = this.$axios.CancelToken.source();
      const blob = new Blob(this.recordedBlobs, {type: this.type});
      let fileData = new FormData();
      fileData.append("file", blob, "user.webm");
      let headers = this.headers
      if (!headers) {
        headers = {}
      }
      headers['Content-Type'] = 'multipart/form-data'
      this.$axios
          .post(this.uploadLink, fileData, {
            headers: headers,
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = Math.min(
                  parseInt(
                      Math.floor((progressEvent.loaded * 100) / progressEvent.total)
                  ),
                  98
              );
            }.bind(this),
            cancelToken: this.CancelTokenSource.token,
          })
          .then(
              ({data}) => {
                this.uploadPercentage = 100;
                this.files.push(data.link);
                this.emit();
              },
              (err) => {
                this.uploadPercentage = 0;
                this.$emit('error', err.response.data)
              }
          );
    },
    emit() {
      this.$emit("update:modelValue", this.files);
    },
    run() {
      try {
        this.uploadPercentage = 0;
        navigator.mediaDevices
            .getUserMedia({
              audio: this.audio,
              video: this.video
                  ? {width: this.width, height: this.height}
                  : false,
            })
            .then((stream) => {
              if (this.$refs.selfView) {
                this.$refs.selfView.srcObject = stream;
              }
              if (!this.video) {
                this.stream = stream;
                this.visualize();
              }

              this.startRecording(stream);
            });
      } catch (err) {
        this.started = false;
        console.error("startChat: " + err);
      }
    },
    start() {
      if (this.files.length >= this.size) {
        return;
      }
      this.started = true;
      this.run();
    },
    stop() {
      this.started = false;
      if (this.$refs["selfView"] && this.$refs["selfView"].srcObject) {
        this.$refs["selfView"].srcObject.getTracks().forEach(function (track) {
          track.stop();
        });
        this.$refs["selfView"].srcObject = null;
      } else if (this.stream) {
        this.stream.getTracks().forEach(function (track) {
          track.stop();
        });
        this.stream = null;
      }

      if (this.mediaRecorder !== null) {
        this.mediaRecorder.stop();
        this.mediaRecorder = null;
      }
    },
    cancelFile() {
      this.CancelTokenSource.cancel();
      this.uploadPercentage = 0;
    },
    dlt(link) {
      const i = this.files.indexOf(link);
      this.$axios
          .delete(this.uploadLink, {
            data: {link: link},
          }, {headers: this.headers})
          .then(() => {
            this.files.splice(i, 1);
            this.emit();
          });
    },
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";

.#{$prefix}cam-input {
  video {
    border: 1px solid var(--color-border);
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
