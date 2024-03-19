import React from 'react'
import { Flex, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import FooterBar from '@/components/FooterBar'
import NavBar from '@/components/NavBar'

function PageLayout(props: { children: React.ReactNode }) {
  const layoutStyle = {
    overflow: 'hidden',
    width: '100%',
  }
  const contentStyle: React.CSSProperties = {
    padding: '8px',
    width: '100%',
    overflow: 'hidden',
  }

  return (
    <Flex
      gap="middle"
      wrap="wrap"
      style={{
        height: '100%',
      }}
    >
      <Layout style={layoutStyle}>
        <NavBar />
        <Content style={contentStyle}>{props.children}</Content>
        <FooterBar />
      </Layout>
    </Flex>
  )
}

export default PageLayout
