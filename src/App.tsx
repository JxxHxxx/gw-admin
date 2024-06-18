import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import MainPage from './page/main/MainPage'
import LoginPage from './page/login/LoginPage'

function App() {
  const router = createBrowserRouter([
    {
      path : '/login',
      element : <LoginPage />
    },
    {
      path : '/',
      element : <MainPage />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
