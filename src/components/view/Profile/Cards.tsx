import React from 'react'

type StatsCardProps = 
{
    title:string,
    count:string,
    color:string,
}

type AcheivementCardProps = 
{
    title:string,
    color:string,
    cost: number,
    wingames: number,
    avatar:string
}

export function StatsCard({title, count, color} :StatsCardProps) {
  return (
    <div className={`flex items-center justify-around  flex-col sm:flex-row h-40 xl:w-72 min-w-[130px] ${color} rounded-xl mt-8  p-4`}>
            <h1 className='font-extrabold text-5xl'>{count}</h1>
            <h1 className='font-bold text-xl'>{title}</h1>
    </div>
  )
}

export function AcheivementCard({title, cost, color, avatar, wingames = 0} :AcheivementCardProps) {
  console.log(wingames);
  
  return (
    <div className={`flex items-center justify-around flex-col sm:flex-row  ${  cost > wingames && "grayscale"} ${color} h-40 xl:w-72 min-w-[130px] rounded-xl mt-8 p-4`}>
            <img className='sm:h-32  h-10' src={avatar} alt="acheivement avatar" />
            <h1 className='font-bold sm:text-xl'>{title}</h1>
    </div>
  )
}

