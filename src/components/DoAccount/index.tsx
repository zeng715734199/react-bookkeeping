import React, { JSX, useRef, useState } from 'react'
import { DatePicker, Drawer, message, Tooltip } from 'antd'
import { InfoCircleTwoTone } from '@ant-design/icons'
import NumberPad from '@/components/DoAccount/components/numberPad'
import Notes from '@/components/DoAccount/components/notes'
import TagList from '@/components/DoAccount/components/tagList'
import MoneyPanel from '@/components/DoAccount/components/moneyPanel'
import SegmentedNav from 'src/components/SegmentedNav'
import dayjs from 'dayjs'
import { InitialRecord, RecordObj, Tab } from '@/components/DoAccount/types'
import { createUid } from '@/utils'
import { RangePickerProps } from 'antd/es/date-picker'
import { IconTabMap } from '@/store/constants'

class InitRecord implements InitialRecord {
  tab = 'income' as Tab
  date = dayjs()
  time = dayjs()
  money = '0'
  note = ''
  tag = IconTabMap[this.tab]['0'].key
  tagName = IconTabMap[this.tab]['0'].label
  tagId = IconTabMap[this.tab]['0'].uid
  id = createUid()
}
const drawerHeight = window.innerHeight * 0.95
const formatDefaultVal = (obj: RecordObj): InitRecord => {
  const time = `${obj.date} ${obj.time}`
  return {
    tab: obj.tab,
    date: dayjs(time),
    time: dayjs(time),
    money: obj.money,
    note: obj.note,
    tag: obj.tag,
    tagName: obj.tagName,
    tagId: obj.tagId,
    id: obj.id,
  }
}

const DoAccount: React.FC<{
  children: JSX.Element
  defaultValue?: RecordObj
  onSubmit: (record: InitialRecord) => void
}> = ({ defaultValue, children, onSubmit }) => {
  const notesRef = useRef<{ showNote: boolean }>(null)
  const [open, setOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [record, setRecord] = useState(new InitRecord())
  const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    current && current > dayjs().endOf('day')

  const setNavTab = (value: Tab) => {
    setRecord((state) => ({
      ...state,
      tab: value,
      tag: IconTabMap[value]['0'].key,
      tagName: IconTabMap[value]['0'].label,
      tagId: IconTabMap[value]['0'].uid,
    }))
  }

  const submit = () => {
    if (!notesRef.current?.showNote) {
      message.warning('备注还没保存哦~')
      return
    }
    onSubmit(record)
    setOpen(false)
  }

  const showDrawer = () => {
    setRecord((state) => ({
      ...state,
      ...(defaultValue ? formatDefaultVal(defaultValue) : new InitRecord()),
    }))
    setOpen(true)
  }

  return (
    <>
      <div onClick={showDrawer}>{children}</div>
      <Drawer
        placement="bottom"
        onClose={() => setOpen(false)}
        open={open}
        height={drawerHeight > 650 ? 650 : drawerHeight}
      >
        <div className="p-[8px] overflow-auto w-full">
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
              inputReadOnly={true}
              disabledDate={disabledDate}
              panelRender={(PanelNode) => (
                <div className="absolute -left-[60%] top-0  bg-[#fff] border-1 border-solid border-baseBg rounded-xl">
                  {PanelNode}
                </div>
              )}
              onChange={(date) =>
                setRecord((state) => ({
                  ...state,
                  date,
                  time: dayjs(),
                }))
              }
            />
            <Tooltip
              title="标签图标超出部分可滚动查看；标签文字超出部分长按【文字】可展示全部内容"
              color="#81caaa"
              overlayInnerStyle={{ fontSize: '12px' }}
              open={showTooltip}
            >
              <InfoCircleTwoTone
                className="ml-2"
                onClick={() => setShowTooltip(!showTooltip)}
                onBlur={() => setShowTooltip(false)}
              ></InfoCircleTwoTone>
            </Tooltip>
          </section>
          {/*金额展示*/}
          <section>
            <MoneyPanel money={record.money} />
          </section>
          {/*选择标签*/}
          <section>
            <TagList
              tab={record.tab}
              uniKey={record.tagId}
              onChange={(tag) =>
                setRecord((state) => ({
                  ...state,
                  tag: tag.key,
                  tagName: tag.label,
                  tagId: tag.uid,
                }))
              }
            />
          </section>
          {/*备注*/}
          <section className="py-3">
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
