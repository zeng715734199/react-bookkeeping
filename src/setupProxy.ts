import { Application } from 'express-serve-static-core'

const { createProxyMiddleware } = require('http-proxy-middleware')
export default function (app: Application) {
  app.use(
    '/api/lbp/',
    createProxyMiddleware({
      target: 'http://lbp-test.lifewit.cn/api/lbp/', //代理的地址
      changeOrigin: true,
      pathRewrite: {
        '/api/lbp/': '/api/lbp/', // 将请求路径中的 "/api" 替换为 ""
      },
    })
  )
}
