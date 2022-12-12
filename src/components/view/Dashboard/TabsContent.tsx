import React from 'react'

type TabsContentProps = {
  params: {
    id: number,
    title: string,
    img?: string
  }

}


export function TabsPlayContent({ params }: TabsContentProps) {
  return (
    <div className='flex xl:flex-col 2xl:w-80 w-full px-8 items-center justify-center 2xl:justify-between xl:h-96 bg-[#242424] hover:bg-tab-gradient rounded-xl py-6 my-2 cursor-pointer'>
      <div className='w-56   '>
        <img className=' ' src={params.img} alt={params.title} />
      </div>
      <span className='xl:flex hidden flex-col space-y-5 items-center justify-center'>
        <h1 className='font-bold'>{params.title}</h1>
        <h1 className='font-bold'>Play</h1>
      </span>

    </div>
  )
}

export function TabsLiveContent({ params }: TabsContentProps) {
  return (
    <div className='flex xl:flex-col 2xl:w-80 w-full px-8 items-center justify-center 2xl:justify-between xl:h-96 bg-[#242424] hover:bg-tab-gradient rounded-xl py-6 my-2 cursor-pointer'>
      <div className='w-56 h-w-56  '>
  
      </div>
      <span className='xl:flex hidden flex-col space-y-5 items-center justify-center'>
        <h1 className='font-bold'>{params.title}</h1>
        <h1 className='font-bold'>Play</h1>
      </span>

    </div>
  )
}


export default function Star() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="512" height="512" x="0" y="0" viewBox="0 0 511.98685 511" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0"  data-original="#ffc107" ></path></g></svg>
  )
}

