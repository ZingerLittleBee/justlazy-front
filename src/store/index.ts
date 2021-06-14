import { createStore, createLogger } from 'vuex'
import app from './modules/app'
import socket from './modules/socket'

const debug = process.env.NODE_ENV !== 'production'

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    app,
    socket
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
