import { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

const bitToNote = ['E2', 'A2']
const nBits = 8

function CostSelector({ onChange }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let x = parseInt(value, 10)

    if (x !== x) x = 0

    x = Math.max(Math.min(x, 2 ** nBits - 1), 0)

    const notes = x.toString(2).split('').map(bit => bitToNote[parseInt(bit)])

    for (let i = notes.length; i < nBits; i++) {
      notes.unshift(bitToNote[0])
    }

    onChange(notes)
  }, [onChange, value])

  return (
    <div className="x4">
      <Typography>Cost:</Typography>
      <TextField
        variant="outlined"
        type="number"
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
        className="ml-1"
        size="small"
      />
    </div>
  )
}

export default CostSelector
