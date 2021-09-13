<template>
    <div class="relative w-full md:w-3/4">
        <Welcome v-if="activeChannel === null"/>
        
        <div class="container h-screen" v-if="activeChannel !== null">
            <div class="w-full flex flex-row shadow-lg pl-5 md:pl-10 py-3 text-white uppercase">
                <button class="mr-3 md:hidden"><span class="material-icons" @click="$store.commit('setMobileMenu', false)">menu</span></button>
                {{ activeChannel.name }}
            </div>
            <!-- Message Container -->
            <div class="pl-5 md:pl-10 pr-5 h-4/5 overflow-y-auto message-container">
                <!-- Message -->
                <MessageGroup/>
            </div>
            <div class="w-full px-10 py-5 absolute bottom-0 bg-primary">
                <div class="relative">
                    <input type="text" class="w-full p-3 bg-input rounded-md text-sm outline-none text-white" placeholder="Type message here" v-model="messageText" @keyup.enter="sendMessage">
                    <button class="absolute right-2 mt-2"><span class="material-icons text-sm text-white bg-blue-600 px-2 py-1 rounded-lg" @click="sendMessage">send</span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MessageGroup from './MessageGroup.vue'
import Welcome from './Welcome.vue'

import axios from 'axios'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    components : {
        MessageGroup,
        Welcome
    },
    setup() {
        const store = useStore()

        const messageText = ref("")
        const activeChannel = computed(() => {
            return store.state.activeChannel
        })

        let isSending = false

        async function sendMessage() {
            if(isSending) {
                return
            }

            isSending = true
            try {
                await axios.post('/chat/' + activeChannel.value.id + '/message', {
                    message : messageText.value
                })
                store.dispatch('getMessages', activeChannel.value.id)
                messageText.value = ""
                isSending = false
            }catch(err) {
                console.log(err)
            }
        }
        return {
            messageText,
            sendMessage,
            activeChannel,
        }
    }
}
</script>
<style scoped>
.message-container::-webkit-scrollbar { 
    display: none; /* Chrome Safari */
}
.message-container { 
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */
}
</style>