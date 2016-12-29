import io from 'socket.io-client'
import { randomBytes } from 'crypto'
import { Common } from './common'

class Map {
    constructor () {
        this.TILE_EMPTY = -1;
        this.TILE_MOUNTAIN = -2;
        this.TILE_FOG = -3;
        this.TILE_FOG_OBSTACLE = -4

        this._map = [];
        this._armies = [];
        this.width = null;
        this.height = null;
    }
}

let m = new Map
let c = new Common

class Client {
    constructor(
        baseUrl = "http://ws.generals.io",
        userId = null,
        username = "bonzaistick"
    ) {
        this.baseUrl = baseUrl
        this.userId = randomBytes(5).toString('hex');
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
            console.log(m.TILE_EMPTY);

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
            // parse map
            m.width = data[0]
            m.height = data[1]
            m._armies = data.splice(2, m.width * m.height)
            m._map = data.splice(2, m.width * m.height)

            console.log('armies!')
            console.log(m._armies)
            console.log('map!')
            console.log(m._map)

            console.log('game update')
            console.log(data)
        })

        // => attack
        this.attack = (x, y) => {
            this.socket.emit('attack', x, y, false, attackIndex)
            this.socket.attackIndex += 1
        }
    }
}

export default Client
