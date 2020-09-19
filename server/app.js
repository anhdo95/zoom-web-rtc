const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const cors = require('cors')
const { ExpressPeerServer } = require('peer')
const { v4: uuidv4 } = require('uuid')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
)

app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
  res.send(req.params.room)
})

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/app'
})

app.use('/peerjs', peerServer);

io.on('connection', socket => {
  socket.on('join-room', ({ roomId, userId }) => {
    console.log('userId :>> ', userId);
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
  })
})

server.listen(process.env.PORT || 9000)

