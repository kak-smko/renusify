<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-bottom-navigation
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        جایگزینی برای نوار کناری یا پایین است. این در درجه اول برای برنامه های
        کاربردی تلفن همراه استفاده می شود .
      </p>
    </div>
    <table-props
        :items="[
        {
          prop: 'fixed',
          type: 'Boolean',
          default: 'false',
          description: 'r-btn را مجبور می کند تا به پایین صفحه fixed بشه.',
        },
        {
          prop: 'grow',
          type: 'Boolean',
          default: 'false',
          description: 'r-btn را مجبور می کند تا تمام فضای موجود را پر کند.',
        },
      ]"
    >
    </table-props>
  </section>

  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      R-bottom-navigation
    </h1>
    <section class="pa-3">
      <r-bottom-navigation>
        <r-btn>
          <span>Recent</span>
          <r-icon class="mdi-history"></r-icon>
        </r-btn>
        <r-btn>
          <span>Home</span>
          <r-icon class="mdi-home"></r-icon>
        </r-btn>
        <r-btn>
          <span>Favorites</span>
          <r-icon class="mdi-heart"></r-icon>
        </r-btn>
      </r-bottom-navigation>
    </section>
  </section>

  <section>
    <r-code-editor
        runnable
        script='data(){
   return {
      "fixed": Boolean,
      "grow": "Boolean",
     }
  }'
        template='<r-bottom-navigation>
        <r-btn>
          <span>Recent</span>
          <r-icon class="mdi-history"></r-icon>
        </r-btn>
        <r-btn>
          <span>Home</span>
          <r-icon class="mdi-home"></r-icon>
        </r-btn>
        <r-btn>
          <span>Favorites</span>
          <r-icon class="mdi-heart"></r-icon>
        </r-btn>
      </r-bottom-navigation>'
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Grow</span>
    </h1>
    <section class="pa-3">
      <r-bottom-navigation grow="true">
        <r-btn>
          <span>Recent Grow</span>
          <r-icon class="mdi-history"></r-icon>
        </r-btn>
        <r-btn>
          <span>Home Grow</span>
          <r-icon class="mdi-home"></r-icon>
        </r-btn>
        <r-btn>
          <span>Favorites Grow</span>
          <r-icon class="mdi-heart"></r-icon>
        </r-btn>
      </r-bottom-navigation>
    </section>
  </section>
  <section>
    <r-code-editor
        runnable
        template='
      <r-bottom-navigation grow="true">
        <r-btn>
          <span>Recent Grow</span>
          <r-icon class="mdi-history"></r-icon>
        </r-btn>
        <r-btn>
          <span>Home Grow</span>
          <r-icon class="mdi-home"></r-icon>
        </r-btn>
        <r-btn>
          <span>Favorites Grow</span>
          <r-icon class="mdi-heart"></r-icon>
        </r-btn>
      </r-bottom-navigation>
      '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      PROP / <span>Fixed</span>
    </h1>
    <section class="pa-3">
      <r-bottom-navigation fixed="true">
        <r-btn>
          <span>Recent Fixed</span>
          <r-icon class="mdi-history"></r-icon>
        </r-btn>
        <r-btn>
          <span>Home Fixed</span>
          <r-icon class="mdi-home"></r-icon>
        </r-btn>
        <r-btn>
          <span>Favorites Fixed</span>
          <r-icon class="mdi-heart"></r-icon>
        </r-btn>
      </r-bottom-navigation>
    </section>
  </section>
  <section>
    <r-code-editor
        runnable
        template='
       <r-bottom-navigation fixed="true">
        <r-btn>
          <span>Recent Fixed</span>
          <r-icon class="mdi-history"></r-icon>
        </r-btn>
        <r-btn>
          <span>Home Fixed</span>
          <r-icon class="mdi-home"></r-icon>
        </r-btn>
        <r-btn>
          <span>Favorites Fixed</span>
          <r-icon class="mdi-heart"></r-icon>
        </r-btn>
      </r-bottom-navigation>
      '
    ></r-code-editor>
  </section>
</template>

<script>
export default {
  name: "bottomNav",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
