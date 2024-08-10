import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './page/login/LoginPage'
import VacationHistPage from './page/vacation/history/VacationHistPage'
import ConfirmPage from './page/confirm/document/ConfirmPage'
import '../src/page/page.css'
import MessageHistPage from './page/message/MessageHistPage'
import MessageRetryPage from './page/message/resync/MessageRetryPage'
import BatchConfigurationPage from './page/batch/config/BatchConfigurationPage'
import Modal from 'react-modal';
import BatchHistPage from './page/batch/history/BatchHistPage'
import { URL_APPROVAL_LINE, URL_BATCH_CONFIGURATION, URL_BATCH_EXECUTION_HIST, URL_CONFIRM_DOCUMENTS, URL_CONFIRM_DOCUMENTS_CREATE, URL_MESSAGE_HIST, URL_MESSAGE_RESYNC, URL_VACATION_CONFIG_COMMON_CREATE, URL_VACATION_CONFIG_COMMON_SPECIAL, URL_VACATION_CONFIG_COMMON_UPDATE, URL_VACATION_CONFIG_PERSONAL, URL_VACATION_HIST } from './constant/link/UrlConstant'
import ApprovalLinePage from './page/confirm/approvalLine/ApprovalLinePage'
import ConfirmFormConfigPage from './page/confirm/createForm/ConfirmFormConfigPage'
import CommonVacationCreatePage from './page/vacation/config/common/CommonVacationCreatePage'
import PersonalVacationConfigPage from './page/vacation/config/personal/PersonalVacationConfigPage'
import CommonVacationUpdatePage from './page/vacation/config/common/CommonVacationUpdatePage'
import SpecialVacationPage from './page/vacation/config/common/SpecialVacationPage'
import Page from './page/Page'
import Header from './component/layout/Header'

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/userorg',
      element: <Page
        cnSideMainLayout="page_grd"
        cnAside="side_b"
        cnMain="main_b"
        header={<Header menu="userorg" />}
      >
        <h3>사용자/조직 관리 임시</h3>
      </Page>
    },
    {
      path: URL_VACATION_HIST,
      element: <VacationHistPage />
    },
    {
      path: URL_VACATION_CONFIG_COMMON_CREATE,
      element: <CommonVacationCreatePage />
    },
    {
      path: URL_VACATION_CONFIG_COMMON_UPDATE,
      element: <CommonVacationUpdatePage />
    },
    {
      path: URL_VACATION_CONFIG_COMMON_SPECIAL,
      element: <SpecialVacationPage />
    },
    {
      path: URL_VACATION_CONFIG_PERSONAL,
      element: <PersonalVacationConfigPage />
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
      element: <VacationHistPage />
    },
    {
      path: URL_CONFIRM_DOCUMENTS,
      element: <ConfirmPage />
    },
    {
      path: URL_CONFIRM_DOCUMENTS_CREATE,
      element: <ConfirmFormConfigPage />
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
