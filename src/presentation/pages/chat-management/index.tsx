import { AnimatePresence, Variants, motion } from 'framer-motion'
import { SlArrowLeft } from 'react-icons/sl'
import { Link } from 'react-router-dom'

import { SearchChats } from './sections/search-chats'

import { Tab } from '@headlessui/react'
import { MyChats } from './sections/my-chats'
import { BiConversation, BiFilter, BiSearch } from 'react-icons/bi'
import { useChat } from '@/stores/chat-storage'

export const ChatManagement = () => {
  const localConversations = useChat(state => state.localConversations)

  const tabs = [
    {
      id: 'my-chats',
      label: 
        <h2 className='flex gap-4 items-center'>
          Minhas conversas 
          <CountIndicator  count={localConversations.length} />
        </h2>,
      Icon: BiConversation,
      section: <MyChats />
    },
    {
      id: 'search-chats',
      label: 'Procurar conversas',
      Icon: BiSearch,
      section: <SearchChats />
    },
    {
      id: 'manage-filters',
      label: 'Editar filtros',
      Icon: BiFilter,
      section: <h1 className='text-slate-400'>Editar filtros</h1>
    },
  ]
 

  return (
    <AnimatePresence>
      <motion.div
        key="page"
        animate={{ y: [-1000, 0], opacity: [0, 1], transition: { bounce: 0 }}}
        exit={{ y: -1000, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className='w-full h-screen max-h-screen max-w-screen px-12 py-6 bg-slate-800'>
          <header className='flex items-center gap-4 text-lg text-slate-200'>
            <Link to="/chats" className='flex items-center gap-4'>
              <SlArrowLeft />
              Voltar para chats
            </Link>
          </header>

          <div className='flex items-center justify-center mt-10'>
            <main className='max-w-screen-xl w-full flex flex-col md:grid md:grid-cols-6 lg:grid-cols-5 gap-8'>
              <Tab.Group vertical>
                <div className='md:col-span-2 lg:col-span-1 border-r border-r-slate-400 border-opacity-20'>
                  <Tab.List className='flex flex-col'>
                    {
                      tabs.map(tab => (
                        <Tab key={tab.id} className={({ selected }) => `flex items-center gap-4 hover:text-slate-300 py-4 text-left w-full ${selected ? 'border-r-4 border-r-blue-400 text-slate-200 font-medium' : 'text-slate-400'} transition-all`}>
                          <tab.Icon className="text-xl"/>
                          {tab.label}
                        </Tab>
                      ))
                    }
                  </Tab.List>
                </div>
                <Tab.Panels className='col-span-4'>
                  {
                    tabs.map(tab => (
                      <Tab.Panel key={tab.id}>
                        {tab.section}
                      </Tab.Panel>
                    ))
                  }
                </Tab.Panels>
              </Tab.Group>
            </main>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}


const CountIndicator = ({ count }: { count: number }) => {
  const variants: Variants = {
    hide: {
      scale: 1
    },
    show: {
      scale: [1, 1.3, 1.3, 1],
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      initial="hide"
      animate="show"
      variants={variants}
      key={count}
      className='rounded-full h-6 w-6 text-[12px] grid place-items-center bg-blue-500 text-white font-bold'
    >
      {count}
    </motion.div>
  )
}
