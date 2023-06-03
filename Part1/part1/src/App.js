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

const App = () => {

  const name = 'Yogesh'
  const age = 25
  const [counter, setCounter] = useState(0)
  
  const increaseByOne = () => {
    setCounter(counter + 1)
  }
  const decreaseByOne = () => setCounter(counter - 1)
  const resetCounter = () => setCounter(0)

  console.log(counter)
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age} />
      <Display counter={counter}/>
      <Button handleClick={increaseByOne} text="Increment"/>
      <Button handleClick={decreaseByOne} text="Decrement"/>
      <Button handleClick={resetCounter} text="Reset"/>
    </div>
  )
}

export default App