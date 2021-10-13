import './NoteGroup.css'

import { useTheme } from '@mui/material'

function NoteGroup({ children }) {
  const theme = useTheme()

  return (
    <div
      className="NoteGroup x4"
      style={{ borderColor: theme.palette.primary.main }}
    >
      {children}
    </div>
  )
}

export default NoteGroup
