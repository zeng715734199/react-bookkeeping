import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@/common/style/index.less'
import reportWebVitals from './reportWebVitals'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
import AllRoutes from './routes'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <AllRoutes />
    </ConfigProvider>
  </Provider>
)

reportWebVitals()
