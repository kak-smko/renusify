export default {
  props: {
    headers: Object
  },
  data() {
    return {
      imageStatus: 'inProgress',
      CancelTokenSource: this.$axios.CancelToken.source(),
      fileLink: '',
      file: null,
      uploadPercentage: 0,
    }
  },
  methods: {
    addFile() {
      this.CancelTokenSource = this.$axios.CancelToken.source()
      this.file = this.$refs.file.files[0]
      if (!this.wPH) {
        this.checkSave()
      } else {
        this.showCrop = true
      }
      this.showAdd = false
    },
    pickFile() {
      this.$refs.file.click()
    },
    fileDelete() {
      this.CancelTokenSource.cancel()
      this.deleteImage().then(() => {
        this.showFile = false
        this.$nextTick(() => {
          this.showFile = true
        })
        this.file = null
        this.metaList = {}
        this.uploadPercentage = 0
        this.showAdd = true
        this.$emit('delete', true)
        this.$emit('file-link', null)
      })
    },
    checkSave() {
      if (this.maxFileSize && this.file.size > this.maxFileSize) {
        this.CancelTokenSource.cancel()
        console.error('max file size must be:' + this.maxFileSize);
        console.error('current file size is:' + this.file.size);
        this.$toast(this.$t(['max_allow_size', [this.maxFileSize / 1024]], 'renusify'))
        return
      }

      if (this.wPH) {
        let img = new Image();
        let objectUrl = URL.createObjectURL(this.file);
        let that = this
        const is_array = Array.isArray(this.wPH)
        let wPH = []
        if (is_array) {
          this.wPH.forEach((item) => {
            item = item.toString().split('/')
            if (item.length === 2) {
              wPH.push(parseFloat(item[0]) / parseFloat(item[1]))

            } else {
              wPH.push(parseFloat(item[0]))

            }
          })
        } else {
          if (typeof this.wPH === 'string') {
            let item = this.wPH
            item = item.split('/')
            if (item.length === 2) {
              wPH.push(parseFloat((parseFloat(item[0]) / parseFloat(item[1])).toFixed(4)))

            } else {
              wPH.push(parseFloat(item[0]))

            }
          } else {
            wPH.push(this.wPH)
          }

        }
        img.onload = function () {
          const wph = parseFloat((this.width / this.height).toFixed(4))
          if (!wPH.includes(wph)) {
            that.CancelTokenSource.cancel()
            that.$toast(that.$t(['image_w_p_h', [that.wPH]], 'renusify'))
            console.error('width per height must be:' + that.wPH, wPH);
            console.error('current width per height is:' + wph);
          }

          URL.revokeObjectURL(objectUrl);
          that.saveImage()
        };
        img.src = objectUrl;
        return;
      }
      this.saveImage()
    },
    saveImage() {
      this.imageStatus = 'inProgress'
      let fileData = new FormData()
      fileData.append('file', this.file, this.file.name)
      let headers = this.headers
      if (!headers) {
        headers = {}
      }
      headers['Content-Type'] = 'multipart/form-data'
      let link = this.uploadLink
      if (this.maxFileSize) {
        if (link.indexOf('?') === -1) {
          link += '?'
        } else {
          link += '&'
        }
        link += 'max_size=' + this.maxFileSize
      }
      this.$axios.post(link, fileData,
          {
            headers: headers,
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = Math.min(parseInt(Math.floor((progressEvent.loaded * 100) / progressEvent.total)), 98)
            }.bind(this),
            cancelToken: this.CancelTokenSource.token
          }
      )
          .then((res) => {
            this.fileLink = res.data.link
            this.uploadPercentage = 100
            this.emit()
            this.imageStatus = 'finished'
          }, () => {
            this.imageStatus = 'fails'
            this.uploadPercentage = 0
          })
    },
    deleteImage() {
      return this.$axios.delete(this.uploadLink,
          {
            data: {link: this.fileLink},
            headers: this.headers
          }
      )
    },
  }
}
