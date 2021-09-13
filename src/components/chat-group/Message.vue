<template>
    <div class="flex flex-col-reverse">
        <div class="flex flex-row mb-5" v-for="(message, index) in messages" :key="index" >
            <img :src="setImage(message.user.avatar)" alt="" class="w-10 h-10">
            <div class="ml-3">
                <div class="flex flex-row text-primary items-center">
                    <div>{{ message.user.name }}</div>
                    <span class="ml-3 float-right text-xs">{{ formatDate(message.created_at) }}</span>
                </div>
                <div class="text-white">{{ message.message }}</div>
            </div>
        </div>
    </div>
</template>
<script>
// import { ref } from 'vue'

export default {
    props: ['messages'],
    setup() {

        function formatDate(stringDate) {
            const dateObj = new Date(stringDate)
            const year = dateObj.getFullYear()
            const month = dateObj.getMonth()
            const date = dateObj.getDate()
            const dateNow = new Date()
            const hour = dateObj.getHours()
            const minute = dateObj.getMinutes()

            if(date === dateNow.getDate() && month === dateNow.getMonth() && year === dateNow.getFullYear()){
                return "Today at " + hour + ":" + minute
            }else if((dateNow.getDate() - 1) === date && month === dateNow.getMonth() && year === dateNow.getFullYear()) {
                return "Yesterday at " + hour + ":" + minute
            }else{
                return getMonthName(month) + " " + date + ", " + year + " " + hour + ":" + minute 
            }

        }

        function getMonthName(month){
            let  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return months[month]
        }

        function setImage(url) {
            if(url === null) {
                return require('@/assets/no-profile.jpg')
            }
            return url
        }

        return {
            formatDate,
            setImage
        }
    }
}
</script>
