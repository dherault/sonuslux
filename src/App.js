import './App.css'

import { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Player from './Player'
import CostSelector from './CostSelector'
import ReferentialSelector from './ReferentialSelector'

function App() {
  const [costNotes, setCostNotes] = useState([])
  const [referentialNotes, setReferentialNotes] = useState([])
  const [variables, setVariables] = useState([])
  const [currentVariableIndex, setCurrentVariableIndex] = useState(-1)

  function handleAddVariableClick() {
    setVariables(variables => [...variables, []])
    setCurrentVariableIndex(variables.length + 1)
  }

  return (
    <div className="y1 w100vw h100vh">
      <div className="x1 w100 flex-grow">
        <div className="p-2 h100 flex-grow">
          <Typography variant="h4">Sonus Lux</Typography>
          <div className="x4 mt-2">
            <CostSelector onChange={setCostNotes} />
            <div className="ml-2">
              <ReferentialSelector onChange={setReferentialNotes} />
            </div>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleAddVariableClick}
              className="ml-2"
            >
              Add variable
            </Button>
          </div>
          <div className="mt-2">
            <div className="mt-1">
              {variables.map(variable => (
                <div
                  key={variable.join('')}
                  className="App-variable"
                >
                  {variable[0] || null}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w33 h100 p-2 App-right">
          {currentVariableIndex === -1 ? (
            <div className="y5 w100 h100">
              <Typography variant="body2">
                Add or select a variable to display its content here.
              </Typography>
            </div>
          ) : (
            'foo'
          )}
        </div>
      </div>
      <div className="w100 p-2 App-bottom">
        <Player notes={[...costNotes, ...referentialNotes]} />
      </div>
    </div>
  )
}

export default App
