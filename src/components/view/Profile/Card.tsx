import React from 'react'

type CardProps = 
{
    title:string,
    count:string
}

function Card({title, count} :CardProps) {
  return (
    <div className='flex items-center justify-around p-2 h-40 w-72 bg-login-gradient rounded-xl space-x-8 '>
            <h1 className='font-extrabold text-5xl'>{count}</h1>
            <h1 className='font-bold text-xl'>{title}</h1>
    </div>
  )
}

export default Card