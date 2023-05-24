import { useState } from 'react';

import { useGlobalModal } from '@/presentation/hooks/useGlobalModal'
import { Avatar } from '../general/avatar';
import { Input } from '../general/input';
import { Modal } from '../general/modal'
import { AiOutlineEdit } from 'react-icons/ai';
import { useChat } from '@/stores/chat-storage';
import { Chat } from '@/domain/models/chat';

export const EditLocalUserName = () => {
  const updateLocalConversation = useChat(state => state.updateLocalConversations)

  const { hideModal, store } = useGlobalModal();
  const { modalProps } = store || {
    modalProps: {
      chat: {} as Chat
    }
  };

  const [name, setName] = useState(modalProps.chat.user?.name)

  const handleUpdateLocalChatUser = () => {
    updateLocalConversation({...modalProps.chat, user: { ...modalProps.chat.user, name }})
    hideModal()
  }

  return (
    <Modal open onClose={hideModal} title='Editar nome de usuário'>
      <div className='flex flex-col items-center text-center gap-4'>
        <span className='text-sm'>
          É possível alterar o nome do usuário que é exibido para você para facilitar a identificação.
        </span>

        <div className='flex flex-col items-center'>
          <div className='w-[75px] h-[75px]'>
            <Avatar
              name={modalProps.chat.user.name}
              url={modalProps.chat.user.avatarUrl}
              size={75}
            />
          </div>

          <br />
          <Input 
            value={name}
            onChange={setName}
            Icon={<AiOutlineEdit className="text-lg" />}
          />
        </div>

        <button 
          className='rounded-lg flex items-center justify-center bg-blue-400 text-slate-100 font-medium px-4 py-2 hover:bg-blue-300'
          onClick={handleUpdateLocalChatUser}
        >
          Confirmar
        </button>

      </div>
    </Modal>
  )
}
