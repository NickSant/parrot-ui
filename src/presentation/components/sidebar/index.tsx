import { useState } from "react"
import { Link } from "react-router-dom"
import { AiOutlineSetting, AiOutlineAppstore  } from "react-icons/ai"
import { CgDarkMode, CgImage } from 'react-icons/cg'
import { HiArrowLeft } from "react-icons/hi2"
import { Transition } from "@headlessui/react"
import { motion } from 'framer-motion'

import { useChat } from "@/stores/chat-storage"
import { ChatListItem } from "./components/chat-list-item"
import { useTheme } from "@/stores/theme-storage"

import { Avatar } from '@/presentation/components/general/avatar'
import { BiSearch } from "react-icons/bi"
import { Input } from "../general/input"

export const Sidebar = () => {
  const [query, setQuery] = useState('')
  const [isConfigOpen, setConfigOpen] = useState(false)
  const chats = useChat(state => state.localConversations)

  const filteredChats =
    query === ''
      ? chats
      : chats.filter(item => item.user?.name.toLowerCase().includes(query.toLowerCase()))
    

  return (
    <div 
      className='min-w-[400px] relative flex flex-col h-full bg-white dark:bg-slate-800 border-r-[0.5px] border-collapse border-slate-400 border[0.5]'
    >
      <header className="py-3 px-6 flex justify-between items-center bg-slate-200 dark:bg-slate-900">
        <div className='flex items-center justify-center font-bold gap-4'>
          <div className='rounded-full h-10 w-10 bg-slate-300'></div>
        </div>

        <div className="flex gap-4 text-xl text-slate-800 dark:text-white">
          <button 
            className="flex items-center justify-center p-3 rounded-full hover:bg-slate-400 hover:bg-opacity-20 transition-all"
            onClick={() => setConfigOpen(true)}
          >
            <AiOutlineSetting />
          </button>
        </div>
      </header>

      <section className="px-3 mt-2 ">
        <div className="flex gap-4 items-center justify-center">
          <Input 
            value={query}
            onChange={setQuery}
            Icon={<BiSearch className="text-lg"/>}
          />

          <Link to="/manage-chats">
            <AiOutlineAppstore className="text-2xl text-slate-800 dark:text-white"/>
          </Link>
        </div>
      </section>

      <section className="mt-4 text-slate-700 dark:text-slate-300">
        <p className="flex items-center gap-2 px-3">
          Conversas ativas

          <span className="rounded-full h-6 w-6 text-[12px] grid place-items-center bg-blue-500 text-white font-bold">
            {chats.length}
          </span>

        </p>

        <ul className="flex flex-col mt-2 max-h-[calc(100vh-170px)] h-full overflow-y-scroll scrollbar-thumb-slate-600 scrollbar-thin">
          {filteredChats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat}/>
          ))}
        </ul>
      </section>

      <ConfigOptions 
        open={isConfigOpen} 
        user={{ avatarUrl: '', name: 'Juju Salimeni'}}
        onClose={() => setConfigOpen(false)}
      />
       
    </div>
  )
}

type ConfigProps = {
  open: boolean
  onClose: () => void
  user: {
    name: string
    avatarUrl: string
  }
}
        
const ConfigOptions = ({ open, user, onClose }: ConfigProps) => {
  const toggleTheme = useTheme(state => state.toggleTheme)

  return (
      <Transition
        as={'div'}
        show={open}
        enter="translate duration-[200ms]"
        enterFrom="-translate-x-[100%]"
        enterTo="translate-x-0"
        leave="translate duration-[200ms]"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-[100%]"
        className="absolute z-20 w-full h-full bg-white dark:bg-slate-800"
      >
        <div className="pt-24 w-full text-lg text-white bg-blue-400 dark:text-slate-200 dark:bg-slate-700 p-4">
          <button
            className="flex items-center gap-3"
            onClick={onClose}
          >
            <HiArrowLeft />
            Configurações
          </button>
        </div>
        <header className="w-full flex flex-col items-center justify-center py-6 px-2">
          <motion.div
            animate={{
              scale: [0, 1],
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
          >
            <Avatar 
              name={user.name}
              url={user.avatarUrl}
              size={75}
            />
          </motion.div>
          <h2 className="text-xl text-slate-800 dark:text-slate-200 mt-5">{user.name}</h2>
        </header>
        <div className="mt-6 flex flex-col w-full">
          <span className="text-xl text-blue-500 dark:text-blue-200 ml-5 mb-2">Opções</span>

          <ul className="text-slate-700 dark:text-slate-300 text-lg flex flex-col">
            <li className="flex items-center gap-6 py-5 w-full hover:bg-slate-100 dark:hover:bg-slate-600 px-5 transition-all cursor-pointer">
              <CgImage className="text-2xl" />  Tela de fundo
            </li>
            <li className="flex items-center gap-6 py-5 w-full hover:bg-slate-100 dark:hover:bg-slate-600 px-5 transition-all cursor-pointer" onClick={() => toggleTheme()}>
              <CgDarkMode className="text-2xl" />  Tema
            </li>
          </ul>
        </div>
      </Transition>
    
  )
}
