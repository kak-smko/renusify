<template>
  <div :class="[$r.prefix + 'search-box',{
          'to-top': openToTop}]">
    <template v-if="!closable || show">
      <div
          v-click-outside="handleclose"
          :class="[inputControlClass, { 'z-important search-open': open }]"
          class="search-input"
      >
        <span v-if="categories" class="w-30">
          <r-select-input
              v-model="category"
              :items="categories"
              class="mt-0"
              inputControlClass="ps-2"
              disable-search
              first-select
              hide
              tile
              justValue
          ></r-select-input>
        </span>
        <span
            :class="{ 'w-70': categories, 'w-full': !categories }"
            class="d-flex v-center"
        >
          <input
              :placeholder="label"
              :value="lazyValue"
              autocomplete="no"
              class="flex-grow-1"
              type="text"
              @focusin="active = true"
              @focusout="active = false"
              @input="handle"
          />
          <r-icon v-html="$r.icons.search"></r-icon>
        </span>
      </div>
      <r-card
          v-if="open"
          :class="{
          'card-tile': $attrs.tile !== undefined && $attrs.tile !== false
        }"
          class="card-search z-important"
      >
        <r-progress-line
            v-if="loading"
            class="w-full"
            color="color-two"
        ></r-progress-line>
        <r-list
            v-if="list.length > 0"
            :items="list"
            @update:modelValue="listInput"
        >
          <template v-slot="props">
            <slot :item="props.item">
              <div class="list-title">{{ props.item["name"] }}</div>
            </slot>
          </template>
        </r-list>
        <div v-else-if="!loading" class="py-5">
          {{ notFoundMsg }}
        </div>
      </r-card>
      <transition name="fade" v-if="!noOverlay">
        <div v-if="open" class="search-shadow"></div>
      </transition>
    </template>
    <r-btn v-else class="mt-5" icon @click="show = !show">
      <r-icon v-html="$r.icons.search"></r-icon>
    </r-btn>
  </div>
</template>
<script>
export default {
  name: "r-search-box",
  props: {
    closable: Boolean,
    notFoundMsg: {
      type: String,
      default: "Can't Find Anything :(",
    },
    label: String,
    url: String,
    inputControlClass: [String, Object, Array],
    query: {
      type: String,
      default: "search",
    },
    modelValue: [String, Number],
    noOverlay: Boolean,
    openToTop: Boolean,
    categories: Array,
    headers: Object,
  },
  emits: ["update:modelValue", "select"],
  data() {
    return {
      show: false,
      lazyValue: this.modelValue,
      loading: false,
      active: false,
      open: false,
      idSet: null,
      category: null,
      list: [],
    };
  },
  watch: {
    modelValue() {
      this.lazyValue = this.modelValue;
    },
  },
  methods: {
    handleclose() {
      this.open = false;
    },
    get() {
      if (this.url) {
        this.loading = true;
        this.$axios
            .get(this.url, {
              params: {
                [this.query]: this.lazyValue,
                category: this.category,
              },
              headers: this.headers,
            })
            .then(
                ({data}) => {
                  this.list = data;
                  this.loading = false;
                  this.open = true;
                },
                () => {
                  this.loading = false;
                }
            );
      }
    },
    handle(e) {
      this.lazyValue = e.target.value;
      this.open = true;
      this.loading = true;
      clearTimeout(this.idSet);
      this.idSet = setTimeout(() => {
        this.$emit("update:modelValue", this.lazyValue);
        this.get();
      }, 1000);
    },
    listInput(e) {
      this.$emit("select", e);
      this.open = false;
    },
  },
};
</script>
<style lang="scss">
@import "~renusify/style/include";

.#{$prefix}search-box {
  position: relative;

  &.to-top {
    .card-search {
      bottom: 47px;
      border-radius: map-get($borders, "md") map-get($borders, "md") 0 0;
    }

    .search-open {
      border-top-left-radius: 0px !important;
      border-top-right-radius: 0px !important;
    }
  }

  &:not(&.to-top) {
    .card-search {
      top: 47px;
      border-radius: 0 0 map-get($borders, "md") map-get($borders, "md");
    }

    .search-open {
      border-bottom-left-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
    }
  }

  .search-input {
    display: flex;
    align-items: center;
    border: solid 1px var(--color-border);
    color: var(--color-text-primary);
    position: relative;
    border-radius: map-get($borders, "md");

    .sheet {
      transition: 0.5s all ease;
    }
  }


  input {
    outline: none;
    line-height: 20px;
    padding: 12px;
    max-width: 100%;
    min-width: 0px;
    caret-color: var(--color-text-primary);
  }

  .card-search {
    position: absolute;
    left: 0;
    width: 100%;
    overflow-y: auto;
    max-height: 300px;
  }


  .search-shadow {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: map_get($z-index, "medium");
    top: 0;
    left: 0;
    backdrop-filter: blur(3px) grayscale(30%);
  }

  .#{$prefix}select-container {
    .input-control {
      border-radius: 0;
      min-height: 30px;
      @include ltr() {
        border-right: 1px solid var(--color-border) !important;
      }

      @include rtl() {
        border-left: 1px solid var(--color-border) !important;
      }
    }

    .card-select {
      top: -6px;
      border-radius: map-get($borders, "md");
      @include ltr() {
        border-top-right-radius: 0 !important;
      }

      @include rtl() {
        border-top-left-radius: 0 !important;
      }
    }
  }
}
</style>
