import React, { useState } from 'react'
import { Button, Drawer, Radio, Space } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
const App: React.FC = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Space>
        <div className="overflow-hidden" onClick={showDrawer}>
          <Button
            size="large"
            className="text-[#fff]"
            type="primary"
            icon={
              <AppstoreAddOutlined className="text-xl text-[#fff] w-[32px]" />
            }
          >
            全部类型
          </Button>
        </div>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

export default App
