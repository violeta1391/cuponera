import { useEffect, useState } from 'react'
import './App.css'

const MAX_USOS = 7
const STORAGE_KEY = 'topaia-cuponera-usos'

function FallingItems() {
  const items = ['🍟', '🧀', '🍟', '🧀', '🍟']
  const drops = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    emoji: items[i % items.length],
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
    size: 1.5 + Math.random() * 1.5,
  }))

  return (
    <div className="falling-container" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="falling-item"
          style={{
            left: `${d.left}%`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            fontSize: `${d.size}rem`,
          }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('intro')
  const [usos, setUsos] = useState(MAX_USOS)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) setUsos(Number(saved))
  }, [])

  const canjear = () => {
    setUsos((prev) => {
      const next = Math.max(0, prev - 1)
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }

  return (
    <div className={`app-container screen-${screen}`}>
      {screen === 'intro' && (
        <div className="card">
          <h1>Hola Topaia</h1>
          <p className="pregunta">¿Querés ser mi mejor amiga por siempre?</p>
          <div className="botones">
            <button className="btn si" onClick={() => setScreen('yes')}>
              Si
            </button>
            <button className="btn no" onClick={() => setScreen('no')}>
              No
            </button>
          </div>
        </div>
      )}

      {screen === 'yes' && (
        <div className="card">
          <div className="sello">RESPUESTA INCORRECTA</div>
          <div className="raton-escena">
            <div className="raton">
              🐭
              <span className="lagrima l1">💧</span>
              <span className="lagrima l2">💧</span>
              <span className="lagrima l2">💧</span>
            </div>
          </div>
          <button className="btn volver" onClick={() => setScreen('intro')}>
            Volver a intentar
          </button>
        </div>
      )}

      {screen === 'no' && (
        <>
          <FallingItems />
          <div className="card premio">
            <h1 className="verde">Felicitaciones</h1>
            <p className="pregunta">
              Te ganaste una cuponera de papas al horno con queso 🎉
            </p>
            <div className="cuponera">
              <p className="cuponera-titulo">🍟 Cuponera de papas 🧀</p>
              <p className="cuponera-conteo">
                {usos} / {MAX_USOS} usos disponibles
              </p>
              <button className="btn canjear" onClick={canjear} disabled={usos === 0}>
                {usos === 0 ? 'Ya no quedan usos 😢' : 'Canjear una porción'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
