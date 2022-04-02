export const state = () => ({
  token: null,
  user: null,
  path: 'en'
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  },
  setPath(state, path) {
    state.path = path
  }
}

export const actions = {
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  setPath({ commit }, path) {
    commit('setPath', path)
  }
}

export const getters = {
  getToken(state){ return state.token}
}

