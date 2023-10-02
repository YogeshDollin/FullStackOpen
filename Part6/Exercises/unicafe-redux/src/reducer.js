const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newState = {...state}
  switch (action.type) {
    case 'GOOD':
      newState.good = state.good + 1
      break
    case 'OK':
      newState.ok = state.ok + 1
      break
    case 'BAD':
      newState.bad = state.bad + 1
      break
    case 'ZERO':
      newState = {...initialState}
      break
  }
  return newState  
}

export default counterReducer
