<template>
    <div class="h-full relative">
        <section class="text-white py-4 px-8 flex shadow-lg">
            <button class="mr-3"><span class="material-icons" @click="$emit('change', 1)">arrow_back_ios_new</span></button>
            <span>All channels</span>
        </section>
        <section class="px-8 text-white mt-5">
            <h1 class="uppercase font-semibold mb-3">Welcome</h1>
            <p class="text-primary">Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis purus, at interdum arcu tempor non</p>
        </section>
        <ProfileMenu/>
    </div>
</template>
<script>
import ProfileMenu from './ProfileMenu.vue'

export default {
  components: { ProfileMenu },
    
}
</script>