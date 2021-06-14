import { Module } from 'vuex'
import { io, Socket } from 'socket.io-client'

interface SocketProps {
  socket: Socket | undefined
  serverData: any
}

const module: Module<SocketProps, any> = {
  state: {
    socket: undefined,
    serverData: ''
  },
  getters: {
    getSocket: state => state.socket
  },
  mutations: {
    CREATE_SOCKET: (state, payload) => {
      state.socket = payload
    },
    UPDATE_SERVER_DATA: (state, payload) => {
      state.serverData = payload
    }
  },
  actions: {
    initSocket({ commit }, { url, opts }) {
      const socket = io(url, {
        ...opts,
        transports: ['websocket']
      })
      return new Promise(resolve => {
        socket.on('connect', async () => {
          console.log('socket connect success')
          commit('CREATE_SOCKET', socket)
          socket.on('servers-message', e => {
            commit('UPDATE_SERVER_DATA', e)
          })
          resolve()
        })
      })
    }
  }
}

export default module
