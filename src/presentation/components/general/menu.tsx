import { Component, Fragment, ReactNode } from 'react'
import { Menu as MenuComponent, Transition } from '@headlessui/react'

type MenuProps = {
  children: ReactNode
  items: {
    callback?: () => void
    label: string
    Icon?: ReactNode
  }[]
}

export const Menu = ({ items, children }: MenuProps) => {
  return (
      <MenuComponent as="div" className="relative inline-block text-left">
        <div>
          <MenuComponent.Button className="">
            {children}
          </MenuComponent.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuComponent.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map((item) => (
              <div className="px-1 py-1 ">
                <MenuComponent.Item>
                  {({ active }) => (
                    <button
                      onClick={item.callback}
                      className={`${
                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                      } group flex w-full gap-3 items-center rounded-md px-2 py-2 text-md`}
                    >
                      {item.Icon}
                
                      {item.label}
                    </button>
                  )}
                </MenuComponent.Item>
              </div>
            ))}
          </MenuComponent.Items>
        </Transition>
      </MenuComponent>
  )
}
