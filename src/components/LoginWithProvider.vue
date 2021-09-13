<template>
     <section class="mt-8 md:mt-5 text-center">
        <p class="text-sm text-gray-500">or continue with these social profile</p>
        <div class="grid grid-cols-4 my-3">
            <button @click="OauthLogin('google')">
                <img src="@/assets/Google.svg" alt="">
            </button>
            <button @click="OauthLogin('facebook')">
                <img src="@/assets/Facebook.svg" alt="">
            </button>
            <button>
                <img src="@/assets/Twitter.svg" alt="">
            </button>
            <button @click="OauthLogin('github')">
                <img src="@/assets/Github.svg" alt="">
            </button>
        </div>
        <p class="text-sm text-gray-500">{{ caption }} <router-link :to="redirectTo(type)" class="text-blue-500 capitalize">{{ type }}</router-link></p>
    </section>
</template>
<script>
export default {
    props : {
        type: String,
        caption: String
    },
    mounted() {
        window.addEventListener('message', this.onMessage, false)
    },
    beforeMounted() {
        window.removeEventListener('message', this.onMessage)
    },
    methods: {
        async OauthLogin(provider) {
            const newWindow = openWindow('', 'message')
            const url = await this.$store.dispatch('getOauthUrl', provider)

            if(url) {
                newWindow.location.href = url
            }
        },
        onMessage (e) {
            if (e.origin !== process.env.VUE_APP_API && !e.data.token) {
                return
            }

            this.$store.commit('setToken', e.data.token)
            this.$store.commit('setProvider')
            this.$router.push({ name: 'Profile' })
        },
        redirectTo(type) {
            if(type === "login"){
                return "/"
            }
            return "/register"
        }
    },
}


function openWindow (url, title, options = {}) {
  if (typeof url === 'object') {
    options = url
    url = ''
  }
  options = { url, title, width: 600, height: 720, ...options }
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top
  const width = window.innerWidth || document.documentElement.clientWidth || window.screen.width
  const height = window.innerHeight || document.documentElement.clientHeight || window.screen.height
  options.left = ((width / 2) - (options.width / 2)) + dualScreenLeft
  options.top = ((height / 2) - (options.height / 2)) + dualScreenTop
  const optionsStr = Object.keys(options).reduce((acc, key) => {
    acc.push(`${key}=${options[key]}`)
    return acc
  }, []).join(',')
  const newWindow = window.open(url, title, optionsStr)
  if (window.focus) {
    newWindow.focus()
  }
  return newWindow
}
</script>