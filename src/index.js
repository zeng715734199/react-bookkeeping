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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#43b47a',
          algorithm: true, // 启用算法
        },
        // colorPrimaryActive: '#20a265',

        // components: {
        //   Button: {
        //     colorPrimary: '#43b47a',
        //     colorPrimaryActive: '#20a265',
        //     algorithm: true, // 启用算法
        //   },
        // },
      }}
      locale={zhCN}
    >
      <AllRoutes />
    </ConfigProvider>
  </Provider>
)

reportWebVitals()
