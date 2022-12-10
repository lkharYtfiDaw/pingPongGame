import React from 'react'
import { MagnifyingGlassIcon, CpuChipIcon, UserCircleIcon, BeakerIcon, BellIcon } from '@heroicons/react/24/outline';

function Header() {
  return (
    <div className='bg-[#242424] w-full py-6 items-center justify-between flex px-12  '>
       
      {/*Logo*/}
      <div className='w-full flex  space-x-4 items-center lg:justify-start py-2'> 
        <CpuChipIcon className='w-6 h-6'></CpuChipIcon>
        <h1 className='text-xl text-gray-900 font-medium'  >PongGame</h1>
      </div>
      {/*Icons*/}
      <div className='w-full flex  space-x-4 items-center justify-end py-2'>

        {/* header-icon is a custom class*/}
        <BellIcon  className='header-icon'></BellIcon> 
        <UserCircleIcon  className='header-icon'></UserCircleIcon>
      </div>
    </div>
  )
}

export default Header