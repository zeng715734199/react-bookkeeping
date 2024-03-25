import { Footer } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { tabBar, TabItem } from '@/routes/config'
function FooterBar() {
  const navigate = useNavigate()
  const currentPath = useLocation()
  const activeStyle = (tab: TabItem) =>
    currentPath.pathname === tab.path ? { color: '#20a265' } : {}
  return (
    <Footer className="flex justify-between items-center w-full py-[8px] px-[16px] bg-navBg h-[54px]">
      {tabBar.map((tab) => (
        <div
          className="flex flex-col text-center min-w-[38px] p-[3px]"
          key={tab.path}
          style={activeStyle(tab)}
          onClick={() => navigate(tab.path)}
        >
          <div className="m-[3px]">
            <tab.icon className="text-[18px]" />
          </div>
          {tab.title}
        </div>
      ))}
    </Footer>
  )
}

export default FooterBar
