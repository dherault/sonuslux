import './App.css'

import { useCallback, useState } from 'react'
import { useTheme } from '@material-ui/core'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Player from './Player'
import Playground from './Playground'
import Variable from './Variable'
import CostSelector from './CostSelector'
import ReferentialSelector from './ReferentialSelector'

function App() {
  const theme = useTheme()
  const [isPlayground, setIsPlayground] = useState(false)
  const [playgroundNotes, setPlaygroundNotes] = useState([])
  const [costNotes, setCostNotes] = useState([])
  const [referentialNotes, setReferentialNotes] = useState([])
  const [variables, setVariables] = useState([])
  const [currentVariableIndex, setCurrentVariableIndex] = useState(-1)

  const handleVariableChange = useCallback(nextValue => {
    const nextVariables = variables.slice()

    if (nextValue) {
      nextVariables.splice(currentVariableIndex, 1, nextValue)
    }
    else {
      nextVariables.splice(currentVariableIndex, 1)
      setCurrentVariableIndex(-1)
    }

    setVariables(nextVariables)
  }, [variables, currentVariableIndex])

  function handleAddVariableClick() {
    setVariables(variables => [...variables, []])
    setCurrentVariableIndex(variables.length)
  }

  console.log('First variable', variables[0])
  // console.log('currentVariableIndex', currentVariableIndex)

  function renderTitle() {
    return (
      <Typography variant="h4">
        Sonus Lux
      </Typography>
    )
  }

  function renderPlaygroundToggleButton() {
    return (
      <Button
        color="primary"
        variant="contained"
        onClick={() => setIsPlayground(x => !x)}
        className="mt-1"
      >
        Playground
      </Button>
    )
  }

  if (isPlayground) {
    return (
      <div className="y1 w100vw h100vh">
        <div className="p-2">
          {renderTitle()}
          {renderPlaygroundToggleButton()}
          <div className="mt-2">
            <Playground
              value={playgroundNotes}
              onChange={setPlaygroundNotes}
            />
          </div>
        </div>
        <div className="flex-grow" />
        <div className="w100 p-2 App-bottom">
          <Player notes={playgroundNotes} />
        </div>
      </div>
    )
  }

  return (
    <div className="y1 w100vw h100vh">
      <div className="x1 w100 flex-grow">
        <div className="p-2 h100 flex-grow">
          {renderTitle()}
          {renderPlaygroundToggleButton()}
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
          <div className="x11 mt-3">
            {variables.map((variable, index) => (
              <div
                key={variable.join('')}
                className="x5 p-1 ml-1 no-select cursor-pointer App-variable"
                style={{
                  borderColor: theme.palette.primary.main,
                }}
                onClick={() => setCurrentVariableIndex(index)}
              >
                <Typography color="primary">
                  {variable[0] || null}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="w50 h100 p-2 App-right">
          {currentVariableIndex === -1 ? (
            <div className="y5 w100 h100">
              <Typography variant="body2">
                Add or select a variable to display its content here.
              </Typography>
            </div>
          ) : (
            <Variable
              key={variables[currentVariableIndex].join('')}
              value={variables[currentVariableIndex]}
              onChange={handleVariableChange}
              onDelete={handleVariableChange}
            />
          )}
        </div>
      </div>
      <div className="w100 p-2 App-bottom">
        <Player notes={[...costNotes, ...referentialNotes, ...variables.flat()]} />
      </div>
    </div>
  )
}

export default App
