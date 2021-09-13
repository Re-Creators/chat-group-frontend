<template>
    <transition name="slide-fade">
        <div class="fixed inset-y-0 z-10 w-4/5 md:block md:relative md:w-1/3 lg:w-1/4 md:max-h-screen bg-secondary" v-show="!mobileDevice || mobileMenu">
            <!-- Close button hamburger menu -->
            <button class="md:hidden absolute -right-16 top-2 px-2 py-1 rounded-full bg-secondary" @click="$store.commit('setMobileMenu', false)"><span class="material-icons text-white">close</span></button>
            <ChannelList
                v-if="state === 1"
                v-on:show-modal="showModal($event)"
            />
            <Channel v-if="state === 2"
                v-on:change="changeState($event)"
            />
            <WelcomeChannel  v-if="state === 3"
                v-on:change="changeState($event)"
            />
             <!-- Modals -->
            <NewChannelModal v-if="isShow"
                v-on:show-modal="showModal($event)"
            />
        </div>
    </transition>
</template>
<script>
import ChannelList from './ChannelList.vue'
import Channel from './Channel.vue'
import WelcomeChannel from './WelcomeChannel.vue'
import NewChannelModal from './NewChannelModal.vue'

import pusher from '@/plugins/pusher'

import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    components : {
        ChannelList,
        Channel,
        WelcomeChannel,
        NewChannelModal,
    },
    setup() {
        // Created
        window.addEventListener('resize', handleResize)

        const store = useStore()

        const isShow = ref(false)
        const mobileDevice = ref(false)
        
        const state = computed(() => store.state.sidebarState)
        const activeChannel = computed(() => store.state.activeChannel)
        const mobileMenu = computed(() => store.state.mobileMenu)

        function showModal(value) {
            isShow.value = value
        }

        function changeState(state) {
            if(activeChannel.value !== null) {
                pusher.unsubscribe('private-chat.' + activeChannel.value.id)
            }
            store.commit('setSidebarState', state)
        }

        function handleResize(){
            if(window.innerWidth <= 640) {
                console.log("Movile")
                mobileDevice.value = true
                store.commit('setMobileMenu', false)
            }else{
                mobileDevice.value = false
                store.commit('setMobileMenu', false)
            }
        }

        onMounted(() => {
            handleResize()
            store.dispatch('getChannels')
        })

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
        })

        return {
            isShow,
            showModal,
            state,
            changeState,
            mobileMenu,
            mobileDevice
        }
    }
}
</script>
<style scoped>
.slide-fade-leave-active,
.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>