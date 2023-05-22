import { AiOutlineSetting, AiOutlineSearch, AiOutlineAppstore  } from "react-icons/ai"
import { ChatListItem } from "./components/chat-list-item"
import { Link } from "react-router-dom"
import { useChat } from "@/stores/chat-storage"
import { useState } from "react"

export const Sidebar = () => {
  const [query, setQuery] = useState('')
  const chats = useChat(state => state.localConversations)

  const filteredChats =
    query === ''
      ? chats
      : chats.filter(item => item.person.name.toLowerCase().includes(query.toLowerCase()))
    

  return (
    <div 
      className='min-w-[400px] flex flex-col h-full bg-slate-800 border-r-[0.5px] border-collapse border-slate-400 border[0.5]'
    >
      <header className="py-4 px-6 flex justify-between items-center bg-slate-900">
        <div className='flex items-center justify-center font-bold gap-4'>
          <div className='rounded-full h-10 w-10 bg-slate-300'></div>
        </div>

        <div className="flex gap-4 text-xl text-white">
          <AiOutlineSetting />
        </div>
      </header>

      <section className="px-3 mt-2 ">
        <div className="flex gap-4 items-center justify-center">
          <div 
            id="searchInput"
            className="w-full flex items-center justify-center gap-4 bg-slate-900 rounded-t-lg h-10 text-slate-500 px-4 focus:outline-none focus-within:border-none transition-all border-box focus-within:text-slate-200"
          >
            <AiOutlineSearch className="text-xl" />
            <input 
              className="w-full bg-transparent focus:outline-none"
              onChange={e => setQuery(e.target.value)}
              value={query}
            />
          </div>

          <Link to="/manage-chats">
            <AiOutlineAppstore className="text-2xl text-white"/>
          </Link>
        </div>
      </section>

      <section className="mt-4 text-slate-300">
        <p className="flex items-center gap-2 px-3">
          Conversas ativas

          <span className="rounded-full h-6 w-6 text-[12px] grid place-items-center bg-blue-300 text-white font-bold">
            {chats.length}
          </span>

        </p>

        <ul className="flex flex-col mt-2 max-h-[calc(100vh-170px)] overflow-y-scroll scrollbar-thumb-slate-600 scrollbar-thin">
          {filteredChats.map((chat, idx) => (
            <ChatListItem key={idx} chat={chat}/>
          ))}
        </ul>
      </section>
    </div>
  )
}
