import { useState } from 'react'
import ReactRoutes from './ReactRoutes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Signup from './Pages/Signup'
import Login from './Pages/Login'


const router=createBrowserRouter(
  [
    {
      path:'/',
      element:<Dashboard/>,
      // children={
      //   path:''
      // }
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/login',
      element:<Login/>
    }
  ]
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
