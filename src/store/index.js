import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router/index'

axios.defaults.baseURL ='http://chat-group.test/api'


export default createStore({
  state: {
    user : null,
    sidebarState : 1,
    activeChannel : null,
    channels: [],
    token : localStorage.getItem('token'),
    mobileMenu: false,
    useProvider : false,
    isLoading : false,
    messages : []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
      
    },
    logout(state) {
      localStorage.removeItem('token')
      state.token = null
      state.user = null
      state.useProvider = false
    },
    setMobileMenu(state, value) {
      state.mobileMenu = value
    },
    setSidebarState(state, value) {
      state.sidebarState = value
    },
    setUserData(state, userData) {
      state.user = userData
    },
    setProvider(state) {
      state.useProvider = true
    },
    getUserFailure(state) {
      state.user = null
      state.token = null

      localStorage.removeItem('token')
    },
    setLoading(state, payload) {
      state.isLoading = payload
    },
    setChannels(state, channels) {
      state.channels = channels
    },
    setActiveChannel(state, channel) {
      state.activeChannel = channel
    },
    setMessages(state, messages) {
      state.messages = messages
    }
  },
  actions: {
    login({commit}, credentials) {
      return axios.post('/login', credentials)
                  .then(({data}) => {
                    commit('setToken', data.token)
                    router.push({name: 'Profile'})
                  })
    },
    async getOauthUrl(ctx, provider) {
      try {
        const { data } = await axios.get(`/auth/${provider}/redirect`)
        
        return data.redirect
      }catch(e) {
        console.log(e)
      }

    },
    async getUserData({commit}) {
      try{
        const { data } = await axios.get('/user')
        commit('setUserData', data)

      }catch (e) {
        commit('getUserFailure')
      }
    },
    async logout({commit}) {
      try{
        await axios.post('/logout')
      }catch(e) {
        commit('logout')
      }
    },
    async updateUser({state, commit}, formData) {
      commit('setLoading', true)
      try {
        const { data } = await axios.post('/user/' + state.user.id, formData)
        commit('setUserData', data)
        commit('setLoading', false)
        router.push({name: 'Profile'})
      }catch (e) {
        console.log(e)
      }
    },
    async registerUser({commit}, userData) {
      try{
        const { data } = await axios.post('/register', userData)

        commit('setToken', data.token)
        router.push({name : 'Profile'})
      }catch(e) {
        if(e.response) {
          return e.response.data.errors
        }
      }
    },
    
    async getMessages({commit}, channelId){
      try{
        const { data } = await axios.get('/chat/' + channelId + '/messages')

        commit('setMessages', data)
      }catch(err) {
        console.log(err)
      }
    },
    async getChannels({commit}) {
        try{
            const { data } = await axios.get('http://chat-group.test/api/chat/channels')

            commit('setChannels', data)
        }catch(err){
            console.log(err)
        }
    } 
  },
  getters: {
    authCheck: state => state.token !== null,
    token : state => state.token
  },
  modules: {
  }
})
