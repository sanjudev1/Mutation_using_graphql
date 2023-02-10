import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router}  from "react-router-dom";
import App from './App'
import './index.css'
import { ApolloProvider,ApolloClient,InMemoryCache } from '@apollo/client'

const client=new ApolloClient({
  uri:"https://khoros-graphql-api.vercel.app/api/graphql",
  cache:new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
    </Router>
  </React.StrictMode>,
)
