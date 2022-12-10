/**
 * 
 */
import React from 'react'

import { useRecoilState } from 'recoil'
import { ActiveTabState } from '../../model/atoms/ActiveTabState'

type NavItemPorp =
  {
    link: {
      id: number
      icon: JSX.Element
      title: string
    }

  }

function NavItem({link} : NavItemPorp) {
    const [activeNacItem, setActiveNavItem] = useRecoilState(ActiveTabState)
    console.log(activeNacItem);
    
    return (
      <div onClick={()=>
      {
        setActiveNavItem(link.id)
      }} key={link.id} className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer
                  group hover:border-gray-900 border-l-4 border-transparent ${activeNacItem === link.id && "border-gray-900"}  `}>
        <span> {link.icon} </span>
         <h1 className={` group-hover:text-  xl:flex hidden ${activeNacItem === link.id &&  "shadow-lg shadow-indigo-500"}`}>{link.title} </h1>
      </div>
    )
}

export default NavItem