import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import WebSiteLayout from './layouts/WebSiteLayout'

const router = createBrowserRouter([{
  path: '/',
  element: <WebSiteLayout /> 
}]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
