import { useEffect, useState } from 'react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const mainNotes = ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4']

function Variable({ value, onChange }) {
  const [mainNote, setMainNote] = useState(value[0] || mainNotes[0])

  useEffect(() => {
    onChange([mainNote, mainNote])
  // eslint-disable-next-line
  }, [mainNote])

  return (
    <div className="y1 h100">
      <Typography variant="h6">
        Variable
      </Typography>
      <div className="x4 mt-1">
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
      </div>
      <div className="flex-grow" />
      <div className="x6 w100">
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => onChange(null)}
        >
          Delete variable
        </Button>
      </div>
    </div>
  )
}

export default Variable
