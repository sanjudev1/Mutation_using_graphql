import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ApolloProvider,ApolloClient,InMemoryCache } from '@apollo/client'

const client=new ApolloClient({
  uri:"https://khoros-graphql-api.vercel.app/api/graphql",
  cache:new InMemoryCache()
})
const count=10;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App count={count}/>
    </ApolloProvider>
  </React.StrictMode>,
)
