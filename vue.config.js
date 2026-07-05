const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy:{
      '/jaalon': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/jaalon': ''
        }
      }
    }
  }
})
