import { Chat } from '@/domain/models/chat'
import { Menu } from '@/presentation/components/general/menu'
import { Avatar } from '@/presentation/components/general/avatar'

import { AiOutlineEdit } from 'react-icons/ai'
import { BiDotsVerticalRounded, BiMessage, BiTrash } from 'react-icons/bi'
import { useGlobalModal } from '@/presentation/hooks/useGlobalModal'
import { ModalTypes } from '@/presentation/contexts/globalModalContext'
import { User } from '@/proto/parrot'

type Props = {
  chat: Chat
  onDelete: () => void
  onOpenChat: () => void
}

export const MyChatItem = ({ chat , onDelete, onOpenChat }: Props) => {
  const {showModal} = useGlobalModal()

  const user = chat.user || {} as User

  const handleEditName = () => {
    showModal(ModalTypes.edit_local_user_name, {
      chat
    })
  }

  return (
    <article className='rounded-lg w-full flex justify-between items-center bg-white ring-1 ring-slate-600 ring-opacity-5 shadow-lg dark:bg-slate-900 px-8 py-6'>
      <div className='flex gap-8 items-center'>
        <div className='w-[65px] h-[65px] grid place-items-center'>
          <Avatar
            name={user?.name}
            url={''}
            size={65}
          />
        </div>
        <div className='text-slate-600 dark:text-slate-200'>
          <strong className='text-xl'>{user.name}</strong>
          <p className='text-sm text-slate-500'>{user.phone}</p>
          <br />

          {
            chat.status === 'inprogress' && (
              <div className='inline-flex items-center gap-3 rounded-full border-2 px-2 py-1 text-green-400 text-sm border-green-400'>
                <span className="block rounded-full w-3 h-3 bg-green-400 animate-pulse" />  
                <span>Ativo</span>
              </div>
            )
          }
          {
            chat.status === 'lal' && (
              <div className='inline-flex items-center gap-3 rounded-full border-2 px-2 py-1 text-yellow-400 text-sm border-yellow-400'>
                <span className="block rounded-full w-3 h-3 bg-yellow-400 animate-pulse" />  
                <span>Em andamento</span>
              </div>
            )
          }

        </div>
      </div>

      <div className='inline-flex gap-4'>
        <button className='rounded-lg text-xl transition-all p-4 bg-transparent text-slate-700 dark:text-slate-200 bg-opacity-10 hover:bg-blue-400 hover:bg-opacity-10 hover:text-cyan-500' onClick={onOpenChat}>
          <BiMessage />
        </button>
        <button 
          className='rounded-lg text-xl transition-all p-4 bg-transparent text-slate-700 dark:text-slate-200 bg-opacity-10 hover:bg-red-400 hover:bg-opacity-10 hover:text-red-500'
          onClick={onDelete}
        >
          <BiTrash />
        </button>
        <Menu items={[
          { label: 'Editar nome', Icon: <AiOutlineEdit />, callback: handleEditName}
        ]}>
          <button className='rounded-lg text-xl transition-all p-4 bg-transparent text-slate-700 dark:text-slate-200 bg-opacity-10 hover:bg-slate-500 hover:dark:bg-red-50 hover:bg-opacity-10 hover:text-slate-400 hover:dark:text-white'>
            <BiDotsVerticalRounded />
          </button>
        </Menu>
      </div>
    </article>
  )
}
