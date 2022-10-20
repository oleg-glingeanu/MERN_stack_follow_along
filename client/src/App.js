import React from 'react'
import Header from './components/Header'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import Clients from './components/Clients'
import Projects from './components/Projects'
import AddClient from './components/AddClient'

const cache = new InMemoryCache({
  typePolicies: {
    Query :{
      fields:{
        clients: {
          merge(existing, incoming){
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming){
            return incoming;
          }
        }
      }
    }
  }
})


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
})


function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Header/>
      <div className='container'>
      <AddClient/>
        <h1>
          <Projects />
          <Clients />
        </h1>
      </div>
    </ApolloProvider>
    </>
  )
}

export default App