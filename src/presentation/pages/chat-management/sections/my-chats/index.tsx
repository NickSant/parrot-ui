import { Fragment, useState } from 'react'
import { MyChatItem } from '../../components/my-chat-item'
import { AnimatePresence, motion} from 'framer-motion'
import { AiOutlineSearch } from 'react-icons/ai'
import { Menu, Transition } from '@headlessui/react'
import { BiChevronDown } from 'react-icons/bi'
import { useChat } from '@/stores/chat-storage'
import { Chat } from '@/domain/models/chat'
import { useNavigate } from 'react-router-dom'

export const MyChats = () => {
  const [query, setQuery] = useState('')
  const conversations = useChat(state => state.localConversations)
  
  const setConversation = useChat(state => state.setConversation)
  const deleteConversation = useChat(state => state.deleteConversation)

  const navigate = useNavigate()

  const filteredConversations = 
    query === ''
      ? conversations
      : conversations.filter(item => 
          item.user?.name.toLowerCase().includes(query.toLowerCase())
          || item.user?.phone.toLowerCase().includes(query.toLowerCase())
        )

  const handleDelete = (id: string) => {
    deleteConversation(id)
  }

  const handleOpenChat = (chat: Chat) => {
    setConversation(chat)
    navigate('/chats')
  }


  return (
    <div className=''>
      <header className='mb-5 flex items-center justify-between gap-6'>
        <div 
          id="searchInput"
          className="w-full flex items-center justify-center gap-4 bg-slate-200 dark:bg-slate-900 rounded-t-lg h-10 text-slate-500 px-4 focus:outline-none focus-within:border-none transition-all border-box focus-within:text-slate-900 focus-within:dark:text-slate-200"
        >
          <AiOutlineSearch className="text-xl" />
          <input 
            className="w-full bg-transparent focus:outline-none" 
            value={query} 
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className='flex gap-4 items-center'>
          <div className='flex items-center text-slate-200 gap-4'>
            <Menu as="div" className="relative">
              <Menu.Button className="px-4 py-2 text-slate-200 border-2 border-slate-200 rounded-full inline-flex gap-2 items-center text-sm">
                Todos
                <BiChevronDown />
              </Menu.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Menu.Items className="absolute right-0 z-30 mt-2 shadow-lg ring-1 ring-black ring-opacity-5 rounded-md bg-slate-700 w-48 py-1">
                  <Menu.Item ><div className='py-2 px-4 hover:bg-slate-700'>Ativos</div></Menu.Item>
                  <Menu.Item ><div className='py-2 px-4 hover:bg-slate-700'>Inativos</div></Menu.Item>
                  <Menu.Item ><div className='py-2 px-4 hover:bg-slate-700'>Em progresso</div></Menu.Item>                  
                </Menu.Items>

              </Transition>
            </Menu>
          </div>
        </div>

      </header>
      <div className='w-full flex flex-col gap-3 h-full max-h-[calc(100vh-155px)] scrollbar-thin scrollbar-thumb-slate-500 overflow-y-scroll overflow-x-hidden px-2 pt-1 pb-2'>
        <AnimatePresence>
          {filteredConversations.map((conversation, idx) => (
            <motion.div 
              key={conversation.id} 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 0.3 * idx }}}
              exit={{ x: 50, opacity: 0 }}
            >
              <MyChatItem 
                chat={conversation}
                onOpenChat={() => handleOpenChat(conversation)}
                onDelete={() => handleDelete(conversation.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
