import React, { JSX, useRef, useState } from 'react'
import { DatePicker, DatePickerProps, Drawer, message } from 'antd'
import NumberPad from '@/components/DoAccount/components/numberPad'
import Notes from '@/components/DoAccount/components/notes'
import TagList, { IconTabMap } from '@/components/DoAccount/components/tagList'
import MoneyPanel from '@/components/DoAccount/components/moneyPanel'
import SegmentedNav from 'src/components/SegmentedNav'
import dayjs from 'dayjs'

const initialRecord = {
  tab: 'income',
  date: dayjs(),
  money: '0',
  note: '',
  tag: IconTabMap['income']['0'].key,
}
const drawerHeight = window.innerHeight * 0.95

const DoAccount: React.FC<{ children: JSX.Element }> = ({
  children,
}: {
  children: JSX.Element
}) => {
  const notesRef = useRef<{ showNote: boolean }>(null)
  const [open, setOpen] = useState(false)
  const [record, setRecord] = useState({ ...initialRecord })
  const setNavTab = (value: string) => {
    setRecord((state) => ({
      ...state,
      tag: IconTabMap[value]['0'].key,
      tab: value,
    }))
  }
  const setDate: DatePickerProps['onChange'] = (date) => {
    setRecord((state) => ({
      ...state,
      date,
    }))
  }

  const submit = () => {
    if (!notesRef.current?.showNote) {
      message.warning('备注还没保存哦~')
      return
    }
    console.log({
      ...record,
      date: record.date.format('YYYY-MM-DD'),
    })
  }

  const showDrawer = () => {
    setRecord((state) => ({
      ...state,
      ...initialRecord,
    }))
    setOpen(true)
  }
  const onClose = () => setOpen(false)

  return (
    <>
      <div onClick={showDrawer}>{children}</div>
      <Drawer
        placement="bottom"
        onClose={onClose}
        open={open}
        height={drawerHeight > 650 ? 650 : drawerHeight}
      >
        <div className="p-2 overflow-auto w-full">
          {/*顶部tab*/}
          <section className="mb-5 w-full flex justify-center">
            <SegmentedNav value={record.tab} onChange={setNavTab} />
          </section>
          {/*日期选择器*/}
          <section className="mb-5 w-full flex justify-center">
            <DatePicker
              value={record.date}
              format="YYYY-MM-DD"
              size="small"
              panelRender={(PanelNode) => (
                <div className="absolute -left-[50%] -translate-x-4 top-0 !z-[1050] bg-[#fff] border-1 border-solid border-baseBg rounded-xl">
                  {PanelNode}
                </div>
              )}
              onChange={setDate}
            />
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
              ref={notesRef}
              value={record.note}
              onSave={(note) => setRecord((state) => ({ ...state, note }))}
            />
          </section>
          {/*数字面板*/}
          <section>
            <NumberPad
              value={record.money}
              onPress={(money: string) =>
                setRecord((state) => ({ ...state, money }))
              }
              onOk={submit}
            />
          </section>
        </div>
      </Drawer>
    </>
  )
}

export default DoAccount
