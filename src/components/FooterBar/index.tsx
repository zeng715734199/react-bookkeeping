import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { tabBar } from '@/routes/config'
import './style.less'
function FooterBar() {
  const footerStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#eaedf4',
    padding: '8px 16px',
  }
  const navigate = useNavigate()

  return (
    <Footer style={footerStyle} className="footer">
      {tabBar.map((tab) => (
        <div
          className="footer-item-wrap"
          key={tab.path}
          onClick={() => navigate(tab.path)}
        >
          <div className="footer-icon-wrap">
            <tab.icon style={{ fontSize: '20px' }} />
          </div>
          {tab.title}
        </div>
      ))}
    </Footer>
  )
}

export default FooterBar
