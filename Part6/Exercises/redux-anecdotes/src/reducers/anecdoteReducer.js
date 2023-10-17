import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    updateAnecdote(state, action){
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const response = await anecdotesService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(updateAnecdote(response))
  }
}
export const {appendAnecdote, updateAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer