import { SlOptionsVertical } from "react-icons/sl"

export const ChatListItem = () => {
  return (
    <li className='group w-full flex items-center justify-between px-4 py-6 border-slate-100 hover:bg-slate-700 transition-all cursor-pointer'>
      <div className='flex items-center justify-center gap-4'>
        <div className='rounded-full h-12 w-12 bg-slate-300'></div>
        <span>Cleiton Rasta</span>
      </div>


      <div className="flex items-center justify-center gap-3 transition-all">
        <span className="rounded-full w-3 h-3 bg-green-400 animate-pulse" />
        <SlOptionsVertical className="hidden group-hover:block transition-all"/>
      </div>
    </li>
  )
}
