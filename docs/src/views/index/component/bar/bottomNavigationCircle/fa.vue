<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-bottom-navigation-circle
      </h1>

      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        جایگزینی برای نوار کناری یا پایین است. این در درجه اول برای برنامه های
        کاربردی تلفن همراه استفاده می شود , r-bottom-navigation-circle نام و
        ایکون و لینک می گیرد.
      </p>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        باید مثل menu استفاده کنید وقتی یک بار render شد دیگر لازم نباشد دوباره
        render شود.
      </p>
    </div>
    <table-props
        :items="[
        {
          prop: 'items',
          type: 'Object',
          default: 'false',
          description: 'به item نام و ایکون و لینک می دهیم.',
        },
      ]"
    >
    </table-props>
  </section>

  <br/>
  <section>
    <h1 class="font-weight-bold title ps-4 pt-1 pb-1 br-sm">
      r-bottom-navigation-circle
    </h1>
    <h1 class="font-weight-bold subtitle-1 ps-4 pt-1 pb-1 br-sm">
      در این مثال Home فعال است. خودش اتوماتیک تشخیص می هد در کجا قرار دارد پس
      به router فعال کلاسها را اعمال می کند.
    </h1>
  </section>
  <section class="pa-3">
    <r-card style="height: 200px; background-color: #a73b3b">
      <r-bottom-navigation-circle
          :items="[
          { name: 'Recent', icon: $r.icons.edit, to: { path: '/' } },
          {
            name: 'Home',
            icon: $r.icons.edit,
            to: {
              path: '/v1/fa/component-bar-bottomNavigationCircle',
            },
          },
          { name: 'Favorites', icon: $r.icons.edit, to: { path: '/' } },
        ]"
          style="position: absolute"
      >
      </r-bottom-navigation-circle>
    </r-card>
  </section>
  <section>
    <r-code-editor
        runnable
        template='
         <r-card style="height: 200px; background-color: #a73b3b">
      <r-bottom-navigation-circle
        style="position: absolute"
        :items="[
          { name: `Recent`, icon: $r.icons.edit, to: { path:`/` } },
          {
            name: `Home`,
            icon: $r.icons.edit,
            to: {
            path: `/v1/fa/component-bar-bottomNavigationCircle`,
            },
          },
          { name: `Favorites`, icon: $r.icons.edit, to: { path:`/`} },
        ]"
      >
      </r-bottom-navigation-circle>
 </r-card>
        '
    ></r-code-editor>
  </section>
  <br/><br/>
</template>

<script>
export default {
  name: "bottomNavigationCircle",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";
</style>
