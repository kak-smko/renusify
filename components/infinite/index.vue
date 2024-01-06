<template>
    <r-card class="overflow-hidden">
        <r-container full-width class="pa-0">
            <r-row class="v-center h-space-between" :class="color">
                <r-col class="col-auto">
                    <h3 class="title-1 px-2">{{ title }}</h3>
                </r-col>
                <r-col class="col-auto px-1">
                  <r-switch-input
                      label="live"
                      v-model="live"
                  ></r-switch-input>
                </r-col>
            </r-row>
        </r-container>
        <r-infinite-div class="pt-0"
                        :url="url"
                        :height="height"
                        :query="query"
                        :live-timer="liveTimer"
                        :is-chat="isChat"
                        :headers="headers"
                        :live="live"
        >

          <template v-slot="{item}">
            <slot v-bind:item="item"></slot>
          </template>

        </r-infinite-div>
    </r-card>
</template>

<script>

    export default {
        name: 'r-infinite-box',
        props: {
            color:{
              type:String,
              default: 'color-two'
            },
            isChat:Boolean,
            title: {
                default: 'title',
                type: String
            },
            url: {
                required: true,
                type: String
            },
            height: {
                default: '400px',
                type: String
            },
            query: {
              type: Object
            },
            isLive:Boolean,
            liveTimer: {
                default: 10000,
                type: Number
            },
          headers: Object
        },
        data() {
            return {
                live: this.isLive||false
            }
        }
    }
</script>
