import { Outlet } from 'react-router-dom'
import { Navbar } from '../navbar'
import { Sidebar } from '../sidebar'

export const MainLayout = () => {

  return (
    <div className='flex h-screen w-screen'>
      <Sidebar /> 
      <div className='w-full'>
        <Navbar />
        <Outlet />
      </div>
      
    </div>
  )
}
