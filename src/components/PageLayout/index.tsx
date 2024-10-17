import React, { useEffect } from 'react'
import { Flex, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import FooterBar from '@/components/FooterBar'
import NavBar from '@/components/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router'

function PageLayout() {
  const location = useLocation()
  const { pathname } = location
  const Body = ({ gap }: { gap: number }) => (
    <Content
      className={`overflow-hidden  relative bg-baseBg`}
      style={{ height: `calc(100vh - ${gap}px` }}
    >
      <Outlet />
    </Content>
  )
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout>
        {pathname.includes('settings') ? (
          <Body gap={56} />
        ) : (
          <>
            <NavBar />
            <Body gap={110} />
          </>
        )}
        <FooterBar />
      </Layout>
    </Flex>
  )
}

export default PageLayout
