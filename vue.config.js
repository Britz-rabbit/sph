const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:false,
  //使用webpack来解决跨域问题，解决方式是：使用代理服务器。
  //解决思路：跨域问题是存在于user agent中的，即只有浏览器才存在跨域问题，而服务器之间没有跨域问题。
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
})
