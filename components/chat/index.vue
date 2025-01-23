<template>
  <div :class="$r.prefix+'chat'">
    <div class="chat-header" v-if="title">{{ title }}</div>
    <r-chat-message-list ref="msgList" @see="$emit('see', $event)" :messages="msgs" :myself="myself"
                  :participants="participants"
                  :newMsg="newMsg"
                  :hideBottomBtn="hideBottomBtn"
    >
    </r-chat-message-list>
    <r-chat-input v-if="!hideSend"
                  @update:model-value="onMsgSubmit"
                  :send-by-enter="sendByEnter"
                  :maxLenMsg="maxLenMsg"
                  :placeholder="placeholder"
                  :uploadLink="uploadLink"
                  :maxFileSize="maxFileSize"
                  :canFile="canFile"
    ></r-chat-input>
  </div>
</template>
<script>

export default {
  name: 'r-chat',
  props: {
    sendByEnter: Boolean,
    placeholder: {type: String, default: 'type here'},
    hideBottomBtn: Boolean,
    hideSend: Boolean,
    maxLenMsg: {type: Number, default: 200},
    newMsg: {
      type: Object, default: () => {
        return {
          num: 0,
          first_id: null
        }
      }
    },
    participants: {
      type: Object,
      required: true
    },
    messages: {
      type: Array,
      required: true
    },
    myself: {
      type: Object,
      required: true
    },
    title: String,
    canFile: Boolean,
    maxFileSize: {type: Number, default: 1024 * 1024},
    uploadLink: {
      type: String,
      default: '/storage/chat'
    },
  },
  emits:['see','msg-submit'],
  data() {
    return {
      timeout_id: null
    }
  },
  computed: {
    msgs() {
      let res = []
      this.messages.forEach((msg, i) => {
        let m = Object.assign({}, msg)
        delete m.user_id
        if (res[res.length - 1] && msg.user_id === res[res.length - 1].user_id) {
          res[res.length - 1]['list'].push(m)
        } else {
          res.push({
            '_id': i,
            'user_id': msg.user_id,
            'list': [m]
          })
        }
      })
      return res
    }
  },
  methods: {
    onMsgSubmit: function (message) {
      let d = message
      d.id = this.$helper.uniqueId(16)
      d.created_at = new Date()

      this.$emit("msg-submit", d)
      clearTimeout(this.timeout_id)
      this.timeout_id = setTimeout(() => {
        this.$refs.msgList.goToBottom()
      }, 100)
    }
  },
}
</script>
<style lang="scss">
@use "../../style/variables/base";

.#{base.$prefix}chat {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  background: var(--color-sheet);
  color: var(--color-on-sheet);
}
</style>
