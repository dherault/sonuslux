import './Note.css'

function Note({ note }) {
  return (
    <div className="Note x5">
      {note.toUpperCase()}
    </div>
  )
}

export default Note
