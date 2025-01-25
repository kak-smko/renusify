const path = require("path");
const {defineConfig} = require("@vue/cli-service");
module.exports = defineConfig({
  //transpileDependencies: true,
  pages: {
    index: {
      entry: "src/index.js",

      template: "public/index.html",

      filename: "index.html",
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        renusify: path.resolve(__dirname, "../"),
      },
    },
  },
  pwa: {
    iconPaths: {
      favicon32: "pwa/favicon-32x32.png",
      favicon16: "pwa/favicon-16x16.png",
      appleTouchIcon: "pwa/apple-touch-icon.png",
      msTileImage: "pwa/mstile-150x150.png",
      maskIcon: "pwa/safari-pinned-tab.svg",
    },
    name: "renusify",
    themeColor: "#fff",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },
  outputDir: "dist",
  publicPath: "/",

  productionSourceMap: true,
});
