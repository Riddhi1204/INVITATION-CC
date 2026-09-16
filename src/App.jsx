import React from 'react'
import Home from './pages/Home'
import CustomCursor from './components/ui/CustomCursor'

function App() {
  return (
    <div className="w-full bg-transparent">
      <CustomCursor />
      <Home />
    </div>
  )
}

export default App
