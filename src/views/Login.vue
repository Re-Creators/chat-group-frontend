<template>
    <div class="md:min-h-screen flex md:justify-center py-10 md:py-0">
        <div class="w-full md:w-1/2 lg:w-1/3 px-5 py-5 md:m-auto">
            <div class="rounded-lg md:border md:border-gray-500 md:px-10 md:py-10">
                <section>
                    <img src="@/assets/devchallenges.svg" alt="">
                    <h1 class="text-left my-5 font-semibold">Login</h1>
                </section>
                <section class="mt-8 md:mt-5">
                    <form @submit.prevent="login">
                        <div class="relative">
                            <input type="email" class="w-full border border-gray-400 p-2 pl-10 text-sm rounded-md" placeholder="Email" v-model="email">
                            <span class="material-icons absolute left-0 top-0 p-2 text-gray-500">email</span>
                        </div>
                        <div class="relative mt-8 md:mt-5">
                            <input type="password" class="w-full border border-gray-400 p-2 pl-10 text-sm rounded-md" placeholder="Password" v-model="password" required>
                            <span class="material-icons absolute left-0 top-0 p-2 text-gray-500">lock</span>
                        </div>
                        <div class="mt-8 md:mt-5" v-if="message">
                            <p class="text-red-500 italic text-sm">These credentials do not match out records</p>
                        </div>
                        <button type="submit" class="w-full p-3 bg-blue-500 text-white text-sm mt-5 rounded-lg hover:bg-blue-600 active:bg-blue-700">Login</button>
                    </form>
                </section>
               <LoginWithProvider type="Register" caption="Don’t have an account yet?"/>
            </div>
            <Footer/>
        </div>
    </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import LoginWithProvider from '../components/LoginWithProvider.vue'

export default {
    components: {
        Footer,
        LoginWithProvider
    },
    data() {
        return {
            email : "",
            password : '',
            message : null
        }
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
    }
}

</script>