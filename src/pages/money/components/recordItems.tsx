import React from 'react'
import { Card, Divider, Space } from 'antd'
import Tag from '@/pages/money/widget/tag'
import Icons from '@/pages/money/widget/icons'
import { useNavigate } from 'react-router-dom'
const RecordItems: React.FC = () => {
  const navigate = useNavigate()
  const goDetail = () => navigate(`/detail/${5555}`)
  return (
    <div className="p-3" onClick={goDetail}>
      <Space
        className="text-[#86898f] text-[13px] font-bold flex justify-center "
        split={<Divider type="vertical" />}
        align={'center'}
        size={[4, 10]}
      >
        <span>2020年4月</span>
        <span>总支出：￥355.00</span>
        <span>总收入：￥166.0</span>
      </Space>
      <Card
        title={
          <section className="flex justify-between font-normal">
            <Space>
              <span>3月20日</span>
              <span>星期二</span>
            </Space>
            <Space className="text-[13px]">
              <Tag>收</Tag>
              <span>15.00</span>
              <Tag>支</Tag>
              <span>0.00</span>
            </Space>
          </section>
        }
        bordered={true}
        className="mt-2"
      >
        <div className="flex justify-between items-center">
          <Icons name="shopping"></Icons>
          <div className="flex flex-col">
            <span className="text-[14px]">餐饮</span>
            <Space
              className="text-[12px] text-[#b8bcc5] font-bold"
              split={<Divider type="vertical" />}
              align={'center'}
              size={1}
            >
              <span>12:00</span>
              <span>吃黄焖鸡米饭</span>
            </Space>
          </div>
          <div className="text-[16px]">-300.00</div>
        </div>
      </Card>
    </div>
  )
}

export default RecordItems
