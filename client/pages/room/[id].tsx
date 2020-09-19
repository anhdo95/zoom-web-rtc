import React, { useEffect } from 'react'
import socket from '@/socket'

export default function SingleRoom(props: Props) {
  useEffect(() => {
    async function joinRoom() {
      const userId: number = 1000

      socket.emit('join-room', { roomId: props.roomId, userId })

      socket.on('user-connected', (userId: number) => {
        console.log('userId :>> ', userId)
      })
    }

    joinRoom()
  }, [])

  return (
    <div></div>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      roomId: params.id
    }
  }
}

interface Props {
  roomId: string
}