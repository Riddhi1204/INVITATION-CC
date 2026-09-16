import React from 'react'
import Home from './pages/Home'
import CustomCursor from './components/ui/CustomCursor'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <div className="w-full bg-transparent">
      <ErrorBoundary><CustomCursor /></ErrorBoundary>
      <Home />
    </div>
  )
}

export default App

