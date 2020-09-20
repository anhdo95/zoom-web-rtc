import React, { useReducer } from 'react'
import ReactPlayer from 'react-player'

const initialState = {
  pip: false,
  playing: true,
  controls: false,
  light: false,
  volume: 0.8,
  muted: true,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'PLAYING':
      state.playing = action.payload
      // state.muted = !action.payload
    default:
      break;
  }

  return { ...state }
}

export default function Player(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handlePlay = () => {
    dispatch({ type: 'PLAYING', payload: true })
  }

  const handlePause = () => {
    dispatch({ type: 'PLAYING', payload: false })
  }

  const handleEnded = () => {
    dispatch({ type: 'PLAYING', payload: state.loop })
  }

  return (
    <ReactPlayer
      className="player"
      url={props.url}
      pip={state.pip}
      playing={state.playing}
      controls={state.controls}
      light={state.light}
      loop={state.loop}
      playbackRate={state.playbackRate}
      volume={state.volume}
      muted={state.muted}
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
    />
  );
}

interface Props {
  url: string | MediaStream
}