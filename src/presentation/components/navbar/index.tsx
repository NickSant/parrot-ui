import { useChat } from '@/stores/chat-storage'
import { AiOutlineSearch } from 'react-icons/ai'
import { SlOptionsVertical } from 'react-icons/sl'

import {Avatar} from '@/presentation/components/general/avatar'


export const Navbar = () => {
  const conversation = useChat(state => state.activeConversation)

  return (
    <nav className='w-full flex items-center justify-between py-3 px-6 font-sans bg-slate-200 dark:bg-slate-900 border-l-[0.5px] border-slate-400 border-collapse'>
      <div className='flex items-center justify-center font-bold gap-4'>
       <Avatar 
          name={conversation?.user?.name as string}
          url={''}
          size={45}
       />

        <span className='text-slate-800 dark:text-slate-100'>
          {conversation?.user?.name}

          <small className="ml-5 opacity-80">{conversation?.user?.phone}</small>
        </span>
      </div>

      <div className="flex items-center justify-center gap-5 text-xl text-slate-800 dark:text-white">
        <AiOutlineSearch />
        <SlOptionsVertical />
      </div>
    </nav>  
  )
}
