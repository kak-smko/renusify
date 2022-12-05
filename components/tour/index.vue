<template>
    <div class="tour-layer" :class="{'clickable':clickable}" :style="style"></div>
    <transition name="slide-up" mode="out-in">
        <div class="tour-msg display-4" ref="tourMsg" :style="style_msg" v-if="msg">
            <r-container>
                <div v-html="$helper.cleanXss(steps[run].msg)"></div>
                <div class="d-flex">
                    <div><span
                        class="subtitle-1 color-success br-lg py-1 px-2 ltr">{{ steps.length }} / {{ run + 1 }}</span>
                    </div>
                    <r-spacer></r-spacer>
                    <r-btn class="color-warning" :disabled="disable_prev" @click.prevent="prev" v-if="has_prev">
                        {{$t('prev','renusify')}}
                    </r-btn>
                    <r-btn class="color-warning mx-1" :disabled="disable_next" @click.prevent="next" v-if="has_next">
                        {{$t('next','renusify')}}
                    </r-btn>
                    <r-btn class="color-warning mx-1" :disabled="disable_finish" @click.prevent="finish"
                           v-if="steps.length===run+1||canFinish">{{$t('finish','renusify')}}
                    </r-btn>
                </div>
            </r-container>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'r-tour',
        props: {
            steps: {
                type: Array, default: () => {
                    return []
                }
            },
            canFinish: Boolean,
            abortOnNotFound: Boolean,
            delay: {type: Number, default: 2000}
        },
        data() {
            return {
                finished: false,
                clickable: false,
                disable_next: false,
                disable_prev: false,
                disable_finish: false,
                all: {},
                style: {},
                style_msg: {},
                msg: null,
                run: 0
            }
        },
        mounted() {
            setTimeout(() => {
                this._show()
            }, this.delay)

        },
        watch: {
            '$r.breakpoint.height': function () {
              this._show()
            }
        },
        computed: {
            has_next() {
                if(this.finished){
                    console.log('tour finished has_next:'+this.run)
                    this.reset()
                    return false
                }
                return this.$helper.ifHas(this.steps, false, this.run + 1, 'key')
            },
            has_prev() {
                if(this.finished){
                    console.log('tour finished has_prev:'+this.run)
                    this.reset()
                    return false
                }
                return this.$helper.ifHas(this.steps, false, this.run - 1, 'key')
            },
            elm() {
                if(this.finished){
                    console.log('tour finished step:'+this.run)
                    this.reset()
                    return null
                }
                const key = this.$helper.ifHas(this.steps, false, this.run, 'key')
                if (key) {
                    return document.querySelector(key)
                }
                console.log(key + ': key not found in step:' + this.run)
                return null
            }
        },
        methods: {
            elm_next() {
                return document.querySelector(this.has_next)
            },
            elm_prev() {
                return document.querySelector(this.has_prev)
            },
          _getOffsetLeft(elem) {
            let box = elem.getBoundingClientRect();

            let body = document.body;
            let docEl = document.documentElement;

            let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

            let clientTop = docEl.clientTop || body.clientTop || 0;
            let clientLeft = docEl.clientLeft || body.clientLeft || 0;

                let top = box.top + scrollTop - clientTop;
                let left = box.left + scrollLeft - clientLeft;

                return {top: Math.round(top), left: Math.round(left)};
            },
            reset() {
                this.style = {}
                this.style_msg = {}
                this.msg = null
                this.clickable = false
                this.disable_next = false
                this.disable_prev = false
                this.disable_finish = false
            },
            finish() {
                const item = this.steps[this.run]
                if (item.onFinish) {
                    item.onFinish()
                }
                this.finished = true
                this.run = 0
                this.reset()
                this.$storage.set("tour_finish", true);
            },
            prev() {
                this.reset()
                const item = this.steps[this.run]
                if (item.onPrev) {
                    item.onPrev()
                }
                this.run--
              const s = this._show()
                if (!s && this.run > 0) {
                    this.prev()
                }
            },
            next() {
                this.reset()
                const item = this.steps[this.run]
                if (item.onNext) {
                    item.onNext()
                }
                this.run++
              const s = this._show()
                if (!s && this.run < this.steps.length - 1) {
                    this.next()
                }
            },
          _show() {
            this.msg = null
            if (this.elm && !this.finished) {
              const item = this.steps[this.run]
              if (item.before) {
                item.before()
              }
              if (item.options) {
                for (let key in item.options) {
                  if (this.$helper.hasKey(item.options, key)) {
                    this[key] = item.options[key]
                            }
                        }
                    }
                    this.msg = item['msg']
                    setTimeout(() => {
                        let msgDiv = this.$refs.tourMsg.getBoundingClientRect()

                        const b = this.elm.getBoundingClientRect()
                      const s = window.getComputedStyle(this.elm)
                      const p = this._getOffsetLeft(this.elm)
                        this.style.width = b.width + 'px'
                        this.style.height = b.height + 'px'
                        this.style.top = p.top + 'px'
                        this.style.left = p.left + 'px'

                        this.style['border-radius'] = s['border-radius']
                        this.style.opacity = 1

                        let scroll = p.top
                        if (msgDiv.height < p.top) {
                            scroll = p.top - msgDiv.height
                            this.style_msg.top = scroll + 'px'
                        } else {
                            this.style_msg.top = scroll + b.height + 'px'
                        }


                        window.scroll({
                            top: scroll,
                            behavior: 'smooth'
                        });
                        if (item.after) {
                            item.after()
                        }
                    }, 1)
                    return true
                } else if (this.abortOnNotFound) {
                    console.log('abort on not found tour')
                    this.finish()
                }
                return false
            }
        }
    }
</script>
<style lang="scss">
    .tour-layer {
        transition: all .7s ease-in-out;
        position: absolute;
        box-shadow: #444444 0px 0px 1px 2px, rgba(160, 10, 255, 0.8) 0px 0px 0px 5000px;
        z-index: 100;
        opacity: 0;
        width: 1px;
        height: 1px;
        left: 0;
        top: 0;

        &.clickable {
            pointer-events: none;
        }
    }

    .tour-msg {
        transition: all 1s ease-in-out;
        color: white !important;
        position: absolute;
        width: 100%;
        z-index: 101;
        top: 0
    }
</style>