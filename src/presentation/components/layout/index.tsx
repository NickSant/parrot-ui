import { Outlet } from 'react-router-dom'
import { Navbar } from '../navbar'
import { Sidebar } from '../sidebar'
import { useChat } from '@/stores/chat-storage'

import { HiChatBubbleLeftRight } from 'react-icons/hi2'

export const MainLayout = () => {
  const activeConversation = useChat(state => state.activeConversation)

  return (
    <div className='flex h-screen w-screen'>
      <Sidebar /> 

      {activeConversation 
        ? <div className='w-full'>
            <Navbar />
            <Outlet />
          </div>
        : (
          <div className='w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-200'>
            <HiChatBubbleLeftRight className="text-8xl mb-5" />
            <h2 className='text-xl'>Selecione uma conversa</h2>
            <span></span>
          </div>
        )
      }
      
      
    </div>
  )
}
