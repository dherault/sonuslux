import { memo, useEffect, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'

import allNotes from './notes'

import areNotesEqual from './utils/areNotesEqual'

function CarthesianPosition({ value, onChange }) {
  console.log('value', value)
  const {
    x: initialX,
    y: initialY,
    z: initialZ,
  } = deserialize(value)

  const [x, setX] = useState(initialX || 0)
  const [y, setY] = useState(initialY || 0)
  const [z, setZ] = useState(initialZ || 0)

  const setters = {
    setX,
    setY,
    setZ,
  }

  useEffect(() => {
    const notes = serialize({ x, y, z })

    if (areNotesEqual(notes, value)) return

    onChange(notes)
  // eslint-disable-next-line
  }, [x, y, z])

  function handlePositionChangeFactory(partialKey) {
    return event => {
      const { value } = event.target

      const n = parseInt(value)

      setters[`set${partialKey}`](n === n ? n : value)
    }
  }

  return (
    <div className="x4">
      <Typography>
        Carthesian position:
      </Typography>
      <TextField
        variant="outlined"
        label="x"
        size="small"
        value={x}
        onChange={handlePositionChangeFactory('X')}
        className="ml-1"
        style={{ width: 64 }}
      />
      <TextField
        variant="outlined"
        label="y"
        size="small"
        value={y}
        onChange={handlePositionChangeFactory('Y')}
        className="ml-1"
        style={{ width: 64 }}
      />
      <TextField
        variant="outlined"
        label="z"
        size="small"
        value={z}
        onChange={handlePositionChangeFactory('Z')}
        className="ml-1"
        style={{ width: 64 }}
      />
    </div>
  )
}

function deserialize(notes) {
  const workingArray = notes.slice()

  // console.log('workingArray', workingArray)
  if (workingArray.length >= 1) {
    workingArray.shift()
  }
  else {
    throw new Error('CarthesianPosition: no main note')
  }

  const position = {
    x: 0,
    y: 0,
    z: 0,
  }

  while (workingArray.length > 0) {
    const note = workingArray.shift()
    const key = Object.keys(allNotes.carthesianPositionNotes).find(key => allNotes.carthesianPositionNotes[key].includes(note))
    const delta = allNotes.carthesianPositionNotes[key][0] === note ? -1 : 1

    position[key] += delta
  }

  // console.log('position', position)

  return position
}

function serialize({ x, y, z }) {
  const notes = [allNotes.partTypeToPartInitiator['Carthesian position']]

  const _x = parseInt(x)
  const _y = parseInt(y)
  const _z = parseInt(z)

  // console.log('_x', _x)

  if (_x === _x) {
    const signOfX = Math.sign(_x)

    for (let xx = 0; xx < Math.abs(x); xx++) {
      notes.push(allNotes.carthesianPositionNotes.x[signOfX < 0 ? 0 : 1])
    }
  }

  if (_y === _y) {
    const signOfY = Math.sign(_y)

    for (let yy = 0; yy < Math.abs(y); yy++) {
      notes.push(allNotes.carthesianPositionNotes.y[signOfY < 0 ? 0 : 1])
    }
  }

  if (_z === _z) {
    const signOfZ = Math.sign(_z)

    for (let zz = 0; zz < Math.abs(z); zz++) {
      notes.push(allNotes.carthesianPositionNotes.z[signOfZ < 0 ? 0 : 1])
    }
  }

  return notes
}

export default memo(CarthesianPosition, (prev, next) => areNotesEqual(prev.value, next.value))
