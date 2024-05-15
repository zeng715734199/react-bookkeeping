import { SegmentedLabeledOption } from 'rc-segmented'

const stateData = {
  userInfo: {} as Record<string, any> | null,
}
const uiState = {
  tabs: [
    { label: '收入', value: 'income' },
    { label: '支出', value: 'expend' },
  ] as SegmentedLabeledOption<string>[],
  currentTab: 'income',
}
export default {
  uiState,
  stateData,
}
