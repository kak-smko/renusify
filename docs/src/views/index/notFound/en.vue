<template>
  <r-container class="pa-0" full-width>
    <r-meta
        :url="$route.path"
        description="404 page: not found"
        title="404 page"
    ></r-meta>
    <r-row class="color-header no-gutters">
      <r-col>
        <r-container class="pt-12 mt-12 pb-0">
          <r-row class="mt-12 pt-12">
            <r-col class="col-12">
              <h1 class="line-btm display-4">Page Not Found :(</h1>
            </r-col>
            <r-col class="col-12"></r-col>
          </r-row>
        </r-container>
      </r-col>
    </r-row>
    <r-row class="mt-12">
      <r-col>
        <img alt="404 page" src="/404.jpg" style="width: 100%"/>
      </r-col>
    </r-row>
  </r-container>
</template>

<script>
export default {
  name: "notFound",
  metaInfo: {
    title: "notFound",
  },
};
</script>

