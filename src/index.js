import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@/common/style/index.less'
import reportWebVitals from './reportWebVitals'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
import AllRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'
import PageLayout from './components/PageLayout'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <PageLayout>
        <AllRoutes />
      </PageLayout>
    </ConfigProvider>
  </BrowserRouter>
)
reportWebVitals()
