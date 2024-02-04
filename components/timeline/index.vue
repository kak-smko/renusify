<template>
    <r-container full-width :class="`${$r.prefix}timeline`">
        <r-row no-gutters class="timeline-item" v-for="(item,i) in items" :key="i">
            <r-col class="md-5" v-if="$r.breakpoint.mdAndUp">
                <slot name="back" :item="item" :k="i"></slot>
            </r-col>
            <r-col class="col-2 md-2">
                <slot name="counter" :item="item" :k="i">
                    <div class="d-flex h-center v-center h-full">
                        <div class="timeline-counter color-one d-flex h-center v-center">{{ i + 1 }}</div>
                    </div>
                </slot>
            </r-col>
            <r-col class="col-10 md-5">
                <slot :item="item" :k="i">{{item}}</slot>
            </r-col>
        </r-row>
    </r-container>
</template>
<script>
    export default {
        name: "rTimeline",
        props: {
            items: {
                type: Array
            }
        }
    }
</script>
<style lang="scss">
    @import "../../style/include";

    .#{$prefix}timeline {
        .timeline-item {
            position: relative;
            padding: 30px 0;

            &:not(:last-child):before {
              content: '';
              width: 1px;
              height: 40%;
              border-right: 2px solid var(--color-border);
              position: absolute;
              bottom: -20%;
              z-index: 0;
              @include rtl() {
                right: percentage(div(1, $grid-columns));
              }
              @include ltr() {
                left: percentage(div(1, $grid-columns));
              }
            }

            @include media-breakpoint-up('md') {
                &:nth-child(2n) {
                    flex-direction: row-reverse;
                }
                &:not(:last-child):before {
                    left: 50% !important;
                    right: unset !important;
                }
            }

        }

        .timeline-counter {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            z-index: 1;
        }
    }
</style>