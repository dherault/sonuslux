import './App.css'

import { useState } from 'react'
import * as Tone from 'tone'

import Button from '@material-ui/core/Button'

import NoteGroup from './NoteGroup'
import Note from './Note'
import CostSelector from './CostSelector'

Tone.Transport.bpm.value = 851 / 4

function App() {
  const [sampler, setSampler] = useState(null)
  const [ready, setReady] = useState(false)
  const [costNotes, setCostNotes] = useState([])

  function handleStartClick() {
    // PIANO SAMPLER
    const sampler = new Tone.Sampler({
      urls: {
        A0: 'A0.mp3',
        C1: 'C1.mp3',
        'D#1': 'Ds1.mp3',
        'F#1': 'Fs1.mp3',
        A1: 'A1.mp3',
        C2: 'C2.mp3',
        'D#2': 'Ds2.mp3',
        'F#2': 'Fs2.mp3',
        A2: 'A2.mp3',
        C3: 'C3.mp3',
        'D#3': 'Ds3.mp3',
        'F#3': 'Fs3.mp3',
        A3: 'A3.mp3',
        C4: 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
        A4: 'A4.mp3',
        C5: 'C5.mp3',
        'D#5': 'Ds5.mp3',
        'F#5': 'Fs5.mp3',
        A5: 'A5.mp3',
        C6: 'C6.mp3',
        'D#6': 'Ds6.mp3',
        'F#6': 'Fs6.mp3',
        A6: 'A6.mp3',
        C7: 'C7.mp3',
        'D#7': 'Ds7.mp3',
        'F#7': 'Fs7.mp3',
        A7: 'A7.mp3',
        C8: 'C8.mp3',
      },
  // Cela règle la durée de permanence des notes jouées
      release: 10,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
      onload: () => setReady(true),
    }).toDestination()

    setSampler(sampler)
  }

  function handlePlayClick() {
    playNotes([...costNotes])
    // sampler.triggerAttackRelease('C2', '8n', now)
    // sampler.triggerAttackRelease('C3', '8n', now + 0.5)
    // sampler.triggerAttackRelease('A4', '8n', now + 1)
  }

  function playNotes(notes) {
    const now = Tone.now()

    notes.forEach((note, i) => {
      sampler.triggerAttackRelease(note, '8n', now + i * 0.5)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sonus Lux</h1>
        <sub>{sampler ? ready ? 'ready' : 'loading' : 'press start'}</sub>
      </header>
      <div className="mt-2">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleStartClick}
        >
          Start
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="ml-1"
          onClick={handlePlayClick}
        >
          Play
        </Button>
      </div>
      <div className="mt-4">
        <CostSelector onChange={setCostNotes} />
      </div>
      <div className="mt-4 x4">
        <NoteGroup>
          {costNotes.map((note, i) => (
            <Note
              key={note + i}
              note={note}
            />
          ))}
        </NoteGroup>
      </div>
    </div>
  )
}

export default App
