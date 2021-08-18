<template>
    <div class="w-full px-3 md:px-14 py-5 flex flex-row justify-between">
       <img src="@/assets/devchallenges.svg" alt="">
       <div class="flex flex-row items-center relative">
            <img :src="setImage(user.avatar)" alt="" class="w-10 h-10 rounded-full mr-3" @click="show = !show">
            <figcaption class="text-sm mr-2 font-bold hidden md:block">{{ user.name }}</figcaption>
            <button @click="show = !show" class="hidden md:block">
                <span class="material-icons" v-if="!show">arrow_drop_down</span>
                <span class="material-icons" v-if="show">arrow_drop_up</span>
            </button>
            <div class="absolute -left-32  md:-left-14 top-14 bg-white border border-gray-400 p-1 md:p-5 min-h-44 rounded-lg flex flex-col justify-between text-xs md:text-base" v-if="show">
                <router-link to="/profile" class="flex flex-row items-center py-2 px-4 mr-14 w-full rounded-lg hover:bg-active cursor-pointer">
                    <span class="material-icons">account_circle</span>
                    <figcaption class="text-sm ml-2">My Profile</figcaption>
                </router-link>
                <div class="flex flex-row items-center  py-2 px-4 mr-14 w-full rounded-lg hover:bg-active cursor-pointer">
                    <span class="material-icons">group</span>
                    <figcaption class="text-sm ml-2">Chat Group</figcaption>
                </div>
                <div class="border-t border-gray-400 w-full h-1"></div>
                <div class="text-red-500 text-sm flex flex-row  py-2 px-4 mr-14 w-full rounded-lg hover:bg-active cursor-pointer" @click="logout">
                    <span class="material-icons">logout</span>
                    <figcaption>Logout</figcaption>
                </div>
            </div>
       </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show : false
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    methods : {
        logout() {
            this.$store.dispatch('logout')
        },
        setImage(url) {
            if(url === null) {
                return require('../assets/no-profile.jpg')
            }

            return url
        }
    }
}
</script>