import React, { CSSProperties, useEffect, useState } from 'react'
import { Breadcrumb, Button, Card, message, Modal, Tag } from 'antd'
import {
  LeftOutlined,
  PlusCircleOutlined,
  WarningFilled,
} from '@ant-design/icons'
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDraggableProps,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import SegmentedNav from '@/components/SegmentedNav'
import { RecordObj, Tab } from '@/components/DoAccount/types'
import { Tags } from '@/components/DoAccount/components/tagList'
import SquareIcon from './components/squareIcon'
import { borderBottomByColor } from '@/utils/shortcuts'
import { colorMap } from '@/components/DoAccount/constant'
import LabelDrawer from '@/pages/labels/components/labelDrawer'
import store from '@/store'
import { delLabelItem } from '@/store/actions'

const colorList = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
]
let recordList = [] as RecordObj[]
let labelList = { income: [], expend: [] } as Record<Tab, Tags[]>
const initializeLocalList = () => {
  const { handleRecords, handleLabels } = store.getState() as {
    handleRecords: RecordObj[]
    handleLabels: Record<Tab, Tags[]>
  }
  recordList = handleRecords
  labelList = handleLabels
}
store.subscribe(() => {
  initializeLocalList()
})
const Labels = () => {
  const [segmentedValue, setSegmentedValue] = useState<Tab>('income')
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<'EDIT' | 'ADD'>('EDIT')
  const [labelObj, setLabelObj] = useState<Tags | null>(null)
  const [iconObj, setIconObjList] = useState({
    items: [] as Tags[],
    dustbin: [{ key: '*', label: '*' }] as Tags[],
  })

  initializeLocalList()
  const getTagIsUsed = (iconItem: Tags) => {
    return !!(recordList as RecordObj[]).find(
      (item) =>
        `${item.tag}-${item.tagName}` === `${iconItem.key}-${iconItem.label}`
    )
  }
  const updateIconList = () => {
    setIconObjList((state) => ({
      ...state,
      items: labelList[segmentedValue],
    }))
  }

  useEffect(() => updateIconList(), [segmentedValue])

  // 删除 =》 是否有用到该标签 ？ 禁止 ： 是否只有一个标签 ？ 禁止 ： 删除 ： 删除
  const onDragEnd = (result: DropResult) => {
    const destinationId = result.destination?.droppableId
    const sourceId = result.source?.droppableId
    const iconItem = iconObj.items[result.source.index]
    if (!result.destination || destinationId === sourceId) return
    if (sourceId === 'labelsGroup' && destinationId === 'dustbinGroup') {
      if (iconObj.items.length === 1) {
        message.warning('至少得留一个标签')
        return
      }
      if (getTagIsUsed(iconItem)) {
        message.warning('该标签被使用了，不可删除🙅')
        return
      }
      Modal.confirm({
        title: '警告',
        icon: <WarningFilled />,
        content: '确定删除该标签？删除后无法复原！',
        onOk() {
          store.dispatch(
            delLabelItem({ tab: segmentedValue, idx: result.source.index })
          )
          updateIconList()
          message.success('删除成功~')
        },
        onCancel() {},
      })
    }
  }

  // 修改 =》 是否有用到该标签 ？ 同步修改本地记录 ： 允许修改
  const editItem = (item: Tags) => {
    setMode('EDIT')
    const ok = () => {
      setLabelObj(item)
      setOpen(true)
    }
    if (getTagIsUsed(item)) {
      Modal.confirm({
        title: '警告',
        icon: <WarningFilled />,
        content: '该标签已被使用，如果修改则会同步修改记录的标签，继续吗？',
        onOk() {
          ok()
        },
        onCancel() {},
      })
      return
    }
    ok()
  }

  const addLabel = () => {
    setMode('ADD')
    setLabelObj(null)
    setOpen(true)
  }

  const getItemsStyle = (
    isDragging: boolean,
    style: DraggableProvidedDraggableProps['style']
  ) => {
    return isDragging
      ? {
          ...style,
          background: '#f4ffeb',
        }
      : style
  }

  return (
    <div className="p-3 bg-baseBg h-full">
      <Breadcrumb
        items={[
          {
            href: '#/settings',
            title: <LeftOutlined className="text-[#55575b]" />,
          },
        ]}
      />
      <Card bordered={true} className="mt-2 mx-2 py-3 text-center card-reset">
        <SegmentedNav
          value={segmentedValue}
          onChange={(value) => setSegmentedValue(value)}
        ></SegmentedNav>
      </Card>
      <DragDropContext onDragEnd={onDragEnd}>
        <Card bordered={true} className="mt-2 mx-2 text-center card-reset">
          <Droppable
            key="labelsGroup"
            droppableId="labelsGroup"
            direction="vertical"
          >
            {(provided, snapshot) => (
              <div
                className="overflow-y-auto h-[60vh]"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {iconObj.items.map((item, index) => (
                  <Draggable
                    key={item.key}
                    draggableId={item.key}
                    index={index}
                  >
                    {(dragProvided, snapshot) => (
                      <div
                        className={`${borderBottomByColor()} w-full h-[60px] mb-[10px] rounded-xl`}
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        style={getItemsStyle(
                          snapshot.isDragging,
                          dragProvided.draggableProps.style
                        )}
                      >
                        <div className="flex justify-between items-center h-full px-2">
                          <SquareIcon
                            name={item.key}
                            size={40}
                            background={colorMap[segmentedValue]}
                          />
                          <Tag
                            color={colorList[index % 10]}
                            className="text-[13px]"
                          >
                            {item.label}
                          </Tag>
                          <Button
                            type="primary"
                            size="small"
                            className="text-xs"
                            style={{ background: colorMap[segmentedValue] }}
                            onClick={() => editItem(item)}
                          >
                            编辑
                          </Button>
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </Card>
        <Card
          bordered={true}
          className="mt-2 mx-2 text-center card-reset relative"
        >
          <Droppable
            key="dustbinGroup"
            droppableId="dustbinGroup"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div
                className="flex flex-wrap w-full h-[80px] bg-warn"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? '#fd8b84' : '#ffffff',
                }}
              >
                <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center">
                  <SquareIcon
                    name="dustbin"
                    background={snapshot.isDraggingOver ? '#d93d43' : '#7d7d7d'}
                  />
                  <p className="text-[12px] mt-2 text-[#9e9e9e]">
                    拖动到此处删除
                  </p>
                </div>
                {iconObj.dustbin.map((item, index) => (
                  <Draggable
                    key={item['key']}
                    draggableId={item['key']}
                    index={index}
                  >
                    {(dragProvided, snapshot) => (
                      <div
                        className="hidden"
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                      >
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </Card>
      </DragDropContext>
      <Card className="mt-2 mx-2 card-reset">
        <Button
          size="large"
          type="primary"
          className="!w-full"
          style={{ background: colorMap[segmentedValue] }}
          icon={<PlusCircleOutlined />}
          onClick={addLabel}
        ></Button>
      </Card>
      <LabelDrawer
        open={open}
        setOpen={setOpen}
        activeTab={segmentedValue}
        mode={mode}
        defaultValue={labelObj}
        updateList={updateIconList}
      />
    </div>
  )
}

export default Labels
