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
  const Body = ({ width }: { width: number }) => (
    <Content
      className={`overflow-hidden  relative bg-baseBg`}
      style={{ height: `calc(100vh - ${width}px` }}
    >
      <Outlet />
    </Content>
  )
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout>
        {pathname.includes('settings') ? (
          <Body width={56} />
        ) : (
          <>
            <NavBar />
            <Body width={110} />
          </>
        )}
        <FooterBar />
      </Layout>
    </Flex>
  )
}

export default PageLayout
