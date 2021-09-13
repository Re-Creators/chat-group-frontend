<template>
    <div class="h-full w-full flex flex-col relative">
        <section class="pl-6 pr-4">
            <div class="w-full py-4 text-white flex flex-row justify-between items-center shadow-md0">
                <h1 class="font-semibold">Channels</h1>
                <button class="bg-primary p-1 rounded-lg" @click="$emit('show-modal', true)"><span class="material-icons">add</span></button>
            </div>
            <!-- Search bar -->
            <div class="relative">
                <input type="text" class="w-full bg-input p-3 pl-10 text-sm text-white outline-none rounded-lg" placeholder="Search">
                <span class="absolute left-0 p-2 text-white material-icons">search</span>
            </div>

        </section>
        <!-- Channel List -->
        <section class="h-4/5 pl-6 pr-4">
            <div class="mt-5">
                <div class="flex flex-row items-center text-white mb-5 cursor-pointer"  @click="chooseChannel(null)">
                    <span class="w-10 py-2 text-center bg-primary rounded-lg uppercase">W</span>
                    <h1 class="ml-3 uppercase">WELCOME</h1>
                </div>
                <div class="flex flex-row items-center text-white mb-5 cursor-pointer" v-for="(channel, index) in channels" :key="index" @click="chooseChannel(channel)">
                    <span class="w-10 py-2 text-center bg-primary rounded-lg uppercase">{{ getChannelAbbr(channel.name) }}</span>
                    <h1 class="ml-3 uppercase">{{ channel.name }}</h1>
                </div>
            </div>
        </section>
        <ProfileMenu/>
    </div>
</template>

<script>
import ProfileMenu from './ProfileMenu.vue'

import axios from 'axios'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    components : {
        ProfileMenu
    },
    setup() {
        const store = useStore()

        const channels = computed(() => store.state.channels)

        function getChannelAbbr(name) {
            const words = name.split(' ')
            
            if(words.length >= 2) {
                let abbr = ""
                
                for (let index = 0; index < 2; index++) {
                    abbr += words[index].charAt(0);
                }
                return abbr
            }else{
                return words[0].charAt(0)
            }
        }

       async function chooseChannel(channel) {

            store.commit('setMobileMenu', false)
            store.commit('setActiveChannel', channel)

            if(channel === null) {
                store.commit('setSidebarState', 3)
                return
            }
            
            store.commit('setSidebarState', 2)
            store.dispatch('getMessages', channel.id)
            // Register member
            try{
                await axios.post('/chat/' + channel.id + '/member')
            }catch(err) {
                console.log(err)
            }
        }

        return {
            channels,
            getChannelAbbr,
            chooseChannel
        }
    }    
}
</script>