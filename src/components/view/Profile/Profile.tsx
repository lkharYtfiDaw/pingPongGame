import React from 'react'
import { AcheivementsLinks } from '../../model/Acheivements'
import { AcheivementCard, StatsCard } from './Cards'
import ProfileCard from './ProfileCard'

function Profile() {
  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)] sm:px-12   w-full flex flex-col items-center justify-start space-y-12 pt-10'>
          <ProfileCard/>
      <div className="flex items-center flex-col lg:flex-row w-full justify-around  ">
        <div className='flex w-full flex-col '>
          <h1 className='w-full font-bold text-xl px-10 '> Stats</h1>
          <div className='flex w-full items-center flex-col md:flex-row md:space-x-4 justify-evenly  '>
            <StatsCard title='Games' count='8' color='bg-[#10559A]' />
            <StatsCard title='Wins' count='5' color='bg-[#488786]' />
            <StatsCard title='Loses' count='3' color='bg-[#DB4C77]' />
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col lg:flex-row w-full justify-around  ">
        <div className='flex w-full flex-col '>
          <h1 className='w-full font-bold text-xl px-10 '> Acheivements</h1>
          <div className='flex w-full items-center flex-col lg:flex-row lg:space-x-4 justify-evenly'>
            {
              AcheivementsLinks.map((items) => (
                <AcheivementCard key={items.id} title={items.title} cost={items.cost} color={items.color}
                 avatar={items.avatar} wingames={items.wingames}></AcheivementCard>
              ))
            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile