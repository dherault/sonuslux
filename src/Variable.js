import { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const mainNotes = ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4']

function Variable({ value, onChange }) {
  const [mainNote, setMainNote] = useState(mainNotes[0])

  return (
    <div className="y1">
      <div className="x4">
        <Typography>
          Main note:
        </Typography>
        <Select
          variant="outlined"
          value={mainNote}
          onChange={event => setMainNote(event.target.value)}
          style={{ height: 40 }}
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
    </div>
  )
}

export default Variable
