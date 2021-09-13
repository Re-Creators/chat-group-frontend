<template>
   <section class="absolute bottom-0 w-full pl-6 pr-4 py-3 bg-profile flex flex-row items-center justify-between" v-if="user !== null">
        <img :src="setImage(user.avatar)" alt="" class="w-10 h-10">
        <h1 class="text-primary">{{ user.name }}</h1>
        <button @click="showMenu">
            <span class="material-icons text-white">{{ expand_text }}</span>
        </button>

        <div class="w-1/2 p-2 bg-primary absolute right-5 -top-52 text-white rounded-lg" v-show="isShow">
            <router-link to="/profile" class="flex flex-row px-3 py-4 w-full hover:bg-hover-profile rounded-lg cursor-pointer">
                <span class="material-icons">account_circle</span>
                <figcaption class="ml-3">Profile</figcaption>
            </router-link>
            <div class="flex flex-row px-3 py-4 w-full rounded-lg cursor-pointer hover:bg-hover-profile">
                <svg width="24" height="24" viewBox="0 0 73 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M55.5494 22.4096L67.7956 39.317C70.1901 42.6229 67.8282 47.25 63.7462 47.25H39.2538C35.1718 47.25 32.8099 42.6229 35.2044 39.317L47.4506 22.4096C49.4468 19.6536 53.5532 19.6536 55.5494 22.4096Z" stroke="#E0E0E0" stroke-width="8"/>
                    <path d="M33.775 6.76032L53.7295 39.6569C55.7507 42.989 53.3517 47.25 49.4545 47.25H9.54551C5.64825 47.25 3.24928 42.989 5.27051 39.6569L25.225 6.76032C27.1716 3.55118 31.8284 3.55117 33.775 6.76032Z" stroke="#E0E0E0" stroke-width="8"/>
                </svg>
                <figcaption class="ml-3">Tweeter</figcaption>
            </div>
            <div class="border-t-2 border-primary my-2"></div>
            <div class="flex flex-row px-3 py-4 w-full text-red-500 rounded-lg  cursor-pointer hover:bg-hover-profile" @click="logout">
                <span class="material-icons">logout</span>
                <figcaption class="ml-3">Logout</figcaption>
            </div>
        </div>
    </section>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()

        const user = computed(() => store.state.user)
        const expand_text = ref("expand_more")
        const isShow = ref(false)

        function showMenu() {
            isShow.value = !isShow.value
            expand_text.value = (isShow.value) ? "expand_less" : "expand_more" 
        }

        function logout() {
            store.dispatch('logout')
        }

        function setImage(url) {
            if(url === null) {
                return require('@/assets/no-profile.jpg')
            }
            return url
        }

        return {
            expand_text,
            isShow,
            showMenu,
            logout,
            setImage,
            user
        }
    }
}
</script>