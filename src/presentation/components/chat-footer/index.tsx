import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineSend, AiOutlineSync } from "react-icons/ai"

type Props = {
  controlling: boolean
  changeControll: (control: 'assistant' | 'person') => void
  handleMessage: (message: string) => void
}

export const ChatFooter = ({ controlling, changeControll, handleMessage }: Props) => {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    if(message === '') return
    handleMessage(message)
    setMessage('')
  }

  return (
    <AnimatePresence>
      {
        controlling && 
          <motion.div
            key="controll"
            animate={{
              x: [-100, 0],
              opacity: [0,1]
            }}
            exit={{
              x: 1000,
              opacity: 0
            }}
            className="w-full px-4 py-2 bg-blue-500 text-white z-20 text-sm fixed bottom-20"
          >
            <span>Você está no controle desta conversa</span>
          </motion.div>
      }
      
      <footer className="w-[calc(100vw-400px)] fixed bottom-0 flex items-center bg-slate-100 dark:bg-slate-900 p-3">
        <div className="w-full bg-white dark:bg-slate-700 rounded-md h-[40px] col-span-10 text-slate-500 focus-within:dark:text-white focus-within:text-slate-700 transition-all font-semibold">
          <input 
            className="w-full bg-transparent h-full outline-none px-4" 
            placeholder="Mensagem" 
            onKeyDown={(key) => {
              if(key.code === 'Enter') handleSendMessage()
            }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>

        <div className="flex items-center justify-center gap-3 col-span-2 text-white">
          <button 
            className="flex items-center justify-center p-3 text-2xl rounded-full -ml-5 bg-blue-500"
            onClick={() => handleSendMessage()}
          >
            <AiOutlineSend />
          </button>

          <button 
            className={`group flex items-center justify-center p-3 gap-4 text-md rounded-full bg-blue-500`}
            onClick={() => changeControll(!controlling ? 'person' : 'assistant')}
          >
            <AiOutlineSync className="text-2xl group-:animate-spin" />  
            {controlling ? 'Bot' : 'Assumir'}
          </button>
        </div>
      </footer>
    </AnimatePresence>
  )
}
