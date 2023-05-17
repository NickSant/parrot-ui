import { AiOutlineSearch } from 'react-icons/ai'
import { SlOptionsVertical } from 'react-icons/sl'


export const Navbar = () => {
  return (
    <nav className='w-full flex items-center justify-between py-4 px-6 font-sans bg-slate-900 border-l-[0.5px] border-slate-400 border-collapse'>
      <div className='flex items-center justify-center font-bold gap-4'>
        <div className='rounded-full h-10 w-10 bg-slate-300'></div>

        <span className='text-slate-100'>
          Vanesso Rodrigues

          <small className="ml-5 opacity-80">+55 11 98171-2381</small>
        </span>
      </div>

      <div className="flex items-center justify-center gap-5 text-xl text-white">
        <AiOutlineSearch />
        <SlOptionsVertical />
      </div>
    </nav>  
  )
}
