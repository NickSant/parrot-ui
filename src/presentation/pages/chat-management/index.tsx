import { AnimatePresence, motion } from 'framer-motion'
import { SlArrowLeft, SlClose, SlOptionsVertical } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import { FilterSelect } from './components/filter-select'
import { useState } from 'react'
import { BiSearch, BiSort } from 'react-icons/bi'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { Transition } from '@headlessui/react'


import * as Avatar from '@radix-ui/react-avatar'
import { ChatItem } from './components/chat-item'

export const ChatManagement = () => {
  const [filters, setFilters] = useState<string[]>([])
  const [searchChatsVisible, setSearchChatsVisible] = useState(false)

  const filteringOptions = [
    {label: 'Conversa promissora', value: 'promissing'},
    {label: 'Insatisfeito', value: 'insatisfied'},
    {label: 'Fase de compra', value: 'purchasing'},
    {label: 'Iniciou recentemente', value: 'recently_started'},
    {label: 'Com dúvidas', value: 'doubts'},
  ]

  const handleAddFilter = (value: string) => {
    setFilters(old => old.concat(value))
  }

  const removeFilter = (filter: string) => {
    setFilters(old => old.filter(item => item !== filter ))
  }

  return (
    <AnimatePresence>
      <motion.div
        key="page"
        animate={{ y: [-1000, 0], opacity: [0, 1], transition: { bounce: 0 }}}
        exit={{ y: -1000, opacity: 0 }}
        transition={{ }}
      >
        <div className='w-full h-screen max-h-screen max-w-screen p-12 bg-slate-800'>
          <header className='flex items-center gap-4 text-lg text-slate-200'>
            <Link to="/chats" className='flex items-center gap-4'>
              <SlArrowLeft />
              Voltar para chats
            </Link>
          </header>

          <div className='flex items-center justify-center mt-10'>
            <section className='max-w-screen-lg w-full'>
              <header className='w-full flex flex-col gap-3'>
                <FilterSelect 
                  options={filteringOptions}
                  selected={filters}
                  onChange={handleAddFilter}
                />
                <div className='flex flex-wrap gap-2'>
                  {filters.map(filter => (
                    <div className='group text-slate-400 px-4 py-2 bg-slate-900 w-fit rounded-lg flex gap-2 items-center hover:bg-slate-700 hover:text-slate-100 font-medium'>
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
                  <h3 className='text-lg text-slate-200 font-medium'>Conversas</h3>
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
                        <input className='bg-blue-400 outline-none px-4 py-1 rounded-full w-[200px] -mr-10'/>
                      </Transition>
                      <button 
                        className='rounded-full p-2 text-blue-100 hover:bg-blue-400 bg-opacity-10 transition-all z-10'
                        onClick={() => setSearchChatsVisible(old => !old)}
                      >
                        <BiSearch />
                      </button>
                    </div>
                    <button className='rounded-full p-2 text-blue-100 hover:bg-blue-400 bg-opacity-10 transition-all'>
                      <BiSort />
                    </button>
                    <button className='rounded-full p-2 text-blue-100 hover:bg-blue-400 bg-opacity-10 transition-all'>
                      <SlOptionsVertical />
                    </button>
                  </div>
                </header>

                <div className='h-[calc(100vh-265px)] grid grid-cols-2 gap-3 py-6 pr-2 overflow-y-auto scrollbar-thumb-slate-600 scrollbar-thin mt-4'>
                  
                  <ChatItem />
                  <ChatItem />
                  <ChatItem />
                  <ChatItem />
                  <ChatItem />  
                  <ChatItem />  
                  <ChatItem />  
                  <ChatItem />  
                  <ChatItem />  
                  <ChatItem />  
                  <ChatItem />  
                   
                </div>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
