<template>
    <r-card class="overflow-hidden">
        <r-container full-width class="pa-0">
            <r-row class="v-center h-space-between" :class="color">
                <r-col class="col-auto">
                    <h3 class="title px-2">{{ title }}</h3>
                </r-col>
                <r-col class="col-auto">
                    <r-switch
                            label="live"
                            v-model="live"
                    ></r-switch>
                </r-col>
            </r-row>
        </r-container>
        <r-infinite-div  class="pt-0"
                        :url="url"
                        :height="height"
                        :query="query"
                        :live-timer="liveTimer"
                         :is-chat="isChat"
                        :live="live">

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
        },
        data() {
            return {
                live: this.isLive||false
            }
        }
    }
</script>
