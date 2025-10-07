import React from 'react'
import Layout from './components/Layout'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import Router from './Routes/Router'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  function NoteRoute(){
    return useRoutes(Router);
  }
  return (
    
    <BrowserRouter>
    <AuthProvider>
    <NoteRoute/>
    </AuthProvider>
    </BrowserRouter>
  
    
  )
}

export default App