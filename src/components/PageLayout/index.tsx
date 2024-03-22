import React from 'react'
import { Flex, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import FooterBar from '@/components/FooterBar'
import NavBar from '@/components/NavBar'

function PageLayout(props: { children: React.ReactNode }) {
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout>
        <NavBar />
        <Content className="overflow-hidden h-[calc(100vh-110px)] relative bg-baseBg">
          {props.children}
        </Content>
        <FooterBar />
      </Layout>
    </Flex>
  )
}

export default PageLayout
