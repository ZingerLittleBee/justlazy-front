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
    getSocket: state => state.socket,
    getServerData: state => state.serverData
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
      return new Promise<void>(resolve => {
        socket.on('connect', async () => {
          console.log('socket connect success')
          commit('CREATE_SOCKET', socket)
          socket.emit('start-servers-listener')
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
