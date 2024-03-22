import React, { useState } from 'react'
import { Button, Drawer, Tag, Space } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'
import Icons from '@/pages/money/widgets/icons'
type Tags = {
  label: string
  key: string
}

const allTypes: Tags[] = [
  {
    label: '所有类型',
    key: '*',
  },
]
const incomes: Tags[] = [
  { label: '工资', key: 'salary' },
  {
    label: '理财',
    key: 'stock',
  },
]

const expenditures: Tags[] = [
  {
    label: '餐饮',
    key: 'food',
  },
  {
    label: '交通',
    key: 'car',
  },
  {
    label: '购物',
    key: 'shopping',
  },
  {
    label: '服饰',
    key: 'clothes',
  },
  {
    label: '信用卡',
    key: 'credit',
  },
  {
    label: '其他',
    key: 'money',
  },
]

const App: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [checkedList, setCheckedList] = useState<string[]>(['*'])
  const showDrawer = () => setOpen(true)
  const onClose = () => setOpen(false)

  const changeCheckedList = (key: string, checked: boolean) => {
    if (checked) {
      setCheckedList([])
      setCheckedList([key])
    }
  }

  const getTagList = (tagList: Tags[]) => {
    return tagList.map((item) => (
      <Tag.CheckableTag
        key={item.key}
        checked={checkedList.includes(item.key)}
        onChange={(checked) => changeCheckedList(item.key, checked)}
      >
        {item.label}
      </Tag.CheckableTag>
    ))
  }

  return (
    <>
      <Space>
        <div className="overflow-hidden" onClick={showDrawer}>
          <Button
            size="large"
            className="text-[#fff]"
            type="primary"
            icon={<AppstoreOutlined className="text-xl text-[#fff] w-[32px]" />}
          >
            全部类型
          </Button>
        </div>
      </Space>
      <Drawer
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>关闭</Button>
            <Button type="primary" onClick={onClose}>
              确定
            </Button>
          </Space>
        }
      >
        <section>{getTagList(allTypes)}</section>
        <section>
          <div>收入</div>
          {getTagList(incomes)}
        </section>
        <section>
          <div>支出</div>
          {getTagList(expenditures)}
        </section>
      </Drawer>
    </>
  )
}

export default App
