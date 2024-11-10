<template>
    <div ref="containerMessage"
         v-scroll.window="handle" class="container-message-list">
        <div v-for="message in messages" :key="message._id" class="message-container">
            <r-chat-message @see="$emit('see', $event)" :message="message" :is-me="message.user_id===myself.id"
                        :user="message.user_id===myself.id?myself:participants[message.user_id]"></r-chat-message>
        </div>
    </div>
    <transition name="scale" v-if="!hideBottomBtn">
        <r-btn v-if="!is_bottom" fab class="go-buttom" :label="newMsg.num" @click.prevent="goTo(newMsg.first_id)">
            <r-icon v-html="$r.icons.chevron_down"></r-icon>
        </r-btn>
    </transition>
</template>

<script>

export default {
  emits: ["see"],
  props: {
    newMsg: {
      type: Object, default: () => {
        return {
          num: 0,
          first_id: null
        }
      }
    },
    hideBottomBtn: Boolean,
    messages: {type: Array,},
    myself: {type: Object},
    participants: {type: Object}
  },
  data() {
    return {
                timeout_id: null,
                timeout_scroll: null,
                is_bottom: false
            }
        },
        mounted() {
            setTimeout(() => {
                this.goTo(this.newMsg.first_id);
            }, 10)
        },
        watch: {
            messages: function (n, o) {
                clearTimeout(this.timeout_id)
                this.timeout_id = setTimeout(() => {
                    const scrollDiv = this.$refs.containerMessage;
                    const offset = scrollDiv.scrollHeight - scrollDiv.scrollTop - scrollDiv.clientHeight
                    if (offset < 100 || o.length === 0) {
                        this.goToBottom()
                    }
                }, 300)
            }
        },
        methods: {
            handle(e) {
                clearTimeout(this.timeout_scroll)
                this.timeout_scroll = setTimeout(() => {
                    const scrollDiv = this.$refs.containerMessage;
                    const offset = scrollDiv.scrollHeight - scrollDiv.scrollTop - scrollDiv.clientHeight
                    this.is_bottom = offset === 0;
                }, 100)
            },
            goTo(id) {
                let f = document.getElementById('msg-' + id)
                if (f) {
                    this.hover(f)
                    f = f.getBoundingClientRect()
                    const scrollDiv = this.$refs.containerMessage;
                    scrollDiv.scrollTop = scrollDiv.scrollTop - scrollDiv.clientHeight + f.top + f.height
                } else {
                    this.goToBottom()
                }
            },
            hover(elm) {
                elm.classList.add('msg-select')
                setTimeout(() => {
                    elm.classList.remove('msg-select')
                }, 2000)
            },
            goToBottom() {
                let scrollDiv = this.$refs.containerMessage;
                if (scrollDiv !== null) {
                    scrollDiv.scrollTop = scrollDiv.scrollHeight;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../style/include";

    .#{$prefix}chat .container-message-list {
        scroll-behavior: smooth;
        flex: 1;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;
        max-height: 100%;
        /************** Safari 10.1+ ********************/
        @media not all and (min-resolution: .001dpcm) {
            @supports (-webkit-appearance:none) {

                .message-container {
                    display: -webkit-box !important;
                }

            }
        }

        .message-container {
            display: flex;
            flex-direction: column;
        }

        .msg-select {
          animation: color .7s;
          animation-iteration-count: infinite;
          border-radius: map-get($borders, 'sm');

          .message-text {
            opacity: .4;
          }
        }
    }

    .go-buttom {
        position: absolute;
        @include rtl() {
            left: 20px;
            bottom: 50px;
        }
        background-color: #eeeeee;
        color: #0b8e6b;

        .label {
            background-color: #0b8e6b;
            color: white;
        }
    }

    @keyframes color {
        0% {
            background-color: #c6e6f5;
        }
        50% {
            background-color: #7ad5ff;
        }
        100% {
            background-color: #0aa6ee;
        }
    }

</style>
