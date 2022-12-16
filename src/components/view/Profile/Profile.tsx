import React from 'react'
import Card from './Card'
import ProfileCard from './ProfileCard'

function Profile() {
  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)] sm:px-12  px-8 w-full flex flex-col items-center justify-start space-y-12 pt-10'>
        <div className="flex items-center flex-col lg:flex-row  justify-around  ">
            <div className='flex w-full items-center justify-around  '>
                    <Card title='Games' count='8'/>
                    <Card title='Wins' count='5'/>
                    <Card title='Loses' count='3'/>
            </div>
            <ProfileCard></ProfileCard>
        </div>

    </div>
  )
}

export default Profile