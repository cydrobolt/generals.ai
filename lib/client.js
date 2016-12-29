import io from 'socket.io-client'

class Client {
    constructor(
        baseUrl = "http://ws.generals.io",
        userId = "bonzaistick",
        username = "bonzaistick"
    ) {
        this.baseUrl = baseUrl
        this.userId = userId
        this.username = username
        this.attackIndex = 1
    }

    start(event, connect, disconnect) {
        this.socket = io(this.baseUrl, {
            transports: ["websocket"]
        })

        this.socket.on('connect_error', (err) => {
            console.log('an error occured while connecting')
            console.error(err)
        })

        this.socket.on('connect', () => {
            console.log('connected to ' + this.baseUrl)
            this.socket.emit('stars_and_rank', this.userId)
            this.socket.emit('play', this.username, this.userId)
            this.socket.emit('set_username', this.userId, this.username)
        })

        this.socket.on('event', (data) => {
            console.log('received event!')
            console.log(data)
        })

        this.socket.on('disconnect', () => {
            console.log('disconnected!')
        })

        // ==> generals.io Events
        this.socket.on('pre_game_start', (data) => {
            console.log('prestart')
            console.log(data)
        })
        this.socket.on('game_start', (data) => {
            console.log('starting game with users:')
            console.log(data.usernames)
            console.log('replay id: ' + data.replay_id)
        })
        this.socket.on('game_update', (data) => {
            console.log('game update')
            console.log(data)
        })

        // => attack
        this.attack = (x, y) => {
            this.socket.emit('attack', x, y, false, attackIndex)
            this.socket.attackIndex += 1
        })
    }
}

export default Client
