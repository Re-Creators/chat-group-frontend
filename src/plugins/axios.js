import axios from 'axios'

import store from '../store'
import router from '../router/index'


// Request interceptor
axios.interceptors.request.use(request => {
    const token = store.getters.token

    if(token) {
        request.headers.common.Authorization = `Bearer ${token}`
    }

    return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
    const {status} = error.response

    if(status === 401 && store.getters.authCheck) {
        store.commit('logout')
        router.push({name: 'Login'})
    }

    return Promise.reject(error)
})