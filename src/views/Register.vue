<template>
    <div class="h-screen md:min-h-screen flex justify-center relative py-10">
        <div class="md:w-1/2 lg:w-1/3 px-5 md:m-auto">
            <div class="md:px-10 md:py-10 rounded-lg md:border md:border-gray-500 ">
                <section class="text-white">
                    <img src="@/assets/devchallenges.svg" alt="">
                    <div class="text-left pr-8 mt-5 md:mt-3">
                        <p class="font-semibold">Join thousands of learners from around the world </p>
                        <p class="text-sm mt-5 md:mt-3">Master web development by making real-life projects. There are multiple paths for you to choose</p>
                    </div>
                </section>
                <section class="mt-5 md:mt-3">
                    <form @submit.prevent="register">
                        <div class="relative">
                            <input type="email" class="w-full border border-gray-400 p-2 pl-10 text-sm" placeholder="Email" v-model="email">
                            <span class="material-icons absolute left-0 top-0 p-2 text-gray-500">email</span>
                            <p class="text-red-500 italic text-sm mt-5 md:mt-3" v-if="emailMessage">{{ emailMessage }}</p>
                        </div>
                        <div class="relative mt-5 md:mt-3">
                            <input type="password" class="w-full border border-gray-400 p-2 pl-10 text-sm" placeholder="Password" v-model="password">
                            <span class="material-icons absolute left-0 top-0 p-2 text-gray-500">lock</span>
                            <p class="text-red-500 italic text-sm mt-5 md:mt-3" v-if="passwordMessage">{{ passwordMessage }}</p>
                        </div>
                        <button type="submit" class="w-full p-3 bg-blue-500 text-white text-sm mt-5 rounded-lg hover:bg-blue-600 active:bg-blue-700">Start coding now</button>
                    </form>
                </section>
               <LoginWithProvider caption="Adready a member?" type="login" />
            </div>
            <Footer/>
        </div>
    </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import LoginWithProvider from '../components/LoginWithProvider.vue'

export default {
    components : {
        Footer,
        LoginWithProvider
    },
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
            const result = this.$store.dispatch('registerUser', {
              email : this.email,
              password : this.password
            })

            result.then(result => {
                if(result) {
                    this.emailMessage = (result.email) ? result.email[0] : null
                    this.passwordMessage = (result.password) ? result.password[0] : null
                }
            })
        }
    },
}
</script>