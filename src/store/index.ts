import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

const reducers = require.context('./reducers', true, /\.ts$/)
const reducersObj = reducers.keys().reduce(
  (obj, key) => {
    // const name = key.replace(/\.\/(.*).(ts|js)/, '$1')
    const component = reducers(key).default
    return { ...obj, ...component }
  },
  {} as Record<string, any>
)

const reducer = combineReducers(reducersObj)

export default configureStore({ reducer })
