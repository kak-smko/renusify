<template>
  <div :class="$r.prefix + 'cropper'">
    <div v-if="show && allWPH.length > 1">
      <r-chip
          v-for="(item, i) in allWPH"
          :key="i"
          :class="{ 'color-one-text': item === currentWPH }"
          class="ma-1 cursor-pointer"
          label
          outlined
          @click.prevent="changeWPH(item)"
      >{{ item }}
      </r-chip
      >
    </div>
    <div
        v-if="show"
        ref="imageBox"
        v-touch="{
        start: moveStart,
        move: setPosition,
      }"
        class="image-box"
    >
      <div ref="thumbBox" class="thumb-box"></div>
    </div>
    <div class="action d-flex">
      <template v-if="show">
        <r-btn @click.prevent="getCrop">{{ $t("crop", "renusify") }}</r-btn>
        <r-spacer></r-spacer>
        <r-btn icon tile @click.prevent="zoomIn()">+</r-btn>
        <r-btn icon tile @click.prevent="zoomOut()">-</r-btn>
      </template>

      <input
          v-if="!show && selectImg"
          ref="file"
          accept="image/*"
          type="file"
          @change="select_img"
      />
    </div>
    <img
        v-if="showCropped && cropped"
        :height="height"
        :src="cropped"
        :width="width"
        alt="cropped"
    />
  </div>
</template>

<script>
export default {
  name: "r-cropper",
  props: {
    wPH: {type: [Number, String, Array], default: 1},
    imgSrc: [String, Blob],
    maxWidth: Number,
    showCropped: Boolean,
    getBlob: Boolean,
    selectImg: {type: Boolean, default: true},
  },
  emits: ['cropped', 'original'],
  data() {
    return {
      show: false,
      cropped: null,
      width: null,
      height: null,
      state: {},
      ratio: 1,
      image: new Image(),
      currentWPH: null,
    };
  },
  mounted() {
    this.width = 280;
    this.height = 280;
    this.currentWPH = this.allWPH[0];
    if (this.currentWPH > 1) {
      this.height = this.width / this.currentWPH;
    } else {
      this.width = this.height * this.currentWPH;
    }
    if (typeof this.imgSrc === "string") {
      this.crop(this.imgSrc);
    } else if (this.imgSrc) {
      const that = this;
      const reader = new FileReader();
      reader.onload = function (e) {
        that.crop(e.target.result);
      };

      reader.readAsDataURL(this.imgSrc);
    }
  },
  computed: {
    allWPH() {
      const is_array = Array.isArray(this.wPH);
      let wPH = [];
      if (is_array) {
        this.wPH.forEach((item) => {
          item = item.toString().split("/");
          if (item.length === 2) {
            wPH.push(
                parseFloat((parseFloat(item[0]) / parseFloat(item[1])).toFixed(4))
            );
          } else {
            wPH.push(parseFloat(parseFloat(item[0]).toFixed(4)));
          }
        });
      } else {
        if (typeof this.wPH === "string") {
          let item = this.wPH;
          item = item.split("/");
          if (item.length === 2) {
            wPH.push(
                parseFloat((parseFloat(item[0]) / parseFloat(item[1])).toFixed(4))
            );
          } else {
            wPH.push(parseFloat(parseFloat(item[0]).toFixed(4)));
          }
        } else {
          wPH.push(parseFloat(parseFloat(this.wPH).toFixed(4)));
        }
      }
      return wPH;
    },
  },
  methods: {
    getCrop() {
      this.cropped = this.getDataURL();
      if (this.getBlob) {
        this.$emit("cropped", this.get_blob());
      } else {
        this.$emit("cropped", this.cropped);
      }

      this.show = false;
    },
    changeWPH(e) {
      this.currentWPH = e;
      this.width = 280;
      this.height = 280;
      if (this.currentWPH > 1) {
        this.height = this.width / this.currentWPH;
      } else {
        this.width = this.height * this.currentWPH;
      }
      let thumbBox = this.$refs.thumbBox;
      thumbBox.style.width = this.width + "px";
      thumbBox.style.height = this.height + "px";
    },
    moveStart() {
      let el = this.$refs.imageBox;
      let bg = el.style.backgroundPosition.split(" ");
      this.state.x = parseInt(bg[0]);
      this.state.y = parseInt(bg[1]);
    },
    setPosition(e) {
      let el = this.$refs.imageBox;

      let bgX = e.goX + this.state.x;
      let bgY = e.goY + this.state.y;

      el.style.backgroundPosition = bgX + "px " + bgY + "px";
    },
    select_img(e) {
      const that = this;
      const reader = new FileReader();
      reader.onload = function (e) {
        that.crop(e.target.result);
      };

      this.$emit("original", e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    },
    getDataURL() {
      let el = this.$refs.imageBox;
      let thumbBox = this.$refs.thumbBox;
      let width = thumbBox.clientWidth,
          height = thumbBox.clientHeight,
          canvas = document.createElement("canvas"),
          dim = el.style.backgroundPosition.split(" "),
          size = el.style.backgroundSize.split(" "),
          dx = parseInt(dim[0]) - el.clientWidth / 2 + width / 2 + 1,
          dy = parseInt(dim[1]) - el.clientHeight / 2 + height / 2 + 1,
          dw = parseInt(size[0]),
          dh = parseInt(size[1]),
          sh = parseInt(this.image.height),
          sw = parseInt(this.image.width);

      let n = 0;
      if (dw >= 280) {
        n = Math.abs((sw / dw) * dx * 2);
      }
      canvas.width = sw - n;
      if (this.maxWidth && canvas.width > this.maxWidth) {
        canvas.width = this.maxWidth;
      }
      canvas.height = canvas.width / this.currentWPH;
      while (
          parseFloat((canvas.width / canvas.height).toFixed(4)) !==
          this.currentWPH
          ) {
        canvas.width -= 1;
        canvas.height = canvas.width / this.currentWPH;
        if (canvas.width < 1) {
          break;
        }
      }
      let context = canvas.getContext("2d");
      context.drawImage(
          this.image,
          0,
          0,
          sw,
          sh,
          (dx * canvas.width) / width,
          (dy * canvas.height) / height,
          (dw * canvas.width) / width,
          (dh * canvas.height) / height
      );
      return canvas.toDataURL("image/png");
    },
    get_blob() {
      let b64 = this.cropped.replace("data:image/png;base64,", "");
      let binary = atob(b64);
      let array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      let b = new Blob([new Uint8Array(array)], {
        type: "image/png",
      });
      b.name = "file.png";
      return b;
    },
    zoomIn() {
      this.ratio += 0.01;
      this.setBackground();
    },
    zoomOut() {
      this.ratio -= 0.01;
      this.setBackground();
    },
    setBackground() {
      let el = this.$refs.imageBox;
      let w = parseInt(this.image.width) * this.ratio;
      let h = parseInt(this.image.height) * this.ratio;

      let pw = (el.clientWidth - w) / 2;
      let ph = (el.clientHeight - h) / 2;

      el.setAttribute(
          "style",
          "background-image: url(" +
          this.image.src +
          "); " +
          "background-size: " +
          w +
          "px " +
          h +
          "px; " +
          "background-position: " +
          pw +
          "px " +
          ph +
          "px; " +
          "background-repeat: no-repeat"
      );
    },
    crop(img) {
      this.show = true;
      this.cropped = null;
      setTimeout(() => {
        const that = this;
        let thumbBox = this.$refs.thumbBox;
        thumbBox.style.width = this.width + "px";
        thumbBox.style.height = this.height + "px";

        this.image.onload = function () {
          that.ratio = parseInt(that.width) / that.image.width;
          that.setBackground();
        };
        this.image.src = img;
      }, 100);
    },
  },
};
</script>

<style lang="scss">
@use "../../style/variables/base";

.#{base.$prefix}cropper {
  width: 300px;

  .image-box {
    position: relative;
    height: 300px;
    width: 300px;
    border: 1px solid #aaa;
    overflow: hidden;
    background: #fff no-repeat;
    cursor: move;
  }

  .thumb-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    border: 1px solid rgb(130, 130, 130);
    box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.4);
    background: none repeat scroll 0 0 transparent;
  }
}
</style>
