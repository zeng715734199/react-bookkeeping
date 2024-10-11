import { Application } from 'express-serve-static-core'

const { createProxyMiddleware } = require('http-proxy-middleware')
export default function (app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://10.0.1.107:3000',
      changeOrigin: true,
      pathRewrite: {
        '/api': '/api',
      },
    })
  )
}
