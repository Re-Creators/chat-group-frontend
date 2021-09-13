<template>
    <div>
      <router-view/>
    </div>
  
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style>

#app {
 font-family: 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
