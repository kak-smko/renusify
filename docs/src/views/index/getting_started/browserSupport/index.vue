<template>
  <section id="browserSupport" class="body-1">
    <h1 class="display-4 mb-5">Supported Browsers</h1>
    <p>
      Renusify is a leading framework that strives to take web development to the next level. To better achieve this,
      some sacrifices had to be made regarding support for older versions of Internet Explorer. This is not a
      comprehensive list of compatible browsers, but rather the primary target browsers.
    </p>
    <r-table
        :items="[
        { Browser: 'Google Chrome', Support: 'Yes' },
        { Browser: 'Microsoft Edge', Support: 'Yes' },
        { Browser: 'Firefox', Support: 'Yes' },
        { Browser: 'Safari', Support: 'Yes' },
      ]"
        borderd
    ></r-table>
  </section>
</template>

<script>
export default {
  name: "browserSupport",
  data() {
    return {};
  },
};
</script>