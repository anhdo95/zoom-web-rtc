import React, { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router';
import Peer from 'peerjs'

import Player from 'components/Player/Player'
import socket from 'socket'

const peers: any = {}

export default function Room() {
  const params = useParams<Params>()
  const [streams, setStreams] = useState<Stream[]>([])

  const myPeer = useMemo(
    () => new Peer(undefined, {
      host: 'localhost',
      port: 9000,
      path: '/peerjs/app'
    }), []
  )

  function createVideo() {
    const myVideo = document.createElement('video')
    myVideo.muted = true

    return myVideo
  }

  useEffect(() => {
    myPeer.on('open', id => {
      socket.emit('join-room', { roomId: params.id, userId: id })
    })

    socket.on('user-disconnected', (userId: string) => {
      if (peers[userId]) peers[userId].close()
    })

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      addVideoStream(createVideo(), stream)

      myPeer.on('call', call => {
        call.answer(stream)

        const video = createVideo()
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
      })

      socket.on('user-connected', (userId: string) => {
        connectToNewUser(userId, stream)
      })
    })
  }, [])

  function connectToNewUser(userId: string, stream: MediaStream) {
    const call = myPeer.call(userId, stream)
    const video = createVideo()
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })
  
    peers[userId] = call
  }
  

  function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })

    const videos = document.getElementById('videos')
    videos?.append(video)
  }

  return (
    <section id="videos">
      {/* {streams.map(stream => <Player key={stream.userId} url={stream.source} />)} */}
    </section>
  )
}

interface Stream {
  userId: string,
  source: MediaStream,
  call: Peer.MediaConnection,
}

interface Params {
  id: string
}