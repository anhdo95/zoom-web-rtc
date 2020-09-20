import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

import * as apiService from 'services/api.service'

export default function Home() {
  const history = useHistory()

  useEffect(() => {
    async function emitRoom() {
      try {
        const roomId: string = await apiService.getRoomId()
        history.replace(`/room/${roomId}`)      
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
