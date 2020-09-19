import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as apiService from '@services/api.service'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    async function emitRoom() {
      try {
        const roomId: string = await apiService.getRoomId()
        router.replace(`/room/${roomId}`)      
      } catch (error) {
        console.error(error)
      }
    }

    emitRoom()
  }, [])

  return (
    <div />
  )
}
