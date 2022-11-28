const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/main.scss";
          @import "@/assets/scss/variables.scss";
          @import "@/assets/scss/media-queries.scss";
        `
      }
    }
  }
})
