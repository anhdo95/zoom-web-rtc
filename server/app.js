const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const { v4: uuidv4 } = require('uuid')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
  res.send(req.params.room)
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log('roomId :>> ', roomId);
    console.log('userId :>> ', userId);
  })
})

server.listen(process.env.PORT || 9000)