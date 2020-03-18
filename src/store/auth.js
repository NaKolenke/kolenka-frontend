import api from '@/api/auth'
import request from '@/utils/request'

const state = {
  accessToken: null,
  refreshToken: null
}

const getters = {
  accessToken: state => {
    if (state.accessToken != null) {
      return state.accessToken.token
    }
    return null
  }
}

const actions = {
  login ({ commit }, { username, password }) {
    return api.login(username, password).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('storeTokens', res.access_token, res.refresh_token)

      request.setAuth(res.access_token.token, res.refresh_token)

      localStorage.setItem('token', JSON.stringify(res.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(res.refresh_token))

      return res
    })
  },
  register ({ commit }, { username, password, name, email }) {
    return api.register(username, password, name, email).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('storeTokens', res.access_token, res.refresh_token)

      request.setAuth(res.access_token.token, res.refresh_token)

      localStorage.setItem('token', JSON.stringify(res.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(res.refresh_token))

      return res
    })
  },
  logout ({ dispatch, commit }) {
    request.setAuth(null, null)

    localStorage.setItem('token', null)
    localStorage.setItem('refresh_token', null)

    commit('invalidateTokens')
    dispatch('users/invalidateUser', {}, { root: true })
  },
  restoreToken ({ commit }) {
    var t = null
    try {
      t = JSON.parse(localStorage.getItem('token'))
    } catch (_) {
      // do nothing
    }
    if (t !== null) {
      var refresh = JSON.parse(localStorage.getItem('refresh_token'))
      return api.refreshToken(refresh.token).then(res => {
        commit('storeTokens', res.access_token, res.refresh_token)

        request.setAuth(res.access_token.token, res.refresh_token)

        localStorage.setItem('token', JSON.stringify(res.access_token))
        localStorage.setItem('refresh_token', JSON.stringify(res.refresh_token))

        return res
      })
    }
  },
  loadTokensFromStorage ({ commit }) {
    var t = null
    try {
      t = JSON.parse(localStorage.getItem('token'))
    } catch (_) {
      // do nothing
    }
    if (t !== null) {
      var refresh = JSON.parse(localStorage.getItem('refresh_token'))

      commit('storeTokens', t, refresh)
      return { access: t, refresh: refresh }
    }
    return null
  },
  recover (_context, { email }) {
    return api.recover(email).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  setPassword (_context, { password, token }) {
    return api.setPassword(password, token).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
}

const mutations = {
  storeTokens (state, accessToken, refreshToken) {
    state.accessToken = accessToken
    state.refreshToken = refreshToken
  },
  invalidateTokens (state) {
    state.accessToken = null
    state.refreshToken = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
