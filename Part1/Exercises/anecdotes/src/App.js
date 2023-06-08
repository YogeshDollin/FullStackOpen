import { useState } from 'react'

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const setVote = (points, index) => {
    const copy = [...points]
    copy[index] += 1
    return  copy
}

const Button = ({handlClick, text}) => {
  return(
    <button onClick={handlClick}>{text}</button>
  )
}

const AnecdoteWithVotes = ({anecdote, vote}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {vote} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const maxVotes = Math.max(...points)
  const maxVotesIndex = points.findIndex((vote) => vote == maxVotes)
  console.log(points, selected, maxVotes, maxVotesIndex)
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        <AnecdoteWithVotes anecdote={anecdotes[selected]} vote={points[selected]}/>
        <Button handlClick={() => {setPoints(setVote(points, selected))}} text="vote"/>
        <Button handlClick={() => {setSelected(getRandomInt(0, anecdotes.length))}} text="next anecdote"/>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>
        <AnecdoteWithVotes anecdote={anecdotes[maxVotesIndex]} vote={maxVotes}/>
      </div>
    </>
  )
}

export default App