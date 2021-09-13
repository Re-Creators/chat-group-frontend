<template>
    <div class="w-full h-full flex flex-row chat-group">
        <SideBar/>
        <ChatContainer/>
    </div>
</template>

<script>
import SideBar from '../components/chat-group/SideBar.vue'
import ChatContainer from '../components/chat-group/ChatContainer.vue'
export default {
    components : {
        SideBar,
        ChatContainer,
    },
    mounted() {
        this.$store.dispatch('getUserData')
    }

}
</script>
<style scoped>
.chat-group {
    overflow: hidden;
}
</style>