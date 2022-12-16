import React from 'react'
import avtar from '../../../assets/avatar.jpeg'
function ProfileCard() {
  return (
    <div className='bg-login-gradient rounded-md  flex flex-col items-center m-8 p-8'>
      <div>
        <img src={avtar} alt="avatar"  className='h-16 rounded-full'/>
      </div>
      <div id='title' className='font-semibold text-center text-xl m-4'>Mohamed El Hadjaoui</div>
      <div id='subtitle' className='text-sm text-gray-200'>Web3 Developer</div>
      <div id='stats' className='flex justify-between items-center'>

        <div className='flex flex-col items-center'>
              <div> 172</div>
              <div> Posts</div>
        </div>
      </div>
      <div id='title'>Actions</div>

    </div>
  )
}

export default ProfileCard