import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Breadcrumb, Button, Card, Divider, Space } from 'antd'
import { DeleteOutlined, FormOutlined, LeftOutlined } from '@ant-design/icons'
import Icons from '@/pages/money/widget/icons'
import Title from 'antd/es/typography/Title'

export default function RecordDetails() {
  const { id } = useParams()
  useEffect(() => {
    console.log(id)
  }, [])
  return (
    <div className="p-3 bg-baseBg h-full">
      <Breadcrumb
        items={[
          {
            href: '/money',
            title: <LeftOutlined className="text-[#55575b]" />,
          },
        ]}
      />
      <Card bordered={true} className="mt-2 mx-2 text-center card-reset">
        <div className="mt-6 mx-6 mb-4">
          <Space className="flex justify-center items-center" size="small">
            <Icons name="shopping" size={25}></Icons>
            <span>购物</span>
          </Space>
          <Title level={2} className="my-4">
            -300
          </Title>
          <table className="text-left text-[14px] my-6">
            <tbody>
              <tr>
                <td className="text-[#a1a3a8] font-bold">记录时间：</td>
                <td>2024年03月22日 06:33</td>
              </tr>
              <tr>
                <td className="text-[#a1a3a8] font-bold">备注：</td>
                <td>66666</td>
              </tr>
            </tbody>
          </table>
          <Space
            className="flex justify-center pt-4 mt-4 border-solid border-0 border-t border-[#eee]"
            split={<Divider type="vertical" />}
            align={'center'}
            size={50}
          >
            <Button icon={<FormOutlined />}>修改</Button>
            <Button danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  )
}
