<template>
    <div class="min-h-screen flex justify-center">
        <div class="w-1/4 px-10 py-10 rounded-lg border border-gray-500 m-auto">
            <section>
                <img src="@/assets/devchallenges.svg" alt="">
                <div class="text-left pr-8 mt-3">
                    <p class="font-semibold">Join thousands of learners from around the world </p>
                    <p class="text-sm mt-3">Master web development by making real-life projects. There are multiple paths for you to choose</p>
                </div>
            </section>
            <section class="mt-3">
                <form @submit.prevent="register">
                    <div class="relative">
                        <input type="email" class="w-full border border-gray-400 p-2 pl-10 text-sm" placeholder="Email" v-model="email">
                        <span class="material-icons absolute left-0 top-0 p-2 text-gray-500">email</span>
                        <p class="text-red-500 italic text-sm mt-3" v-if="emailMessage">{{ emailMessage }}</p>                      
                    </div>
                    <div class="relative mt-3">
                        <input type="password" class="w-full border border-gray-400 p-2 pl-10 text-sm" placeholder="Password" v-model="password">
                        <span class="material-icons absolute left-0 top-0 p-2 text-gray-500">lock</span>
                        <p class="text-red-500 italic text-sm mt-3" v-if="passwordMessage">{{ passwordMessage }}</p>                      
                    </div>
                    <button type="submit" class="w-full p-3 bg-blue-500 text-white text-sm mt-5 rounded-lg hover:bg-blue-600 active:bg-blue-700">Start coding now</button>
                </form>
            </section>
            <section class="mt-3 text-center">
                <p class="text-sm text-gray-500">or continue with these social profile</p>
                <div class="grid grid-cols-4 mt-3">
                    <button>
                        <img src="@/assets/Google.svg" alt="">
                    </button>
                    <button>
                        <img src="@/assets/Facebook.svg" alt="">
                    </button>
                    <button>
                        <img src="@/assets/Twitter.svg" alt="">
                    </button>
                    <button>
                        <img src="@/assets/Github.svg" alt="">
                    </button>
                </div>
                <p class="text-sm text-gray-500">Adready a member? <router-link to="/" class="text-blue-500">Login</router-link></p>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email : "",
            password : "",
            passwordMessage: null,
            emailMessage : null
        }
    },
    methods: {
        register() {
            this.$store.dispatch('registerUser', {
              email : this.email,
              password : this.password
          })
          .then(() => {
          })
          .catch(err => {
                if(err.response) {
                    const errMessage = err.response.data.errors

                    this.emailMessage = (errMessage.email) ? errMessage.email[0] : null
                    this.passwordMessage = (errMessage.password) ? errMessage.password[0] : null
                }
          })
        }
    },
}
</script>