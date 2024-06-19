import React, { useEffect, useState } from 'react'
import { Avatar, Button, Drawer, Space, Image, Modal } from 'antd'
import { getLocalStorage, setLocalStorage } from '@/utils'

interface AvatarProps {
  defaultAvatar?: string
}

const CustomAvatar: React.FC<AvatarProps> = ({ defaultAvatar }) => {
  const [isPreview, setPreview] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(defaultAvatar || null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const avatar = getLocalStorage('avatar')
    setAvatar(avatar || 'https://api.dicebear.com/7.x/miniavs/svg?seed=0')
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
        setVisible(false)
        setLocalStorage('avatar', JSON.stringify(reader.result))
      }
      reader.readAsDataURL(file)
    }
  }

  const changeAvatar = () => {
    const fileInput = document.getElementById('avatar-input')
    fileInput && fileInput.click()
  }

  const showAvatar = () => {
    setVisible(false)
    setPreview(true)
  }

  return (
    <div>
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Avatar
        className="w-[80px] h-[80px] bg-navBg"
        size="large"
        shape="circle"
        icon={<Image src={avatar || defaultAvatar} preview={false} />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        height={'auto'}
        placement="bottom"
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        className="[&_.ant-drawer-body]:!p-0"
      >
        <Space.Compact direction="vertical" className="w-full">
          <Button
            className="!m-0 border-solid border-0 border-b border-[#eee]"
            type="text"
            onClick={showAvatar}
          >
            查看头像
          </Button>
          <Button className="!m-0" type="text" onClick={changeAvatar}>
            更换头像
          </Button>
        </Space.Compact>
      </Drawer>
      <Modal
        centered
        open={isPreview}
        onCancel={() => setPreview(false)}
        footer={null}
        width={1000}
      >
        <div className="flex items-center justify-center">
          <img src={avatar || defaultAvatar} alt="" className="w-[80vw]" />
        </div>
      </Modal>
    </div>
  )
}

export default CustomAvatar
