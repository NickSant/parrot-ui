import React, { ReactNode } from 'react'

type Props = {
  value: string,
  onChange: (e: string) => void
  Icon: ReactNode
}

export const Input = ({value, Icon, onChange}: Props) => {
  return (
    <div 
      id="searchInput"
      className="w-full flex items-center justify-center gap-4 bg-slate-200 dark:bg-slate-900 rounded-full h-10 text-slate-500 px-4 focus:outline-none focus-within:border-none transition-all border-box focus-within:text-slate-800 focus-within:dark:text-slate-200"
    >
      {Icon}
      <input 
        className="w-full bg-transparent focus:outline-none"
        onChange={e => onChange(e.target.value)}
        value={value}
      />
    </div>
  )
}
