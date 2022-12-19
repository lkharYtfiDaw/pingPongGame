import React from 'react'
import { AcheivementsLinks } from '../../model/Acheivements'
import Acheivements from './Acheivements'
import { AcheivementCard, StatsCard } from './Cards'
import History from './History'
import {ProfileCard} from './ProfileCard'
import Stats from './Stats'

function Profile() {
  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)]  w-full grid grid-cols-1 xl:grid-cols-5 px-12 pt-12 pb-6'>
          <div className='col-span-3  order-last xl:order-first px-12'>
              <Stats/>
             <History/>
          </div>
          <ProfileCard/>
   
     

    </div>
  ) 
}

export default Profile