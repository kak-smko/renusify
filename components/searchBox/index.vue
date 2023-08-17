<template>
  <div :class="$r.prefix+'search-container'">
    <template v-if="!closable||show">
      <div class="search-input" v-click-outside="handleclose">
        <r-input :active="active"
                 :icon="$r.icons.search"
                 @icon="show=false"
                 v-bind="$attrs"
                 :class="{'z-important':open}"
                 :modelValue="lazyValue"
                 :input-control-class="[inputControlClass,{'search-active-border':open}]">
          <input :autofocus="autofocus"
                 type="text"
                 @focusin="active=true"
                 @focusout="active=false"
                 @input="handle"
                 :value="lazyValue"
                 autocomplete="no"
          />
          <r-progress-line v-if="loading" color="color-two" class="w-full"></r-progress-line>
        </r-input>
        <r-card v-if="open&&(list.length>0||!loading)"
                class="card-select  z-important"
                :class="{'card-tile':$attrs.tile!==undefined&&$attrs.tile!==false,'to-top':openToTop}"
        >
          <r-list v-if="list.length>0"
                  :items="list"
                  @update:modelValue="listInput">
            <template v-slot="props">
              <slot :item="props.item">
                <div class="list-title">{{ props.item['name'] }}</div>
              </slot>
            </template>
          </r-list>
          <div v-else-if="!loading" class="py-5">
            {{ notFoundMsg }}
          </div>
        </r-card>
      </div>
      <transition name="fade" v-if="!noOverlay">
        <div v-if="open" class="search-shadow"></div>
      </transition>
    </template>
    <r-btn v-else icon class="mt-5" @click="show=!show">
      <r-icon v-html="$r.icons.search"></r-icon>
    </r-btn>
  </div>
</template>
<script>

export default {
  name: 'r-search-box',
  inheritAttrs: false,
  props: {
    closable: Boolean,
    notFoundMsg: {
      type: String,
      default: "Can't Find Anything :("
    },
    url: String,
    query: {
      type: String,
      default: 'search'
    },
    inputControlClass: [String, Object, Array],
    modelValue: [String, Number],
    autofocus: Boolean,
    noOverlay: Boolean,
    openToTop: Boolean,
    headers: Object
  },
emits:['update:modelValue','select'],
  data() {
    return {
      show: false,
      lazyValue: this.modelValue,
      loading: false,
      active: false,
      open: false,
      idSet: null,
      list: []
    }
  },
  watch: {
    modelValue() {
      this.lazyValue = this.modelValue
    }
  },
  methods: {
    handleclose() {
      this.open = false
    },
    get() {
      if (this.url) {
        this.loading = true
        this.$axios.get(this.url, {
          params: {
            [this.query]: this.lazyValue
          },
          headers: this.headers
        }).then(({data}) => {
          this.list = data
          this.loading = false
          this.open = true
        }, (e) => {
          this.loading = false
        })
      }
    },
    handle(e) {
      this.lazyValue = e.target.value
      this.open = true
      this.loading = true
      clearTimeout(this.idSet)
      this.idSet = setTimeout(() => {
        this.$emit('update:modelValue', this.lazyValue)
        this.get()
      }, 1000)
    },
    listInput(e) {
      this.$emit('select', e)
      this.open = false
    }
  }
}

</script>
<style lang="scss">
@import '../../style/include';

.#{$prefix}search-container {
  position: relative;

  .to-top {
    bottom: 42px;
  }

  .search-input {
    .sheet {
      transition: 0.5s all ease;
    }

    .card-select {
      position: absolute;
      left: 0;
      width: 100%;
      overflow-y: auto;
      max-height: 300px;

      &:not(.card-tile) {
        border-radius: 0 0 20px 20px;
      }
    }

    .search-active-border:not(.input-tile) {
      border-radius: 20px 20px 0 0;
    }
  }

  .search-shadow {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: map_get($z-index, 'medium');
    top: 0;
    left: 0;
    backdrop-filter: blur(3px) grayscale(30%);
  }
}
</style>
