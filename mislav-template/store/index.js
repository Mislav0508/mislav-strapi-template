export const state = () => ({
  token: null,
  user: null,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  setUser({ commit }, user) {
    commit('setUser', user)
  }
}

export const getters = {
  getToken(state){ return state.token}
}

