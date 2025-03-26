'use client'

import { useState, useRef } from 'react'

const Player = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [firstUnmuteClick, setFirstUnmuteClick] = useState(true)
  const [videoEnded, setVideoEnded] = useState(false) // Estado para controlar o fim do vídeo

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false
        if (firstUnmuteClick) {
          videoRef.current.currentTime = 0
          setFirstUnmuteClick(false)
        }
      } else {
        videoRef.current.muted = true
      }
      setIsMuted(!isMuted)
    }
  }

  const handleVideoEnd = () => {
    setVideoEnded(true) // Quando o vídeo termina, atualiza o estado
  }

  return (
    <div
      className="video-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw', // Garante que o vídeo não ultrapasse a largura da tela
        aspectRatio: '16 / 9', // Mantém o formato 16:9
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: '15px',
      }}
    >
      <video
        ref={videoRef}
        className="video"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain', // Mantém o vídeo inteiro sem cortes
          borderRadius: '15px',
        }}
      >
        <source src="https://finalizepagamento.lat/video/media/pg.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>

      {/* Botão de mute/unmute (só aparece se o vídeo não terminou) */}
      {!videoEnded && (
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            padding: '15px',
            fontSize: '24px',
            borderRadius: '50%',
            cursor: 'pointer',
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          }}
        >
          {isMuted ? '🔊' : '🔇'}
          <p style={{ fontSize: '10px', margin: 0 }}>
            {isMuted ? 'Clique para Ouvir' : 'Clique para Mutar'}
          </p>
        </button>
      )}
    </div>
  )
}

export default Player
