<template>
  <div :class="{[$r.prefix+'chat-input']:true,'with-file':canFile}">
    <r-btn text icon>
      <r-icon v-html="$r.icons.sticker"></r-icon>
    </r-btn>
    <div class="chat-input"
         ref="input"
         contenteditable="true"
         @input="updateText"
         @keydown="updateKey"
         @paste.prevent="updatePaste"
    >
    </div>
    <div class="action-section d-flex h-end">
      <template v-if="canFile">
        <r-btn v-if="uploadPercentage===0||uploadPercentage===100" @click.prevent.stop="pickFile"
               icon
               text>
          <r-icon v-html="$r.icons.attachment"></r-icon>
        </r-btn>
        <r-progress-circle
            v-else
            @click.prevent="fileDelete()"
            :indeterminate=false
            :modelValue="uploadPercentage"
            :width="2"
            size="30"
        >
          <r-icon v-html="$r.icons.close"></r-icon>
        </r-progress-circle>
      </template>
      <r-btn class="color-success-text"
             :disabled="!text"
             @click.prevent="send"
             icon
             text>
        <r-icon v-html="$r.icons.send"></r-icon>
      </r-btn>
      <br>
      <span class="caption color-error-text" v-if="remain<30">{{ remain }}</span>
    </div>
    <input accept="*"
           @change="addFile()"
           ref="file"
           style="display: none"
           type="file"
           v-if="showFile"
    >
  </div>
</template>
<script>
import file from "../form/fileUploader/file";

export default {
  name: 'r-chat-input',
  mixins: [file],
  props: {
    maxLenMsg: {type: Number, default: 200},
    sendByEnter: Boolean,
    placeholder: {type: String, default: 'type here'},
    maxFileSize: Number,
    uploadLink: String,
    canFile: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return {
      text: '',
      showFile: true,
    }
  },
  computed: {
    remain() {
      return this.maxLenMsg - this.text.length
    }
  },
  methods: {
    updatePaste(e) {
      let text = this.$refs.input.innerText
      this.$refs.input.innerText = this.$helper.limiter(text + e.clipboardData.getData('Text'), this.maxLenMsg)
      this.updateText()
    },
    updateKey(e) {
      let text = this.$refs.input.innerText

      if (e.keyCode === 13 && this.sendByEnter) {
        this.send()
        return
      }
      if (text.length >= this.maxLenMsg && e.keyCode !== 8 && e.keyCode !== 46) {
        e.preventDefault();
      }
    },
    updateText() {
      this.text = this.$refs.input.innerText
      this.$refs.input.scrollTop = this.$refs.input.scrollHeight
    },
    send() {
      if (this.text) {
        this.$emit('update:modelValue', {type: "text", content: this.text})
        this.$refs.input.innerText = ''
        this.text = ''
        this.$refs.input.focus()
      }
    },
    emit() {
      this.$emit('update:modelValue', {type: "file", content: this.text, link: this.fileLink})
      this.$refs.input.innerText = ''
      this.text = ''
    }
  }
}
</script>
<style lang="scss">
@import "../../style/include";

.#{$prefix}chat-input {
  display: flex;

  box-shadow: black 0px 8px 15px;
  background: var(--color-background-two);
  border-top: 1px solid var(--color-border);

  .chat-input {
    margin: 5px 0;
    resize: none;
    outline: none;
    line-height: 25px;
    font-size: 14px;
    max-height: 80px;
    overflow-y: auto;
    width: calc(100% - 40px);
  }

  .action-section {
    width: 40px;
  }

  &.with-file {
    .action-section {
      width: 80px;
    }

    .chat-input {
      width: calc(100% - 80px);
    }
  }
}
</style>