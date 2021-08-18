<template>
    <div v-if="user">
        <TopMenu/>
       <div class="w-3/5 mx-auto">
            <section class="text-center">
                <p class="font-semibold text-3xl">Personal Info</p>
                <p>Basic info, like your name and photo</p>
            </section>

            <section class="w-full border border-gray-400 mt-10 py-3 grid grid-rows-7 divide-y divide-gray-400 rounded-lg text-sm bg-white">
                <div class="flex flex-row justify-between w-full py-5 px-14">
                    <div class="w-4/5">
                        <h1 class="font-semibold text-xl">Profile</h1>
                        <p class="text-sm text-gray-500">Some info my visible to other people</p>
                    </div>
                    
                    <router-link to="/profile/edit" >
                        <button class="border border-gray-500 rounded-lg px-8 text-sm py-3">Edit</button>
                    </router-link>
                </div>
                <div class="px-14 py-3 flex flex-row items-center">
                    <p class="w-1/4 text-gray-500">PHOTO</p>
                    <img :src="setImage(user.avatar)" alt="" class="w-16 h-16">
                </div>
                <div class="px-14 py-3 flex flex-row items-center">
                    <p class="w-1/4 text-gray-500">NAME</p>
                    <p class="font-semibold">{{ user.name }}</p>
                </div>
                <div class="px-14 py-3 flex flex-row items-center">
                    <p class="w-1/4 text-gray-500">BIO</p>
                    <p class="font-semibold">{{ user.bio }}</p>
                </div>
                <div class="px-14 py-3 flex flex-row items-center">
                    <p class="w-1/4 text-gray-500">PHONE</p>
                    <p class="font-semibold">{{ user.phone }}</p>
                </div>
                <div class="px-14 py-3 flex flex-row items-center">
                    <p class="w-1/4 text-gray-500">EMAIL</p>
                    <p class="font-semibold">{{ user.email }}</p>
                </div>
                <div class="px-14 py-3 flex flex-row items-center">
                    <p class="w-1/4 text-gray-500">PASSWORD</p>
                    <p class="font-semibold">********</p>
                </div>
            </section>
       </div>
    </div>
</template>
<script>
import TopMenu from '../components/TopMenu.vue'

export default {
    components : {
        TopMenu
    },
    mounted() {
         this.$store.dispatch('getUserData')
    },
    computed : {
        user() {
            return this.$store.state.user
        }
    },
    methods : {
        setImage(url) {
            if(url === null) {
                return require('../assets/no-profile.jpg')
            }

            return url
        }
    }
}
</script>