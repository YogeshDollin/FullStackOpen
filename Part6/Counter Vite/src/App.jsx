import ReactDOM from 'react-dom/client'
import {createStore} from 'redux'

const CounterReducer = (state = 0, action) => {
  let newState = state
  switch (action.type) {
    case 'INCREMENT':
      newState = state + 1
      break
    case 'DECREMENT':
      newState = state - 1
      break
    case 'ZERO':
      newState = 0
      break;
  }
  return newState
}

const store = createStore(CounterReducer)

const App = () => {
  return (
    <>
      <div>
        {store.getState()}
      </div>
      <button onClick={() => store.dispatch({type:'INCREMENT'})}>
        plus
      </button>
      <button onClick={() => store.dispatch({type: 'DECREMENT'})}>
        minus
      </button>
      <button onClick={() => store.dispatch({type: 'ZERO'})}>
        zero
      </button>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App/>)
}

renderApp()
store.subscribe(renderApp)

export default renderApp