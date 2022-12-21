import React from 'react'
import Acheivements from './Acheivements'
import ProfileImage from './ProfileImage'
export function ProfileCard() {
  return (
    <div className='col-span-2 bg-[#242424] ring-2 ring-gray-600 ring-offset-1 rounded-md w-full  flex flex-col items-center justify-evenly  px-4 pt-12 pb-6'>
      <div className='flex flex-col items-center justify-between ring-2 ring-gray-600 ring-offset-1 rounded-md px-12 pt-12 pb-6 shadow-lg shadow-slate-700 w-3/4 space-y-8' >
        <ProfileImage />
        <div className="mb-3 w-96">
          <label htmlFor="formFile" className="form-label inline-block mb-2">Choose your Image</label>
          <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
        </div>
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <label htmlFor='exampleText0' className="form-label inline-block mb-2 ">Name</label>
            <input
              type="text"
              className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleText0"
              placeholder="Mohamed El Hadjaoui"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <label className="form-label inline-block mb-2 ">About You</label>
            <textarea
              className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlTextarea1"
              rows={3}
          onChange={(e) => {
  
                
          }}
              placeholder="Your message"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center">

        </div>


      </div>


      <Acheivements />

    </div>
  )
}

