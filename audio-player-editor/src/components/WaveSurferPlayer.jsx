import { useEffect, useRef, useState } from 'react'
import { PlayIcon, PauseIcon } from './Icons'
import WaveSurfer from 'wavesurfer.js'

export default function WaveSurferPlayer() {
  const waveformRef = useRef(null)
  const wavesurferRef = useRef(null)
  const equalizerRef = useRef(null)

  const [audioUrl, setAudioUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState(null)

  const createEqualizer = (audioContext) => {
    // Crear los filtros para cada banda de frecuencia
    const bassFilter = audioContext.createBiquadFilter();
    bassFilter.type = "lowshelf";
    bassFilter.frequency.value = 250;
  
    const midFilter = audioContext.createBiquadFilter();
    midFilter.type = "peaking";
    midFilter.frequency.value = 1000;
  
    const trebleFilter = audioContext.createBiquadFilter();
    trebleFilter.type = "highshelf";
    trebleFilter.frequency.value = 3000;
  
    // Conectar los filtros en serie y devolverlos como un arreglo
    bassFilter.connect(midFilter).connect(trebleFilter);
    return { bassFilter, midFilter, trebleFilter };
  };

  const initializeWaveSurfer = async () => {
    if (waveformRef.current && !wavesurferRef.current) {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const equalizer = createEqualizer(audioContext);
        equalizerRef.current = equalizer

        const wavesurfer = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: 'violet',
          progressColor: 'purple',
          cursorColor: 'navy',
          barWidth: 3,
          barRadius: 3,
          responsive: true,
          height: 150,
          autostart: false,
        })

        wavesurferRef.current = wavesurfer

        // Conecta WaveSurfer al primer filtro
        const mediaElementSource = audioContext.createMediaElementSource(wavesurfer.getMediaElement());
        mediaElementSource.connect(equalizer.bassFilter).connect(audioContext.destination);
        mediaElementSource.connect(equalizer.trebleFilter).connect(audioContext.destination);

        wavesurfer.on('play', () => setIsPlaying(true))
        wavesurfer.on('pause', () => setIsPlaying(false))
        wavesurfer.on('ready', () => setIsReady(true))
        wavesurfer.on('error', (err) => setError(`Error: ${err}`))

        await wavesurfer.load(audioUrl)
      } catch (err) {
        setError(`Failed to initialize WaveSurfer: ${err.message}`)
      }
    }
  }

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy()
      }
    }
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
      setError(null) // Reset error when a new file is selected
    }
  }

  const handleInitialize = async () => {
    if (audioUrl) {
      try {
        // Create AudioContext only after user interaction
        await initializeWaveSurfer()
      } catch (err) {
        setError(`Failed to initialize audio: ${err.message}`)
      }
    }
  }

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause()
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  const setBass = (value) => {
    if (equalizerRef.current?.bassFilter) {
      equalizerRef.current.bassFilter.gain.value = value;
    }
  };
  
  const setMid = (value) => {
    if (equalizerRef.current?.midFilter) {
      equalizerRef.current.midFilter.gain.value = value;
    }
  };
  
  const setTreble = (value) => {
    if (equalizerRef.current?.trebleFilter) {
      equalizerRef.current.trebleFilter.gain.value = value;
    }
  };
  

  return (
    <>
      <div className="w-full h-full mx-auto p-4">

        <div ref={waveformRef} className="w-full h-52 p-6 mb-4 bg-black border-2 border-white rounded-lg" />
        
        <section className='flex items-center justify-center gap-6'>
          <label className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-300 transition-colors">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
              Selecciona un archivo de audio
          </label>

          {!wavesurferRef.current ? (
            <button
              onClick={handleInitialize}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Comenzar reproducción
            </button>
          ) : (
            <button
              onClick={handlePlayPause}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              disabled={!isReady}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          )}
        </section>

        <section>
          <div className="flex gap-4">
            <div>
              <label className='text-white' >Bass</label>
              <input type="range" min="-30" max="30" defaultValue="0" onChange={(e) => setBass(e.target.value)} />
            </div>
            <div>
              <label className='text-white' >Mid</label>
              <input type="range" min="-30" max="30" defaultValue="0" onChange={(e) => setMid(e.target.value)} />
            </div>
            <div>
              <label className='text-white' >Treble</label>
              <input type="range" min="-30" max="30" defaultValue="0" onChange={(e) => setTreble(e.target.value)} />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}