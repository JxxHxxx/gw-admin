import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './page/login/LoginPage'
import MessagePage from './page/message/MessagePage'
import VacationPage from './page/vacation/VacationPage'
import ConfirmPage from './page/confirm/document/ConfirmPage'
import '../src/page/page.css'
import MessageHistPage from './page/message/MessageHistPage'
import MessageRetryPage from './page/message/resync/MessageRetryPage'
import BatchConfigurationPage from './page/batch/config/BatchConfigurationPage'
import Modal from 'react-modal';
import BatchHistPage from './page/batch/history/BatchHistPage'
import { URL_APPROVAL_LINE, URL_BATCH_CONFIGURATION, URL_BATCH_EXECUTION_HIST, URL_CONFIRM_DOCUMENTS, URL_MESSAGE_HIST, URL_MESSAGE_RESYNC } from './constant/link/UrlConstant'
import ApprovalLinePage from './page/confirm/approvalLine/ApprovalLinePage'

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
      path: URL_MESSAGE_HIST,
      element: <MessageHistPage />
    }
    ,
    {
      path: URL_MESSAGE_RESYNC,
      element: <MessageRetryPage />
    }
    ,
    {
      path: URL_BATCH_CONFIGURATION,
      element: <BatchConfigurationPage />
    },
    {
      path: URL_BATCH_EXECUTION_HIST,
      element: <BatchHistPage />
    },
    {
      path: '/vacation',
      element: <VacationPage />
    },
    {
      path: URL_CONFIRM_DOCUMENTS,
      element: <ConfirmPage />
    },
    {
      path: URL_APPROVAL_LINE,
      element: <ApprovalLinePage />
    },
  ])

  Modal.setAppElement('#root');
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
