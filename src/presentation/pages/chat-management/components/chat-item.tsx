import * as Avatar from '@radix-ui/react-avatar'
import { BiAddToQueue, BiMessage } from 'react-icons/bi'
import { SlSettings } from 'react-icons/sl'

export const ChatItem = () => {
  return (
    <article className='rounded-lg bg-slate-900 px-4 py-4 shadow-md'>
      <header className='flex gap-5 mb-5'>
        <Avatar.Root className="bg-black inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] object-cover"
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            alt="Colm Tuite"
          />
          <Avatar.Fallback
            className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
            delayMs={600}
          >
            CT
          </Avatar.Fallback>
        </Avatar.Root>
        <div className='flex flex-col text-slate-300'>
          <strong className='text-lg'>Juliano Batista Linhares do Nascimento</strong>
          <span className='text-sm'>+55 11 97372-7801</span>
          <div className="inline-flex gap-2 items-center mt-2">
            <span className="block rounded-full w-3 h-3 bg-green-400 animate-pulse" />
            ativa agora
          </div>
        </div>
      </header>

      <hr className='w-full mx-y opacity-30'/>

      <div>

      </div>

      <footer className='flex items-center justify-between mt-5 rounded-lg overflow-hidden'>
        <button className='w-full flex items-center text-xl justify-center p-3 text-blue-300 transition-all hover:bg-slate-800 '>
          <BiAddToQueue />
        </button>
        <button className='w-full flex items-center text-xl justify-center p-3 text-blue-300 transition-all hover:bg-slate-800 '>
          <BiMessage />
        </button>
        <button className='w-full flex items-center text-xl justify-center p-3 text-blue-300 transition-all hover:bg-slate-800 '>
          <SlSettings />
        </button>
      </footer>
    </article>
  )
}
