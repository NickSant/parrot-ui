import { useEffect, useMemo, useState } from 'react'
import { FilterSelect } from '../../components/filter-select'
import { SlClose, SlOptionsVertical, SlSettings } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { BiSearch, BiSort } from 'react-icons/bi'

import { useChat } from '@/stores/chat-storage'
import { Chat } from '@/domain/models/chat'
import { Flags } from '@/domain/models/flags'

import { ConversationResponse } from '@/proto/parrot'
import { getLiveConversations } from '@/data/usecases/getLiveConversations'

import { ChatItem } from '../../components/chat-item'
import { Menu } from '@/presentation/components/general/menu'

export const SearchChats = () => {
  const [firstRequest, setFirstRequest] = useState(true)
  const localConversations = useChat(state => state.localConversations)
  const pushConversation = useChat(state => state.pushConversation)
  const setConversation = useChat(state => state.setConversation)

  const navigate = useNavigate()

  const [filters, setFilters] = useState<Flags[]>([])

  const [allChats, setAllChats] = useState<Chat[]>([]);
  const [searchChats, setSearchChats] = useState('')
  const [searchChatsVisible, setSearchChatsVisible] = useState(false)

  const handleGetLiveConversations = () => getLiveConversations(
    { 
      tenantId: import.meta.env.VITE_TENANT_ID as string,
      skip: 0n,
      take: 30n,
      filters: []
     }, 
    (message: ConversationResponse) => {
    const conversations: Chat[] = message.conversations
    
    if(firstRequest){
      setAllChats(conversations)
      setFirstRequest(false)
    } else {
      setAllChats(old => [...conversations,...old])
    }
  })
  

  const availableChats = useMemo<Chat[]>(() => {
    const localIds = localConversations.map(item => item.id)
    return allChats.filter(item => !localIds.includes(item.id))
  }, [localConversations, allChats])


  // provisory without flags
  const flagFilteredChats = availableChats

  const inputFilteredChats =
    searchChats === ''
      ? flagFilteredChats
      : flagFilteredChats.filter(item => 
          item.user?.name.toLowerCase().includes(searchChats.toLowerCase())
          || item.user?.phone.toLowerCase().includes(searchChats.toLowerCase())
        )

  const filteringOptions = [
    {label: 'Conversa promissora', value: Flags.PROMISING},
    {label: 'Não promissora', value: Flags.UNPROMISING},
    {label: 'Insatisfeito', value: Flags.UNSATISFIED},
    {label: 'Iniciou recentemente', value: Flags.RECENTLY_STARTED},
    {label: 'Com dúvidas', value: Flags.HAS_DOUBTS},
    {label: 'Satisfeito', value: Flags.SATISFIED},
    {label: 'Iniciou há bastante tempo', value: Flags.STARTED_LONG_AGO},
  ]

  const handleAddFilter = (value: Flags) => {
    setFilters(old => old.concat(value))
  }

  const removeFilter = (filter: string) => {
    setFilters(old => old.filter(item => item !== filter ))
  }

  const handleSaveChat = (chat: Chat) => {
    pushConversation(chat)
  }

  const handleDirectMessage = (chat: Chat) => {
    pushConversation(chat)
    setConversation(chat)
    navigate('/chats')
  }

  useEffect(() => {
    const { abort, removeListener } = handleGetLiveConversations()

    return () => {
      removeListener()
      abort()
    }
  }, [])

  return (
    <>
      <header className='w-full flex flex-col gap-3'>
        <FilterSelect 
          options={filteringOptions}
          selected={filters}
          onChange={handleAddFilter}
        />
        <div className='flex flex-wrap gap-2'>
          {filters.map(filter => (
            <div className='group text-slate-600 dark:text-slate-400 px-4 py-2 bg-slate-200 dark:bg-slate-900 w-fit rounded-lg flex gap-2 items-center hover:bg-slate-300 hover:dark:bg-slate-700 hover:text-slate-700 hover:dark:text-slate-100 font-medium'>
              {filteringOptions.find(item => item.value === filter)?.label}
              <button onClick={() => removeFilter(filter)}>
                <SlClose className="transition-all"/>
              </button>
            </div>
          ))}
        </div>
      </header>

      <div className='mt-6'>
        <header className='w-full flex justify-between items-center'>
          <h3 className='text-lg text-slate-800 dark:text-slate-200 font-medium flex gap-4 items-center'>
            Conversas

            <span className="rounded-full h-8 w-8 text-[14px] grid place-items-center bg-blue-500 text-white font-bold">
              {inputFilteredChats.length}
            </span>
          </h3>
          <div className='flex gap-3 text-md'>
            <div className='group flex items-center gap-2'>
              <Transition
                show={searchChatsVisible}
                enter="transition-opacity"
                enterFrom='opacity-0'
                enterTo='opacity-1'
                leave="transition-opacity"
                leaveFrom='opacity-1'
                leaveTo='opacity-0'
              >
                <input 
                  className='bg-blue-400 outline-none px-4 py-1 rounded-full w-[200px] -mr-10' 
                  value={searchChats} 
                  onChange={(e) => setSearchChats(e.target.value)}
                />
              </Transition>
              <button 
                className='rounded-full p-2 text-slate-600 dark:text-blue-100 hover:bg-blue-400 bg-opacity-10 transition-all z-10'
                onClick={() => setSearchChatsVisible(old => !old)}
              >
                <BiSearch />
              </button>
            </div>
            <button className='rounded-full p-2 text-slate-600 dark:text-blue-100 hover:bg-blue-400 bg-opacity-10 transition-all'>
              <BiSort />
            </button>

            <Menu items={[
              {label: 'opção', Icon: <SlSettings />}
            ]}>
              <div className='rounded-full p-2 text-slate-600 dark:text-blue-100 hover:bg-blue-400 bg-opacity-10 transition-all'>
                <SlOptionsVertical />
              </div>
            </Menu>
          </div>
        </header>

        <div className='h-[calc(100vh-265px)] grid grid-cols-2 gap-3 py-6 px-2 overflow-y-auto scrollbar-thumb-slate-600 scrollbar-thin mt-4'>
          <AnimatePresence>
            {inputFilteredChats.map((chat, idx) => (
              <motion.div
                key={chat.id}
                initial={{ scale: 0.7, opacity: 0}}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.08 * idx }}}
                exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.2 }}}
              >
                <ChatItem 
                  chat={chat} 
                  onSave={handleSaveChat}
                  onDirectMessage={handleDirectMessage}
                />
              </motion.div>
            ))}          
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
