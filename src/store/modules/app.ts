import { Module } from 'vuex'

interface UserProps {
  user: {
    id: string
    name: string
    role: string
  }
}

const module: Module<UserProps, any> = {
  state: {
    user: {
      id: '9527',
      name: 'zs',
      role: 'admin'
    }
  },
  getters: {
    getUser: state => state.user,
    getUserId: state => state.user.id,
    getUserName: state => state.user.name,
    getUserRole: state => state.user.role
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = { ...payload }
    }
  },
  actions: {}
}

export default module
