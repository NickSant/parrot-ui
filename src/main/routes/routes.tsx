import { MainLayout } from '@/presentation/components/layout'
import { Chats } from '@/presentation/pages/chat'
import { ChatManagement } from '@/presentation/pages/chat-management'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} path=''>
          <Route element={<Chats />} path="/chats" />
        </Route>
        <Route element={<ChatManagement />} path="/manage-chats" />
        
        <Route element={<Navigate to="/chats" />} path='*'/>
      </Routes>
    </BrowserRouter>
  )
}
