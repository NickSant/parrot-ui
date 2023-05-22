import { ChatFooter } from "@/presentation/components/chat-footer"
import { Fragment, useEffect, useRef, useState } from "react"
import { AiOutlineGlobal, AiOutlineRobot, AiOutlineUser } from "react-icons/ai"
import { BiHappy, BiShoppingBag } from "react-icons/bi"

import { Popover, Transition } from '@headlessui/react'

import { SlArrowDown } from "react-icons/sl"
import { useChat } from "@/stores/chat-storage"
import useMemoizedState from "@/presentation/hooks/useMemoizedState"
import { getLiveMessages } from "@/data/usecases/getLiveMessages"

export const Chats = () => {
  const conversationWrapperRef = useRef<HTMLDivElement>(null)

  const activeConversation = useChat(state => state.activeConversation)
  const [controll, setControll] = useState('assistant')
  const [messages, setMessages] = useMemoizedState<{ message: string, sender: string}[]>([])

  const handleGetMessages = () => getLiveMessages(
      { id: activeConversation?.id as string }, 
      (message) => {
      const messages = message.messages.map(item => ({
        message: item.content,
        sender: item.role
      }))

      setMessages(messages)
    })
  
  const handleMessages = async (message: string) => {
    setMessages(messages.concat({sender: 'assistant', message}))
  }

  const scrollBottom = () => {
    const lastChild = conversationWrapperRef.current?.lastElementChild
    lastChild?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  useEffect(() => {
    scrollBottom()
  }, [messages])

  useEffect(() => {
    setMessages([])
    const { abort, removeListener } = handleGetMessages()

    return () => {
      removeListener()
      abort()
    }
  }, [activeConversation])

  return (
    <div className="h-[calc(100vh-72px)] bg-blue-200">
      <div 
        className="h-[calc(100vh-72px-80px)] w-full py-6 pb-8 px-4 relative scrollbar-thin  scrollbar-thumb-slate-400 overflow-y-scroll"
        ref={conversationWrapperRef}
      >
        <ConversationContext />
        {messages.map(msg => (
          msg.sender === 'user'
            ? <ReceivedMessage message={msg.message} /> 
            : <SentMessage sender={msg.sender} message={msg.message} />
        ))}
      </div>
      
      <ChatFooter
        handleMessage={handleMessages} 
        controlling={controll === 'person'} 
        changeControll={setControll}
      />
    </div>
  )
}


type SentMessageProps = {
  sender?: string
  message: string
}

const ConversationContext = () => (
  <Popover className="fixed z-20 top-20 left-[410px]">
    <Popover.Button className="bg-blue-500 px-4 py-2 text-slate-200 rounded-full flex gap-2 items-center">
      Contexto da conversa
      <SlArrowDown className="ui-open:rotate-180 transition-all"/>
    </Popover.Button>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className="bg-white py-4 px-2 mt-3 rounded-lg shadow-sm list-none">
        <li className="px-3 py-2 rounded-lg flex items-center gap-4 hover:bg-slate-100 transition-all">
          <div className="bg-blue-200 text-blue-500 flex items-center justify-center p-3 text-2xl rounded-lg">
            <BiHappy />
          </div>
          Conversa amigável
        </li>
        <li className="px-3 py-2 rounded-lg flex items-center gap-4 hover:bg-slate-100 transition-all">
          <div className="bg-blue-200 text-blue-500 flex items-center justify-center p-3 text-2xl rounded-lg">
            <AiOutlineGlobal />
          </div>
          Interesse em viagem internacional
        </li>
        <li className="px-3 py-2 rounded-lg flex items-center gap-4 hover:bg-slate-100 transition-all">
          <div className="bg-blue-200 text-blue-500 flex items-center justify-center p-3 text-2xl rounded-lg">
            <BiShoppingBag />
          </div>
          Pretende adquirir o produto
        </li>
      </Popover.Panel>
    </Transition>
  </Popover>
)

const SentMessage = ({ sender, message }: SentMessageProps) => (
  <div className="w-full flex justify-end">
    <div className="text-sm align-right text-right bg-blue-950 rounded-lg px-3 py-4 text-slate-200 max-w-[600px] my-2">
      {sender === "assistant" 
        ? <span className="text-slate-400 mb-4 flex gap-3 justify-end items-center">Enviado pelo bot <AiOutlineRobot /></span> 
        : <span className="text-slate-400 mb-4 flex gap-3 justify-end items-center">Enviado por você <AiOutlineUser /></span>
      }
      <p className="mb-4">{message}</p>

      <span className="text-[12px] text-slate-400">11:45</span>
    </div>
  </div>
)

const ReceivedMessage = ({ message }: SentMessageProps) => (
  <div className="w-full flex justify-start">
    <div className="relative text-sm float-left align-left text-left bg-slate-500 rounded-lg px-3 py-4 text-slate-200 max-w-[600px] my-2">
      <p className="mb-4">{message}</p>

      <span className="text-[12px] text-slate-400">11:45</span>
    </div>
  </div>
)
