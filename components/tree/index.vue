<template>
    <r-container ref="tree" :class="classes" full-width>
        <r-row v-if="searchLink">
            <r-col>
              <r-select-input
                    :label="$t('search','renusify')"
                    :model-value="search"
                    :searchLink="searchLink"
                    @update:model-value="change($event)"
              ></r-select-input>
            </r-col>
        </r-row>
        <r-float v-if="show" :minZoom="0.01" :zoom="0.7" bordered>
            <template v-slot="{move,ease,transform}">
                <div :class="{
                                    'tree-rotate':rotate
                                }">
                    <r-tree-element @update:model-value="$emit('update:modelValue',$event)"
                                    :link="link"
                                    :model-value="node"
                                    @expand="handleExpand(ease,move,transform,$event)"
                                    :expand="expand"
                                    :openAll="openAll"
                                    @select="handleSelect"
                    >
                        <template v-slot="{ item,nodeKey }">
                            <slot :item="item" :nodeKey="nodeKey">{{item}}</slot>
                        </template>
                    </r-tree-element>
                </div>
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
        openAll: Boolean,
        headers: Object
    },
    emits: ['update:modelValue', 'select-node'],
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
    computed: {
        classes() {
            let a = {'tree-searchable': this.searchLink}
            a[`${this.$r.prefix}tree`] = true
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
            this.$axios.get(this.link + this.nodeParent, {headers: this.headers})
                .then(({data}) => {
                    this.node = data
                    this.show = true
                })
        },
        handleExpand(ease, move, transform, $event) {
            const el = $event[1].getBoundingClientRect()
            ease()
            const node_info = $event[1].querySelector('.node-info').getBoundingClientRect()
            const card_h = node_info.height
            const card_w = node_info.width
            const parent = this.$refs.tree.$el
            const bb = this.$refs.tree.$el.getBoundingClientRect()
            move(parent.offsetWidth / 2 - (el.left - bb.left + ($event[0] ? el.width / 2 : el.width - card_w / 2)),
                parent.offsetHeight / 2 - (el.top - bb.top + (this.rotate ? el.height - card_h : card_h / 2)))
        },
        handleSelect(e) {
            this.$emit('select-node', e)
        }
    }
}
</script>
<style lang="scss">
@use "../../style/variables/base";

$distance: 20px;
.#{base.$prefix}tree {
    position: relative;
    width: 100%;
    height: 100%;

    &.tree-searchable {
      .#{base.$prefix}float {
            height: calc(100% - 70px)
        }
    }

  .#{base.$prefix}float {
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
