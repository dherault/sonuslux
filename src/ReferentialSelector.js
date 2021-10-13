import { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const options = {
  1: ['C3', 'F3'],
}

function ReferentialSelector({ onChange }) {
  const [value, setValue] = useState(Object.keys(options)[0])

  useEffect(() => {
    onChange([options[value]])
  }, [onChange, value])

  return (
    <div className="x4">
      <Typography>
        Referential:
      </Typography>
      <Select
        variant="outlined"
        color="primary"
        value={value}
        onChange={event => setValue(event.target.value)}
        className="ml-1"
        style={{ height: 40 }}
      >
        {Object.keys(options).map(option => (
          <MenuItem
            key={option}
            value={option}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default ReferentialSelector
