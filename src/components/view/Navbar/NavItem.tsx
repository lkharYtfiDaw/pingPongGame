
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
    return (
      <div onClick={()=>
      {
        setActiveNavItem(link.id)
      }} key={link.id} className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer
                  group hover:text-[#DA00FE]  border-transparent ${activeNacItem === link.id && "text-[#DA00FE]"}  `}>
        <span> {link.icon} </span>
         <h1 className={` group-hover:text-gradient-1 font-extrabold text-2xl xl:flex hidden ${activeNacItem === link.id &&  "text-gradient-1"}`}>{link.title} </h1>
      </div>
    )
}

export default NavItem