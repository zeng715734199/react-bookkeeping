const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: ' http://10.1.1.107:3000', //代理的地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // 将请求路径中的 "/api" 替换为 ""
      },
    })
  )
}
