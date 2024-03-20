import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { tabBar } from '@/routes/config'
import './style.less'
function FooterBar() {
  const navigate = useNavigate()

  return (
    <Footer className="footer bg-navBg">
      {tabBar.map((tab) => (
        <div
          className="footer-item-wrap"
          key={tab.path}
          onClick={() => navigate(tab.path)}
        >
          <div className="footer-icon-wrap">
            <tab.icon className="text-[20px]" />
          </div>
          {tab.title}
        </div>
      ))}
    </Footer>
  )
}

export default FooterBar
