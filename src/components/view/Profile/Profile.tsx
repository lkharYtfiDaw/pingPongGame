import React from 'react'
import Card from './Card'

function Profile() {
  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)] sm:px-12  px-8 w-full  flex flex-col items-start justify-start space-y-12 pt-10'>
        <div className="flex items-start flex-col lg:flex-row w-full justify-start">
            <div className='flex w-full items-center justify-around space-x-10 '>
                    <Card title='Wins' count='5'/>
                    <Card title='Loses' count='3'/>
            </div>
        </div>

    </div>
  )
}

export default Profile