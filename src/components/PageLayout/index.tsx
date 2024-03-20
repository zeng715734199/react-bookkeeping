import React from 'react'
import { Flex, Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import FooterBar from '@/components/FooterBar'
import NavBar from '@/components/NavBar'

function PageLayout(props: { children: React.ReactNode }) {
  return (
    <Flex gap="middle" wrap="wrap" className="h-full w-full">
      <Layout className="overflow-hidden">
        <NavBar />
        <Content className="overflow-hidden">{props.children}</Content>
        <FooterBar />
      </Layout>
    </Flex>
  )
}

export default PageLayout
