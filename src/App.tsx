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
import * as UrlConstant from './constant/link/UrlConstant'
import ApprovalLinePage from './page/confirm/approvalLine/ApprovalLinePage'
import ConfirmFormConfigPage from './page/confirm/createForm/ConfirmFormConfigPage'
import CommonVacationCreatePage from './page/vacation/config/common/CommonVacationCreatePage'
import PersonalVacationConfigPage from './page/vacation/config/personal/PersonalVacationConfigPage'
import CommonVacationUpdatePage from './page/vacation/config/common/CommonVacationUpdatePage'
import SpecialVacationPage from './page/vacation/config/common/SpecialVacationPage'
import Page from './page/Page'
import Header from './component/layout/Header'
import MappingApiPage from './page/confirm/mappingApi/MappingApiPage'

function App() {
  const router = createBrowserRouter([
    {
      path: UrlConstant.URL_MAIN,
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
      path: UrlConstant.URL_VACATION_HIST,
      element: <VacationHistPage />
    },
    {
      path: UrlConstant.URL_VACATION_CONFIG_COMMON_CREATE,
      element: <CommonVacationCreatePage />
    },
    {
      path: UrlConstant.URL_VACATION_CONFIG_COMMON_UPDATE,
      element: <CommonVacationUpdatePage />
    },
    {
      path: UrlConstant.URL_VACATION_CONFIG_COMMON_SPECIAL,
      element: <SpecialVacationPage />
    },
    {
      path: UrlConstant.URL_VACATION_CONFIG_PERSONAL,
      element: <PersonalVacationConfigPage />
    },
    {
      path: UrlConstant.URL_MESSAGE_HIST,
      element: <MessageHistPage />
    }
    ,
    {
      path: UrlConstant.URL_MESSAGE_RESYNC,
      element: <MessageRetryPage />
    }
    ,
    {
      path: UrlConstant.URL_BATCH_CONFIGURATION,
      element: <BatchConfigurationPage />
    },
    {
      path: UrlConstant.URL_BATCH_EXECUTION_HIST,
      element: <BatchHistPage />
    },
    {
      path: UrlConstant.URL_CONFIRM_DOCUMENTS,
      element: <ConfirmPage />
    },
    {
      path: UrlConstant.URL_CONFIRM_DOCUMENTS_CREATE,
      element: <ConfirmFormConfigPage />
    },
    {
      path: UrlConstant.URL_APPROVAL_LINE,
      element: <ApprovalLinePage />
    },
    {
      path: UrlConstant.URL_CONFIRM_DOCUMENTS_MAPPING_API,
      element : <MappingApiPage />
    }
  ])

  Modal.setAppElement('#root');

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
