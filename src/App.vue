<template>
    <router-view/>
</template>
<script>
import axios from 'axios'

export default {
  created () {
    const token = localStorage.getItem('token')
    
    if(token) {
      this.$store.commit('setToken', token)
    }

    axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if(error.response.status == 401) {
          this.$store.commit('logout')
        }
        return Promise.reject(error)
      }
    )
  }
}
</script>

<style>
body {
  background-color:rgba(250, 250, 251, 1);
}

#app {
 font-family: 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
