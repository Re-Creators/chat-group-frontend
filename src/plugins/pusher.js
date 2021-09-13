import Pusher from 'pusher-js'
import axios from 'axios'

Pusher.logToConsole = true

const pusher = new Pusher('cc08146127e6a02c13a3', {
    cluster: 'mt1',
    forceTLS : true,
    authorizer: (channel) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                .then(response => {
                    callback(false, response.data);
                })
                .catch(error => {
                    callback(true, error);
                })
            }
        }
    }
})



export default pusher