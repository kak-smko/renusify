<template>
    <div :class="`${$r.prefix}avatar ${tile?'avatar-tile':''}`"
         :style="`height:${size}px;width:${size}px;`">
      <div class="avatar-content" :class="`${!flat?'elevation-'+elevation:''}`" :key="k">
        <slot></slot>
      </div>
      <r-btn :loading="loading" v-if="editable" @click.prevent.stop="pickFile" icon class="avatar-edit color-info">
        <r-icon v-html="$r.icons.camera"></r-icon>
      </r-btn>
      <input v-if="editable" accept="image/*"
             @change="addFile()"
             ref="file"
               class="d-none"
               type="file"
        >
    </div>
</template>

<script>
    import './style.scss'

    export default {
        name: 'r-avatar',
        props: {
            size: {
                type: [Number, String],
              default: 48
            },
          elevation: {
            type: String,
            default: 'none'
          },
          editable: {
            type: String
          },
          flat: Boolean,
          tile: Boolean,
          headers: Object
        },
        data() {
            return {
                k:0,
                files: [],
                loading: false
            }
        },
        created(){
          if(!this.$r.icons.camera){
              this.$r.icons.camera = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4V1h2v3h3v2H5v3H3V6H0V4m6 6V7h3V4h7l1.8 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10m10 9c4.45 0 6.69-5.38 3.54-8.54C13.39 7.31 8 9.55 8 14c0 2.76 2.24 5 5 5m-3.2-5c0 2.85 3.45 4.28 5.46 2.26c2.02-2.01.59-5.46-2.26-5.46A3.21 3.21 0 0 0 9.8 14Z"/></svg>'
          }
        },
        methods: {
            addFile() {
                this.CancelTokenSource = this.$axios.CancelToken.source()
                this.files = this.$refs.file.files
                this.saveImage()
            },
            pickFile() {
                this.$refs.file.click()
            },
            saveImage() {
              this.loading = true
              let fileData = new FormData()
              fileData.append('file', this.files[0])
              let headers = this.headers
              if (!headers) {
                headers = {}
              }
              headers['Content-Type'] = 'multipart/form-data'
              this.$axios.post(this.editable, fileData,
                  {
                    headers: headers,
                    onUploadProgress: function (progressEvent) {
                      this.uploadPercentage = Math.min(parseInt(Math.floor((progressEvent.loaded * 100) / progressEvent.total)), 98)
                    }.bind(this),
                    cancelToken: this.CancelTokenSource.token
                  }
              )
                  .then(() => {
                        this.loading = false
                        this.k+=1
                    }, () => {
                        this.loading = false
                    })
            }

        }

    }
</script>
