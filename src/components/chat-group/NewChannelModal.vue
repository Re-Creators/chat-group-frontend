<template>
  <div class="fixed z-20 inset-0 bg-overlay flex items-center justify-center" @click="$emit('show-modal', false)">
      <div class="p-8 md:w-1/2 lg:w-2/5 text-white bg-secondary rounded-lg" @click.stop>
        <h1>NEW CHANNEL</h1>
        <div class="mt-3">
            <input type="text" class="w-full bg-input p-3 text-sm outline-none" placeholder="Channel name" v-model="channelName">
        </div>
        <div class="mt-3">
            <textarea cols="30" rows="3" class="w-full bg-input p-3 text-sm resize-none outline-none" v-model="channelDesc" placeholder="Channel description"></textarea>
        </div>
        <button class="bg-blue-500 px-4 py-1 rounded-lg float-right mt-5" @click="save">Save</button>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  setup(props, { emit }) {
    const store  = useStore()

    const channelName = ref("")
    const channelDesc = ref("")

    async function save() {
      if(channelName.value === "" || channelDesc.value === "") {
        return
      }

      try{
        await axios.post('/chat/channel', {
          name : channelName.value,
          description : channelDesc.value
        })
        store.dispatch('getChannels')
      }catch(err) {
        console.log(err)
      }

      emit('show-modal', false)
    }

    return {
      channelName,
      channelDesc,
      save
    }
  }
}
</script>