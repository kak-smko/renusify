<template>
  <div class="message-body" :class="{'is-me':isMe}">
    <img class="message-user-img me-1" :src="user.img+'?w=50&h=50'" :alt="user.name"
         v-if="!isMe&&!message.in_line_top&&!message.in_line_mid">
    <div class="message-holder">
      <div class="message-content" v-for="(msg,i) in message.list"
           :id="'msg-'+msg._id"
           v-intersect.once="{
                            handler: view,
                               options: {
                                    id:msg._id,
                                    threshold: 0.05
                                }
                                }"
           :key="msg._id"
           :class="{'in-line-top':i===0&&message.list.length>1,
                            'in-line-mid':i!==0&&i<message.list.length-1,
                            'in-line-btm':i===message.list.length-1&&message.list.length>1
                 }">
        <div class="message-text body-1">
          <div v-if="!isMe" class="message-username title-3">{{ user.name }}
          </div>
          <div v-if="msg.type==='file'" @click.prevent="$helper.download('/'+msg.link)">
            <div class="mx-n2 mt-n1" v-if="isImg(msg.link)">
              <r-img class="br-sm" :src="'/'+msg.link" alt="img" width="250" :w-p-h="isImg(msg.link)"></r-img>
            </div>
            <div v-else class="d-flex cursor-pointer">
              <r-icon class="ma-1" v-html="$r.icons.file"></r-icon>
              <span>
                        {{ file_name(msg.link) }}
                                </span>
            </div>
          </div>
          <div v-html="msg.content"></div>
          <div class="message-info text-end label-1">
            {{ msg.timestamp }}
          </div>
        </div>
        <div class="is-end" v-if="i===message.list.length-1"></div>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: 'r-chat-msg',

  props: {
    isMe: Boolean,
    user: {
      type: Object,
      default: () => {
        return {}
      }
    },
    message: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits:['see'],
  methods: {
    isImg(link) {
      const is = link.indexOf('storage/img/') !== -1
      if (is) {
        link = link.split('/')
        link = link[link.length - 1].split('_')
        return link[0] / link[1]
      }
      return is
    },
    file_name(link) {
      let res = link.split('/')
      return res[res.length - 1]
    },
    view(isIntersecting, entries, observer, options) {
      if (isIntersecting) {
        this.$emit('see', options.id)
      }
    }
  }
}
</script>
<style lang="scss">
@use "sass:map";
@use "../../style/variables/base";
@use "../../style/mixins";

.message-body {
  display: flex;
  align-items: flex-end;
  position: relative;
  padding: 5px;

  .message-holder {
    width: 100%;
  }

  .message-user-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: sticky;
    bottom: 0;
    z-index: 1;
  }

  .message-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 1000px;
    position: relative;
  }

  .message-text {
    background: #fff;
    color: black;
    padding: 5px 10px;
    border-radius: map.get(base.$borders, 'lg');
    max-width: 80%;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .message-username {
    color: #4f98ec;
  }

  .message-info {
    color: #444444;
  }

  .in-line-top {
    .message-text {
      border-bottom-left-radius: 4px !important;
      border-bottom-right-radius: 4px !important;
      margin-bottom: 2px;
    }
  }

  .in-line-mid {
    .message-text {
      margin-top: 0px;
      margin-bottom: 2px;
      border-radius: map.get(base.$borders, 'sm') !important;
    }
  }

  .in-line-btm {
    .message-text {
      border-top-left-radius: 4px !important;
      border-top-right-radius: 4px !important;
    }
  }

  .is-end {
    width: 15px;
    height: 15px;
    position: absolute;
    bottom: 0;
    overflow: hidden;

    &:after {
      content: '';
      width: 30px;
      height: 30px;
      border-radius: 50%;

      background-color: var(--color-sheet);

      position: absolute;
      top: -15px;
    }
  }

  &:not(.is-me) {
    .is-end {
      background-color: #fff;
      @include mixins.ltr() {
        left: -15px;
      }
      @include mixins.rtl() {
        right: -15px;
      }

      &:after {
        @include mixins.ltr() {
          left: -15px;
        }
        @include mixins.rtl() {
          right: -15px;
        }
      }
    }

    .message-content {
      @include mixins.ltr() {
        align-items: flex-end;
      }
      @include mixins.rtl() {
        align-items: flex-start;
      }
    }

    .message-text {
      @include mixins.ltr() {
        border-bottom-left-radius: 0px;
      }
      @include mixins.rtl() {
        border-bottom-right-radius: 0px;
      }
    }
  }

  &.is-me {
    flex-direction: row-reverse;
    @include mixins.rtl() {
      margin-left: 15px;
    }
    @include mixins.ltr() {
      margin-right: 15px;
    }

    .is-end {
      background-color: #4f98ec;
      @include mixins.rtl() {
        left: -15px;
      }
      @include mixins.ltr() {
        right: -15px;
      }

      &:after {
        @include mixins.rtl() {
          left: -15px;
        }
        @include mixins.ltr() {
          right: -15px;
        }
      }
    }

    .message-text {
      background-color: #4f98ec;
      color: white;
      @include mixins.ltr() {
        border-bottom-right-radius: 0px;
      }
      @include mixins.rtl() {
        border-bottom-left-radius: 0px;
      }
    }

    .message-info {
      color: #eeeeee;
    }

    .message-content {
      @include mixins.ltr() {
        align-items: flex-start;

      }
      @include mixins.rtl() {
        align-items: flex-end;

      }
    }
  }
}
</style>