<template>
    <div class="relative md:2/3 lg:w-3/4 h-screen">
         <div class="w-full flex flex-row shadow-lg pl-5 md:pl-10 py-3 text-white uppercase">
            <button class="mr-3 md:hidden"><span class="material-icons" @click="$store.commit('setMobileMenu', true)">menu</span></button>
            <h1>Welcome</h1>
        </div>
        <div class="pl-10 pr-5 h-4/5 overflow-y-auto">
            <p class="my-3 text-white">Welcome to Chat Group, join the channel to chat with other people</p>
        </div>
    </div>
</template>
