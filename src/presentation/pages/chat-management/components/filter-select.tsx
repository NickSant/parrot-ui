import { Flags } from '@/domain/models/flags'
import { Combobox } from '@headlessui/react'
import { ReactNode, useState } from 'react'
import { BiCheck, BiSearch } from 'react-icons/bi'

type Props = {
  options: Array<{label: string, value: Flags}>
  onChange: (value: Flags) => void
  selected: string[]
}

export const FilterSelect = ({ options, onChange, selected }: Props) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase())
        })
  
  const handleSelect = (value: Flags) => {
    onChange(value)
    setQuery('')
  }

  return (
    <Combobox onChange={(value: Flags) => handleSelect(value)}>
      <div className='relative flex flex-col w-full'>
        <div className="w-full flex items-center justify-center gap-4 bg-slate-900 rounded-t-lg h-10 text-slate-500 px-4 focus:outline-none focus-within:border-none transition-all border-box focus-within:text-slate-200">
          <BiSearch className=""/>
          <Combobox.Input 
            className="w-full bg-transparent focus:outline-none" 
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
        </div>
        <div className='absolute z-40 top-10 w-full mt-1'>
          <Combobox.Options className="flex flex-col w-full bg-slate-600 rounded-md py-2">
            {filteredOptions.length > 0
              ? filteredOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} selected={!!selected.find(item => item === option.value)}>
                    {option.label}
                  </SelectItem>
                ))
              : <div className='w-full flex flex-col items-center justify-center gap-2 text-slate-200 font-medium py-6'>
                  Não encontramos nada.
                </div>
            }
          </Combobox.Options>
        </div>
      </div>
    </Combobox>
  )
}

const SelectItem = ({children, value, selected}: {children: ReactNode, value: string, selected: boolean}) => {

  return (
    <Combobox.Option 
      value={value} 
      className="w-full flex gap-4 items-center text-slate-200 py-3 px-6 cursor-pointer transition-all hover:bg-slate-700 ui-disabled:text-slate-500 ui-disabled:hover:bg-inherit"
      disabled={selected}
    >
      {selected && <BiCheck />}
      {children}
    </Combobox.Option>
  )
}
