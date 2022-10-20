import React from 'react'
import Header from './components/Header'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Project from './pages/Project'

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
    <Router>
      <ApolloProvider client={client}>
        <Header/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/project/:id' element={<Project/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
    </>
  )
}

export default App