import React from 'react'
import Acheivements from './Acheivements'
import ProfileImage from './ProfileImage'
export function ProfileCard() {
  return (
    <div className='col-span-2 bg-[#242424] ring-2 ring-gray-600 ring-offset-1 rounded-md w-full  flex flex-col items-center justify-evenly  px-4 pt-12 pb-6'>
     <ProfileImage/>
      <div id='title' className='font-semibold text-center text-xl m-4'>Mohamed El Hadjaoui</div>
      <div id='subtitle' className='text-sm text-gray-200'>Web3 Developer</div>

      <div id='title'>Actions</div>

      <Acheivements/>

    </div>
  )
}

