import React from 'react'
import LoginRegisterWrapper from './screens/Auth/LoginRegisterWrapper'
import AuthProvider from './provider/AuthProvider'
import Routes from "./routes"
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthProvider>
      <Toaster position='top-center' />
      <Routes />
    </AuthProvider>
  )
}

export default App