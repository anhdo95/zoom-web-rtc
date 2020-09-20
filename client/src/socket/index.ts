import io from 'socket.io-client'

const socket: SocketIOClient.Socket = io('localhost:9000')

export default socket