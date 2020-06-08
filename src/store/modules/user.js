import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    navTree: null,
    permission: null,
    menuTree: [],
    roleTree: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  setNavTree: (state, payload) => {
    state.navTree = payload
  },
  setPermission: (state, payload) => {
    state.permission = payload
  },
  setMenuTree: (state, payload) => {
    state.menuTree = payload
  },
  setRole: (state, payload) => {
    state.roleTree = payload
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  setNavTree({ commit }) {
    return new Promise(async(resolve) => {
      // const res = await fetch('navTree.json').then(res => res.json())
      // commit('setNavTree', res.data)
      // resolve(res.data)
      return fetch('navTree.json').then(res => res.json())
        .then(res => {
          commit('setNavTree', res.data)
          resolve(res.data)
        })
    })
  },

  setPermission({ commit }) {
    return new Promise(async(resolve) => {
      const res = await fetch('permission.json').then(res => res.json())
      commit('setPermission', res.data)
      resolve(res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

