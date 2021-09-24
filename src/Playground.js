import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

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
