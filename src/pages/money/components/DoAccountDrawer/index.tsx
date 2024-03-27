import React, { useState } from 'react'
import { Drawer, FloatButton, Segmented } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Big from 'big.js'
import NumberPad from '@/pages/money/components/DoAccountDrawer/components/numberPad'
import Notes from '@/pages/money/components/DoAccountDrawer/components/notes'
import TagList, {
  IconTabMap,
} from '@/pages/money/components/DoAccountDrawer/components/tagList'
import MoneyPanel from '@/pages/money/components/DoAccountDrawer/components/moneyPanel'
import TopTab from '@/pages/money/components/DoAccountDrawer/components/topTab'

const Index: React.FC = () => {
  const drawerHeight = new Big(window.innerHeight).times(0.9).toNumber()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('income')
  const [record, setRecord] = useState({
    money: '0',
    note: '',
    tag: IconTabMap[tab]['0'].key,
  })

  const setNavTab = (value: string) => {
    setRecord((state) => ({ ...state, tag: IconTabMap[value]['0'].key }))
    setTab(value)
  }
  const showDrawer = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <FloatButton
        className="right-[5%] bottom-[15%] w-[50px] h-[50px] text-center"
        icon={<EditOutlined className="text-xl text-primary" />}
        onClick={showDrawer}
        type="default"
      />
      <Drawer
        placement="bottom"
        onClose={onClose}
        open={open}
        height={drawerHeight}
      >
        <div className="p-1">
          {/*顶部tab*/}
          <section>
            <TopTab onChange={setNavTab} />
          </section>
          {/*金额展示*/}
          <section>
            <MoneyPanel money={record.money} />
          </section>
          {/*选择标签*/}
          <section className="flex flex-nowrap">
            <TagList
              tab={tab}
              tag={record.tag}
              onChange={(tag) => setRecord((state) => ({ ...state, tag }))}
            />
          </section>
          {/*备注*/}
          <section className="my-3 py-3">
            <Notes
              onSave={(note) => setRecord((state) => ({ ...state, note }))}
            />
          </section>
          {/*数字面板*/}
          <section>
            <NumberPad
              onPress={(money) => setRecord((state) => ({ ...state, money }))}
              onOk={() => console.log(record)}
            />
          </section>
        </div>
      </Drawer>
    </>
  )
}

export default Index
