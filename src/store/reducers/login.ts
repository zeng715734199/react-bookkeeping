const stateData = {
  user: 'admin',
  password: '123456',
}
const login = (state = stateData, action: { type: string; value: object }) => {
  switch (action.type) {
    case 'UPDATE_ACCOUNT':
      return Object.assign({}, state, { user: action.value })
    case 'UPDATE_PASSWORD':
      return Object.assign({}, state, { password: action.value })
    default:
      return state
  }
}

export default {
  login,
}
