import { useState } from "react"

const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Display = (props) => {
  return (
    <div>Counter: {props.counter}</div>
  )
}

const Button = (props) =>{
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const History = ({allClicks}) =>{
  if(allClicks.length === 0){
    return (
      <div>
        the app is used by pressing buttons.
      </div>
    )
  }
  return (
    <div>
      Button press history: {allClicks.join(' ')}
    </div>
  )
}

const App = () => {

  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [allClicks, setAllClicks] = useState([])

  const setLeft = () => {
    setAllClicks(allClicks.concat('L'))
    setClicks({
      left: clicks.left + 1, right: clicks.right
    })
  }
  const setRight = () => {
    setAllClicks(allClicks.concat('R'))
    setClicks({
      left: clicks.left, right: clicks.right + 1
    })
  }

  return (
    <div>
      {clicks.left}
      <Button handleClick={setLeft} text='Left'/>
      <Button handleClick={setRight} text='Right'/>
      {clicks.right}
      <History allClicks={allClicks}/>
    </div>
  )
}

export default App