import { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import CarthesianPosition from './CarthesianPosition'

const mainNotes = ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4']
const partTypeToPartInitiator = {
  'Carthesian position': ['C3', 'E3', 'G3'],
}
const partTypes = Object.keys(partTypeToPartInitiator)

function Variable({ value, onChange }) {
  // console.log('value', value)
  const {
    mainNote: initialMainNote,
    parts: initialParts,
  } = deserialize(value)

  // console.log('initialParts', initialParts)

  const [mainNote, setMainNote] = useState(initialMainNote || mainNotes[0])
  const [partType, setPartType] = useState(partTypes[0])
  const [parts, setParts] = useState(initialParts || [])

  // console.log('parts', parts)

  useEffect(() => {
    onChange(serialize({
      mainNote,
      parts,
    }))
  // eslint-disable-next-line
  }, [mainNote, parts])

  function handleAddPartClick() {
    setParts(parts => [...parts, [partTypeToPartInitiator[partType]]])
  }

  function renderMainNote() {
    return (
      <>
        <Typography>
          Main note:
        </Typography>
        <Select
          variant="outlined"
          value={mainNote}
          onChange={event => setMainNote(event.target.value)}
          style={{ height: 40 }}
          className="ml-1"
        >
          {mainNotes.map(note => (
            <MenuItem
              key={note}
              value={note}
            >
              {note}
            </MenuItem>
          ))}
        </Select>
      </>
    )
  }

  function renderPartSelector() {
    return (
      <>
        <Typography className="ml-2">
          Add part:
        </Typography>
        <Select
          variant="outlined"
          value={partType}
          onChange={event => setPartType(event.target.value)}
          style={{ height: 40 }}
          className="ml-1"
        >
          {partTypes.map(partType => (
            <MenuItem
              key={partType}
              value={partType}
            >
              {partType}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddPartClick}
          style={{ height: 40 }}
          className="ml-1"
        >
          Add
        </Button>
      </>
    )
  }

  function renderParts() {
    return parts.map((part, index) => {
      const partType = findPartType(part[0])

      switch (partType) {
        case 'Carthesian position': {
          return renderPart(CarthesianPosition, part, index)
        }

        default: {
          throw new Error('renderParts: partType unknown')
        }
      }
    })
  }

  function renderPart(Component, part, index) {
    return (
      <div className="mb-2">
        <Component
          value={part}
          onChange={nextPart => {
            const nextParts = parts.slice()

            nextParts.splice(index, 1, nextPart)

            setParts(nextParts)
          }}
        />
        <div className="mt-1">
          <Button
            color="secondary"
            variant="outlined"
            size="small"
            onClick={() => {
              const nextParts = parts.slice()

              nextParts.splice(index, 1)

              setParts(nextParts)
            }}
          >
            Delete part
          </Button>
        </div>
      </div>
    )
  }

  function renderFooter() {
    return (
      <div className="x6 w100">
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => onChange(null)}
        >
          Delete variable
        </Button>
      </div>
    )
  }

  return (
    <div className="y1 h100">
      <Typography variant="h6">
        Variable
      </Typography>
      <div className="x4 mt-1">
        {renderMainNote()}
        {renderPartSelector()}
      </div>
      <div className="mt-2">
        {renderParts()}
      </div>
      <div className="flex-grow" />
      {renderFooter()}
    </div>
  )
}

function findPartType(initiator) {
  const initiatorString = initiator.join('')

  return partTypes.find(partType => partTypeToPartInitiator[partType].join('') === initiatorString)
}

function deserialize(notes) {
  const workingArray = notes.slice()

  let mainNote = null

  if (workingArray.length >= 2) {
    mainNote = workingArray.shift()

    const alsoMainNote = workingArray.pop()

    if (mainNote !== alsoMainNote) {
      throw new Error('mainNote !== alsoMainNote')
    }
  }

  const parts = []

  while (workingArray.length > 0) {
    const initiator = workingArray.shift()

    if (!Array.isArray(initiator)) {
      throw new Error('!Array.isArray(initiator)')
    }

    const partType = findPartType(initiator)
    // console.log('initiator', initiator)
    // console.log('partType', partType)

    switch (partType) {
      case 'Carthesian position': {
        parts.push([initiator, ...extractCarthesianPosition(workingArray)])
        break
      }

      default: {
        throw new Error('partType unknown')
      }
    }
  }

  return {
    mainNote,
    parts,
  }
}

function extractCarthesianPosition(notes) {
  return []
}

function serialize({ mainNote, parts }) {
  // console.log('serialize parts', parts)

  const variable = [mainNote]

  if (parts.length) variable.push(parts.flat(2))

  variable.push(mainNote)

  return variable
}

export default Variable
