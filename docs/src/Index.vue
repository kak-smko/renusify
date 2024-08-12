<template>
  <r-app>
    <r-content>
      <router-view/>
    </r-content>
  </r-app>
</template>
<script>
export default {
  name: "index-base",
};
</script>
<style lang="scss">
body {
  --color-background-one-light: #fff;
}
</style>
