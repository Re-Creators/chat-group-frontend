import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router/index'


export default createStore({
  state: {
    user : null,
    useProvider : false,
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    clearUserData(state) {
      localStorage.removeItem('token')
      state.useProvider = false
      location.reload()
    },
    setUserData(state, userData) {
      state.user = userData
    },
    setProvider(state) {
      state.useProvider = true
    }
  },
  actions: {
    login({commit}, credentials) {
      return axios.post('http://authentication-app.test/api/login', credentials)
                  .then(({data}) => {
                    commit('setToken', data.token)
                    router.push({name: 'Profile'})
                  })
    },
    async getUserData({commit}) {
      await axios.get('http://authentication-app.test/api/user')
      .then(({data}) => {
        commit('setUserData', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    logout({commit}) {
      commit('clearUserData')
    },
    updateUser({state, commit},formData) {
      axios.post('http://authentication-app.test/api/user/' + state.user.id, formData)
      .then((data) => {
        commit('setUserData', data)
        router.push({name: 'Profile'})
      })
      .catch(err => {
        console.log(err)
      })
    },
    registerUser({commit}, userData) {
      return axios.post('http://authentication-app.test/api/register', userData)
      .then(({data}) => {
        commit('setToken', data.token)
        router.push({name: 'Profile'})
      })
    }
  },
  modules: {
  }
})
