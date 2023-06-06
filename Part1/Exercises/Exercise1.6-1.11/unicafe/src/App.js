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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good - bad)/ (total)}</p>
      <p>positive {((good)/(total)) * 100} %</p>
    </div>
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
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics feedbacks={{good: good, neutral: neutral, bad: bad}}/>
    </div>
  )
}

export default App