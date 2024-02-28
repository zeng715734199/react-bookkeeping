import React from 'react'
import { Button } from 'antd'
import config from '@/routes/config'
import { useNavigate } from 'react-router-dom'
function PageLayout(props: { children: React.ReactNode }) {
  const navigate = useNavigate()
  return (
    <div>
      {config.menus.map((item) => {
        return (
          <div key={item.path}>
            <br />
            <Button onClick={() => navigate(item.path)} type="primary">
              {item.path}
            </Button>
          </div>
        )
      })}
      {props.children}
    </div>
  )
}

export default PageLayout
