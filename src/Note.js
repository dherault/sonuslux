import './Note.css'

import { Typography, useTheme } from '@material-ui/core'

function Note({ note }) {
  const theme = useTheme()

  if (typeof note === 'string') {
    return (
      <div
        className="Note x5"
        style={{ borderColor: theme.palette.primary.main }}
      >
        <Typography color="primary">
          {note.toUpperCase()}
        </Typography>
      </div>
    )
  }

  return (
    <div
      className="Note y5"
      style={{ borderColor: theme.palette.primary.main }}
    >
      {note.map(n => (
        <div key={n}>
          <Typography color="primary">
            {n.toUpperCase()}
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default Note
