import { Chat } from '@/domain/models/chat'
import * as Avatar from '@radix-ui/react-avatar'
import { BiAddToQueue, BiMessage } from 'react-icons/bi'
import { SlSettings } from 'react-icons/sl'

type Props  = {
  chat: Chat
  onSave: (chat: Chat) => void 
  onDirectMessage: (chat: Chat) => void
}

export const ChatItem = ({ chat, onSave, onDirectMessage }: Props) => {
  return (
    <article className='rounded-lg bg-slate-900 px-4 py-4 shadow-md'>
      <header className='flex gap-5 mb-5'>
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
        <div className='flex flex-col text-slate-300'>
          <strong className='text-lg'>{chat.person.name}</strong>
          <span className='text-sm'>{chat.person.number}</span>
            {chat.status === "ACTIVE" && (
              <div className="inline-flex gap-2 items-center mt-2">
                <span className="block rounded-full w-3 h-3 bg-green-400 animate-pulse" />
                ativa agora
              </div>
            )}
        </div>
      </header>

      <hr className='w-full mx-y opacity-30'/>

      <div>

      </div>

      <footer className='flex items-center justify-between mt-5 rounded-lg overflow-hidden'>
        <button className='w-full flex items-center text-xl justify-center p-3 text-blue-300 transition-all hover:bg-slate-800' onClick={() => onSave(chat)}>
          <BiAddToQueue />
        </button>
        <button className='w-full flex items-center text-xl justify-center p-3 text-blue-300 transition-all hover:bg-slate-800' onClick={() => onDirectMessage(chat)}>
          <BiMessage />
        </button>
        <button className='w-full flex items-center text-xl justify-center p-3 text-blue-300 transition-all hover:bg-slate-800'>
          <SlSettings />
        </button>
      </footer>
    </article>
  )
}
