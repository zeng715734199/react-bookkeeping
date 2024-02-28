const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://10.16.xx.xxx:8080/fund_diag', //代理的地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // 将请求路径中的 "/api" 替换为 ""
      },
    })
  )
}
