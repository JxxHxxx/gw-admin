import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainPage from './page/main/MainPage'
import LoginPage from './page/login/LoginPage'
import MessagePage from './page/message/MessagePage'
import VacationPage from './page/vacation/VacationPage'
import BatchPage from './page/batch/BatchPage'
import ConfirmPage from './page/confirm/ConfirmPage'

function App() {
  const router = createBrowserRouter([
    {
      path : '/login',
      element : <LoginPage />
    },
    {
      path : '/',
      element : <MainPage />
    },
    {
      path : '/message',
      element : <MessagePage />
    },
    {
      path : '/vacation',
      element : <VacationPage />
    },
    {
      path : '/batch',
      element : <BatchPage />
    },
    {
      path : '/confirm',
      element : <ConfirmPage />
    },

    
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
