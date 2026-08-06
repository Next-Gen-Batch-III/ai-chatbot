import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import './App.css'

import Home from './pages/Home.jsx'
import { configureAuthInterceptor } from './api/client'

function App() {
  const { getToken } = useAuth()

  useEffect(() => configureAuthInterceptor(getToken), [getToken])

  return (
    <>
      <Home />
    </>
  )
}

export default App
