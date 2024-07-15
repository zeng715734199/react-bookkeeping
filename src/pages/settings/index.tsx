import { Avatar, Button, Empty, List } from 'antd'
import { DoubleRightOutlined } from '@ant-design/icons'
import React from 'react'
import { settingsList } from '@/pages/settings/list'
import CustomAvatar from '@/pages/settings/components/customAvatar'
import { useNavigate } from 'react-router-dom'

function Settings() {
  const navigate = useNavigate()

  const handleItem = (key: string) => {
    const map = {
      tagManagement: () => {
        navigate('/labels')
        console.log(key, 'kkk')
      },
      limitManagement: () => {
        console.log(key, 'kkk')
      },
      msgManagement: () => {
        console.log(key, 'kkk')
      },
    } as Record<string, () => any>
    map[key]?.()
  }

  return (
    <>
      <div className="h-[calc(50vh-56px)] flex justify-center items-center flex-col bg-warn">
        <CustomAvatar />
        <p className="m-2">Chasing</p>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={settingsList}
        className="bg-navBg h-[50vh] overflow-y-auto"
        renderItem={(item, index) => (
          <List.Item
            actions={[<DoubleRightOutlined />]}
            onClick={() => handleItem(item.key)}
          >
            <List.Item.Meta
              className="p-0 m-0 [&_h4]:!m-0"
              avatar={
                <svg className="icon text-xl ml-2" aria-hidden="true">
                  <use xlinkHref={`#icon-${item.iconName}`}></use>
                </svg>
              }
              title={item.title}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default Settings
