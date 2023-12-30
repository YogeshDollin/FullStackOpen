import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

const auth = setContext((_, {headers}) => {
    const token = localStorage.getItem('library-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null
        }
    }
})

const httplink = createHttpLink({
    uri: 'http://localhost:4000'
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: auth.concat(httplink)
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)