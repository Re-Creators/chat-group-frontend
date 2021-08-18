<template>
    <div class="min-h-screen flex justify-center">
        <div class="w-1/4 px-10 py-10 rounded-lg border border-gray-500 m-auto">
            <section>
                <img src="@/assets/devchallenges.svg" alt="">
                <h1 class="text-left my-5 font-semibold">Login</h1>
            </section>
            <section class="mt-3">
                <form @submit.prevent="login">
                    <div class="relative">
                        <input type="email" class="w-full border border-gray-400 p-2 pl-10 text-sm rounded-md" placeholder="Email" v-model="email">
                        <span class="material-icons absolute left-0 top-0 p-2 text-gray-500">email</span>
                    </div>
                    <div class="relative mt-3">
                        <input type="password" class="w-full border border-gray-400 p-2 pl-10 text-sm rounded-md" placeholder="Password" v-model="password" required>
                        <span class="material-icons absolute left-0 top-0 p-2 text-gray-500">lock</span>
                    </div>
                    <div class="mt-3" v-if="message">
                        <p class="text-red-500 italic text-sm">These credentials do not match out records</p>
                    </div>
                    <button type="submit" class="w-full p-3 bg-blue-500 text-white text-sm mt-5 rounded-lg hover:bg-blue-600 active:bg-blue-700">Login</button>
                </form>
            </section>
            <section class="mt-3 text-center">
                <p class="text-sm text-gray-500">or continue with these social profile</p>
                <div class="grid grid-cols-4 my-3">
                    <button>
                        <img src="@/assets/Google.svg" alt="">
                    </button>
                    <button @click="githubLogin('facebook')">
                        <img src="@/assets/Facebook.svg" alt="">
                    </button>
                    <button>
                        <img src="@/assets/Twitter.svg" alt="">
                    </button>
                    <button @click="githubLogin('github')">
                        <img src="@/assets/Github.svg" alt="">
                    </button>
                </div>
                <p class="text-sm text-gray-500">Don’t have an account yet? <router-link to="/register" class="text-blue-500">Register</router-link></p>
            </section>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            email : "",
            password : '',
            message : null
        }
    },
    mounted() {
        window.addEventListener('message', this.onMessage, false)
    },
    beforeMounted() {
        window.removeEventListener('message', this.onMessage)
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                email : this.email,
                password : this.password
            })
            .then(() => {
            })
            .catch(err => {
                    if(err.response) {
                        this.message = err.response.data.message
                    }
            })
        },
        githubLogin(provider) {
            const newWindow = openWindow('', 'message')
            axios.get(`http://authentication-app.test/api/auth/${provider}/redirect`)
            .then(({data}) => {
                if(data.redirect) {
                    newWindow.location.href = data.redirect
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        onMessage (e) {
            if (e.origin !== "http://authentication-app.test/" && !e.data.token) {
                return
            }

            this.$store.commit('setToken', e.data.token)
            this.$store.commit('setProvider')
            this.$router.push({ name: 'Profile' })
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