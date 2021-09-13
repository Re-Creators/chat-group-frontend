<template>
    <div class="h-full relative">
        <section class="text-white py-4 px-8 flex shadow-lg">
            <button class="mr-3"><span class="material-icons" @click="$emit('change', 1)">arrow_back_ios_new</span></button>
            <span>All channels</span>
        </section>
        <section class="px-8 text-white mt-5">
            <h1 class="uppercase font-semibold mb-3">{{ channel.name }}</h1>
            <p class="text-primary">Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis purus, at interdum arcu tempor non</p>
        </section>
        <section class="h-3/5 px-8 mt-5 ">
            <h1 class="font-semibold text-white">MEMBERS</h1>
            <div class="members mt-3 h-5/6 overflow-y-auto">
                <div class="flex items-center mb-5" v-for="(member, index) in members" :key="index">
                    <img src="@/assets/no-profile.jpg" alt="Profile" class="w-10 h-10 rounded-lg">
                    <span class="capitalize text-primary ml-3 font-semibold">{{ member.user.name }}</span>
                </div>
            </div>
        </section>
        <ProfileMenu/>
    </div>
</template>
<script>
import ProfileMenu from './ProfileMenu.vue'

import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    components: { 
        ProfileMenu 
    },
    setup() {
        const store = useStore()
       
        const members = ref([])
        const channel = computed(() => {
            return store.state.activeChannel
        })

        async function getMembers() {
            try{
                const { data } = await axios.get('http://chat-group.test/api/chat/' + channel.value.id + '/members')

                members.value = data
            }catch(err){
                console.log(err);
            }
        }
        onMounted(getMembers)

        return {
            channel,
            members
        }
    }
}
</script>