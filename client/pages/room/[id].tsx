import React, { useState, useCallback, useEffect } from 'react'
import Player from '@components/Player'
import socket from '@/socket'

export default function SingleRoom(props: Props) {
  const isBrowser = typeof window !== 'undefined'
  const [streams, setStreams] = useState([])

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
        addVideoStream()
      })
    }

    joinRoom()
  }, [isBrowser])

  const addVideoStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })

    setStreams(preStreams => preStreams.concat(stream))
  }, [])

  return (
    <section>
      {streams.map(stream => <Player url={stream} />)}
    </section>
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