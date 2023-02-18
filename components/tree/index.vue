<template>
    <r-container full-width :class="classes" ref="tree">
        <r-row v-if="searchLink">
            <r-col>
                <r-select
                        :searchLink="searchLink"
                        :model-value="search"
                        @update:model-value="change($event)"
                        :label="$t('search','renusify')"
                ></r-select>
            </r-col>
        </r-row>
        <r-float bordered v-if="show" :minZoom="0.01" :zoom="0.7">
            <template v-slot="{move,ease,transform}">
                <r-container full-width fill :class="{
                                    'tree-rotate':rotate
                                }">
                    <slot
                                    :parent-node="nodeParent"
                                    @update:model-value="$emit('update:model-value',$event)"
                                    :model-value="node"
                                    :link="link"
                                    @select-node="handleSelect"
                                    @expand="handleExpand(ease,move,transform,$event)"
                                    :selected="selected"
                                    :expand="expand"
                                    :openAll="openAll"
                    >
                    </slot>
                </r-container>
            </template>
        </r-float>
    </r-container>

</template>
<script>

    export default {
        name: 'r-tree',

        props: {
            modelValue: Object,
            link: String,
            searchLink: String,
            gen: String,
            selected: String,
            rotate: Boolean,
            expand: {
                type: Boolean,
                default: false
            },
            childsName: {
                type: String,
                default: 'childs'
            },
            openAll:Boolean
        },
        data() {
            return {
                show: false,
                search: null,
                nodeParent: this.gen,
                node: this.modelValue
            }
        },
        created() {
            if (this.modelValue) {
                this.show = true
            } else if (this.link) {
                this.get()
            }
        },
        watch: {
            modelValue: function (newVal) {
                this.node = newVal
            }
        },
        computed:{
            classes(){
                let a={'tree-searchable':this.searchLink}
                a[`${this.$r.prefix}tree`]=true
                return a
            }
        },
        methods: {
            change(e) {
                if (e && "value" in e) {
                    this.nodeParent = e.value
                    this.show = false
                    this.get()
                }
            },
            get() {
                this.$axios.get(this.link + this.nodeParent)
                    .then(({data}) => {
                        this.node = data
                        this.show = true
                    })
            },
            handleExpand(ease, move, transform, $event) {
                const el = $event[1].getBoundingClientRect()
                ease()
                const node_info=$event[1].querySelector('.node-info').getBoundingClientRect()
                const card_h = node_info.height
                const card_w = node_info.width
                const parent = this.$refs.tree.$el
                const bb = this.$refs.tree.$el.getBoundingClientRect()
                move(parent.offsetWidth / 2 - (el.left - bb.left + ($event[0] ? el.width / 2 : el.width - card_w / 2)),
                    parent.offsetHeight / 2 - (el.top - bb.top +(this.rotate ? el.height- card_h :card_h/2) ))
            },
            handleSelect(e) {
                this.$emit('select-node', e)
            }
        }
    }
</script>
<style lang="scss">
    @import "../../style/include";

    $distance: 20px;
    .#{$prefix}tree {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: var(--color-background-one);

      &.tree-searchable {
        .#{$prefix}float {
          height: calc(100% - 70px)
        }
      }

      .#{$prefix}float {
        direction: ltr;
      }

        .tree-rotate {
            transform: rotateX(180deg);

            .node-info {
                transform: rotateX(-180deg);
            }

            .tree-btn-expand {
                transform: rotateX(-180deg);
            }
        }

    }
</style>