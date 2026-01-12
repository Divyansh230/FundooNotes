import { useState } from 'react'
import Login from './Pages/Login'
import Header from './Components/Header/Header'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Header/> */}
     {/* <Signup/> */}
     {/* <Login/> */}
     <Dashboard/>
    </>
  )
}

export default App
