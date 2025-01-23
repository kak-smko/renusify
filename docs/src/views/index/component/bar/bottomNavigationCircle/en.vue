<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-bottom-navigation-circle
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        It is primarily used for mobile applications as a substitute for
        sidebars or bottom bars. It takes the name, icon, and link as inputs,
        known as
        <r-btn readonly size="small"> r-bottom-navigation-circle</r-btn>
        .
      </p>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        It should be used like a menu, where once it is rendered, there is no
        need for it to be rendered again.
      </p>
    </div>

    <table-props
        :items="[
        {
          prop: 'items',
          type: 'Object',
          default: 'false',
          description: 'We give the item a name, icon and link',
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
      In this example, Home is active. It automatically detects its location, so
      it applies the active classes to the router
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
          { name: `Recent`, icon: $r.icons.edit, to: { path: `/` } },
          {
            name: `Home`,
            icon: $r.icons.edit,
            to: {
              path: `/v1/fa/component-bar-bottomNavigationCircle`,
            },
          },
          { name: `Favorites`, icon: $r.icons.edit, to: { path: `/` } },
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


