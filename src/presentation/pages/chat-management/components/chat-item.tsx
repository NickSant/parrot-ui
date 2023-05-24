import { Chat } from '@/domain/models/chat'
import { Avatar } from '@/presentation/components/general/avatar'
import { BiAddToQueue, BiMessage } from 'react-icons/bi'
import { SlSettings } from 'react-icons/sl'

type Props  = {
  chat: Chat
  onSave: (chat: Chat) => void 
  onDirectMessage: (chat: Chat) => void
}

export const ChatItem = ({ chat, onSave, onDirectMessage }: Props) => {
  return (
    <article className='rounded-lg bg-white dark:bg-slate-900 px-4 py-4 shadow-lg ring-1 ring-slate-600 ring-opacity-5'>
      <header className='flex gap-5 mb-5'>
        <Avatar 
          url={''}
          name={chat.user?.name as string}
          size={45}
        />
        <div className='flex flex-col text-slate-700 dark:text-slate-300'>
          <strong className='text-lg'>{chat.user?.name}</strong>
          <span className='text-sm'>{chat.user?.phone}</span>
            {chat.status === "inprogress" && (
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
        <button className='w-full flex items-center text-xl justify-center p-3 text-blue-500 dark:text-blue-300 transition-all hover:bg-slate-200 hover:dark:bg-slate-800' onClick={() => onSave(chat)}>
          <BiAddToQueue />
        </button>
        <button className='w-full flex items-center text-xl justify-center p-3 text-blue-500 dark:text-blue-300 transition-all hover:bg-slate-200 hover:dark:bg-slate-800' onClick={() => onDirectMessage(chat)}>
          <BiMessage />
        </button>
        <button className='w-full flex items-center text-xl justify-center p-3 text-blue-500 dark:text-blue-300 transition-all hover:bg-slate-200 hover:dark:bg-slate-800'>
          <SlSettings />
        </button>
      </footer>
    </article>
  )
}
