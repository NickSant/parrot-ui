import { Chat } from "@/domain/models/chat"
import { useChat } from "@/stores/chat-storage"
import { SlOptionsVertical } from "react-icons/sl"

import { Avatar } from '@/presentation/components/general/avatar'
import { Menu } from '@/presentation/components/general/menu'
import { BiEdit } from "react-icons/bi"
import { useGlobalModal } from "@/presentation/hooks/useGlobalModal"
import { ModalTypes } from "@/presentation/contexts/globalModalContext"

type Props = {
  chat: Chat
}

export const ChatListItem = ({ chat }: Props) => {
  const { showModal } = useGlobalModal()
  const setActiveChat = useChat(state => state.setConversation)

  const handleSetActiveChat = () => {
    setActiveChat(chat)
  }

  const handleEditName = () => {
    showModal(ModalTypes.edit_local_user_name, {
      chat
    })
  }

  return (
    <li className='group w-full flex items-center justify-between px-4 py-6 border-slate-100 hover:dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-300 font-medium transition-all cursor-pointer' onClick={handleSetActiveChat}>
      <div className='flex items-center justify-center gap-4'>
        <Avatar
          name={chat.user?.name as string}
          url={''}
          size={45}
        />
        <span>{chat.user?.name}</span>
      </div>

      <div className="flex items-center justify-center gap-3 transition-all">
        {chat.status === 'inprogress' && <span className="rounded-full w-3 h-3 bg-green-400 animate-pulse" />}
        
        <Menu items={[
          { label: 'Editar nome', Icon: <BiEdit />, callback: handleEditName }
        ]}>
          <div className="hidden group-hover:flex items-center justify-center transition-all w-8 h-8 rounded-full hover:bg-slate-400 hover:bg-opacity-25">
            <SlOptionsVertical className=""/>
          </div>
        </Menu>
      </div>
    </li>
  )
}
