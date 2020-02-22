module.exports = {
  devServer: {
      port: 8888,// 端口号
      host:'localhost', // 主机
      https: false, // 协议
      open: true,// 启动服务的时候自动打开浏览器访问
      proxy: { // 开发环境代理配置
          // 如果是 /dev-api这个开头就交给代理
          [process.env.VUE_APP_BASE_API] : {
              // 目标服务器地址
              target: process.env.VUE_APP_SERVICE_URL,
              // 开启代理服务器
              changeOrigin: true,
              // 访问页面的时候不需要加上/dev-api
              pathRewrite: {
                  ['^' + process.env.VUE_APP_BASE_API]: ''
              }
          }
      }
  },

  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false, //打包的时候不会生成.map文件，加快打包速度
}
