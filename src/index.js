import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@/common/style/index.less'
import reportWebVitals from './reportWebVitals'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { ConfigProvider } from 'antd'
import AllRoutes from './routes'
import { Provider } from 'react-redux'
import store from './store'
import customizeRenderEmpty from './components/Empty'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import dayjs from 'dayjs'
dayjs.extend(isLeapYear)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <ConfigProvider
      renderEmpty={customizeRenderEmpty}
      theme={{
        token: {
          colorPrimary: '#43b47a',
          algorithm: true, // 启用算法
        },
        // colorPrimaryActive: '#20a265',
      }}
      locale={zhCN}
    >
      <AllRoutes />
    </ConfigProvider>
  </Provider>
)

reportWebVitals()
