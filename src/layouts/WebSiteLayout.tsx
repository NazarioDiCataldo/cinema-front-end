import Header from '@/components/Header'
import { Outlet } from 'react-router'

const WebSiteLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default WebSiteLayout