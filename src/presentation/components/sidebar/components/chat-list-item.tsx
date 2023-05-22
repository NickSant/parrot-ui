import { Chat } from "@/domain/models/chat"
import { useChat } from "@/stores/chat-storage"
import { SlOptionsVertical } from "react-icons/sl"

import * as Avatar from '@radix-ui/react-avatar'

type Props = {
  chat: Chat
}

export const ChatListItem = ({ chat }: Props) => {
  const setActiveChat = useChat(state => state.setConversation)

  const handleSetActiveChat = () => {
    setActiveChat(chat)
  }

  return (
    <li className='group w-full flex items-center justify-between px-4 py-6 border-slate-100 hover:bg-slate-700 transition-all cursor-pointer' onClick={handleSetActiveChat}>
      <div className='flex items-center justify-center gap-4'>
        <Avatar.Root className="bg-black inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={chat.person.avatarUrl}
            alt={chat.person.name}
          />
          <Avatar.Fallback
            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
            delayMs={600}
          >
            {chat.person.name[0]}
          </Avatar.Fallback>
        </Avatar.Root>
        <span>{chat.person.name}</span>
      </div>


      <div className="flex items-center justify-center gap-3 transition-all">
        {chat.status === 'ACTIVE' && <span className="rounded-full w-3 h-3 bg-green-400 animate-pulse" />}
        <SlOptionsVertical className="hidden group-hover:block transition-all"/>
      </div>
    </li>
  )
}
