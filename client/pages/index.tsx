import React, { useEffect, useCallback } from 'react'
import io from 'socket.io-client'
import * as apiService from '@services/api.service'

export default function index() {
  useEffect(() => {
    async function emitRoom() {
      const socket: SocketIOClient.Socket = io('localhost:9000')

      const roomId: string = await getRoomId()
      const userId: number = 1000

      socket.emit('join-room', { roomId, userId })
    }

    emitRoom()
  }, [])

  const getRoomId = useCallback(apiService.getRoomId, [])

  return (
    <div>
      Hello world!
    </div>
  )
}
