import React, { useEffect } from 'react'
import { Flex, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import FooterBar from '@/components/FooterBar'
import NavBar from '@/components/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'

function PageLayout() {
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout>
        <NavBar />
        <Content className="overflow-hidden h-[calc(100vh-110px)] relative bg-baseBg">
          <Outlet />
        </Content>
        <FooterBar />
      </Layout>
    </Flex>
  )
}

export default PageLayout
