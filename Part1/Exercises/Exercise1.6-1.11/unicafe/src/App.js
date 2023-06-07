import { useState } from 'react'

const Statistics = ({feedbacks}) => {
  const {good, neutral, bad} = feedbacks
  const total = good + neutral + bad

  if(total == 0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={total}/>
      <StatisticLine text="good" value={(good - bad)/ (total)}/>
      <StatisticLine text="good" value={(((good)/(total)) * 100) + ' %'}/>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick} >{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='Good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text='Neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text='Bad'/>
      <Statistics feedbacks={{good: good, neutral: neutral, bad: bad}}/>
    </div>
  )
}

export default App