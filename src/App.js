import './App.css'
import scribble from 'scribbletune/browser'

let clip
function App() {

  function handleStartClick() {
    window.Tone.context.resume().then(() => {
      window.Tone.Transport.start()
      clip = scribble.clip({
        instrument: 'PolySynth',
        notes: ['c3', 'c4', 'a4'],
        pattern: `xxx${'-'.repeat(999)}`,
      })
    })
  }

  function handlePlayClick() {
    clip.start()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sonus Lux</h1>
      </header>
      <button
        type="button"
        className="mt-2"
        onClick={handleStartClick}
      >
        Start
      </button>
      <button
        type="button"
        className="mt-2"
        onClick={handlePlayClick}
      >
        Play
      </button>
    </div>
  )
}

export default App
