<template>
    <div v-if="user">
        <!-- Loadeer -->

        <TopMenu/>
       <div class="w-full md:w-3/5 mx-auto">
            <router-link to="/profile" class="text-blue-500 flex flex-row ml-5 md:ml-0">
                <span class="material-icons">navigate_before</span>
                <p>Back</p>
            </router-link>

            <div class="w-full rounded-lg md:border border-gray-300 p-10 mt-5 bg-white">
                <div class="w-full md:w-1/2">
                    <h1 class="text-lg font-semibold">Change Info</h1>
                    <p class="text-gray-500 text-sm">Changes will be reflected to every services</p>
                    <div class="mt-5 w-1/2">
                        <label class="flex flex-row items-center cursor-pointer">
                            <img :src="setImage(user.avatar)" alt="" class="w-16 h-16" ref="imgPrev">
                            <span class="ml-2 text-sm leading-normal">CHANGE PHOTO</span>
                            <input type='file' class="hidden" ref="file" @change="onChange" />
                        </label>
                    </div>
                    <div class="mt-10">
                        <form @submit.prevent="submitForm">
                            <div class="text-sm mb-5">
                                <p class="font-semibold">Name</p>
                                <input type="text" class="border border-gray-400 w-full p-3 rounded-lg" placeholder="Enter your name.."  v-model="name">
                            </div>
                            <div class="text-sm mb-5">
                                <p class="font-semibold">Bio</p>
                                <textarea class="resize-none border border-gray-400 w-full p-3 rounded-lg" cols="30" rows="5" placeholder="Enter your bio.." v-model="bio"></textarea>
                            </div>
                            <div class="text-sm mb-5">
                                <p class="font-semibold">Phone</p>
                                <input type="text" class="border border-gray-400 w-full p-3 rounded-lg" placeholder="Enter your phone.." v-model="phone">
                            </div>
                            <div class="text-sm mb-5">
                                <p class="font-semibold">Email</p>
                                <input type="email" class="border border-gray-400 w-full p-3 rounded-lg focus:border-0" v-model="email" readonly>
                            
                            </div>
                            <div class="text-sm mb-5" v-if="!useProvider">
                                <p class="font-semibold">Password</p>
                                <input type="password" class="border border-gray-400 w-full p-3 rounded-lg" placeholder="Enter your new password.." v-model="password">
                            </div>
                            <div class="text-sm mb-5">
                                <button type="submit" class="px-5 py-2 bg-blue-500 text-white rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
       </div>
    </div>
</template>
<script>
import TopMenu from '../components/TopMenu.vue'
import Footer from '../components/Footer.vue'

export default {
    components: {
        TopMenu,
        Footer,
    },
    data() {
        return {
            visible : true,
            name : "",
            bio : "",
            phone : "",
            password : "",
            email : "",
            id : null,
            image : null,
        }
    },
    mounted() {
        this.$store.dispatch('getUserData')
    },
    watch: {
        user() {
            this.id = this.user.id
            this.email = this.user.email

            this.name = (this.user.name === null ? "" : this.user.name)
            this.bio = (this.user.bio === null ? "" : this.user.bio)
            this.phone = (this.user.phone === null ? "" : this.user.phone)
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        useProvider() {
            return this.$store.state.useProvider
        }
    },
    methods : {
        submitForm() {
            const form = new FormData
            form.append("_method", "PUT")
            
            if(this.image !== null) {
                form.append('avatar', this.image)
            }
            

            form.append('name', this.name)
            form.append('bio', this.bio)
            form.append('phone', this.phone)
            form.append('password', this.password)

            this.$store.dispatch('updateUser', form)
        },
        onChange() {
            this.image = this.$refs.file.files[0]
            this.$refs.imgPrev.src = URL.createObjectURL(this.image)
        },
        setImage(url) {
            if(url === null) {
                return require('../assets/no-profile.jpg')
            }
            return url
        }
    }
}
</script>