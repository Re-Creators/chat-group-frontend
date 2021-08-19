<template>
    <div>
      <router-view v-if="!isLoading"/>
      <Loading v-if="isLoading"/>
    </div>
  
</template>

<script>
import Loading from './components/Loading.vue'

export default {
  components: {
    Loading
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isLoading() {
      return this.$store.state.isLoading
    }
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
