import React, { useState, useEffect } from 'react'
import socket from '@/socket'

export default function SingleRoom(props: Props) {
  const isBrowser = typeof window !== 'undefined'

  useEffect(() => {
    socket.on('user-connected', (userId: number) => {
      console.log('userId :>> ', userId)
    })

    return () => socket.off('user-connected')
  }, [])

  useEffect(() => {
    async function joinRoom() {
      const Peer = (await import('peerjs')).default
      const myPeer = new Peer(undefined, {
        host: 'localhost',
        port: 9000,
        path: '/peerjs/app'
      })

      myPeer.on('open', (id) => {
        socket.emit('join-room', { roomId: props.roomId, userId: id })
      })
    }

    joinRoom()
  }, [isBrowser])

  

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