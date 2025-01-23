<template>
  <div
      :class="{
      'menu-open': open,
    }"
      class="template-main h-end"
  >
    <div class="toolbar border-none d-flex v-center color-white">
      <r-btn class="btn-menu" icon text @click.prevent="open = !open">
        <r-icon v-if="!open" v-html="$r.icons.menu"></r-icon>
        <r-icon v-else v-html="$r.icons.close"></r-icon>
      </r-btn>
      <router-link target="_blank" to="/">
        <img alt="renusify" class="me-2" height="60" src="/logo.jpg" width="210"/>
      </router-link>
      <r-spacer></r-spacer>
      <r-select-input
          v-model="lang"
          :items="[
          { name: 'English', value: 'en' },
          { name: 'فارسی', value: 'fa' },
        ]"
          just-value
      ></r-select-input>
    </div>
    <div class="menu-main">
      <div class="list color-white">
        <sideBar :items="menu"></sideBar>
      </div>
      <div class="hover-div" @click.prevent="open = false"></div>
    </div>
    <div class="router-div">
      <div class="position-relative">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="slide-start">
            <component :is="Component"/>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from "../components/sideBar";

export default {
  name: "renusify",
  components: {sideBar},
  metaInfo: {
    title: "renusify",
  },
  data() {
    return {
      open: false,
      lang: "en",
      menu: [],
    };
  },
  created() {
    this.lang = this.$route.params.lang || this.$storage.get("lang", "en");

    if (this.lang === "fa") {
      this.$r.rtl = true;
    }
    this.$r.lang = this.lang;

    import(
    "../views/index/menu/" + this.lang + ".json"
        ).then((data) => {
      this.menu = data.default;
      this.$r.store.menu = this.menu;
    });
  },
  watch: {
    $route: function () {
      this.open = false;
    },
    lang: function (n) {
      const lang = this.$route.params.lang || this.$storage.get("lang", "en");
      this.$storage.set("lang", n);
      if (n !== lang) {
        window.location = window.location.href.replace(`/${lang}/`, `/${n}/`);
      }
    },
  },
};
</script>

<style lang="scss">
@use "sass:map";
@use "../../../style/variables/base";
@use "../../../style/mixins";
@use "../../../style/mixins/container" as mixins2;


$menu-width: 300px;
.template-main {
  display: flex;
  flex-direction: row;
  position: relative;

  .toolbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: base.$toolbar-height;
    z-index: map.get(base.$z-index, "medium");
  }

  &.menu-open {
    .menu-main {
      width: 100vw;
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .hover-div {
      width: calc(100% - #{$menu-width});
      max-width: calc(100% - #{$menu-width});
      min-height: calc(100vh - #{base.$toolbar-height});
      transition: 0.1s all ease-in-out;
      position: absolute;
      top: 0;
      z-index: 2;
      @include mixins.rtl() {
        left: 0;
      }
      @include mixins.ltr() {
        right: 0;
      }
    }

    .list {
      @include mixins.rtl() {
        right: 0 !important;
      }
      @include mixins.ltr() {
        left: 0 !important;
      }
    }
  }

  .menu-main {
    transition: 0.3s all ease-in-out;
    height: calc(100vh - #{base.$toolbar-height});
    top: base.$toolbar-height;
    position: fixed;
    z-index: map.get(base.$z-index, "medium");
    opacity: 0;
    @include mixins.rtl() {
      right: 0;
    }
    @include mixins.ltr() {
      left: 0;
    }

    .list {
      overflow-y: auto;
      width: $menu-width;
      transition: 0.3s all ease-in-out;
      background-color: var(--color-sheet);
      height: 100%;
      position: absolute;
      top: 0;
      @include mixins.rtl() {
        right: -$menu-width;
      }
      @include mixins.ltr() {
        left: -$menu-width;
      }
      font-weight: bold;
    }
  }

  .router-div {
    position: fixed;
    top: base.$toolbar-height;
    width: 100%;
    max-width: 100%;
    overflow-y: auto;
    height: calc(100vh - #{base.$toolbar-height});
    @include mixins.rtl() {
      left: 0;
    }
    @include mixins.ltr() {
      right: 0;
    }
  }

  @include mixins2.media-breakpoint-up("lg") {
    .btn-menu {
      display: none;
    }
    .menu-main {
      width: $menu-width !important;
      background-color: transparent;
      opacity: 1;
    }
    .router-div {
      width: calc(100% - #{$menu-width});
      max-width: calc(100% - #{$menu-width});
    }
    .hover-div {
      width: 0 !important;
    }
    .list {
      @include mixins.rtl() {
        right: 0 !important;
      }
      @include mixins.ltr() {
        left: 0 !important;
      }
    }
  }
}
</style>
