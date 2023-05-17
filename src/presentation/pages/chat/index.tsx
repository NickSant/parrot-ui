import { ChatFooter } from "@/presentation/components/chat-footer"
import { Fragment, useState } from "react"
import { AiOutlineGlobal, AiOutlineRobot, AiOutlineUser } from "react-icons/ai"
import { BiHappy, BiShoppingBag } from "react-icons/bi"

import { Popover, Transition } from '@headlessui/react'

import { SlArrowDown } from "react-icons/sl"

export const Chats = () => {
  const [controll, setControll] = useState('BOT')

  return (
    <div className="h-[calc(100vh-72px)] bg-blue-200">
      <div className="h-[calc(100vh-72px-80px)] w-full py-6 pb-8 px-4 relative scrollbar-thin overflow-y-scroll">
        <ConversationContext />

        <SentMessage sender="BOT"/>
        <ReceivedMessage />
        <SentMessage sender="BOT"/>
        <ReceivedMessage />
        <SentMessage sender="PERSON"/>
        <SentMessage sender="BOT"/>
      </div>

      <ChatFooter controlling={controll === 'USER'} changeControll={setControll}/>
    </div>
  )
}


type SentMessageProps = {
  sender: 'BOT' | 'PERSON'
}

// const ConversationContext = () => {

//   return (
//     <div className="group  text-slate-200 w-fit text-sm transition-all bg-slate-900 rounded-lg py-2 px-4 gap-6 flex flex-col">
//       <span className="flex items-center gap-4">
//         Contexto da conversa <SlArrowDown className="group-hover:rotate-180 transition-all"/>
//       </span>

//       <ul className="hidden group-hover:flex flex-col gap-2 list-disc w-[300px] pl-4 pb-2">
//         <li>Conversa amigável</li>
//         <li>Tem interesse em viagem internacional</li>
//         <li>Já fez cotações de seguro viagem em outros sites</li>
//       </ul>
//     </div>
//   )
// }

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

const SentMessage = ({ sender }: SentMessageProps) => (
  <div className="w-full flex justify-end">
    <div className="text-sm align-right text-right bg-blue-950 rounded-lg px-3 py-4 text-slate-200 max-w-[600px] my-2">
      {sender === "BOT" 
        ? <span className="text-slate-400 mb-4 flex gap-3 justify-end items-center">Enviado pelo bot <AiOutlineRobot /></span> 
        : <span className="text-slate-400 mb-4 flex gap-3 justify-end items-center">Enviado por você <AiOutlineUser /></span>
      }
      <p className="mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque numquam ea, perferendis fugiat dicta molestiae earum quidem, molestias labore nesciunt modi debitis dolorem fugit fuga eligendi voluptatem eaque in maxime?</p>

      <span className="text-[12px] text-slate-400">11:45</span>
    </div>
  </div>
)

const ReceivedMessage = () => (
  <div className="w-full flex justify-start">
    <div className="relative text-sm float-left align-left text-left bg-slate-500 rounded-lg px-3 py-4 text-slate-200 max-w-[600px] my-2">
      <p className="mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque numquam ea, perferendis fugiat dicta molestiae earum quidem, molestias labore nesciunt modi debitis dolorem fugit fuga eligendi voluptatem eaque in maxime?</p>

      <span className="text-[12px] text-slate-400">11:45</span>
    </div>
  </div>
)
