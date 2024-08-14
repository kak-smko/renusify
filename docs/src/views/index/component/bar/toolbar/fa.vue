<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-toolbar
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        <r-btn readonly size="small"> r-toolbar</r-btn>
        را در هرجای اکتیویتی که مدنظر دارید می توانید اضافه کنید
      </p>
    </div>

    <table-props
        :items="[
        {
          prop: 'menu',
          type: 'Array',
          default: '[]',
          description: 'لیست منوها',
        },
        {
          prop: 'logo',
          type: 'String',
          default: '',
          description: 'لینک لوگو',
        },
        {
          prop: 'logoW',
          type: 'Number',
          default: '180',
          description: 'عرض لوگو',
        },
        {
          prop: 'logoH',
          type: 'Number',
          default: '60',
          description: 'ارتفاع لوگو',
        },
        {
          prop: 'search',
          type: 'String',
          default: '',
          description: 'لینک جستجو',
        },
        {
          prop: 'search-label',
          type: 'String',
          default: 'search',
          description: 'لیبل جستجو',
        },
        {
          prop: 'fixed',
          type: 'Boolean',
          default: 'false',
          description: 'منو ثابت در بالای صفحه',
        },
        {
          prop: 'flat',
          type: 'Boolean',
          default: 'false',
          description: 'منو بدون سایه',
        },
        {
          prop: 'sticky',
          type: 'Boolean',
          default: 'false',
          description: 'منو استیکی',
        },
        {
          prop: 'tile',
          type: 'Boolean',
          default: 'true',
          description: 'منو بدون گوشه',
        },
      ]"
    >
    </table-props>
  </section>
  <br/>
  <section class="pa-3">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Menu</span>
    </h1>
    <r-card class="h-center" style="height: 200px; background-color: #eee">
      <r-toolbar
          :menu="[
          {
            title: `Home`,
            to: {
              path: '/v1/fa/component-bar-toolbar',
            },
          },
          { title: 'Shop' },
          { title: 'About us' },
          { title: 'Contact', to: { path: '/' } },
        ]"
      >
      </r-toolbar>
    </r-card>
  </section>
  <section>
    <r-code-editor
        runnable
        template='
 <r-toolbar
        search="/"
        :menu="[
          {
            title: `Home`,
            to: {
              path: `/v1/fa/component-bar-toolbar`,
            },
          },
          { title: `Shop` },
          { title: `About us` },
          { title: `Contact`, to: { path: `/` } },
        ]"
      >
      </r-toolbar>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Flat</span>
    </h1>
    <section class="pa-4">
      <r-toolbar
          :menu="[
          {
            title: 'Home',
            to: {
              path: '/v1/fa/component-bar-toolbar',
            },
          },
          { title: 'Shop' },
          { title: 'About us' },
          { title: 'Contact', to: { path: '/' } },
        ]"
          flat
          search="/"
      >
      </r-toolbar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
   <r-toolbar
        flat
        search="/"
        :menu="[
          {
            title: `Home`,
            to: {
              path: `/v1/fa/component-bar-toolbar`,
            },
          },
          { title: `Shop` },
          { title: `About us` },
          { title: `Contact`, to: { path: `/` } },
        ]"
      >
      </r-toolbar>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
  <section class="pa-3 color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Tile</span>
    </h1>
    <section class="pa-4">
      <r-toolbar
          :menu="[
          {
            title: 'Home',
            to: {
              path: '/v1/fa/component-bar-toolbar',
            },
          },
          { title: 'Shop' },
          { title: 'About us' },
          { title: 'Contact', to: { path: '/' } },
        ]"
          search="/"
          tile
      >
      </r-toolbar>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='
   <r-toolbar
        tile
        search="/"
        :menu="[
          {
            title: `Home`,
            to: {
              path: `/v1/fa/component-bar-toolbar`,
            },
          },
          { title: `Shop` },
          { title: `About us` },
          { title: `Contact`, to: { path: `/` } },
        ]"
      >
      </r-toolbar>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
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
