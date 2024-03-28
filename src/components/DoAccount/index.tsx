import React, { JSX, useEffect, useState } from 'react'
import { Drawer, FloatButton } from 'antd'
import NumberPad from '@/components/DoAccount/components/numberPad'
import Notes from '@/components/DoAccount/components/notes'
import TagList, { IconTabMap } from '@/components/DoAccount/components/tagList'
import MoneyPanel from '@/components/DoAccount/components/moneyPanel'
import TopTab from '@/components/DoAccount/components/topTab'

const DoAccount: React.FC<{ children: JSX.Element }> = ({
  children,
}: {
  children: JSX.Element
}) => {
  const [open, setOpen] = useState(false)
  const [record, setRecord] = useState({
    tab: 'income',
    money: '0',
    note: '',
    tag: IconTabMap['income']['0'].key,
  })

  const setNavTab = (value: string) => {
    setRecord((state) => ({ ...state, tag: IconTabMap[value]['0'].key }))
    setRecord((state) => ({ ...state, tab: value }))
  }
  const showDrawer = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <div onClick={showDrawer}>{children}</div>
      <Drawer placement="bottom" onClose={onClose} open={open} height={600}>
        <div className="p-1">
          {/*顶部tab*/}
          <section>
            <TopTab value={record.tab} onChange={setNavTab} />
          </section>
          {/*金额展示*/}
          <section>
            <MoneyPanel money={record.money} />
          </section>
          {/*选择标签*/}
          <section className="flex flex-nowrap">
            <TagList
              tab={record.tab}
              tag={record.tag}
              onChange={(tag) => setRecord((state) => ({ ...state, tag }))}
            />
          </section>
          {/*备注*/}
          <section className="my-2 py-3">
            <Notes
              value={record.note}
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

export default DoAccount
