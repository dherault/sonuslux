import './App.css'

import { memo, useState } from 'react'
import * as Tone from 'tone'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import NoteGroup from './NoteGroup'
import Note from './Note'

import areNotesEqual from './utils/areNotesEqual'

const baseTempo = 851 / 8

function Player({ notes }) {

  const [sampler, setSampler] = useState(null)
  const [ready, setReady] = useState(false)

  async function handleStartClick() {
    setReady(false)

    setSampler(
      new Tone.Sampler({
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
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
          // F3: 'F3.mp3',
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
        release: 0.5, // duration of notes
        onload: () => setReady(true),
      }).toDestination()
    )
  }

  function handlePlayClick() {
    const now = Tone.now()

    notes.forEach((note, i) => {
      sampler.triggerAttackRelease(note, '8n', now + i * 0.5)
    })
  }

  return (
    <div className="x4">
      <div>
        <div>
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
        <Typography
          variant="body2"
          className="mt-2 w100 text-align-center"
        >
          {sampler ? ready ? 'ready' : 'loading' : 'press start'}
        </Typography>
      </div>
      <div className="x4 ml-4">
        <NoteGroup>
          {notes.map((note, i) => (
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

export default memo(Player, (prev, next) => areNotesEqual(prev.value, next.value))
