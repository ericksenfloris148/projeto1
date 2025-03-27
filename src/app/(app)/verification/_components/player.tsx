'use client'

import { useEffect } from 'react'

const Player = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src =
      'https://scripts.converteai.net/20448767-cfea-41f4-baa4-9dc0974d8a85/players/67e561a62d07477843fbcb30/player.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div
      id="vid_67e561a62d07477843fbcb30"
      style={{
        position: 'relative',
        width: '100%',
        padding: '56.25% 0 0',
      }}
    >
      <img
        id="thumb_67e561a62d07477843fbcb30"
        src="https://images.converteai.net/20448767-cfea-41f4-baa4-9dc0974d8a85/players/67e561a62d07477843fbcb30/thumbnail.jpg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        alt="thumbnail"
      />
      <div
        id="backdrop_67e561a62d07477843fbcb30"
        style={{
          WebkitBackdropFilter: 'blur(5px)',
          backdropFilter: 'blur(5px)',
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  )
}

export default Player
