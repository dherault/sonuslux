import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

function Playground({ value, onChange }) {
  return (
    <div className="x4">
      <Typography>
        Playground:
      </Typography>
      <TextField
        variant="outlined"
        value={value.join(' ')}
        onChange={event => onChange(event.currentTarget.value.split(' '))}
        className="ml-1"
        size="small"
      />
    </div>
  )
}

export default Playground
