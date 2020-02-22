module.exports = {
  devServer: {
      port: 8888,// 端口号
      host:'localhost', // 主机
      https: false, // 协议
      open: true,// 启动服务的时候自动打开浏览器访问
  },

  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false, //打包的时候不会生成.map文件，加快打包速度
}
