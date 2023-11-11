import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter as Router } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <QueryClientProvider client={new QueryClient()}> */}
        <Router>
          <App />
        </Router>
      {/* </QueryClientProvider> */}
    </Provider>
  </React.StrictMode>
)