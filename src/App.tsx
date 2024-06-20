import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './page/login/LoginPage'
import MessagePage from './page/message/MessagePage'
import VacationPage from './page/vacation/VacationPage'
import BatchPage from './page/batch/BatchPage'
import ConfirmPage from './page/confirm/ConfirmPage'
import '../src/page/page.css'
import MessageHistPage from './page/message/MessageHistPage'
import MessageRetryPage from './page/message/MessageRetryPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/',
      element: <VacationPage />
    },
    {
      path: '/message',
      element: <MessagePage />,
    },
    {
      path: '/message/hist',
      element: <MessageHistPage />
    }
    ,
    {
      path: '/message/retry',
      element: <MessageRetryPage />
    }
    ,
    {
      path: '/batch',
      element: <BatchPage />
    },
    {
      path: '/vacation',
      element: <VacationPage />
    },
    {
      path: '/confirm',
      element: <ConfirmPage />
    },


  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
