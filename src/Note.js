import './Note.css'

function Note({ note }) {
  if (typeof note === 'string') {
    return (
      <div className="Note x5">
        {note.toUpperCase()}
      </div>
    )
  }

  return (
    <div className="Note y5">
      {note.map(n => (
        <div key={n}>
          {n.toUpperCase()}
        </div>
      ))}
    </div>
  )
}

export default Note
