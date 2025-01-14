import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './Components/Basic/Header'
import Footer from './Components/Basic/Footer'
import Sidebar from './Components/Basic/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex h-screen bg-slate-300">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
          <Header/>

        {/* Content Area */}
        <main className="p-4 flex-grow">
          {<Outlet/>}
        </main>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  )
}

export default App
