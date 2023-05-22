import { useChat } from '@/stores/chat-storage'
import { AiOutlineSearch } from 'react-icons/ai'
import { SlOptionsVertical } from 'react-icons/sl'

import * as Avatar from '@radix-ui/react-avatar'


export const Navbar = () => {
  const conversation = useChat(state => state.activeConversation)

  return (
    <nav className='w-full flex items-center justify-between py-3 px-6 font-sans bg-slate-900 border-l-[0.5px] border-slate-400 border-collapse'>
      <div className='flex items-center justify-center font-bold gap-4'>
       <Avatar.Root className="bg-black inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={conversation?.person.avatarUrl}
            alt={conversation?.person.name}
          />
          <Avatar.Fallback
            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
            delayMs={600}
          >
            {conversation?.person.name[0]}
          </Avatar.Fallback>
        </Avatar.Root>

        <span className='text-slate-100'>
          {conversation?.person.name}

          <small className="ml-5 opacity-80">{conversation?.person.number}</small>
        </span>
      </div>

      <div className="flex items-center justify-center gap-5 text-xl text-white">
        <AiOutlineSearch />
        <SlOptionsVertical />
      </div>
    </nav>  
  )
}
