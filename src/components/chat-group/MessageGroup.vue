<template>
    <div class="flex flex-col-reverse">
        <div v-for="(item, index) in messages_grouped" :key="index" >
            <div class="flex flex-row items-center mb-3">
                <div class="border-t border-primary flex-grow"></div>
                <span class="mx-3 text-primary text-sm ">{{ item.date }}</span>
                <div class="border-t border-primary flex-grow"></div>
            </div>
            <Message :messages="item.messages"/>
        </div>
    </div>
</template>

<script>
import Message from './Message.vue'

import pusher  from '@/plugins/pusher'

import { computed } from 'vue'
import { useStore } from 'vuex'


export default {
    components : {
        Message
    },
    setup() {
        const store = useStore()

        const activeChannel = computed(() => store.state.activeChannel)
        const messages_grouped = computed(() => store.state.messages)

        const channel = pusher.subscribe('private-chat.' + activeChannel.value.id);
        channel.bind('message.new', function() {
            store.dispatch('getMessages', activeChannel.value.id)
        })

        return {
            messages_grouped
        }
    }
}
</script>