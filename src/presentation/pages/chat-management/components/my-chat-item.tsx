import { Chat } from '@/domain/models/chat'
import * as Avatar from '@radix-ui/react-avatar'
import { BiDotsVerticalRounded, BiMessage, BiTrash } from 'react-icons/bi'

type Props = {
  chat: Chat
  onDelete: () => void
  onOpenChat: () => void
}

export const MyChatItem = ({ chat , onDelete, onOpenChat }: Props) => {

  const {
    person: {
      name,
      number,
      avatarUrl
    },
    status
  } = chat

  return (
    <article className='rounded-lg w-full flex justify-between items-center bg-slate-900 px-8 py-6'>
      <div className='flex gap-8'>
        <Avatar.Root className="bg-black inline-flex h-[65px] w-[65px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src={avatarUrl}
            alt={name}
          />
          <Avatar.Fallback
            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
            delayMs={600}
          >
            {name[0]}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className='text-slate-200'>
          <strong className='text-xl'>{name}</strong>
          <p className='text-sm text-slate-500'>{number}</p>
          <br />

          {
            status === 'ACTIVE' && (
              <div className='inline-flex items-center gap-3 rounded-full border-2 px-2 py-1 text-green-400 text-sm border-green-400'>
                <span className="block rounded-full w-3 h-3 bg-green-400 animate-pulse" />  
                <span>Ativo</span>
              </div>
            )
          }
          {
            status === 'IN_PROGRESS' && (
              <div className='inline-flex items-center gap-3 rounded-full border-2 px-2 py-1 text-yellow-400 text-sm border-yellow-400'>
                <span className="block rounded-full w-3 h-3 bg-yellow-400 animate-pulse" />  
                <span>Em andamento</span>
              </div>
            )
          }

        </div>
      </div>

      <div className='inline-flex gap-4'>
        <button className='rounded-lg text-xl transition-all p-4 bg-transparent text-slate-200 bg-opacity-10 hover:bg-blue-400 hover:bg-opacity-10 hover:text-cyan-500' onClick={onOpenChat}>
          <BiMessage />
        </button>
        <button 
          className='rounded-lg text-xl transition-all p-4 bg-transparent text-slate-200 bg-opacity-10 hover:bg-red-400 hover:bg-opacity-10 hover:text-red-500'
          onClick={onDelete}
        >
          <BiTrash />
        </button>
        <button className='rounded-lg text-xl transition-all p-4 bg-transparent text-slate-200 bg-opacity-10 hover:bg-red-50 hover:bg-opacity-10 hover:text-white'>
          <BiDotsVerticalRounded />
        </button>
      </div>
    </article>
  )
}
